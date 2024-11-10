import { FrameNode, TextNode, VectorNode } from '../types/nodes.ts';
import { Path, Vector } from '../types/properties.ts';
import PropertyParser from './propertyParser.ts';
import HtmlWriter from '../htmlWriter.ts';
import Unit from '../types/unit.ts';

class AttributesParser {
	private startingPoint?: Vector;

	private addStyles(attributes: Map<string, string>, styles: Map<string, string>) {
		const currentStyles = attributes.get('style') || '';

		attributes.set('style', currentStyles + HtmlWriter.writeStyle(styles));

		return attributes;
	}

	private newAttributes() {
		return new Map<string, string>;
	}

	setStartingPoint(startingPoint: Vector) {
		this.startingPoint = startingPoint;
	}

	getStartingPoint() {
		return this.startingPoint;
	}

	parseFrameAttributes(frame: FrameNode, attributes?: Map<string, string>) {
		attributes = attributes || this.newAttributes();

		const styles = new Map<string, string>;
		styles.set('overflow', 'hidden');

		PropertyParser.parseFills(styles, 'border-color', frame.strokes);

		if(frame.strokes != null && frame.strokes.length > 0) {
			PropertyParser.parseStrokeAlign(styles, frame.strokeAlign);
			PropertyParser.parseNumber(styles, 'border-width', frame.strokeWeight, Unit.Pixels);

			styles.set('border-style', 'solid');
		}

		PropertyParser.parseNumber(styles, 'border-radius', frame.cornerRadius, Unit.Pixels);
		PropertyParser.parseAbsoluteBoundingBox(styles, frame.absoluteBoundingBox, this.startingPoint);

		return this.addStyles(attributes, styles);
	}

	parseTextAttributes(text: TextNode, attributes?: Map<string, string>) {
		attributes = attributes || this.newAttributes();

		const styles = new Map<string, string>;

		this.parseVectorAttributes(text, attributes);

		PropertyParser.parseFills(styles, 'color', text.fills);
		PropertyParser.parseTypeStyle(styles, text.style);

		return this.addStyles(attributes, styles);
	}

	parseVectorAttributes(vector: VectorNode, attributes?: Map<string, string>) {
		attributes = attributes || this.newAttributes();

		const styles = new Map<string, string>;

		PropertyParser.parseAbsoluteBoundingBox(styles, vector.absoluteBoundingBox, this.startingPoint);

		return this.addStyles(attributes, styles);
	}

	parsePathAttributes(path: Path, vector: VectorNode, attributes?: Map<string, string>) {
		attributes = attributes || this.newAttributes();

		PropertyParser.parseFills(attributes, 'fill', vector.fills);

		attributes.set('fill-rule', path.windingRule);
		attributes.set('d', path.path);

		return attributes;
	}
}

export default AttributesParser;