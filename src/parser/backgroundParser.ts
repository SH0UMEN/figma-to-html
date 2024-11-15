import {
	calculateAngleBetweenPoints,
	getDistanceBetweenPoints,
	intersects,
	renormVector,
	roundTo,
	toRad
} from '../util/index.ts';
import { ColorStop, Paint, PaintType, Vector } from '../types/properties.ts';
import PropertyParser from './propertyParser.ts';
import HtmlWriter from '../htmlWriter.ts';
import HtmlTag from '../types/htmlTag.ts';

type GradientInfo = {
	mainAxisLength: number;
	mainAxisGradientLength: number;
	mainAxisGradientOffset: number;
	secondaryAxisLength: number;
	secondaryAxisGradientLength: number;
	secondaryAxisGradientOffset: number;
};

class BackgroundParser {
	static parse(fills: Paint[], size: Vector) {
		let background = '', result = '';

		for(let paint of fills) {
			switch(paint.type) {
				case PaintType.Solid:
					background += PropertyParser.parseColor(paint.color, paint.opacity);
					break;
				case PaintType.GradientLinear:
					background += this.parseLinearGradient(paint.gradientStops, paint.gradientHandlePositions, size, paint.opacity) + ';';
					break;
				case PaintType.GradientAngular:
					background += this.parseAngularGradient(paint.gradientStops, paint.gradientHandlePositions, size, paint.opacity) + ';';
					break;
				case PaintType.GradientRadial:
					result += this.writeLayer(background, size);

					let style = this.parseRadialGradient(paint.gradientStops, paint.gradientHandlePositions, size, paint.opacity);

					result += this.writeLayer(background = '', size, style);
					break;
				default:
					throw new Error(`Unsupported paint type: ${paint.type}`);
			}
		}

		result += this.writeLayer(background, size);

		return result;
	}

	private static writeLayer(background: string, size: Vector, styles?: Map<string, string>) {
		if(background.length == 0 && styles == null)
			return '';

		styles = styles || new Map<string, string>();
		styles.set('position', 'absolute');

		if(styles.get('top') == null)
			PropertyParser.parseNumber(styles, 'top', 0);
		if(styles.get('left') == null)
			PropertyParser.parseNumber(styles, 'left', 0);
		if(styles.get('width') == null)
			PropertyParser.parseVector(styles, size);

		if(background.length > 0)
			styles.set('background', background);

		const attributes = new Map<string, string>;
		attributes.set('style', HtmlWriter.writeStyle(styles));

		return HtmlWriter.writeElement(HtmlTag.Div, attributes);
	}

	private static getGradientInfo(positions: Vector[], size: Vector, angle: number): GradientInfo {
		let normalizedAngle = (angle < 0 ? 180 : 0) + angle;

		// For main and secondary axis
		const lineOffsetMain = Math.abs(Math.tan(toRad(Math.abs(90 - normalizedAngle)))) * size.y;
		const lineOffsetSecondary = Math.abs(Math.tan(toRad(Math.abs(180 - normalizedAngle)))) * size.y;

		const corners = [{ x: 0, y: 0 }, { x: size.x, y: 0 }, { x: size.x, y: size.y }, { x: 0, y: size.y }];

		let corner1Main: Vector, corner2Main: Vector, corner1Secondary: Vector, corner2Secondary: Vector;
		let startLineOffsetMain = 0, endLineOffsetMain = 0, startLineOffsetSecondary = 0, endLineOffsetSecondary = 0;
		let mainStartIndex;

		if(angle > 0 && angle < 90) {
			mainStartIndex = 0;
			endLineOffsetMain = lineOffsetMain + size.x;
			startLineOffsetSecondary = size.x;
			endLineOffsetSecondary = -lineOffsetSecondary;
		} else if(angle > 90 && angle < 180) {
			mainStartIndex = 3;
			startLineOffsetMain = -lineOffsetMain;
			endLineOffsetMain = size.x;
			endLineOffsetSecondary = lineOffsetSecondary + size.x;
		} else if(angle > -90 && angle < 0) {
			mainStartIndex = 1;
			endLineOffsetMain = -lineOffsetMain;
			startLineOffsetMain = size.x;
			startLineOffsetSecondary = lineOffsetSecondary + size.x;
		} else {
			mainStartIndex = 2;
			startLineOffsetMain = lineOffsetMain + size.x;
			startLineOffsetSecondary = -lineOffsetSecondary;
			endLineOffsetSecondary = size.x;
		}

		corner1Main = corners[mainStartIndex];
		corner2Main = corners[mainStartIndex + 2 > 3 ? mainStartIndex - 2 : mainStartIndex + 2];
		corner1Secondary = corners[mainStartIndex + 1 > 3 ? mainStartIndex - 3 : mainStartIndex + 1];
		corner2Secondary = corners[mainStartIndex + 3 > 3 ? mainStartIndex - 1 : mainStartIndex + 3];

		const x = 10, yMain = Math.tan(toRad(normalizedAngle)) * -x;
		const isStartMainLineOffsetInside = startLineOffsetMain >= 0 && startLineOffsetMain <= size.x;
		const intersectionStartMain = intersects(corner1Main, { x: isStartMainLineOffsetInside ? x + startLineOffsetMain : startLineOffsetMain, y: isStartMainLineOffsetInside ? yMain : 0 }, positions[0], positions[1]);
		const intersectionEndMain = intersects(corner2Main, { x: !isStartMainLineOffsetInside ? x + endLineOffsetMain : endLineOffsetMain, y: !isStartMainLineOffsetInside ? yMain : 0 }, positions[0], positions[1]);

		const ySecondary = Math.tan(toRad(90 + normalizedAngle)) * x;
		const isStartSecondaryLineOffsetInside = startLineOffsetSecondary >= 0 && startLineOffsetSecondary <= size.x;
		const intersectionStartSecondary = intersects(corner1Secondary, { x: isStartSecondaryLineOffsetInside ? x + startLineOffsetSecondary : startLineOffsetSecondary, y: isStartSecondaryLineOffsetInside ? -ySecondary : 0 }, positions[0], positions[2]);
		const intersectionEndSecondary = intersects(corner2Secondary, { x: !isStartSecondaryLineOffsetInside ? x + endLineOffsetSecondary : endLineOffsetSecondary, y: !isStartSecondaryLineOffsetInside ? -ySecondary : 0 }, positions[0], positions[2]);

		const mainAxisLength = getDistanceBetweenPoints(intersectionStartMain, intersectionEndMain);
		const mainAxisGradientLength = getDistanceBetweenPoints(positions[0], positions[1]);
		const secondaryAxisLength = getDistanceBetweenPoints(intersectionStartSecondary, intersectionEndSecondary);
		const secondaryAxisGradientLength = getDistanceBetweenPoints(positions[0], positions[2]);

		let mainAxisGradientOffset = getDistanceBetweenPoints(positions[0], intersectionStartMain) / mainAxisLength;
		let secondaryAxisGradientOffset = getDistanceBetweenPoints(positions[0], intersectionStartSecondary) / secondaryAxisLength;

		if(corner1Main.y == 0 && intersectionStartMain.y > positions[0].y || corner1Main.y != 0 && intersectionStartMain.y < positions[0].y)
			mainAxisGradientOffset = -mainAxisGradientOffset;
		if(corner1Secondary.y == 0 && intersectionStartSecondary.y > positions[0].y || corner1Secondary.y != 0 && intersectionStartSecondary.y < positions[0].y)
			secondaryAxisGradientOffset = -secondaryAxisGradientOffset;

		return { mainAxisLength, mainAxisGradientLength, mainAxisGradientOffset, secondaryAxisLength, secondaryAxisGradientLength, secondaryAxisGradientOffset };
	}

	private static parseLinearGradient(stops: ColorStop[], positions: Vector[], size: Vector, opacity: number = 1) {
		positions[0] = renormVector(positions[0], size);
		positions[1] = renormVector(positions[1], size);

		const angle = calculateAngleBetweenPoints(positions[0], positions[1]);
		const info = this.getGradientInfo(positions, size, angle);

		let result = 'linear-gradient(' + (180 - roundTo(angle, 20)) + 'deg';

		for(let i = 0; i < stops.length; i++) {
			let startPosition = info.mainAxisGradientOffset + (stops[i].position * info.mainAxisGradientLength / info.mainAxisLength);
			result += ', ' + PropertyParser.parseColor(stops[i].color, opacity) + ' ' + roundTo(startPosition * 100, 2) + '%';
		}

		return result + ')';
	}

	private static parseAngularGradient(stops: ColorStop[], positions: Vector[], size: Vector, opacity: number = 1) {
		let angle = calculateAngleBetweenPoints(renormVector(positions[0], size), renormVector(positions[1], size));
		angle = (angle)/Math.abs(angle) * (180 - Math.abs(angle));

		let result = 'conic-gradient(from ' + roundTo(angle, 2) + 'deg at ' + roundTo(positions[0].x * 100, 2) + '% ' + roundTo(positions[0].y * 100, 2) + '%';

		for(let i = 0; i < stops.length; i++) {
			result += ', ' + PropertyParser.parseColor(stops[i].color, opacity) + ' ' + roundTo(stops[i].position * 100, 2) + '%';
		}

		result += ', ' + PropertyParser.parseColor(stops[0].color, opacity) + ' 100%)';

		return result;
	}

	private static parseRadialGradient(stops: ColorStop[], positions: Vector[], size: Vector, opacity: number = 1) {
		positions[0] = renormVector(positions[0], size);
		positions[1] = renormVector(positions[1], size);
		positions[2] = renormVector(positions[2], size);

		const angle = calculateAngleBetweenPoints(positions[0], positions[1]);
		const info = this.getGradientInfo(positions, size, angle);
		const styles = new Map<string, string>();

		const sizeX = roundTo(info.secondaryAxisGradientLength / info.secondaryAxisLength * 100, 2);
		const sizeY = roundTo(info.mainAxisGradientLength / info.mainAxisLength * 100, 2);
		const positionX = roundTo((1 - info.secondaryAxisGradientOffset) * 100, 2);
		const positionY = roundTo(info.mainAxisGradientOffset * 100, 2);

		let result = 'radial-gradient(ellipse ' + sizeX + '% ' + sizeY + '% at ' + positionX + '% ' + positionY + '%';

		for(let i = 0; i < stops.length; i++)
			result += ', ' + PropertyParser.parseColor(stops[i].color, opacity) + ' ' + roundTo(stops[i].position * 100, 2) + '%';

		styles.set('transform-origin', 'center');
		styles.set('transform', 'rotate(' + -roundTo(angle, 2) + 'deg)');

		const width = info.secondaryAxisLength;
		const height = info.mainAxisLength;

		PropertyParser.parseNumber(styles, 'width', roundTo(width, 2), 'px');
		PropertyParser.parseNumber(styles, 'height', roundTo(height, 2), 'px');
		PropertyParser.parseNumber(styles, 'left', -roundTo((width - size.x) / 2, 2), 'px');
		PropertyParser.parseNumber(styles, 'top', -roundTo((height - size.y) / 2, 2), 'px');

		return styles.set('background', result + ')');
	}
}

export default BackgroundParser;