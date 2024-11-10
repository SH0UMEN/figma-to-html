import { Color, Paint, PaintType, Rectangle, TypeStyle, Vector } from '../types/properties.ts';
import { FrameNodeStrokeAlign } from '../types/nodes.ts';
import { roundTo } from '../util/index.ts';

class PropertyParser {
	static parseAbsoluteBoundingBox(map: Map<string, string>, value?: Rectangle, startingPoint?: Vector) {
		if(value == null)
			return map;

		startingPoint = startingPoint || { x: 0, y: 0 };

		map.set('position', 'fixed');

		this.parseNumber(map, 'left', value.x - startingPoint.x, 'px');
		this.parseNumber(map, 'top', value.y - startingPoint.y, 'px');
		this.parseNumber(map, 'height', value.height, 'px');
		this.parseNumber(map, 'width', value.width, 'px');

		return map;
	}

	static parseTypeStyle(map: Map<string, string>, value?: TypeStyle) {
		if(value == null)
			return map;

		if(value.fontFamily != null)
			map.set('font-family', value.fontFamily);
		if(value.fontSize != null)
			PropertyParser.parseNumber(map, 'font-size', value.fontSize, 'px');
		if(value.fontWeight != null)
			PropertyParser.parseNumber(map, 'font-weight', value.fontWeight);

		return map;
	}

	static parseStrokeAlign(map: Map<string, string>, value?: string) {
		if(value == FrameNodeStrokeAlign.Inside)
			map.set('box-sizing', 'border-box');

		return map;
	}

	static parseVector(map: Map<string, string>, value?: Vector) {
		if(value != null) {
			this.parseNumber(map, 'height', value.y, 'px');
			this.parseNumber(map, 'width', value.x, 'px');
		}

		return map;
	}

	static parseFills(map: Map<string, string>, property: string, fills?: Paint[]) {
		return fills == null ? map : map.set(property, PropertyParser.parsePaints(fills));
	}

	static parseNumber(map: Map<string, string>, property: string, value?: number, postfix?: string) {
		return value == null ? map : map.set(property, value + (postfix || ''));
	}

	static parsePaints(paints: Paint[]) {
		let result = '';

		for(let paint of paints)
			if(paint.visible !== false)
				result += (result.length > 0 ? ', ' : '') + PropertyParser.parsePaint(paint);

		return result;
	}

	static parsePaint(paint: Paint) {
		if(paint.type == PaintType.Solid)
			return PropertyParser.parseColor(paint.color, paint.opacity);

		return '';
		// throw new Error('Unknown paint type: ' + paint.type);
	}

	static parseColor(color: Color, opacity: number = 1) {
		const toHex = (n: number) => Math.round(n * 255);
		return 'rgba(' + toHex(color.r) + ',' + toHex(color.g) + ',' + toHex(color.b) + ',' + roundTo(color.a * opacity, 2) + ')';
	}
}

export default PropertyParser;