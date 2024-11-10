import { CanvasNode, FrameNode, Node, TextNode, VectorNode } from '../types/nodes.ts';
import NodeType from '../types/nodeType.ts';
import HtmlWriter from '../htmlWriter.ts';
import HtmlTag from '../types/htmlTag.ts';
import AttributesParser from './attributesParser.ts';
import BackgroundParser from './backgroundParser.ts';

class NodeParser {
	private parser = new AttributesParser();

	parse(node: Node) {
		if(node.visible === false)
			return '';

		switch(node.type) {
			case NodeType.Canvas:
				return this.parseCanvas(node as CanvasNode);
			case NodeType.Frame:
			case NodeType.Group:
			case NodeType.Instance:
			case NodeType.Component:
			case NodeType.ComponentSet:
				return this.parseFrame(node as FrameNode);
			case NodeType.Text:
				return this.parseText(node as TextNode);
			case NodeType.Vector:
			case NodeType.Rectangle:
				return this.parseVector(node as VectorNode);
			// case NodeType.Group:
			// 	return Parser.parseGroup(node);
			case NodeType.Document:
				throw new Error('Root nodes are not supported. Pass a canvas node at least');
			default:
				return '';
		}
	}

	private parseCanvas(node: Node) {
		let html = '';

		const styles = new Map<string, string>;
		styles.set('width', '100%');

		const props = new Map<string, string>;
		props.set('style', HtmlWriter.writeStyle(styles));

		html += '<div' + HtmlWriter.writeAttributes(props) + '>';

		return html;
	}

	private parseText(text: TextNode) {
		return HtmlWriter.writeElement(HtmlTag.Span, this.parser.parseTextAttributes(text), text.characters);
	}

	private parseVector(vector: VectorNode) {
		const paths = this.parsePaths(vector);
		return HtmlWriter.writeElement(HtmlTag.Svg, this.parser.parseVectorAttributes(vector), paths);
	}

	private parsePaths(vector: VectorNode) {
		let result = '';

		for(let path of vector.fillGeometry)
			result += HtmlWriter.writeElement(HtmlTag.Path, this.parser.parsePathAttributes(path, vector));

		return result;
	}

	private parseFrame(frame: FrameNode) {
		if(this.parser.getStartingPoint() == null)
			this.parser.setStartingPoint({ x: frame.absoluteBoundingBox.x, y: frame.absoluteBoundingBox.y });

		let content = BackgroundParser.parse(frame.fills, frame.size);

		for(let child of frame.children)
			content += this.parse(child);

		return HtmlWriter.writeElement(HtmlTag.Div, this.parser.parseFrameAttributes(frame), content);
	}
}

export default NodeParser;