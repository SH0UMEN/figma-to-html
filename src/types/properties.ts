interface Color {
	r: number;
	g: number;
	b: number;
	a: number;
}

interface RGBColor {
	r: number;
	g: number;
	b: number;
}

enum ExportSettingFormat {
	Jpg = 'JPG',
	Png = 'PNG',
	Svg = 'SVG'
}

interface ExportSetting {
	suffix: string;
	format: ExportSettingFormat;
	constraint: Constraint;
}

enum ConstraintType {
	Scale = 'SCALE',
	Width = 'WIDTH',
	Height = 'HEIGHT'
}

interface Constraint {
	type: ConstraintType;
	value: number;
}

interface Rectangle {
	x: number;
	y: number;
	width: number;
	height: number;
}

interface ArcData {
	startingAngle: number;
	endingAngle: number;
	innerRadius: number;
}

type BlendMode = 'PASS_THROUGH' | 'NORMAL' | 'DARKEN' | 'MULTIPLY' | 'LINEAR_BURN' | 'COLOR_BURN' | 'LIGHTEN' | 'SCREEN' | 'LINEAR_DODGE' | 'COLOR_DODGE' | 'OVERLAY' | 'SOFT_LIGHT' | 'HARD_LIGHT' | 'DIFFERENCE' | 'EXCLUSION' | 'HUE' | 'SATURATION' | 'COLOR' | 'LUMINOSITY';

type MaskType = 'ALPHA' | 'VECTOR' | 'LUMINANCE';

type EasingType = 'EASE_IN' | 'EASE_OUT' | 'EASE_IN_AND_OUT' | 'LINEAR' | 'GENTLE_SPRING';

interface FlowStartingPoint {
	nodeId: string;
	name: string;
}

enum LayoutConstraintHorizontal {
	Left = 'LEFT',
	Right = 'RIGHT',
	Center = 'CENTER',
	LeftRight = 'LEFT_RIGHT',
	Scale = 'SCALE'
}

enum LayoutConstraintVertical {
	Top = 'TOP',
	Bottom = 'BOTTOM',
	Center = 'CENTER',
	TopBottom = 'TOP_BOTTOM',
	Scale = 'SCALE'
}

interface LayoutConstraint {
	vertical: LayoutConstraintVertical;
	horizontal: LayoutConstraintHorizontal;
}

enum LayoutGridAlignment {
	Min = 'MIN',
	Stretch = 'STRETCH',
	Center = 'CENTER'
}

enum LayoutGridPattern {
	Columns = 'COLUMNS',
	Rows = 'ROWS',
	Grid = 'GRID'
}

interface LayoutGrid {
	pattern: LayoutGridPattern;
	sectionSize: number;
	visible: boolean;
	color: Color;
	alignment: LayoutGridAlignment;
	gutterSize: number;
	offset: number;
	count: number;
	boundVariables: Map<string, VariableAlias>;
}

enum EffectType {
	InnerShadow = 'INNER_SHADOW',
	DropShadow = 'DROP_SHADOW',
	LayerBlur = 'LAYER_BLUR',
	BackgroundBlur = 'BACKGROUND_BLUR'
}

interface Effect {
	type: EffectType;
	visible: boolean;
	radius: number;
	color: Color;
	blendMode: BlendMode;
	offset: Vector;
	spread: number;
	showShadowBehindNode: boolean;
	boundVariables: Map<string, VariableAlias>;
}

enum HyperlinkType {
	Url = 'URL',
	Node = 'NODE'
}

interface Hyperlink {
	type: HyperlinkType;
	url: string;
	nodeID: string;
}

interface DocumentationLink {
	uri: string;
}

enum PaintScaleMode {
	Fill = 'FILL',
	Fit = 'FIT',
	Tile = 'TILE',
	Stretch = 'STRETCH'
}

enum PaintType {
	Solid = 'SOLID',
	GradientLinear = 'GRADIENT_LINEAR',
	GradientRadial = 'GRADIENT_RADIAL',
	GradientAngular = 'GRADIENT_ANGULAR',
	GradientDiamond = 'GRADIENT_DIAMOND',
	Image = 'IMAGE',
	Emoji = 'EMOJI',
	Video = 'VIDEO'
}

interface Paint {
	type: PaintType;
	visible: boolean;
	opacity: number;
	color: Color;
	blendMode: BlendMode;
	gradientHandlePositions: Vector[];
	gradientStops: ColorStop[];
	scaleMode: PaintScaleMode;
	imageTransform: 'STRETCH';
	scalingFactor: 'TILE';
	rotation: number;
	imageRef: string;
	filters: ImageFilters;
	gifRef: string;
	boundVariables: Map<string, VariableAlias>;
}

interface Path {
	path: string;
	windingRule: string;
	overrideID: number;
}

interface Vector {
	x: number;
	y: number;
}

interface Size {
	width: number;
	height: number;
}

interface ImageFilters {
	exposure: number;
	contrast: number;
	saturation: number;
	temperature: number;
	tint: number;
	highlights: number;
	shadows: number;
}

interface ColorStop {
	position: number;
	color: Color;
	boundVariables: Map<string, VariableAlias>;
}

interface PaintOverride {
	fills: Paint[];
	inheritFillStyleId: string;
}

enum TypeStyleSemanticItalic {
	Italic = 'ITALIC',
	Normal = 'NORMAL'
}

enum TypeStyleSemanticWeight {
	Bold = 'BOLD',
	Normal = 'NORMAL'
}

enum TypeStyleLineHeightUnit {
	Pixels = 'PIXELS',
	FontSize = 'FONT_SIZE_%',
	Intrinsic = 'INTRINSIC_%'
}

enum TypeStyleTextAlignVertical {
	Top = 'TOP',
	Center = 'CENTER',
	Bottom = 'BOTTOM'
}

enum TypeStyleTextAlignHorizontal {
	Left = 'LEFT',
	Right = 'RIGHT',
	Center = 'CENTER',
	Justified = 'JUSTIFIED'
}

enum TypeStyleTextTruncation {
	Disabled = 'DISABLED',
	Ending = 'ENDING'
}

enum TypeStyleTextAutoResize {
	Height = 'HEIGHT',
	WidthAndHeight = 'WIDTH_AND_HEIGHT',
	Truncate = 'TRUNCATE'
}

enum TypeStyleTextDecoration {
	Strikethrough = 'STRIKETHROUGH',
	Underline = 'UNDERLINE'
}

enum TypeStyleTextCase {
	Upper = 'UPPER',
	Lower = 'LOWER',
	Title = 'TITLE',
	SmallCaps = 'SMALL_CAPS',
	SmallCapsForced = 'SMALL_CAPS_FORCED'
}

interface TypeStyle {
	fontFamily: string;
	fontPostScriptName: string;
	paragraphSpacing: number;
	paragraphIndent: number;
	listSpacing: number;
	italic: boolean;
	fontWeight: number;
	fontSize: number;
	textCase: TypeStyleTextCase;
	textDecoration: TypeStyleTextDecoration;
	textAutoResize: TypeStyleTextAutoResize;
	textTruncation: TypeStyleTextTruncation;
	maxLines: number;
	textAlignHorizontal: TypeStyleTextAlignHorizontal;
	textAlignVertical: TypeStyleTextAlignVertical;
	letterSpacing: number;
	fills: Paint[];
	hyperlink: Hyperlink;
	opentypeFlags: Map<string, number>;
	lineHeightPx: number;
	lineHeightPercent: number;
	lineHeightPercentFontSize: number;
	lineHeightUnit: TypeStyleLineHeightUnit;
	isOverrideOverTextStyle: boolean;
	semanticWeight: TypeStyleSemanticWeight;
	semanticItalic: TypeStyleSemanticItalic;
}

interface Component {
	key: string;
	name: string;
	description: string;
	componentSetId?: string;
	documentationLinks: DocumentationLink[];
	remote: boolean;
}

interface ComponentSet {
	key: string;
	name: string;
	description: string;
	documentationLinks: DocumentationLink[];
	remote: boolean;
}

enum StyleType {
	Fill = 'FILL',
	Text = 'TEXT',
	Effect = 'EFFECT',
	Grid = 'GRID'
}

interface Style {
	key: string;
	name: string;
	description: string;
	remote: boolean;
	styleType: StyleType;
}

interface ShapeType {
	SQUARE: string;
	ELLIPSE: string;
	ROUNDED_RECTANGLE: string;
	DIAMOND: string;
	TRIANGLE_DOWN: string;
	PARALLELOGRAM_RIGHT: string;
	PARALLELOGRAM_LEFT: string;
	ENG_DATABASE: string;
	ENG_QUEUE: string;
	ENG_FILE: string;
	ENG_FOLDER: string;
	TRAPEZOID: string;
	PREDEFINED_PROCESS: string;
	SHIELD: string;
	DOCUMENT_SINGLE: string;
	DOCUMENT_MULTIPLE: string;
	MANUAL_INPUT: string;
	HEXAGON: string;
	CHEVRON: string;
	PENTAGON: string;
	OCTAGON: string;
	STAR: string;
	PLUS: string;
	ARROW_LEFT: string;
	ARROW_RIGHT: string;
	SUMMING_JUNCTION: string;
	OR: string;
	SPEECH_BUBBLE: string;
	INTERNAL_STORAGE: string;
}

enum ConnectorEndpointMagnet {
	Auto = 'AUTO',
	Top = 'TOP',
	Bottom = 'BOTTOM',
	Left = 'LEFT',
	Right = 'RIGHT'
}

interface ConnectorEndpoint {
	endpointNodeId: string;
	position: Vector;
	magnet: ConnectorEndpointMagnet;
}

interface ConnectorLineType {
	ELBOWED: string;
	STRAIGHT: string;
}

interface ConnectorTextBackground {
	cornerRadius: number;
	fills: Paint[];
}

type ComponentPropertyDefinitionDefaultValue = boolean | string;

interface ComponentPropertyDefinition {
	type: ComponentPropertyType;
	defaultValue: ComponentPropertyDefinitionDefaultValue;
	variantOptions?: string[];
	preferredValues?: InstanceSwapPreferredValue[];
}

type ComponentPropertyValue = boolean | string;

interface ComponentProperty {
	type: ComponentPropertyType;
	value: ComponentPropertyValue;
	preferredValues?: InstanceSwapPreferredValue[];
	boundVariables: Map<string, VariableAlias>;
}

interface ComponentPropertyType {
	BOOLEAN: string;
	INSTANCE_SWAP: string;
	TEXT: string;
	VARIANT: string;
}

enum InstanceSwapPreferredValueType {
	Component = 'COMPONENT',
	ComponentSet = 'COMPONENT_SET'
}

interface InstanceSwapPreferredValue {
	type: InstanceSwapPreferredValueType;
	key: string;
}

enum PrototypeDeviceRotation {
	None = 'NONE',
	Ccw90 = 'CCW_90'
}

enum PrototypeDeviceType {
	None = 'NONE',
	Preset = 'PRESET',
	Custom = 'CUSTOM',
	Presentation = 'PRESENTATION'
}

interface PrototypeDevice {
	type: PrototypeDeviceType;
	size: Size;
	presetIdentifier: string;
	rotation: PrototypeDeviceRotation;
}

interface Annotation {
	label: string;
	properties: AnnotationProperty[];
}

enum AnnotationPropertyType {
	Width = 'width',
	Height = 'height',
	MaxWidth = 'maxWidth',
	MinWidth = 'minWidth',
	MaxHeight = 'maxHeight',
	MinHeight = 'minHeight',
	Fills = 'fills',
	Strokes = 'strokes',
	Effects = 'effects',
	StrokeWeight = 'strokeWeight',
	CornerRadius = 'cornerRadius',
	TextStyleId = 'textStyleId',
	TextAlignHorizontal = 'textAlignHorizontal',
	FontFamily = 'fontFamily',
	FontStyle = 'fontStyle',
	FontSize = 'fontSize',
	FontWeight = 'fontWeight',
	LineHeight = 'lineHeight',
	LetterSpacing = 'letterSpacing',
	ItemSpacing = 'itemSpacing',
	Padding = 'padding',
	LayoutMode = 'layoutMode',
	AlignItems = 'alignItems',
	Opacity = 'opacity',
	MainComponent = 'mainComponent'
}

interface AnnotationProperty {
	type: AnnotationPropertyType;
}

type MeasurementOffset = MeasurementOffsetInner | MeasurementOffsetOuter;

interface Measurement {
	id: string;
	start: MeasurementStartEnd;
	end: MeasurementStartEnd;
	offset: MeasurementOffset;
	freeText: string;
}

enum MeasurementStartEndSide {
	Top = 'TOP',
	Right = 'RIGHT',
	Bottom = 'BOTTOM',
	Left = 'LEFT'
}

interface MeasurementStartEnd {
	nodeId: string;
	side: MeasurementStartEndSide;
}

interface MeasurementOffsetInner {
	type: 'INNER';
	relative: number;
}

interface MeasurementOffsetOuter {
	type: 'OUTER';
	fixed: number;
}

interface StrokeWeights {
	top: number;
	right: number;
	bottom: number;
	left: number;
}

interface Overrides {
	id: string;
	overriddenFields: string[];
}

interface VariableAlias {
	type: 'VARIABLE_ALIAS';
	id: string;
}

enum DevStatusType {
	ReadyForDev = 'READY_FOR_DEV',
	Completed = 'COMPLETED'
}

interface DevStatus {
	type: DevStatusType;
	description: string;
}

type InteractionTrigger = Trigger | null;

interface Interaction {
	trigger: InteractionTrigger;
	actions: Action[];
}

enum TriggerDevice {
	Keyboard = 'KEYBOARD',
	XboxOne = 'XBOX_ONE',
	Ps4 = 'PS4',
	SwitchPro = 'SWITCH_PRO',
	UnknownController = 'UNKNOWN_CONTROLLER'
}

enum TriggerType {
	OnClick = 'ON_CLICK',
	OnHover = 'ON_HOVER',
	OnPress = 'ON_PRESS',
	OnDrag = 'ON_DRAG',
	AfterTimeout = 'AFTER_TIMEOUT',
	MouseEnter = 'MOUSE_ENTER',
	MouseLeave = 'MOUSE_LEAVE',
	MouseUp = 'MOUSE_UP',
	MouseDown = 'MOUSE_DOWN',
	OnMediaEnd = 'ON_MEDIA_END',
	OnKeyDown = 'ON_KEY_DOWN',
	OnKeyUp = 'ON_KEY_UP',
	OnMediaHit = 'ON_MEDIA_HIT'
}

interface Trigger {
	type: TriggerType;
	timeout: number;
	delay: number;
	deprecatedVersion: boolean;
	device: TriggerDevice;
	keyCodes: number[];
	mediaHitTime: number;
}

type Action = BackAction | CloseAction | OpenURLAction | UpdateMediaRuntimeAction | SetVariableAction | SetVariableModeAction | ConditionalAction | NodeAction;

interface BackAction {
	type: 'BACK';
}

interface CloseAction {
	type: 'CLOSE';
}

interface OpenURLAction {
	type: 'URL';
	url: string;
}

enum UpdateMediaRuntimeActionMediaAction {
	Play = 'PLAY',
	Pause = 'PAUSE',
	TogglePlayPause = 'TOGGLE_PLAY_PAUSE',
	Mute = 'MUTE',
	Unmute = 'UNMUTE',
	ToggleMuteUnmute = 'TOGGLE_MUTE_UNMUTE',
	SkipForward = 'SKIP_FORWARD',
	SkipBackward = 'SKIP_BACKWARD',
	SkipTo = 'SKIP_TO'
}

type UpdateMediaRuntimeActionDestinationId = string | null;

interface UpdateMediaRuntimeAction {
	type: 'UPDATE_MEDIA_RUNTIME';
	destinationId: UpdateMediaRuntimeActionDestinationId;
	mediaAction: UpdateMediaRuntimeActionMediaAction;
	amountToSkip: number;
	newTimestamp: number;
}

type NodeActionTransition = SimpleTransition | DirectionalTransition | null;

type NodeActionDestinationId = string | null;

interface NodeAction {
	type: 'NODE';
	destinationId: NodeActionDestinationId;
	navigation: Navigation;
	transition: NodeActionTransition;
	preserveScrollPosition: boolean;
	overlayRelativePosition: Vector;
	resetVideoPosition: boolean;
	resetScrollPosition: boolean;
	resetInteractiveComponents: boolean;
}

enum NavigationType {
	Navigate = 'NAVIGATE',
	Swap = 'SWAP',
	Overlay = 'OVERLAY',
	ScrollTo = 'SCROLL_TO',
	ChangeTo = 'CHANGE_TO'
}

interface Navigation {
	type: NavigationType;
}

enum SimpleTransitionType {
	Dissolve = 'DISSOLVE',
	SmartAnimate = 'SMART_ANIMATE',
	ScrollAnimate = 'SCROLL_ANIMATE'
}

interface SimpleTransition {
	type: SimpleTransitionType;
	duration: number;
	easing: Easing;
}

enum DirectionalTransitionDirection {
	Left = 'LEFT',
	Right = 'RIGHT',
	Top = 'TOP',
	Bottom = 'BOTTOM'
}

enum DirectionalTransitionType {
	MoveIn = 'MOVE_IN',
	MoveOut = 'MOVE_OUT',
	Push = 'PUSH',
	SlideIn = 'SLIDE_IN',
	SlideOut = 'SLIDE_OUT'
}

interface DirectionalTransition {
	type: DirectionalTransitionType;
	direction: DirectionalTransitionDirection;
	duration: number;
	easing: Easing;
	matchLayers: boolean;
}

interface Easing {
	type: EasingType;
	easingFunctionCubicBezier: EasingFunctionCubicBezier;
	easingFunctionSpring: EasingFunctionSpring;
}

interface EasingFunctionCubicBezier {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}

interface EasingFunctionSpring {
	mass: number;
	stiffness: number;
	damping: number;
}

type SetVariableActionVariableId = string | null;

interface SetVariableAction {
	type: 'SET_VARIABLE';
	variableId: SetVariableActionVariableId;
	variableValue: VariableData;
}

type SetVariableModeActionVariableModeId = string | null;

type SetVariableModeActionVariableCollectionId = string | null;

interface SetVariableModeAction {
	type: 'SET_VARIABLE_MODE';
	variableCollectionId: SetVariableModeActionVariableCollectionId;
	variableModeId: SetVariableModeActionVariableModeId;
}

interface ConditionalAction {
	type: 'CONDITIONAL';
	conditionalBlocks: ConditionalBlock[];
}

type VariableDataValue = boolean | number | string | Color | RGBColor | VariableAlias | Expression;

interface VariableData {
	type: VariableDataType;
	resolvedType: VariableResolvedDataType;
	value: VariableDataValue;
}

enum VariableDataTypeType {
	Boolean = 'BOOLEAN',
	Float = 'FLOAT',
	String = 'STRING',
	Color = 'COLOR',
	VariableAlias = 'VARIABLE_ALIAS',
	Expression = 'EXPRESSION'
}

interface VariableDataType {
	type: VariableDataTypeType;
}

enum VariableResolvedDataTypeType {
	Boolean = 'BOOLEAN',
	Float = 'FLOAT',
	String = 'STRING',
	Color = 'COLOR'
}

interface VariableResolvedDataType {
	type: VariableResolvedDataTypeType;
}

interface Expression {
	expressionFunction: ExpressionFunction;
	expressionArguments: VariableData[];
}

enum ExpressionFunctionType {
	Addition = 'ADDITION',
	Subtraction = 'SUBTRACTION',
	Multiplication = 'MULTIPLICATION',
	Division = 'DIVISION',
	Equals = 'EQUALS',
	NotEqual = 'NOT_EQUAL',
	LessThan = 'LESS_THAN',
	LessThanOrEqual = 'LESS_THAN_OR_EQUAL',
	GreaterThan = 'GREATER_THAN',
	GreaterThanOrEqual = 'GREATER_THAN_OR_EQUAL',
	And = 'AND',
	Or = 'OR',
	VarModeLookup = 'VAR_MODE_LOOKUP',
	Negate = 'NEGATE',
	Not = 'NOT'
}

interface ExpressionFunction {
	type: ExpressionFunctionType;
}

interface ConditionalBlock {
	condition: VariableData;
	actions: Action[];
}

export {
	Color,
	RGBColor,
	ExportSetting,
	ExportSettingFormat,
	Constraint,
	ConstraintType,
	Rectangle,
	ArcData,
	BlendMode,
	MaskType,
	EasingType,
	FlowStartingPoint,
	LayoutConstraint,
	LayoutConstraintVertical,
	LayoutConstraintHorizontal,
	LayoutGrid,
	LayoutGridPattern,
	LayoutGridAlignment,
	Effect,
	EffectType,
	Hyperlink,
	HyperlinkType,
	DocumentationLink,
	Paint,
	PaintType,
	PaintScaleMode,
	Path,
	Vector,
	Size,
	ImageFilters,
	ColorStop,
	PaintOverride,
	TypeStyle,
	TypeStyleTextCase,
	TypeStyleTextDecoration,
	TypeStyleTextAutoResize,
	TypeStyleTextTruncation,
	TypeStyleTextAlignHorizontal,
	TypeStyleTextAlignVertical,
	TypeStyleLineHeightUnit,
	TypeStyleSemanticWeight,
	TypeStyleSemanticItalic,
	Component,
	ComponentSet,
	Style,
	StyleType,
	ShapeType,
	ConnectorEndpoint,
	ConnectorEndpointMagnet,
	ConnectorLineType,
	ConnectorTextBackground,
	ComponentPropertyDefinition,
	ComponentPropertyDefinitionDefaultValue,
	ComponentProperty,
	ComponentPropertyValue,
	ComponentPropertyType,
	InstanceSwapPreferredValue,
	InstanceSwapPreferredValueType,
	PrototypeDevice,
	PrototypeDeviceType,
	PrototypeDeviceRotation,
	Annotation,
	AnnotationProperty,
	AnnotationPropertyType,
	Measurement,
	MeasurementOffset,
	MeasurementStartEnd,
	MeasurementStartEndSide,
	MeasurementOffsetInner,
	MeasurementOffsetOuter,
	StrokeWeights,
	Overrides,
	VariableAlias,
	DevStatus,
	DevStatusType,
	Interaction,
	InteractionTrigger,
	Trigger,
	TriggerType,
	TriggerDevice,
	Action,
	BackAction,
	CloseAction,
	OpenURLAction,
	UpdateMediaRuntimeAction,
	UpdateMediaRuntimeActionDestinationId,
	UpdateMediaRuntimeActionMediaAction,
	NodeAction,
	NodeActionDestinationId,
	NodeActionTransition,
	Navigation,
	NavigationType,
	SimpleTransition,
	SimpleTransitionType,
	DirectionalTransition,
	DirectionalTransitionType,
	DirectionalTransitionDirection,
	Easing,
	EasingFunctionCubicBezier,
	EasingFunctionSpring,
	SetVariableAction,
	SetVariableActionVariableId,
	SetVariableModeAction,
	SetVariableModeActionVariableCollectionId,
	SetVariableModeActionVariableModeId,
	ConditionalAction,
	VariableData,
	VariableDataValue,
	VariableDataType,
	VariableDataTypeType,
	VariableResolvedDataType,
	VariableResolvedDataTypeType,
	Expression,
	ExpressionFunction,
	ExpressionFunctionType,
	ConditionalBlock,
};