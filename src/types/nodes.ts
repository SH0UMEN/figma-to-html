import { Color, RGBColor, ExportSetting, Constraint, Rectangle, ArcData, BlendMode, MaskType, EasingType, FlowStartingPoint, LayoutConstraint, LayoutGrid, Effect, Hyperlink, DocumentationLink, Paint, Path, Vector, Size, ImageFilters, ColorStop, PaintOverride, TypeStyle, Component, ComponentSet, Style, ShapeType, ConnectorEndpoint, ConnectorLineType, ConnectorTextBackground, ComponentPropertyDefinition, ComponentProperty, ComponentPropertyType, InstanceSwapPreferredValue, PrototypeDevice, Annotation, AnnotationProperty, Measurement, MeasurementStartEnd, MeasurementOffsetInner, MeasurementOffsetOuter, StrokeWeights, Overrides, VariableAlias, DevStatus, Interaction, Trigger, Action, BackAction, CloseAction, OpenURLAction, UpdateMediaRuntimeAction, NodeAction, Navigation, SimpleTransition, DirectionalTransition, Easing, EasingFunctionCubicBezier, EasingFunctionSpring, SetVariableAction, SetVariableModeAction, ConditionalAction, VariableData, VariableDataType, VariableResolvedDataType, Expression, ExpressionFunction, ConditionalBlock, StyleType } from './properties.ts';

type NodeBoundVariables = Map<string, VariableAlias | VariableAlias[] | Map<string, VariableAlias>>;

interface Node {
	id: string;
	name: string;
	visible: boolean;
	type: string;
	rotation: number;
	pluginData: any;
	sharedPluginData: any;
	componentPropertyReferences: Map<string, string>;
	boundVariables: NodeBoundVariables;
	explicitVariableModes: Map<string, string>;
}

interface DocumentNode extends Node {
	children: Node[];
}

interface CanvasNode extends Node {
	children: Node[];
	backgroundColor: Color;
	prototypeStartNodeID: string;
	flowStartingPoints: FlowStartingPoint[];
	prototypeDevice: PrototypeDevice;
	exportSettings: ExportSetting[];
	measurements: Measurement[];
}

enum FrameNodeDevStatus {
	ReadyForDev = 'Ready for dev',
	Completed = 'Completed',
	Null = 'null'
}

enum FrameNodeMaskType {
	Alpha = 'ALPHA',
	Vector = 'VECTOR',
	Luminance = 'LUMINANCE'
}

enum FrameNodeOverflowDirection {
	HorizontalScrolling = 'HORIZONTAL_SCROLLING',
	VerticalScrolling = 'VERTICAL_SCROLLING',
	HorizontalAndVerticalScrolling = 'HORIZONTAL_AND_VERTICAL_SCROLLING'
}

enum FrameNodeCounterAxisAlignContent {
	Auto = 'AUTO',
	SpaceBetween = 'SPACE_BETWEEN'
}

enum FrameNodeCounterAxisAlignItems {
	Min = 'MIN',
	Center = 'CENTER',
	Max = 'MAX',
	Baseline = 'BASELINE'
}

enum FrameNodePrimaryAxisAlignItems {
	Min = 'MIN',
	Center = 'CENTER',
	Max = 'MAX',
	SpaceBetween = 'SPACE_BETWEEN'
}

enum FrameNodeCounterAxisSizingMode {
	Fixed = 'FIXED',
	Auto = 'AUTO'
}

enum FrameNodePrimaryAxisSizingMode {
	Fixed = 'FIXED',
	Auto = 'AUTO'
}

enum FrameNodeLayoutWrap {
	NoWrap = 'NO_WRAP',
	Wrap = 'WRAP'
}

enum FrameNodeLayoutSizingVertical {
	Fixed = 'FIXED',
	Hug = 'HUG',
	Fill = 'FILL'
}

enum FrameNodeLayoutSizingHorizontal {
	Fixed = 'FIXED',
	Hug = 'HUG',
	Fill = 'FILL'
}

enum FrameNodeLayoutMode {
	None = 'NONE',
	Horizontal = 'HORIZONTAL',
	Vertical = 'VERTICAL'
}

type FrameNodeMaxHeight = number | null;

type FrameNodeMinHeight = number | null;

type FrameNodeMaxWidth = number | null;

type FrameNodeMinWidth = number | null;

type FrameNodeAbsoluteRenderBounds = Rectangle | null;

enum FrameNodeLayoutAlign {
	Inherit = 'INHERIT',
	Stretch = 'STRETCH',
	Min = 'MIN',
	Center = 'CENTER',
	Max = 'MAX'
}

enum FrameNodeStrokeAlign {
	Inside = 'INSIDE',
	Outside = 'OUTSIDE',
	Center = 'CENTER'
}

interface FrameNode extends Node {
	children: Node[];
	locked: boolean;
	background: Paint[];
	backgroundColor: Color;
	fills: Paint[];
	strokes: Paint[];
	strokeWeight: number;
	strokeAlign: FrameNodeStrokeAlign;
	strokeDashes: number[];
	cornerRadius: number;
	rectangleCornerRadii: number[];
	cornerSmoothing: number;
	exportSettings: ExportSetting[];
	blendMode: BlendMode;
	preserveRatio: boolean;
	constraints: LayoutConstraint;
	layoutAlign: FrameNodeLayoutAlign;
	interactions: Interaction[];
	transitionNodeID: string;
	transitionDuration: number;
	transitionEasing: EasingType;
	opacity: number;
	absoluteBoundingBox: Rectangle;
	absoluteRenderBounds: FrameNodeAbsoluteRenderBounds;
	size: Vector;
	minWidth: FrameNodeMinWidth;
	maxWidth: FrameNodeMaxWidth;
	minHeight: FrameNodeMinHeight;
	maxHeight: FrameNodeMaxHeight;
	relativeTransform: Array<Array<number>>;
	clipsContent: boolean;
	layoutMode: FrameNodeLayoutMode;
	layoutSizingHorizontal: FrameNodeLayoutSizingHorizontal;
	layoutSizingVertical: FrameNodeLayoutSizingVertical;
	layoutWrap: FrameNodeLayoutWrap;
	primaryAxisSizingMode: FrameNodePrimaryAxisSizingMode;
	counterAxisSizingMode: FrameNodeCounterAxisSizingMode;
	primaryAxisAlignItems: FrameNodePrimaryAxisAlignItems;
	counterAxisAlignItems: FrameNodeCounterAxisAlignItems;
	counterAxisAlignContent: FrameNodeCounterAxisAlignContent;
	paddingLeft: number;
	paddingRight: number;
	paddingTop: number;
	paddingBottom: number;
	horizontalPadding: number;
	verticalPadding: number;
	itemSpacing: number;
	counterAxisSpacing: number;
	layoutPositioning: 'ABSOLUTE';
	itemReverseZIndex: boolean;
	strokesIncludedInLayout: boolean;
	layoutGrids: LayoutGrid[];
	overflowDirection: FrameNodeOverflowDirection;
	effects: Effect[];
	isMask: boolean;
	isMaskOutline: boolean;
	maskType: FrameNodeMaskType;
	styles: Map<StyleType, string>;
	devStatus: FrameNodeDevStatus;
	annotations: Annotation[];
}

type GroupNode = FrameNode;

type SectionNodeAbsoluteRenderBounds = Rectangle | null;

enum SectionNodeStrokeAlign {
	Inside = 'INSIDE',
	Outside = 'OUTSIDE',
	Center = 'CENTER'
}

enum SectionNodeDevStatus {
	ReadyForDev = 'Ready for dev',
	Completed = 'Completed',
	Null = 'null'
}

interface SectionNode extends Node {
	sectionContentsHidden: boolean;
	devStatus: SectionNodeDevStatus;
	fills: Paint[];
	strokes: Paint[];
	strokeWeight: number;
	strokeAlign: SectionNodeStrokeAlign;
	children: Node[];
	absoluteBoundingBox: Rectangle;
	absoluteRenderBounds: SectionNodeAbsoluteRenderBounds;
}

enum VectorNodeStrokeAlign {
	Inside = 'INSIDE',
	Outside = 'OUTSIDE',
	Center = 'CENTER'
}

enum VectorNodeStrokeCap {
	None = 'NONE',
	Round = 'ROUND',
	Square = 'SQUARE',
	LineArrow = 'LINE_ARROW',
	TriangleArrow = 'TRIANGLE_ARROW',
	DiamondFilled = 'DIAMOND_FILLED',
	CircleFilled = 'CIRCLE_FILLED',
	TriangleFilled = 'TRIANGLE_FILLED',
	WashiTape1 = 'WASHI_TAPE_1',
	WashiTape2 = 'WASHI_TAPE_2',
	WashiTape3 = 'WASHI_TAPE_3',
	WashiTape4 = 'WASHI_TAPE_4',
	WashiTape5 = 'WASHI_TAPE_5',
	WashiTape6 = 'WASHI_TAPE_6'
}

type VectorNodeAbsoluteRenderBounds = Rectangle | null;

enum VectorNodeLayoutAlign {
	Inherit = 'INHERIT',
	Stretch = 'STRETCH',
	Min = 'MIN',
	Center = 'CENTER',
	Max = 'MAX'
}

interface VectorNode extends Node {
	locked: boolean;
	exportSettings: ExportSetting[];
	blendMode: BlendMode;
	preserveRatio: boolean;
	layoutAlign: VectorNodeLayoutAlign;
	layoutGrow: number;
	constraints: LayoutConstraint;
	transitionNodeID: string;
	transitionDuration: number;
	transitionEasing: EasingType;
	opacity: number;
	absoluteBoundingBox: Rectangle;
	absoluteRenderBounds: VectorNodeAbsoluteRenderBounds;
	effects: Effect[];
	size: Vector;
	relativeTransform: Array<Array<number>>;
	isMask: boolean;
	fills: Paint[];
	fillGeometry: Path[];
	fillOverrideTable: Map<number, PaintOverride>;
	strokes: Paint[];
	strokeWeight: number;
	individualStrokeWeights: StrokeWeights;
	strokeCap: VectorNodeStrokeCap;
	strokeJoin: string;
	strokeDashes: number[];
	strokeMiterAngle: number;
	strokeGeometry: Path[];
	strokeAlign: VectorNodeStrokeAlign;
	styles: Map<StyleType, string>;
	annotations: Annotation[];
}

interface BooleanOperationNode extends VectorNode {
	children: Node[];
	booleanOperation: string;
}

type StarNode = VectorNode;

type LineNode = VectorNode;

interface EllipseNode extends VectorNode {
	arcData: ArcData;
}

type RegularPolygonNode = VectorNode;

interface RectangleNode extends VectorNode {
	cornerRadius: number;
	rectangleCornerRadii: number[];
	cornerSmoothing: number;
}

enum TableNodeStrokeAlign {
	Inside = 'INSIDE',
	Outside = 'OUTSIDE',
	Center = 'CENTER'
}

type TableNodeAbsoluteRenderBounds = Rectangle | null;

interface TableNode extends Node {
	absoluteBoundingBox: Rectangle;
	absoluteRenderBounds: TableNodeAbsoluteRenderBounds;
	blendMode: BlendMode;
	children: Node[];
	constraints: LayoutConstraint;
	effects: Effect[];
	exportSettings: ExportSetting[];
	relativeTransform: Array<Array<number>>;
	size: Vector;
	strokes: Paint[];
	strokeAlign: TableNodeStrokeAlign;
	strokeWeight: number;
}

type TableCellNodeAbsoluteRenderBounds = Rectangle | null;

interface TableCellNode extends Node {
	absoluteBoundingBox: Rectangle;
	absoluteRenderBounds: TableCellNodeAbsoluteRenderBounds;
	characters: string;
	fills: Paint[];
	relativeTransform: Array<Array<number>>;
	size: Vector;
}

enum TextNodeLineTypes {
	Ordered = 'ORDERED',
	Unordered = 'UNORDERED',
	None = 'NONE'
}

interface TextNode extends VectorNode {
	characters: string;
	style: TypeStyle;
	characterStyleOverrides: number[];
	styleOverrideTable: Map<number, TypeStyle>;
	lineTypes: TextNodeLineTypes;
	lineIndentations: number[];
}

type SliceNodeAbsoluteRenderBounds = Rectangle | null;

interface SliceNode extends Node {
	exportSettings: ExportSetting[];
	absoluteBoundingBox: Rectangle;
	absoluteRenderBounds: SliceNodeAbsoluteRenderBounds;
	size: Vector;
	relativeTransform: Array<Array<number>>;
}

interface ComponentNode extends FrameNode {
	componentPropertyDefinitions: Map<string, ComponentPropertyDefinition>;
}

interface ComponentSetNode extends FrameNode {
	componentPropertyDefinitions: Map<string, ComponentPropertyDefinition>;
}

interface InstanceNode extends FrameNode {
	componentId: string;
	isExposedInstance: boolean;
	exposedInstances: string[];
	componentProperties: Map<string, ComponentProperty>;
	overrides: Overrides[];
}

type StickyNodeAbsoluteRenderBounds = Rectangle | null;

interface StickyNode extends Node {
	absoluteBoundingBox: Rectangle;
	absoluteRenderBounds: StickyNodeAbsoluteRenderBounds;
	authorVisible: boolean;
	backgroundColor: Color;
	blendMode: BlendMode;
	characters: string;
	effects: Effect[];
	exportSettings: ExportSetting[];
	fills: Paint[];
	locked: boolean;
	opacity: number;
	relativeTransform: Array<Array<number>>;
}

enum ShapeWithTextNodeStrokeAlign {
	Inside = 'INSIDE',
	Outside = 'OUTSIDE',
	Center = 'CENTER'
}

enum ShapeWithTextNodeStrokeCap {
	None = 'NONE',
	Round = 'ROUND',
	Square = 'SQUARE',
	LineArrow = 'LINE_ARROW',
	TriangleArrow = 'TRIANGLE_ARROW',
	DiamondFilled = 'DIAMOND_FILLED',
	CircleFilled = 'CIRCLE_FILLED',
	TriangleFilled = 'TRIANGLE_FILLED',
	WashiTape1 = 'WASHI_TAPE_1',
	WashiTape2 = 'WASHI_TAPE_2',
	WashiTape3 = 'WASHI_TAPE_3',
	WashiTape4 = 'WASHI_TAPE_4',
	WashiTape5 = 'WASHI_TAPE_5',
	WashiTape6 = 'WASHI_TAPE_6'
}

type ShapeWithTextNodeAbsoluteRenderBounds = Rectangle | null;

interface ShapeWithTextNode extends Node {
	absoluteBoundingBox: Rectangle;
	absoluteRenderBounds: ShapeWithTextNodeAbsoluteRenderBounds;
	backgroundColor: Color;
	blendMode: BlendMode;
	characters: string;
	cornerRadius: number;
	rectangleCornerRadii: number[];
	cornerSmoothing: number;
	effects: Effect[];
	exportSettings: ExportSetting[];
	fills: Paint[];
	isMask: boolean;
	locked: boolean;
	opacity: number;
	shapeType: ShapeType;
	strokes: Paint[];
	strokeWeight: number;
	strokeCap: ShapeWithTextNodeStrokeCap;
	strokeJoin: string;
	strokeDashes: number[];
	strokeAlign: ShapeWithTextNodeStrokeAlign;
	relativeTransform: Array<Array<number>>;
	styles: Map<StyleType, string>;
}

enum ConnectorNodeStrokeAlign {
	Inside = 'INSIDE',
	Outside = 'OUTSIDE',
	Center = 'CENTER'
}

enum ConnectorNodeStrokeCap {
	None = 'NONE',
	Round = 'ROUND',
	Square = 'SQUARE',
	LineArrow = 'LINE_ARROW',
	TriangleArrow = 'TRIANGLE_ARROW',
	DiamondFilled = 'DIAMOND_FILLED',
	CircleFilled = 'CIRCLE_FILLED',
	TriangleFilled = 'TRIANGLE_FILLED',
	WashiTape1 = 'WASHI_TAPE_1',
	WashiTape2 = 'WASHI_TAPE_2',
	WashiTape3 = 'WASHI_TAPE_3',
	WashiTape4 = 'WASHI_TAPE_4',
	WashiTape5 = 'WASHI_TAPE_5',
	WashiTape6 = 'WASHI_TAPE_6'
}

type ConnectorNodeAbsoluteRenderBounds = Rectangle | null;

interface ConnectorNode extends Node {
	absoluteBoundingBox: Rectangle;
	absoluteRenderBounds: ConnectorNodeAbsoluteRenderBounds;
	backgroundColor: Color;
	blendMode: BlendMode;
	characters: string;
	connectorStart: ConnectorEndpoint;
	connectorEnd: ConnectorEndpoint;
	connectorStartStrokeCap: string;
	connectorEndStrokeCap: string;
	connectorLineType: ConnectorLineType;
	cornerRadius: number;
	rectangleCornerRadii: number[];
	cornerSmoothing: number;
	effects: Effect[];
	exportSettings: ExportSetting[];
	fills: Paint[];
	isMask: boolean;
	locked: boolean;
	opacity: number;
	strokes: Paint[];
	strokeWeight: number;
	strokeCap: ConnectorNodeStrokeCap;
	strokeJoin: string;
	strokeDashes: number[];
	strokeAlign: ConnectorNodeStrokeAlign;
	textBackground: ConnectorTextBackground;
	relativeTransform: Array<Array<number>>;
	styles: Map<StyleType, string>;
}

type WashiTapeNode = VectorNode;

export {
	Node,
	DocumentNode,
	CanvasNode,
	FrameNode,
	FrameNodeStrokeAlign,
	FrameNodeLayoutAlign,
	FrameNodeAbsoluteRenderBounds,
	FrameNodeMinWidth,
	FrameNodeMaxWidth,
	FrameNodeMinHeight,
	FrameNodeMaxHeight,
	FrameNodeLayoutMode,
	FrameNodeLayoutSizingHorizontal,
	FrameNodeLayoutSizingVertical,
	FrameNodeLayoutWrap,
	FrameNodePrimaryAxisSizingMode,
	FrameNodeCounterAxisSizingMode,
	FrameNodePrimaryAxisAlignItems,
	FrameNodeCounterAxisAlignItems,
	FrameNodeCounterAxisAlignContent,
	FrameNodeOverflowDirection,
	FrameNodeMaskType,
	FrameNodeDevStatus,
	GroupNode,
	SectionNode,
	SectionNodeDevStatus,
	SectionNodeStrokeAlign,
	SectionNodeAbsoluteRenderBounds,
	VectorNode,
	VectorNodeLayoutAlign,
	VectorNodeAbsoluteRenderBounds,
	VectorNodeStrokeCap,
	VectorNodeStrokeAlign,
	BooleanOperationNode,
	StarNode,
	LineNode,
	EllipseNode,
	RegularPolygonNode,
	RectangleNode,
	TableNode,
	TableNodeAbsoluteRenderBounds,
	TableNodeStrokeAlign,
	TableCellNode,
	TableCellNodeAbsoluteRenderBounds,
	TextNode,
	TextNodeLineTypes,
	SliceNode,
	SliceNodeAbsoluteRenderBounds,
	ComponentNode,
	ComponentSetNode,
	InstanceNode,
	StickyNode,
	StickyNodeAbsoluteRenderBounds,
	ShapeWithTextNode,
	ShapeWithTextNodeAbsoluteRenderBounds,
	ShapeWithTextNodeStrokeCap,
	ShapeWithTextNodeStrokeAlign,
	ConnectorNode,
	ConnectorNodeAbsoluteRenderBounds,
	ConnectorNodeStrokeCap,
	ConnectorNodeStrokeAlign,
	WashiTapeNode,
};