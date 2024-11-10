import NodeParser from './parser/nodeParser.ts';
import { Node } from './types/nodes.ts';

const figmaToHtml = (node: Node) => {
	return new NodeParser().parse(node);
};

export default figmaToHtml;