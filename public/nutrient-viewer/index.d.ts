

/**
 * This class should be used to create custom Immutable Record. It will overwrite the default
 * `Immutable#equals()` method to include the class name. if we don't do this, two different classes
 * with the same default value set will be treated as equal.
 *
 * @example
 *   // With regular `Immutable.Record`
 *   class A extends Record({ foo: 'bar' }) {}
 *   class B extends Record({ foo: 'bar' }) {}
 *   const a = new A()
 *   const b = new B()
 *   is(a, b) // true
 *
 *   // With `InheritableImmutableRecord`
 *   class A extends InheritableImmutableRecord {
 *     static defaultValues = { foo: 'bar' }
 *   }
 *   mergeImmutableRecordDefaults(A)
 *   class B extends InheritableImmutableRecord {
 *     static defaultValues = { foo: 'bar' }
 *   }
 *   mergeImmutableRecordDefaults(B)
 *   const a = new A()
 *   const b = new B()
 *   is(a, b) // false
 */
declare class __dangerousImmutableRecordFactory<TProps extends Record<string, unknown>> {
  has(key: unknown): boolean;
  get<K extends keyof TProps>(key: K): TProps[K];
  set<K extends keyof TProps>(key: K, value: TProps[K]): this;
  delete<K extends keyof TProps>(key: K): this;
  clear(): this;
  update<K extends keyof TProps>(key: K, updater: (value: TProps[K]) => TProps[K]): this;
  merge(...collections: Array<Partial<TProps>>): this;
  mergeWith(merger: (previous?: unknown, next?: unknown, key?: string) => unknown, ...collections: Array<Partial<TProps> | Iterable<[string, unknown]>>): this;
  mergeDeep(...collections: Array<Partial<TProps> | Iterable<[string, unknown]>>): this;
  mergeDeepWith(merger: (previous?: unknown, next?: unknown, key?: string) => unknown, ...collections: Array<Partial<TProps> | Iterable<[string, unknown]>>): this;
  setIn(keyPath: Iterable<unknown>, value: unknown): this;
  deleteIn(keyPath: Iterable<unknown>): this;
  removeIn(keyPath: Iterable<unknown>): this;
  updateIn(keyPath: Iterable<unknown>, notSetValue: unknown, updater: (value: unknown) => unknown): this;
  updateIn(keyPath: Iterable<unknown>, updater: (value: unknown) => unknown): this;
  mergeIn(keyPath: Iterable<unknown>, ...collections: Array<Partial<TProps> | Iterable<[string, unknown]>>): this;
  mergeDeepIn(keyPath: Iterable<unknown>, ...collections: Array<Partial<TProps> | Iterable<[string, unknown]>>): this;
  withMutations(mutator: (mutable: this) => unknown): this;
  asMutable(): this;
  asImmutable(): this;
  getIn(keyPath: Iterable<unknown>, notSetValue?: unknown): unknown;
  toJS(): TProps;
  toJSON(): TProps;
  equals(other: unknown): boolean;
  toSeq(): Seq.Keyed<string, unknown>;
}

/**
 * @class
 * Base action type from which all Actions inherit. You can not instantiate from this type.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record | Immutable.Record}.
 * @summary Base action type from which all Actions inherit.
 */
export declare abstract class Action extends InheritableImmutableRecord<ActionProperties> {
  /**
   * Actions can be chained by adding them to this immutable List.
   */
  subActions?: Immutable.List<Action> | null | undefined;
  protected constructor(args?: ActionProperties);
}

declare type ActionCreators = typeof textComparisonActionCreators;

declare type ActionFlags = 'includeExclude' | 'includeNoValueFields' | 'exportFormat' | 'getMethod' | 'submitCoordinated' | 'xfdf' | 'includeAppendSaves' | 'includeAnnotations' | 'submitPDF' | 'canonicalFormat' | 'excludeNonUserAnnotations' | 'excludeFKey' | 'embedForm';

/** @inline */
declare type ActionProperties = {
  subActions?: Immutable.List<Action> | null;
};

export declare namespace Actions {
  export {
    Action,
    GoToAction,
    GoToEmbeddedAction,
    GoToRemoteAction,
    HideAction,
    JavaScriptAction,
    LaunchAction,
    NamedAction,
    ResetFormAction,
    SubmitFormAction,
    URIAction };

}

declare type ActionTriggerEventType = 'onPointerEnter' | 'onPointerLeave' | 'onPointerDown' | 'onPointerUp' | 'onPageOpen' | 'onPageClose' | 'onPageVisible' | 'onPageHidden';

declare interface AddPageConfiguration {
  backgroundColor: Color;
  pageWidth: number;
  pageHeight: number;
  rotateBy: Rotation;
  insets?: Rect;
}

/**
 * Payload for sending changes to AI services
 *
 * @public
 */
declare interface AIADocumentChangePayload {
  id: string;
  type: string;
  text: string;
  contextBefore: string;
  contextAfter: string;
  page: number;
}

/**
 * Base response item from AI services representing a single document change.
 * Contains the essential information about a text modification detected during comparison.
 *
 * @example
 * // Typical structure of a change item
 * {
 *   id: "change-456",
 *   type: "deletion",
 *   text: "old contract terms",
 *   page: 1,
 *   contextBefore: "The following ",
 *   contextAfter: " are no longer valid"
 * }
 */
export declare interface AIADocumentChangeResponseItem {
  /** Unique identifier for this change, used for tracking and correlation */
  id: string;
  /** Type of change operation (e.g., "insertion", "deletion", "modification") */
  type: string;
  /** The actual text content that was changed */
  text: string;
  /** Zero-based page number where this change occurred */
  page: number;
  /** Text content appearing before the change for context. */
  contextBefore?: string;
  /** Text content appearing after the change for context. */
  contextAfter?: string;
}

/**
 * Response from AI analysis service containing a high-level summary and categorization
 * of document changes. This is returned when using `NutrientViewer.AIComparisonOperationType.ANALYZE`.
 *
 * @example
 * // After running an ANALYZE operation
 * if (NutrientViewer.isAIDocumentAnalysisResult(result)) {
 *   console.log(`Summary: ${result.summary}`);
 *   // Example: "The document has undergone significant legal revisions with updated terminology and new clauses."
 *
 *   console.log(`Categories: ${result.categories.join(', ')}`);
 *   // Example: ["Legal Changes", "Terminology Updates", "Content Addition"]
 *
 *   // Access detailed changes
 *   console.log(`Total changes: ${result.changes.changes.size}`);
 * }
 */
export declare interface AIADocumentChangesAnalysisResponse {
  /** AI-generated natural language summary describing the overall nature of changes between the compared documents */
  summary: string;
  /** Array of AI-detected change categories representing the types of modifications (e.g., "Formatting", "Content Addition", "Legal Changes", "Rewording") */
  categories: string[];
  /** The underlying standard document comparison result containing detailed text hunks and change operations */
  changes: DocumentComparison.DocumentComparisonResult;
}

/**
 * Response from AI tagging service containing categorized change information.
 * This is returned when using `NutrientViewer.AIComparisonOperationType.TAG`.
 *
 * @example
 * // After running a TAG operation
 * if (NutrientViewer.isAIDocumentTaggingResult(result)) {
 *   result.references.forEach((ref, index) => {
 *     console.log(`Change ${index + 1}: ${ref.text}`);
 *     console.log(`Categories: ${ref.tag.join(', ')}`);
 *     console.log(`Page: ${ref.page}`);
 *   });
 * }
 */
export declare interface AIADocumentChangesTaggingResponse {
  /**
   * Array where each
   *   item corresponds to a specific change and includes category tags assigned by the AI service.
   *   Each reference contains the change details plus an array of category strings that classify
   *   the type of modification (e.g., ["Legal", "Formatting"] for a legal change with formatting updates).
   * */
  references: AIADocumentChangeTaggingItem[];
}

/**
 * Individual change item with AI-assigned category tags from the tagging service.
 * Extends the base response item with categorization information.
 *
 * @example
 * // Typical structure of a tagged change
 * {
 *   id: "change-123",
 *   type: "insertion",
 *   text: "confidential information",
 *   page: 2,
 *   contextBefore: "regarding the ",
 *   contextAfter: " shall not be disclosed",
 *   tag: ["Legal", "Confidentiality"]
 * }
 */
export declare interface AIADocumentChangeTaggingItem extends AIADocumentChangeResponseItem {
  /** Array of category strings assigned by AI to classify this change. */
  tag: string[];
}

/**
 * Configuration for the AI Assistant.
 *
 * @example
 * ```js
 * {
 *     sessionId: 'session-id',
 *     jwt: 'xxx.xxx.xxx'
 *     backendUrl: 'https://localhost:4000',
 * }
 * ```
 */
export declare type AIAssistantConfiguration = {
  /** The session to reopen, or an ID for the new session to create. This ID should be unique for each session and should use alphanumeric characters only. */
  sessionId: string;
  /** The JWT token to authenticate the user. */
  jwt: string;
  /** The URL that hosts AI Assistant service. e.g. `https://localhost:4000`. */
  backendUrl: string;
  /** An optional user ID for the current user. This ID should be unique for each user and should use alphanumeric characters only. */
  userId?: string;
};

declare function AIAssistantMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {

  };
} & T;

/**
 * Data structure for AI comparison results
 */
export declare interface AIComparisonData {
  /** AI-generated summary of document changes */
  summary: string;
  /** Array of AI-detected change categories */
  categories: string[];
  /** Standard document comparison result */
  changes: DocumentComparison.DocumentComparisonResult;
  /** Current phase of the AI comparison process */
  phase: IAIComparisonPhase;
  /** Error information if comparison failed */
  error: AIComparisonError | null;
  /** Changes tagged with categories (optional) */
  taggedChanges?: AIADocumentChangeTaggingItem[];
  /** Transformed changes for AI processing (optional) */
  transformedChanges?: AIADocumentChangePayload[];
  /** Enhanced changes with AI properties (optional) */
  aiEnhancedChanges?: List<AIEnhancedTextComparisonChange>;
}

/**
 * Error information for AI comparison
 */
export declare interface AIComparisonError {
  /** The phase where the error occurred ('ANALYSIS' | 'TAGGING') */
  phase: 'ANALYSIS' | 'TAGGING';
  /** Human-readable error message */
  message: string;
  /** Additional error details (optional) */
  details?: unknown;
}

/**
 * Describes types of AI operations for document comparison.
 * These operations can be used with ComparisonOperationType.AI.
 *
 * @enum
 */
declare const AIComparisonOperationType: {
  /** Analyze and summarize differences between documents. */
  readonly ANALYZE: "analyze";
  /** Tag changes with specified categories. */
  readonly TAG: "tag";
};

/**
 * Phases of the AI comparison process
 */
declare enum AIComparisonPhase {
  /** Initial state before comparison starts */
  IDLE = "IDLE",
  /** Loading documents or initializing */
  LOADING = "LOADING",
  /** AI is analyzing document differences */
  ANALYZING = "ANALYZING",
  /** AI is tagging changes with categories */
  TAGGING = "TAGGING",
  /** Comparison process completed successfully */
  COMPLETED = "COMPLETED",
  /** Error occurred during comparison */
  ERROR = "ERROR",
}

/**
 * Result returned by AI-powered document comparison operations. This union type represents
 * the response from {@link NutrientViewer.Instance#compareDocuments} when using
 * {@link NutrientViewer.ComparisonOperationType}.AI.
 *
 * The result type depends on the AI operation performed:
 *
 * - **Analysis Operation** (`NutrientViewer.AIComparisonOperationType.ANALYZE`):
 * Returns {@link AIADocumentChangesAnalysisResponse} containing:
 * - `summary`: AI-generated summary describing the overall nature of changes
 * - `categories`: Array of AI-detected change types (e.g., "Formatting", "Content Addition")
 * - `changes`: Standard {@link DocumentComparison.DocumentComparisonResult} with detailed differences
 *
 * - **Tagging Operation** (`NutrientViewer.AIComparisonOperationType.TAG`):
 * Returns {@link AIADocumentChangesTaggingResponse} containing:
 * - `references`: Array where each item corresponds to a change with assigned category tags
 * - `changes`: Standard {@link DocumentComparison.DocumentComparisonResult} with detailed differences
 *
 * Use the provided type guards to determine which specific result type you received:
 * - {@link NutrientViewer.isAIDocumentAnalysisResult} - Check for analysis results
 * - {@link NutrientViewer.isAIDocumentTaggingResult} - Check for tagging results
 * - {@link NutrientViewer.isAIDocumentComparisonResult} - Check for any AI result
 *
 * @example
 * const analyzeOperation = new NutrientViewer.ComparisonOperation(
 *   NutrientViewer.ComparisonOperationType.AI,
 *   { operationType: NutrientViewer.AIComparisonOperationType.ANALYZE }
 * );
 *
 * instance.compareDocuments(documents, analyzeOperation)
 *   .then((result) => {
 *     if (NutrientViewer.isAIDocumentAnalysisResult(result)) {
 *       console.log('Summary:', result.summary);
 *       console.log('Categories:', result.categories);
 *     }
 *   });
 *
 * @see {@link NutrientViewer.Instance#compareDocuments}
 * @see {@link NutrientViewer.AIComparisonOperationType}
 * @see {@link AIADocumentChangesAnalysisResponse}
 * @see {@link AIADocumentChangesTaggingResponse}
 * @see {@link NutrientViewer.isAIDocumentAnalysisResult}
 * @see {@link NutrientViewer.isAIDocumentTaggingResult}
 */
export declare type AIDocumentComparisonResult = AIADocumentChangesAnalysisResponse | AIADocumentChangesTaggingResponse;

/**
 * Enhanced TextComparisonChange with AI-related properties
 *
 * @inline
 */
declare interface AIEnhancedTextComparisonChange extends TextComparisonChange {
  aiId?: string;
  categories?: string[];
  aiProcessed?: boolean;
}

/**
 * Specifies the alignment of an UI element relative to its parent container.
 *
 * @enum
 */
declare const Alignment: {
  readonly START: "START";
  readonly END: "END";
};

declare const allowedTextComparisonInnerToolbarItem: string[];

declare const allowedTextComparisonToolbarItem: string[];

declare const allowedToolbarTypes: ("text" | "search" | "link" | "ellipse" | "image" | "line" | "polygon" | "polyline" | "spacer" | "note" | "comment" | "zoom-in" | "zoom-out" | "callout" | "redo" | "signature" | "undo" | "print" | "ink" | "debug" | "arrow" | "highlighter" | "custom" | "pager" | "pan" | "measure" | "rectangle" | "stamp" | "cloudy-rectangle" | "dashed-rectangle" | "cloudy-ellipse" | "dashed-ellipse" | "cloudy-polygon" | "dashed-polygon" | "text-highlighter" | "multi-annotations-selection" | "ink-eraser" | "form-creator" | "redact-rectangle" | "redact-text-highlighter" | "document-crop" | "document-editor" | "document-comparison" | "export-pdf" | "content-editor" | "ai-assistant" | "linearized-download-indicator" | "pager-expanded" | "sidebar-thumbnails" | "sidebar-document-outline" | "sidebar-layers" | "sidebar-annotations" | "sidebar-bookmarks" | "sidebar-signatures" | "sidebar-attachments" | "annotate" | "zoom-mode" | "marquee-zoom" | "layout-config" | "responsive-group")[];

/**
 * @class
 * Base annotation type from which all annotations inherit. You can not instantiate from this type.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record}.
 * @public
 * @summary Base annotation type from which all annotations inherit.
 * @hideconstructor
 * @abstract
 * @see {@link NutrientViewer.Instance#getSelectedAnnotations} | {@link NutrientViewer.Instance#setSelectedAnnotations}
 * @see {@link NutrientViewer.Instance#setEditableAnnotationTypes} | {@link NutrientViewer.Instance#setIsEditableAnnotation}
 * @see {@link NutrientViewer.Instance#create} | {@link NutrientViewer.Instance#delete}
 * @see {@link NutrientViewer.Instance#getAnnotations} | {@link NutrientViewer.Instance#ensureChangesSaved}
 * @see {@link NutrientViewer.Instance#hasUnsavedChanges} | {@link NutrientViewer.Instance#save}
 * @see {@link NutrientViewer.Instance#setAnnotationCreatorName} | {@link NutrientViewer.Instance#update}
 * @see {@link Configuration#editableAnnotationTypes} | {@link Configuration#isEditableAnnotation}
 * @see {@link NutrientViewer.EventName.ANNOTATIONS_LOAD} | {@link NutrientViewer.EventName.ANNOTATIONS_CHANGE}
 * @see {@link NutrientViewer.EventName.ANNOTATIONS_CREATE} | {@link NutrientViewer.EventName.ANNOTATIONS_UPDATE}
 * @see {@link NutrientViewer.EventName.ANNOTATIONS_DELETE} | {@link NutrientViewer.EventName.ANNOTATIONS_PRESS}
 * @see {@link NutrientViewer.EventName.ANNOTATIONS_WILL_SAVE} | {@link NutrientViewer.EventName.ANNOTATIONS_DID_SAVE}
 * @see {@link NutrientViewer.EventName.ANNOTATIONS_FOCUS} | {@link NutrientViewer.EventName.ANNOTATIONS_BLUR}
 * @see {@link NutrientViewer.EventName.ANNOTATIONS_WILL_CHANGE} | {@link NutrientViewer.EventName.ANNOTATION_SELECTION_CHANGE}
 */
export declare class Annotation<T extends AnnotationProperties = AnnotationProperties> extends InheritableImmutableRecord<T> {
  /**
   * A unique identifier to describe the annotation. When an annotation is created in the UI, the
   * viewer has to generate a unique ID.
   *
   * When changes are saved to the underlying annotation provider, we call
   * {@link Instance#ensureChangesSaved} to make sure the annotation has been persisted
   * from the provider.
   */
  id: ID;
  /**
   * An optional field that may be used to identify the annotation.
   *
   * By default, we'll set that to the same value as the automatically generated
   * {@link Annotation#id}.
   */
  name: null | string;
  /**
   * An optional annotation subject, representing a short description of
   * the subject being addressed by the annotation. This property has no effect
   * on the annotation rendering.
   */
  subject: null | string;
  /**
   * When the annotation is extracted directly from a PDF file, the `pdfObjectId` refers to the
   * identifier that was used in the PDF document.
   *
   * This ID is optional since newly created annotations using the SYNCProvider annotation provider
   * won't have a `pdfObjectId` assigned.
   *
   * @default null
   */
  pdfObjectId: null | number;
  /**
   * The page index on which the annotation is placed. It's important to notice that an annotation
   * can only ever be on one page. If you create for example an ink annotation with lines on two
   * pages, two annotation records will be created.
   *
   * `pageIndex` is zero-based and has a maximum value of `totalPageCount - 1`.
   */
  pageIndex: number;
  /**
   * Position of this annotation on the page. It's necessary that this spans all visible points of
   * the annotation, otherwise hit testing and other features may not work.
   */
  boundingBox: Rect;
  /**
   * A transparency value that is applied to the complete annotation. The value is capped between 0
   * and 1 inclusive.
   *
   * @default 1
   */
  opacity: number;
  /**
   * An optional note that can be set on any annotation.
   *
   * This value is displayed in the Nutrient Web SDK UI for all annotations except
   * {@link NutrientViewer.Annotations.NoteAnnotation | NoteAnnotation}, {@link NutrientViewer.Annotations.TextAnnotation | TextAnnotation}, {@link NutrientViewer.Annotations.WidgetAnnotation | WidgetAnnotation} and {@link NutrientViewer.Annotations.CommentMarkerAnnotation | CommentMarkerAnnotation}.
   */
  note: null | string;
  /**
   * The name of the creator of the annotation. This is a general purpose string which can easily be
   * spoofed and might not reflect the actual creator of the annotation.
   */
  creatorName: null | string;
  /**
   * The date of the annotation creation.
   */
  createdAt: Date;
  /**
   * The date of last annotation update.
   */
  updatedAt: Date;
  /**
   * The annotation flag that prevents the annotation from being rendered in the UI.
   *
   * The annotation may still be part of the printed page, depending of the value of the
   * {@link Annotations.Annotation#noPrint} flag.
   *
   * @default false
   */
  noView: boolean;
  /**
   * The annotation flag that prevents the annotation from being printed.
   *
   * @default false
   */
  noPrint: boolean;
  /**
   * The annotation flag that prevents the annotation from being modified.
   *
   * @default false
   */
  locked: boolean;
  /**
   * The annotation flag that prevents the annotation content from being modified.
   *
   * @default false
   */
  lockedContents: boolean;
  /**
   * The annotation flag that makes the annotation read only.
   *
   * @default false
   */
  readOnly: boolean;
  /**
   * If set, do not display or print the annotation or allow it to interact with the user.
   *
   * @default false
   */
  hidden: boolean;
  /**
   * Annotations can store additional user-specified data.
   *
   * NutrientViewer will not use or evaluate `customData` in the UI directly.
   * You have full control over this property. For new annotations, this defaults to null.
   *
   * customData will be stored as JSON through `JSON.serialize()` and `JSON.parse()`, and
   * so must be a plain JSON-serializable object.
   *
   * @example
   * Adding a new {@link EllipseAnnotation} with custom data attached:
   * ```ts
   * const annotation = new NutrientViewer.Annotations.EllipseAnnotation({
   *   pageIndex: 0,
   *   boundingBox: new NutrientViewer.Geometry.Rect({
   *     top: 10,
   *     left: 10,
   *     width: 100,
   *     height: 100
   *   }),
   *   customData: {
   *     circleId: "my-circle"
   *   }
   * });
   * ```
   */
  customData: null | Record<string, unknown>;
  noZoom: boolean;
  noRotate: boolean;
  additionalActions: AnnotationAdditionalActionsType | null;
  rotation: number;
  /**
   * The blend mode defines how the color of the annotation will be applied to its background.
   *
   * @default "normal"
   */
  blendMode: IBlendMode;
  isCommentThreadRoot: boolean;
  isAnonymous: boolean;
  /**
   * This property is used to define the permission scope for this annotation.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   */
  group?: string | null;
  /**
   * This property defines whether this annotation can be edited or not.
   * The value of this field depends on the set of collaboration permissions defined in the JWT token.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   */
  readonly isEditable?: boolean;
  /**
   * This property defines whether this annotation can be deleted or not.
   * The value of this field depends on the set of collaboration permissions defined in the JWT token.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   */
  readonly isDeletable?: boolean;
  /**
   * This property defines whether the user has permission to edit the group of this annotation.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   */
  readonly canSetGroup?: boolean;
  canReply?: boolean;
  APStreamCache?: {
    cache: string;
  } | {
    attach: string;
  };
  action: Action | null;
  constructor(options?: Partial<T>);
}

/** @inline */
declare type AnnotationAdditionalActionsType = {
  onPointerEnter?: Action;
  onPointerLeave?: Action;
  onPointerDown?: Action;
  onPointerUp?: Action;
  onPageOpen?: Action;
  onPageClose?: Action;
  onPageVisible?: Action;
  onPageHidden?: Action;
};

/** @inline */
declare type AnnotationBackendJSON<K extends BaseAnnotationJSON = Serializers.AnnotationJSONUnion, R extends string = never> = { [P in
keyof K]?: NonNullable<K[P]> } &
{ [P in
Intersection<keyof K, BackendRequiredKeys | R>]-?: Exclude<NonNullable<K[P]>, undefined> };

declare type AnnotationJSONToAnnotation<T extends {
  type: keyof AnnotationSerializerTypeMap;
}> = AnnotationSerializerTypeMap[GetTypeFromAnnotationJSON<T>]['annotation'];

/**
 * @deprecated Use {@link Serializers.AnnotationJSONUnion} instead.
 * @hidden
 */
export declare type AnnotationJSONUnion = Serializers.AnnotationJSONUnion;

/**
 * @class
 *
 * Represents an annotation note. Used as a note annotation when hovering over note icon or when
 * the note icon is selected. This annotation is not persisted in the document nor returned by the public API.
 */
declare class AnnotationNote extends NoteAnnotation<AnnotationNoteProps> {
  /**
   * Root annotation this note belongs to.
   */
  parentAnnotation?: AnnotationsUnion;
  /**
   * Calculated position of this note on the page in PDF coordinates.
   */
  position: Point;
  notePosition?: Point;
}

/** @inline */
declare interface AnnotationNoteProps extends INoteAnnotation {
  parentAnnotation: AnnotationsUnion | null;
  position: Point;
  notePosition?: Point;
}

declare function AnnotationPermissionMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Returns a deep copy of the latest editableAnnotationTypes. This value changes whenever
     * {@link Instance.setEditableAnnotationTypes} is called.
     *
     * Mutating this object will have no effect.
     *
     * @public
     */
    readonly editableAnnotationTypes: Set_2<Class<AnnotationsUnion>>;
    /**
     * This method is used to update the editable annotation types.
     *
     * When one of the supplied {@link NutrientViewer.Annotations.Annotation} is invalid, this method will throw an
     * {@link Error} that contains a detailed error message.
     *
     * @example
     * ```ts
     * // Only allow editing ink annotations
     * instance.setEditableAnnotationTypes([NutrientViewer.Annotations.InkAnnotation]);
     * instance.editableAnnotationTypes === [NutrientViewer.Annotations.InkAnnotation]; // => true
     * ```
     *
     * @public
     * @throws {Error} Will throw an error when the supplied array is not valid.
     */
    setEditableAnnotationTypes(editableAnnotationTypes: Class<AnnotationsUnion>[]): void;
    /**
     * This method is used to update the isEditableAnnotation callback
     *
     * When the supplied callback is invalid it will throw a {@link Error} that contains a
     * detailed error message.
     *
     * @example
     * Only allow editing annotations from a specific creator name
     * ```ts
     * instance.setIsEditableAnnotation((annotation) => annotation.creatorName === "Alice");
     * ```
     *
     * @public
     * @throws {Error} Will throw an error when the supplied array is not valid.
     */
    setIsEditableAnnotation(isEditableAnnotationCallback: IsEditableAnnotationCallback): void;

  };
} & T;

/**
 * Describes and persists the properties of an annotation preset.
 *
 * Annotation presets are sets of property-value pairs for annotations that can be applied as default
 * annotations settings for toolbar items. When an annotation toolbar setting is changed by the user,
 * the annotation preset associated with the toolbar item that triggered the annotation toolbar is updated.
 * If the associated annotation preset doesn't exist, it's created with the settings that have changed.
 *
 * For properties not included in an annotation preset, the default values used when creating
 * an annotation are those of the annotation type.
 *
 * @example
 * Creating an annotation preset and adding it to the available annotation presets.
 * ```ts
 * const myAnnotationPresets = instance.annotationPresets
 * myAnnotationPresets['my-annotation-preset'] = {
 *  strokeWidth: 2,
 * }
 * instance.setAnnotationPresets(myAnnotationPresets);
 * ```
 *
 * @summary Annotation preset properties.
 * @see {@link Configuration#annotationPresets}
 * @see {@link Instance#setAnnotationPresets}
 * @see {@link Events.AnnotationPresetsUpdateEvent}
 */
export declare type AnnotationPreset = Record<string, unknown>;

declare type AnnotationPreset_2 = AnnotationPreset;

/**
 * This callback can be used in the {@link NutrientViewer.Instance#setAnnotationPresets | setAnnotationPresets()}
 * method to do atomic updates to the current annotation presets.
 *
 * @example
 * Use ES2015 arrow functions and the update callback to reduce boilerplate
 * ```ts
 * instance.setAnnotationPresets(presets => {
 *   presets.custom = {
 *     strokeWidth: 10,
 *   };
 *   return presets;
 * });
 * ```
 *
 * @param currentAnnotationPresets - The current annotation presets
 * @returns The new annotation presets
 */
export declare type AnnotationPresetCallback = (currentAnnotationPresets: Record<AnnotationPresetID, AnnotationPreset>) => Record<AnnotationPresetID, AnnotationPreset>;

/** @inline */
declare type AnnotationPresetID = string;

declare type AnnotationPresetID_2 = AnnotationPresetID;

export declare namespace AnnotationPresets {
  export {
    serializePreset as toSerializableObject,
    unserializePreset as fromSerializableObject };

}

declare function AnnotationPresetsMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Returns a deep copy of the latest annotation presets. This value changes whenever the user
     * interacts with NutrientViewer or whenever {@link Instance.setAnnotationPresets} is called.
     *
     * Mutating this object will have no effect.
     */
    readonly annotationPresets: {
      [key: string]: AnnotationPreset;
    };
    /**
     * Get the current active annotation preset ID
     */
    readonly currentAnnotationPreset: string | null | undefined;
    /**
     * This method is used to update the annotation presets.
     *
     * It makes it possible to add new {@link AnnotationPreset | annotation presets} and edit or remove existing ones.
     *
     * When you pass in an `object` with keyed {@link AnnotationPreset}, the current annotation presets
     * will be immediately updated. Calling this method is also idempotent.
     *
     * If you pass in a function, it will be immediately invoked and will receive the current annotation presets as argument. You can use this to modify the object based on its
     * current value. This type of update is guaranteed to be atomic - the value of `currentAnnotationPresets` can't change in between. See: {@link AnnotationPresetCallback}
     *
     * When one of the supplied {@link AnnotationPreset} is invalid, this method will throw an {@link Error} that contains a detailed error message.
     *
     * Since `annotationPresets` is a regular JavaScript `object`, it can be manipulated using standard `Object`
     * methods.
     *
     * @example
     * The new changes will be applied immediately
     * ```ts
     * instance.setAnnotationPresets(newAnnotationPresets);
     * instance.annotationPresets === newAnnotationPresets; // => true
     * ```
     *
     * @example
     * Adding an annotation preset for an ellipse annotation variant.
     * ```ts
     * const myAnnotationPreset = {
     *   dashedEllipse: {
     *     strokeDashArray: [3, 3],
     *   }
     * }
     * instance.setAnnotationPresets(annotationPresets => ({ ...annotationPresets, myAnnotationPreset })
     * ```
     *
     * @throws {Error} Will throw an error when the supplied annotation preset `object` is not valid.
     * @param stateOrFunction - Either a
     *   new AnnotationPresets `object` which would overwrite the existing one, or a callback that will get
     *   invoked with the current annotation presets and is expected to return the new annotation presets `object`.
     */
    setAnnotationPresets(stateOrFunction: Record<AnnotationPresetID, AnnotationPreset> | AnnotationPresetCallback): void;
    /**
     * This method is used to set the current active annotation preset.
     *
     * It makes it possible to specify what annotation preset should be used when new annotations
     * are created in the UI by passing the annotation preset key string as argument.
     *
     * The current annotation preset is set when the toolbar annotation buttons are used to create
     * annotations. This method allows to set the current annotation preset programmatically, as well
     * as resetting it by passing `null` as argument.
     *
     * When the supplied key does not correspond with an existing {@link AnnotationPreset},
     * this method will throw an {@link Error} that contains a detailed error message.
     *
     * @example
     * The new changes will be applied immediately
     * ```ts
     * instance.setCurrentAnnotationPreset("ink");
     * instance.currentAnnotationPreset === "ink"; // => true
     * ```
     *
     * @example
     * Setting an annotation preset for a closed arrow line annotation.
     * ```ts
     * instance.setAnnotationPresets(annotationPresets => {
     *   return {
     *     ...annotationPresets,
     *     line: {
     *       ...annotationPresets.line,
     *       lineCaps: {
     *         end: "closedArrow"
     *       }
     *     }
     *   }
     * });
     * instance.setCurrentAnnotationPreset("line");
     * instance.setViewState(viewState =>
     *   viewState.set("interactionMode", NutrientViewer.InteractionMode.SHAPE_LINE),
     * );
     * ```
     *
     * @public
     * @param annotationPresetID - Annotation preset name.
     * @throws {Error} Will throw an error when the supplied annotation preset key does not exist.
     */
    setCurrentAnnotationPreset(annotationPresetID?: string | null): void;

  };
} & T;

/** @inline */
declare type AnnotationProperties = {
  id: string | null;
  name: string | null;
  subject: string | null;
  pdfObjectId: number | null;
  pageIndex: number | null;
  boundingBox: Rect | null;
  opacity: number | null;
  note: string | null;
  creatorName: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  customData: Record<string, unknown> | null;
  noView: boolean | null;
  noPrint: boolean | null;
  locked: boolean | null;
  lockedContents: boolean | null;
  readOnly: boolean | null;
  hidden: boolean | null;
  group: string | null | undefined;
  isEditable: boolean | undefined;
  isDeletable: boolean | undefined;
  canSetGroup: boolean | undefined;
  canReply: boolean | undefined;
  rotation: number;
  additionalActions: AnnotationAdditionalActionsType | null;
  noZoom: boolean;
  noRotate: boolean;
  isCommentThreadRoot: boolean;
  isAnonymous: boolean;
  APStreamCache: {
    cache: string;
  } | {
    attach: string;
  } | undefined;
  blendMode: IBlendMode;
  action: Action | null;
  [key: string]: unknown;
};

declare type AnnotationReference = {
  fieldName: string;
} | {
  pdfObjectId: number;
};

/**
 * This callback is called whenever an annotation is about to be resized. You can use it to control resize behavior.
 *
 * @public
 * @param event - The event containing information regarding the resizing of the annotation
 * @returns The configuration of the resize behavior or undefined for default behavior.
 */
export declare type AnnotationResizeStartCallback = (event: AnnotationsResizeEvent) => AnnotationResizeStartCallbackConfiguration | undefined;

/**
 * The configuration of the resizing behavior of the annotations
 *
 * @public
 * @inline
 */
declare type AnnotationResizeStartCallbackConfiguration = {
  /** Set to `true` to keep aspect ratio while resizing. */
  maintainAspectRatio?: boolean;
  /** Minimum width of the annotation while resizing. */
  minWidth?: number | undefined;
  /** Minimum height of the annotation while resizing. */
  minHeight?: number | undefined;
  /** Maximum width of the annotation while resizing. */
  maxWidth?: number | undefined;
  /** Maximum height of the annotation while resizing. */
  maxHeight?: number | undefined;
};

export declare namespace Annotations {
  export {
    fromSerializableObject,
    rotate,
    serializeAnnotation as toSerializableObject,
    Annotation,
    CommentMarkerAnnotation,
    EllipseAnnotation,
    HighlightAnnotation,
    ImageAnnotation,
    InkAnnotation,
    LineAnnotation,
    LinkAnnotation,
    TextMarkupAnnotation as MarkupAnnotation,
    MediaAnnotation,
    NoteAnnotation,
    PolygonAnnotation,
    PolylineAnnotation,
    RectangleAnnotation,
    RedactionAnnotation,
    ShapeAnnotation,
    SquiggleAnnotation,
    StampAnnotation,
    StrikeOutAnnotation,
    TextAnnotation,
    UnderlineAnnotation,
    UnknownAnnotation,
    WidgetAnnotation };

}

declare type AnnotationsBackendJSONUnion = AnnotationBackendJSON<Serializers.InkAnnotationJSON> | AnnotationBackendJSON<Serializers.LineAnnotationJSON> | AnnotationBackendJSON<Serializers.RectangleAnnotationJSON> | AnnotationBackendJSON<Serializers.EllipseAnnotationJSON> | AnnotationBackendJSON<Serializers.PolygonAnnotationJSON> | AnnotationBackendJSON<Serializers.PolylineAnnotationJSON> | AnnotationBackendJSON<Serializers.LinkAnnotationJSON> | AnnotationBackendJSON<Serializers.TextMarkupAnnotationJSON> | AnnotationBackendJSON<Serializers.TextMarkupAnnotationJSON> | AnnotationBackendJSON<Serializers.TextMarkupAnnotationJSON> | AnnotationBackendJSON<Serializers.TextMarkupAnnotationJSON> | AnnotationBackendJSON<Serializers.RedactionAnnotationJSON> | AnnotationBackendJSON<Serializers.TextAnnotationJSON> | AnnotationBackendJSON<Serializers.NoteAnnotationJSON> | AnnotationBackendJSON<Serializers.ImageAnnotationJSON> | AnnotationBackendJSON<Serializers.StampAnnotationJSON, 'color'> | AnnotationBackendJSON<Serializers.WidgetAnnotationJSON> | AnnotationBackendJSON<Serializers.CommentMarkerAnnotationJSON> | AnnotationBackendJSON<Serializers.UnknownAnnotationJSON> | AnnotationBackendJSON<Serializers.MediaAnnotationJSON>;

declare function AnnotationSelectionMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {

    /**
     * If multiple annotations are selected, this function will return the set of selected annotations.
     */
    getSelectedAnnotations(): List<AnnotationsUnion> | null;











    /**
     * Selects annotations in the user interface. If `annotationOrAnnotationId` is empty, the
     * current selection will be cleared instead.
     *
     * @param annotationsOrAnnotationsIds - The annotations
     *   model or annotations IDs you want to set as selected. If `null` is used, the current selection
     *   will be cleared instead.
     */
    setSelectedAnnotations(annotationsOrAnnotationsIds?: List<Annotation | ID> | null): void;
    /**
     * Group annotations in the user interface.
     *
     * @param annotationsOrAnnotationsId - The annotations
     *   model or annotations IDs you want to be grouped. Annotations selected for grouping must be on the same page.
     *   Annotations that are already grouped will be removed from the previous group and added to the new one.
     */
    groupAnnotations(annotationsOrAnnotationsId?: List<Annotation | ID>): void;
    /**
     * This function will return all annotations groups, if there are any annotations groups.
     *
     * @returns Annotations groups
     */
    getAnnotationsGroups(): Map_2<string, {
      groupKey: string;
      annotationsIds: Set_2<string>;
    }> | null;
    /**
     * If there are any annotations groups, this function will return all annotations groups.
     * deleteAnnotationsGroup
     *
     * @param annotationGroupId - The annotation group id.
     */
    deleteAnnotationsGroup(annotationGroupId: string | null | undefined): void;
    /**
     * Selects an annotation in the user interface and enters edit mode. If `annotationOrAnnotationId` is empty, the
     * current selection will be cleared instead.
     *
     * This method works with {@link NutrientViewer.Annotations.TextAnnotation} and {@link NutrientViewer.Annotations.NoteAnnotation}.
     * When called with other annotation types that don't have any text it will simply select the annotation.
     *
     * @param annotationOrAnnotationId - The annotation
     *   model or annotation ID you want to set as selected. If `null` is used, the current selection
     *   will be cleared instead.
     * @param autoSelectText - Whether the text should be automatically selected.
     */
    setEditingAnnotation(annotationOrAnnotationId?: (AnnotationsUnion | ID) | null, autoSelectText?: boolean | null): void;

  };
} & T;

declare class AnnotationSerializer {
  static VERSION: number;
  annotation: AnnotationsUnion;
  constructor(annotation: AnnotationsUnion);
  toJSON(): Omit<BaseAnnotationJSON, 'type'>;
  static fromJSON(id: ID | null, json: IAnnotationJSON, options?: ICollaboratorPermissionsOptions): {
    group?: string | null | undefined;
    canSetGroup?: boolean | undefined;
    isEditable?: boolean | undefined;
    isDeletable?: boolean | undefined;
    blendMode?: IBlendMode | undefined;
    id: string | null;
    name: string | null;
    subject: string | null;
    pdfObjectId: number | null;
    pageIndex: number;
    opacity: number;
    boundingBox: Rect;
    noPrint: boolean;
    noZoom: boolean;
    noRotate: boolean;
    noView: boolean;
    hidden: boolean;
    locked: boolean;
    lockedContents: boolean;
    readOnly: boolean;
    action: Action | null | undefined;
    note: string | null;
    createdAt: Date;
    updatedAt: Date;
    creatorName: string | null;
    customData: Record<string, unknown> | null;
    isCommentThreadRoot: boolean;
    isAnonymous: boolean;
  };
  static blendModeObjectForAnnotation(json: IAnnotationJSON): {
    blendMode: IBlendMode;
  } | null;
  serializeFlags(): ("noView" | "noPrint" | "locked" | "lockedContents" | "readOnly" | "hidden" | "noZoom" | "noRotate")[] | null;
}

declare type AnnotationSerializerTypeMap = {
  'pspdfkit/ink': {
    serializer: InkAnnotationSerializer;
    annotation: InkAnnotation;
    json: Serializers.InkAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<Serializers.InkAnnotationJSON>;
  };
  'pspdfkit/shape/line': {
    serializer: LineAnnotationSerializer;
    annotation: LineAnnotation;
    json: Serializers.LineAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<Serializers.LineAnnotationJSON>;
  };
  'pspdfkit/shape/rectangle': {
    serializer: RectangleAnnotationSerializer;
    annotation: RectangleAnnotation;
    json: Serializers.RectangleAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<Serializers.RectangleAnnotationJSON>;
  };
  'pspdfkit/shape/ellipse': {
    serializer: EllipseAnnotationSerializer;
    annotation: EllipseAnnotation;
    json: Serializers.EllipseAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<Serializers.EllipseAnnotationJSON>;
  };
  'pspdfkit/shape/polygon': {
    serializer: PolygonAnnotationSerializer;
    annotation: PolygonAnnotation;
    json: Serializers.PolygonAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<Serializers.PolygonAnnotationJSON>;
  };
  'pspdfkit/shape/polyline': {
    serializer: PolylineAnnotationSerializer;
    annotation: PolylineAnnotation;
    json: Serializers.PolylineAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<Serializers.PolylineAnnotationJSON>;
  };
  'pspdfkit/link': {
    serializer: LinkAnnotationSerializer;
    annotation: LinkAnnotation;
    json: Serializers.LinkAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<Serializers.LinkAnnotationJSON>;
  };
  'pspdfkit/markup/highlight': {
    serializer: TextMarkupAnnotationSerializer;
    annotation: HighlightAnnotation;
    json: Serializers.TextMarkupAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<Serializers.TextMarkupAnnotationJSON>;
  };
  'pspdfkit/markup/squiggly': {
    serializer: TextMarkupAnnotationSerializer;
    annotation: SquiggleAnnotation;
    json: Serializers.TextMarkupAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<Serializers.TextMarkupAnnotationJSON>;
  };
  'pspdfkit/markup/strikeout': {
    serializer: TextMarkupAnnotationSerializer;
    annotation: StrikeOutAnnotation;
    json: Serializers.TextMarkupAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<Serializers.TextMarkupAnnotationJSON>;
  };
  'pspdfkit/markup/underline': {
    serializer: TextMarkupAnnotationSerializer;
    annotation: UnderlineAnnotation;
    json: Serializers.TextMarkupAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<Serializers.TextMarkupAnnotationJSON>;
  };
  'pspdfkit/markup/redaction': {
    serializer: RedactionAnnotationSerializer;
    annotation: RedactionAnnotation;
    json: Serializers.RedactionAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<Serializers.RedactionAnnotationJSON>;
  };
  'pspdfkit/text': {
    serializer: TextAnnotationSerializer;
    annotation: TextAnnotation;
    json: Serializers.TextAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<Serializers.TextAnnotationJSON>;
  };
  'pspdfkit/note': {
    serializer: NoteAnnotationSerializer;
    annotation: NoteAnnotation;
    json: Serializers.NoteAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<Serializers.NoteAnnotationJSON>;
  };
  'pspdfkit/image': {
    serializer: ImageAnnotationSerializer;
    annotation: ImageAnnotation;
    json: Serializers.ImageAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<Serializers.ImageAnnotationJSON>;
  };
  'pspdfkit/stamp': {
    serializer: StampAnnotationSerializer;
    annotation: StampAnnotation;
    json: Serializers.StampAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<Serializers.StampAnnotationJSON, 'color'>;
  };
  'pspdfkit/widget': {
    serializer: WidgetAnnotationSerializer;
    annotation: WidgetAnnotation;
    json: Serializers.WidgetAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<Serializers.WidgetAnnotationJSON>;
  };
  'pspdfkit/comment-marker': {
    serializer: CommentMarkerAnnotationSerializer;
    annotation: CommentMarkerAnnotation;
    json: Serializers.CommentMarkerAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<Serializers.CommentMarkerAnnotationJSON>;
  };
  'pspdfkit/unknown': {
    serializer: UnknownAnnotationSerializer;
    annotation: UnknownAnnotation;
    json: Serializers.UnknownAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<Serializers.UnknownAnnotationJSON>;
  };
  'pspdfkit/media': {
    serializer: MediaAnnotationSerializer;
    annotation: MediaAnnotation;
    json: Serializers.MediaAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<Serializers.MediaAnnotationJSON>;
  };
};

declare function AnnotationsMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Returns a {@link NutrientViewer.Immutable.List} of {@link NutrientViewer.Annotations.Annotation} for the given
     * `pageIndex`.
     *
     * The list contains an immutable snapshot of the currently available annotations in the UI for
     * the page. This means, that the returned list could include *invalid* annotations. Think for
     * example of the following workflow:
     *
     * 1. The user creates a new text annotation on a page.
     * 2. Now, the users double clicks the annotation and removes the text. The annotation is now
     * invalid since it does not have any text. But since the annotation is not yet deselected,
     * we will keep it visible.
     * 3. Next, the user updates the color of the text by using the annotation toolbar. The
     * annotation will still be invalid although a change occurred.
     * 4. At the end, the user decides to type more text and deselects the annotation again. The
     * annotation is now valid.
     *
     * When you want to keep a reference to the latest annotations, you can listen for
     * - {@link NutrientViewer.EventName.ANNOTATIONS_CHANGE},
     * - {@link NutrientViewer.EventName.ANNOTATIONS_WILL_SAVE}, or
     * - {@link NutrientViewer.EventName.ANNOTATIONS_DID_SAVE} to update your reference.
     *
     * If annotations for this page have not been loaded yet, the promise will resolve only after
     * we have received all annotations.
     *
     * @example
     * instance.getAnnotations(0).then(function (annotations) {
     *   annotations.forEach(annotation => {
     *     console.log(annotation.pageIndex);
     *   });
     *
     *   // Filter annotations by type
     *   annotations.filter(annotation => {
     *     return annotation instanceof NutrientViewer.Annotations.InkAnnotation;
     *   })
     *
     *   // Filter annotations at a specific point
     *   const pointInFirstPage = new NutrientViewer.Geometry.Point({ x: 20, y: 30 });
     *   const annotationsAtPointInPage = annotationsOnFirstPage.filter(annotation => {
     *     return annotation.boundingBox.isPointInside(pointInFirstPage);
     *   });
     *
     *   // Get the number of currently loaded annotations
     *   const totalAnnotations = annotations.size;
     * })
     *
     * @param pageIndex - The page index for the annotations you want.
     *   `pageIndex` is zero-based and has a maximum value of `totalPageCount - 1`
     * @returns Resolves to annotations for the given page.
     */
    getAnnotations(pageIndex: number): Promise<List<AnnotationsUnion>>;
    /**
     * Creates a new attachment and returns a Promise that resolves to the created attachments ID.
     *
     * @example
     * NutrientViewer.load(configuration).then(function(instance) {
     *   instance.createAttachment(blob).then(function(attachmentId) {
     *     console.log(attachmentId);
     *   });
     * })
     *
     * @throws {Error} Will throw an error when the file can not be read.
     * @param blob - The attachment data as a Blob object.
     * @returns A promise that resolves to the attachment ID.
     */
    createAttachment(blob: Blob): Promise<string>;
    /**
     * Fetches an attachment or an embedded file based on its ID.
     *
     * @public
     * @example
     * NutrientViewer.load(configuration).then(function(instance) {
     *   instance.getAttachment("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad").then(function(image) {
     *     console.log(image);
     *   });
     * })
     *
     * @throws {Error} Will throw an error when the file can not be read.
     * @param attachmentId - The ID of the attachments or embedded files that should be fetched.
     * @returns A promise that resolves to the attachment data.
     */
    getAttachment(attachmentId: string): Promise<Blob>;
    /**
     * Takes a {@link NutrientViewer.Annotations.TextAnnotation} and returns a new
     * {@link NutrientViewer.Annotations.TextAnnotation} where the bounding box is adjusted to fit the
     * annotation and inside the page.
     *
     * This is using the same calculations as the text annotation editor interface.
     *
     * @public
     * @example
     * textAnnotation = instance.calculateFittingTextAnnotationBoundingBox(textAnnotation);
     *
     * @param annotation - The text annotation that needs its
     *   bounding box adjusted.
     * @returns The text annotation that has it's bounding box adjusted.
     */
    calculateFittingTextAnnotationBoundingBox(annotation: TextAnnotation): TextAnnotation;
    /**
     * Returns a list containing the information of all the embedded files in the PDF.
     *
     * If you want to get the content of a particular embedded file, you can use {@link NutrientViewer.Instance#getAttachment}
     *
     * ```js
     * const embeddedFiles = await instance.getEmbeddedFiles()
     *
     * const fileContent = await instance.getAttachment(embeddedFiles.get(0).attachmentId)
     * ```
     *
     * @example
     * const embeddedFilesInfo = await instance.getEmbeddedFiles();
     *
     * @returns List of embedded files in the document with their individual information.
     */
    getEmbeddedFiles(): Promise<List<EmbeddedFile>>;
    /**
     * This method is used to update the setOnAnnotationResizeStart callback
     *
     * When the supplied callback is invalid it will throw a {@link NutrientViewer.Error} that contains a
     * detailed error message.
     */
    setOnAnnotationResizeStart(setOnAnnotationResizeStartCallback: AnnotationResizeStartCallback): void;
    /**
     * Returns a {@link NutrientViewer.Immutable.List} of {@link NutrientViewer.Annotations} for the given
     * form field or annotation.
     *
     * The list contains an immutable snapshot of the currently overlapping annotations for
     * the argument.
     *
     * If annotations for this page have not been loaded yet, the promise will resolve only after
     * we have received all annotations.
     *
     * @example
     * Get signature overlapping a signature form field
     * ```ts
     *
     * // The name of the field you want to check.
     * const formFieldName = "signature";
     *
     * // First get all `FormFields` in the `Document`.
     * const formFields = await instance.getFormFields();
     *
     * // Get a signature form with the specific name you want.
     * const field = formFields.find(
     *  (formField) =>
     *   formField.name === formFieldName && formField instanceof NutrientViewer.FormFields.SignatureFormField
     *  );
     *
     * // Check if the signature form field has been signed
     * await instance.getOverlappingAnnotations(field);
     * // It will result in a list of annotations that overlaps the given signature form field.
     * // If no annotation overlaps the form field, the list will be empty.
     * ```
     *
     * @example
     * Get annotations overlapping an ink annotation
     * ```ts
     *
     * const annotations = instance.getAnnotations(0);
     * const inkAnnotation = annotations.find(
     *  (annotation) =>
     *   annotation instanceof NutrientViewer.Annotation.InkAnnotation
     * );
     * await instance.getOverlappingAnnotations(inkAnnotation);
     * // It will result in a list of annotations that overlaps the given signature form field.
     * // If no annotation overlaps the form field, the list will be empty.
     * ```
     *
     * @param annotationOrFormField - The annotation or the form field that needs to be checked for overlapping annotations.
     * @returns Resolves to a list of the annotations that overlap the given argument.
     */
    getOverlappingAnnotations(annotationOrFormField: AnnotationsUnion | FormField): Promise<List<AnnotationsUnion>>;

  };
} & T;

/**
 * This event is emitted whenever an annotation is about to be resized.
 *
 * You can use this event to add custom resize behavior for individual annotations.
 *
 * @example
 * Log text annotation value
 * ```ts
 * instance.setOnAnnotationResizeStart((event) => {
 *   if (event.annotation instanceof NutrientViewer.Annotations.TextAnnotation) {
 *     return {
 *         maintainAspectRatio: true
 *     }
 *   }
 * });
 * ```
 */
export declare type AnnotationsResizeEvent = {
  /**
   * The annotation that is resizing.
   *
   * Remember that annotations are `Immutable.map`.
   */
  annotation: AnnotationsUnion;
  /**
   * This boolean represents if the user is holding the shift key.
   */
  isShiftPressed: boolean;
  /**
   * This holds the name of the anchor the user is using the resize the annotation.
   */
  resizeAnchor: ResizeAnchor;
};

/**
 * The annotations sidebar options allows to specify options available for the annotations sidebar.
 * Currently, you can define a `includeContent` array in which you
 * can provide a list of annotation classes to be accepted as part of
 * the annotations sidebar, or also whether to include {@link Comment}
 * instances or not. By default, the value of `includeContent` is {@link NutrientViewer.defaultAnnotationsSidebarContent}.
 *
 * @summary Options available to the annotations sidebar
 * @example
 * Customizing the annotations sidebar to include only {@link NutrientViewer.Annotations.ImageAnnotation} instances
 * ```ts
 * NutrientViewer.load({
 *   initialViewState: new NutrientViewer.ViewState({
 *     sidebarOptions: {
 *       [NutrientViewer.SidebarMode.ANNOTATIONS]: {
 *         includeContent: [NutrientViewer.Annotations.ImageAnnotation]
 *       }
 *     }
 *   })
 * });
 * ```
 *
 * @default NutrientViewer.defaultAnnotationsSidebarContent
 * @see {@link ViewState#sidebarOptions}
 */
export declare type AnnotationsSidebarOptions = {
  /**
   * Array of annotation classes to be accepted as part of the annotations sidebar
   */
  includeContent: Array<AnnotationsUnionClass | Class<Comment_2>>;
};

export declare type AnnotationsUnion = InkAnnotation | LineAnnotation | RectangleAnnotation | EllipseAnnotation | PolygonAnnotation | PolylineAnnotation | LinkAnnotation | HighlightAnnotation | UnderlineAnnotation | StrikeOutAnnotation | SquiggleAnnotation | RedactionAnnotation | TextAnnotation | NoteAnnotation | ImageAnnotation | StampAnnotation | WidgetAnnotation | CommentMarkerAnnotation | UnknownAnnotation | MediaAnnotation;

/** @inline */
declare type AnnotationsUnionClass = Class<InkAnnotation> | Class<LineAnnotation> | Class<RectangleAnnotation> | Class<EllipseAnnotation> | Class<PolygonAnnotation> | Class<PolylineAnnotation> | Class<LinkAnnotation> | Class<HighlightAnnotation> | Class<UnderlineAnnotation> | Class<StrikeOutAnnotation> | Class<SquiggleAnnotation> | Class<RedactionAnnotation> | Class<TextAnnotation> | Class<NoteAnnotation> | Class<ImageAnnotation> | Class<StampAnnotation> | Class<WidgetAnnotation> | Class<CommentMarkerAnnotation> | Class<UnknownAnnotation> | Class<MediaAnnotation>;

/**
 * Indicates the reason why {@link Events.AnnotationsWillChangeEvent} was
 * emitted.
 */
export declare enum AnnotationsWillChangeReason {
  /**
   * The user starts drawing an annotation.
   */
  DRAW_START = "DRAW_START",
  /**
   * The user stops drawing an annotation.
   */
  DRAW_END = "DRAW_END",
  /**
   * The user starts typing text into an annotation.
   */
  TEXT_EDIT_START = "TEXT_EDIT_START",
  /**
   * The user stops typing text into an annotation.
   */
  TEXT_EDIT_END = "TEXT_EDIT_END",
  /**
   * The user starts choosing an item from the picker presented.
   *
   * Used for image annotations, stamp annotations and ink signature annotations.
   *
   * Note that the annotation included in this event will not have any matching
   * field values (including ID) compared to the annotation in a
   * {@link NutrientViewer.AnnotationsWillChangeReason.SELECT_END} event. This is
   * because the actual annotation hasn't been created yet. As a result, this
   * annotation is used only to identify the type of annotation being selected.
   * The only exception to this is the `inkSignature` field in a
   * {@link NutrientViewer.Annotations.InkAnnotation}, which is set to `true` to
   * distiguish it from a regular ink annotation.
   */
  SELECT_START = "SELECT_START",
  /**
   * The user stops choosing an item from the picker presented.
   *
   * Used for image annotations, stamp annotations and ink signature
   * annotations.
   *
   * Note= An empty {@link Events.AnnotationsWillChangeEvent#annotations}
   * list indicates that the selection was cancelled.
   *
   * Note that this will not be fired when cancelling the system dialog for
   * selecting an image, because there is no way to detect when this occurs.
   */
  SELECT_END = "SELECT_END",
  /**
   * The user starts moving an annotation around.
   */
  MOVE_START = "MOVE_START",
  /**
   * The user stops moving an annotation around.
   */
  MOVE_END = "MOVE_END",
  /**
   * The user starts resizing an annotation.
   */
  RESIZE_START = "RESIZE_START",
  /**
   * The user stops resizing an annotation.
   */
  RESIZE_END = "RESIZE_END",
  /**
   * The user starts rotating an annotation.
   */
  ROTATE_START = "ROTATE_START",
  /**
   * The user stops rotating an annotation.
   */
  ROTATE_END = "ROTATE_END",
  /**
   * The user initiates the delete process. This
   * will be emitted when the deletion confirmation
   * dialog appears.
   */
  DELETE_START = "DELETE_START",
  /**
   * The user ends the delete process. This
   * will be emitted when the user confirms
   * or cancels the intention to delete an
   * annotation.
   *
   * An empty {@link Events.AnnotationsWillChangeEvent#annotations}
   * list indicates that the deletion was cancelled.
   */
  DELETE_END = "DELETE_END",
  /**
   * The value of one of the properties of the
   * annotation is changed by the user. e.g. the
   * color or the stroke width.
   */
  PROPERTY_CHANGE = "PROPERTY_CHANGE",
}

declare function AnnotationTabOrderMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * *** Standalone only ***
     *
     * This method is used to retrieve the tab order of annotations in a given page.
     *
     * The tab order will be returned as an array of annotation IDs.
     *
     * In the case of widget annotations associated to a radio form field, all the widgets
     * associated to the same form field are rendered next to the first one found
     * in the provided `Array` of annotation IDs.
     *
     * @example
     * Get the tab order of annotations in page 0
     * ```ts
     * instance.getPageTabOrder(0);
     * ```
     *
     * @throws {Error} Will throw an error when the supplied page index is not a number.
     * @param pageIndex
     * @returns A promise that resolves to an ordered array of annotation IDs.
     */
    getPageTabOrder(pageIndex: number): Promise<string[]>;
    /**
     * *** Standalone only ***
     *
     * This method is used to set or modify the tab order of annotations in a given page.
     *
     * Using this method, it is possible to specify the order in which annotations are navigated when using the keyboard.
     * The tab order should be provided as an array of annotation IDs, or determined by a callback function.
     *
     * The method accepts a page index as the first argument, and a callback as the second. This callback will
     * be called with an array of annotations in the page sorted by their current tab order, and should return
     * an array of those annotations' `id`s following the new tab order.
     *
     * In the case of widget annotations associated to a radio form field, all the widgets associated to the same
     * form field will be rendered next to the first one found in the provided array of annotation IDs, and navigated accordingly.
     *
     * @example
     * Set the tab order of annotations in page 0
     * ```ts
     * instance.setPageTabOrder(0, currentTabOrderedAnnotations =>
     *   ["annotation-id-1", "annotation-id-2"]
     * );
     * ```
     *
     * @example
     * Set the tab order of annotations in page 0, with a radio form field
     * ```ts
     * // 'radio-widget-id-2' will be rendered next to 'radio-widget-id-1', and navigated accordingly
     * instance.setPageTabOrder(0, currentTabOrderedAnnotations =>
     *   ["radio-widget-id-1", "annotation-id-1", "annotation-id-2", "radio-widget-id-2"]
     * );
     * ```
     *
     * @example
     * Sort page 1 annotations by their left position
     * ```ts
     * instance.setPageTabOrder(
     *   1,
     *   currentTabOrderedAnnotations => currentTabOrderedAnnotations
     *     .sort((a, b) => a.boundingBox.left - b.boundingBox.left)
     *     .map(annotation => annotation.id)
     * );
     * ```
     *
     * @standalone
     * @throws {Error} Will throw an error when the supplied tab order is not valid.
     * @param pageIndex - The page index to set the tab order for.
     * @param annotationIdsSortCallback - A callback that will be invoked with the annotations in the current tab order,
     *   and is expected to return the annotation IDs in the new tab order.
     */
    setPageTabOrder(pageIndex: number, annotationIdsSortCallback: (tabOrderedAnnotations: AnnotationsUnion[]) => ID[]): Promise<void>;

  };
} & T;

/** @inline */
declare type AnnotationToolbarColorPresetConfig = {
  /** The array of colors to be displayed in a customized color picker dropdown */
  presets: ColorPreset[];
  /** Defines whether you want to render the custom color picker UI. The default value is `true`, meaning that by default we render the custom color picker in the color dropdown. */
  showColorPicker?: boolean;
};

/**
 * This callback allows users to customize the colors that will be displayed in our color dropdown picker, and to add a custom color picker UI to it.
 *
 * @returns The configuration of the customized color picker
 * @example
 * Customize different color dropdowns.
 * ```ts
 * NutrientViewer.load({
 *  annotationToolbarColorPresets: function ({ propertyName }) {
 *    if (propertyName === "font-color") {
 *      return {
 *        presets: [
 *          {
 *            color: new NutrientViewer.Color({ r: 0, g: 0, b: 0 }),
 *            localization: {
 *              id: "brightRed",
 *              defaultMessage: "Bright Red",
 *            },
 *          },
 *          {
 *            color: new NutrientViewer.Color({ r: 100, g: 100, b: 180 }),
 *            localization: {
 *              id: "deepBlue",
 *              defaultMessage: "deepBlue",
 *            },
 *          },
 *        ],
 *      };
 *    }
 *
 *    if (propertyName === "stroke-color") {
 *      return {
 *        presets: [
 *          {
 *            color: new NutrientViewer.Color({ r: 0, g: 0, b: 0 }),
 *            localization: {
 *              id: "brightRed",
 *              defaultMessage: "Bright Red",
 *            },
 *          },
 *          {
 *            color: new NutrientViewer.Color({ r: 100, g: 100, b: 180 }),
 *            localization: {
 *              id: "deepBlue",
 *              defaultMessage: "deepBlue",
 *            },
 *          },
 *        ],
 *        showColorPicker: false,
 *      };
 *    }
 *  },
 *  //...
 *});
 * ```
 *

 */
export declare type AnnotationToolbarColorPresetsCallback = (options: {
  /**
   * options.propertyName The annotation property for which we need to render a customized array of colors in the color dropdown.
   * The built-in color properties are:
   *
   * - 'color'
   * - 'stroke-color'
   * - 'fill-color'
   * - 'background-color'
   * - 'font-color'
   * - 'outline-color'
   *
   * Different annotations have different color properties, but all of them are listed above. If you pass a color property that it's not supported, you will get an error.
   */
  propertyName: BuiltInColorProperty;
  /** array of default colors */
  defaultAnnotationToolbarColorPresets: ColorPreset[];
}) => AnnotationToolbarColorPresetConfig | undefined;

/**
 * Describes the properties of a Annotation Toolbar Item.
 *
 * Check out [our guides](https://www.nutrient.io/guides/web/current/customizing-the-interface/configure-the-annotation-toolbar/)
 * for more examples.
 *
 * @see {@link Instance#setAnnotationToolbarItems} | {@link Configuration#annotationToolbarItems}
 */
export declare type AnnotationToolbarItem = NodeAnnotationToolbarItem | IconAnnotationToolbarItem;

/**
 * This callback can be run on individual annotation toolbars to modify their toolbar items.
 *
 * For more information, see {@link Configuration.annotationToolbarItems}
 *
 * @param annotation - The annotation that is going to be created or is currently selected. In case
 * the annotation is not yet created, `pageIndex` is `null`. In case of items for annotation toolbars used in interaction modes
 * like {@link NutrientViewer.InteractionMode.INK_ERASER}, `annotation` is `null`.
 * @param options - The object that can be helpful in implementing custom toolbar.
 */
export declare type AnnotationToolbarItemsCallback = (annotation: AnnotationsUnion | null, options: {
  /** The list of default items that are shown for this particular annotation. */
  defaultAnnotationToolbarItems: BuiltInAnnotationToolbarItem[];
  /** Whether the screen is in desktop layout. */
  hasDesktopLayout: boolean;
}) => AnnotationToolbarItem[];

/**
 * This callback is called whenever an annotation gets selected and can be used to
 * define and return an array of {@link ToolItem} that will be rendered in a tooltip
 * for the given annotation.
 *
 * If the callback returns an empty array then NutrientViewer won't show any tooltip for the selected annotation.
 *
 * @param annotation - The selected annotation.
 * @example
 * Register a AnnotationTooltipCallback handler to show a tooltip for text annotations only.
 * ```ts
 * NutrientViewer.load({
 *   annotationTooltipCallback: function(annotation) {
 *     if (annotation instanceof NutrientViewer.Annotations.TextAnnotation) {
 *       var toolItem = {
 *         type: 'custom',
 *         title: 'tooltip item for text annotations',
 *         id: 'item-text-tooltip-annotation',
 *         className: 'TooltipItem-Text',
 *         onPress: function () {
 *           console.log(annotation)
 *         }
 *       }
 *       return [toolItem]
 *     } else {
 *       return []
 *     }
 *   }
 *   // ...
 * });
 * ```
 *

 */
export declare type AnnotationTooltipCallback = (annotation: AnnotationsUnion) => Array<ToolItem_2>;

declare type Args<T = any> = T extends ((...args: infer A) => any) ? A : never;

/**
 * The attachments sidebar options allow to specify options available for the Attachments sidebar.
 *
 * @public
 * @summary Keyed list of options that apply to the attachments sidebar.
 * @example
 * Disabling preview of attachments.
 * ```ts
 * NutrientViewer.load({
 *   initialViewState: new NutrientViewer.ViewState({
 *     sidebarOptions: {
 *       [NutrientViewer.SidebarMode.ATTACHMENTS]: {
 *         disablePreview: true
 *       }
 *     }
 *   })
 * });
 * ```
 *
 * @see {@link ViewState#sidebarOptions}
 */
export declare type AttachmentsSidebarOptions = {
  /**
   * If true, the preview of the attachment will be disabled and attachments can only be downloaded.
   */
  disablePreview: boolean;
};

/**
 * When working with annotations and form field values, there are multiple options when the data can
 * get saved. The AutoSaveMode controls this behavior.
 *
 * @enum
 */
declare const AutoSaveMode: {
  /** Saves immediately whenever an attribute of the annotation changed, or whenever a form field value got updated. */
  readonly IMMEDIATE: "IMMEDIATE";
  /** Saves annotations automatically, when the user finishes editing an annotation. For form fields, this behaves like {@link AutoSaveMode.IMMEDIATE}. */
  readonly INTELLIGENT: "INTELLIGENT";
  /**
   * Never saves annotations or form field values automatically. Annotations and form field values can still be saved via {@link Instance#save}
   *
   * In this mode, document signatures validation information will not be automatically updated
   * if the document is modified, until changes are saved.
   */
  readonly DISABLED: "DISABLED";
};

declare type BackendRequiredKeys = 'id' | 'v' | 'pageIndex' | 'type' | 'bbox';

declare interface BaseAnnotationJSON extends ICollaboratorPermissionsOptions {
  v: number;
  type?: 'pspdfkit/ink' | 'pspdfkit/shape/line' | 'pspdfkit/shape/rectangle' | 'pspdfkit/shape/ellipse' | 'pspdfkit/shape/polygon' | 'pspdfkit/shape/polyline' | 'pspdfkit/link' | 'pspdfkit/markup/highlight' | 'pspdfkit/markup/squiggly' | 'pspdfkit/markup/strikeout' | 'pspdfkit/markup/underline' | 'pspdfkit/markup/redaction' | 'pspdfkit/stamp' | 'pspdfkit/text' | 'pspdfkit/note' | 'pspdfkit/image' | 'pspdfkit/media' | 'pspdfkit/widget' | 'pspdfkit/comment-marker' | 'pspdfkit/unknown';
  name?: string | null;
  id: string;
  subject?: string | null;
  pdfObjectId?: number | null;
  pageIndex: number;
  bbox: IRectJSON;
  opacity?: number;
  flags?: ('noPrint' | 'noZoom' | 'noRotate' | 'noView' | 'hidden' | 'locked' | 'lockedContents' | 'readOnly')[] | null;
  action?: Serializers.ActionJSON | null;
  note?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  creatorName?: string | null;
  customData?: Record<string, unknown> | null;
  isCommentThreadRoot?: boolean;
  isAnonymous?: boolean;
  APStreamCache?: {
    cache: string;
  } | {
    attach: string;
  };
  blendMode?: IBlendMode | null;
}

/** @inline */
declare interface BaseDocumentEditorToolbarItem extends Omit<ToolItem_2, 'type' | 'onPress' | 'disabled' | 'selected' | 'icon' | 'className'> {
  /**
   * ***required***
   *
   * The type of a document editor toolbar item.
   *
   * It can either be `custom` for user defined items or one from the {@link NutrientViewer.defaultDocumentEditorToolbarItems}.
   *
   * Note: It is ***not*** possible to override this option for built-in toolbar items.
   *
   * @example
   * // In your JavaScript
   * const documentEditorToolbarItems = NutrientViewer.defaultDocumentEditorToolbarItems
   * documentEditorToolbarItems.push({ type: 'custom', ... })
   * NutrientViewer.load({
   *  ...otherOptions,
   *  documentEditorToolbarItems
   * });
   */
  type: string;
  /**
   * Unique identifier for the item.
   *
   * This is useful to identify items whose `type` is `custom`.
   *
   * @example
   * // In your JavaScript
   * const documentEditorToolbarItems = NutrientViewer.defaultDocumentEditorToolbarItems
   * documentEditorToolbarItems.push({ type: 'custom', id: 'my-button', ... })
   * NutrientViewer.load({
   *  ...otherOptions,
   *  documentEditorToolbarItems
   * });
   *
   * Note: It is ***not*** possible to override this option for built-in document editor toolbar items.
   */
  id?: string;
  /**
   * Useful to set a custom CSS class name on the item.
   *
   * For {@link NutrientViewer.defaultDocumentEditorToolbarItems | default document editor toolbar items} the `className` is appended to the default
   * item ones.
   */
  className?: string;
  /**
   * Icon for the item.
   *
   * The icon should either be an URL, a base64 encoded image or the HTML for an inline SVG.
   * This property can override the {@link NutrientViewer.defaultDocumentEditorToolbarItems | default items}' ones.
   */
  icon?: string;
  /**
   * Whether a custom item is selected or not.
   *
   * The selected status of {@link NutrientViewer.defaultDocumentEditorToolbarItems | default items} cannot be altered.
   *
   * Note: It is ***not*** possible to override this option for built-in document editor toolbar items.
   */
  selected?: boolean;
  /**
   * Whether the item is disabled or not.
   *
   * The property can be used to force a {@link NutrientViewer.defaultDocumentEditorToolbarItems | default item} to be
   * disabled by setting it to `true`.
   */
  disabled?: boolean;
}

declare interface BaseFormFieldJSON {
  v: 1;
  pdfObjectId?: number | null;
  annotationIds: Array<string>;
  name: string;
  label: string;
  flags?: FormFieldFlags;
  id: string;
  additionalActions?: SerializedAdditionalActionsType;
  group?: IGroup;
  permissions?: IPermissions;
}

declare class BaseMixin {}

declare type BaseTextMarkupAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
  rects: [number, number, number, number][];
};

declare abstract class BaseTextMarkupSerializer extends AnnotationSerializer {
  annotation: RedactionAnnotation | TextMarkupAnnotation;
  constructor(annotation: RedactionAnnotation | TextMarkupAnnotation);
  toJSON(): BaseTextMarkupAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<BaseTextMarkupAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): {
    rects: List<Rect>;
    group?: string | null | undefined;
    canSetGroup?: boolean | undefined;
    isEditable?: boolean | undefined;
    isDeletable?: boolean | undefined;
    blendMode?: IBlendMode | undefined;
    id: string | null;
    name: string | null;
    subject: string | null;
    pdfObjectId: number | null;
    pageIndex: number;
    opacity: number;
    boundingBox: Rect;
    noPrint: boolean;
    noZoom: boolean;
    noRotate: boolean;
    noView: boolean;
    hidden: boolean;
    locked: boolean;
    lockedContents: boolean;
    readOnly: boolean;
    action: Action | null | undefined;
    note: string | null;
    createdAt: Date;
    updatedAt: Date;
    creatorName: string | null;
    customData: Record<string, unknown> | null;
    isCommentThreadRoot: boolean;
    isAnonymous: boolean;
  };
}

declare let baseUrl: string | undefined;

/**
 * Represents one of the available blend modes for highlight and ink annotations.
 *
 * @enum
 */
declare const BlendMode: {
  readonly normal: "normal";
  readonly multiply: "multiply";
  readonly screen: "screen";
  readonly overlay: "overlay";
  readonly darken: "darken";
  readonly lighten: "lighten";
  readonly colorDodge: "colorDodge";
  readonly colorBurn: "colorBurn";
  readonly hardLight: "hardLight";
  readonly softLight: "softLight";
  readonly difference: "difference";
  readonly exclusion: "exclusion";
};

/**
 * @class
 * This record is used to persist the information for a bookmark.
 *
 * A bookmark is an object that registers a PDF action, usually triggered to go to a page.
 * @example
 * Creating a bookmark for the 3rd page of a document.
 * ```ts
 * const bookmark = new NutrientViewer.Bookmark({
 *   name: 'test bookmark',
 *   action: new NutrientViewer.Actions.GoToAction({ pageIndex: 3 })
 * });
 * instance.create(bookmark);
 * ```
 *
 * @public
 * @summary Bookmark element.
 * @hideconstructor
 * @see {@link Instance#create} | {@link Instance#delete}
 * @see {@link Instance#ensureChangesSaved} | {@link Instance#getBookmarks}
 * @see {@link Instance#hasUnsavedChanges} | {@link Instance#save}
 * @see {@link Instance#update} | {@link NutrientViewer.EventName.BOOKMARKS_CHANGE}
 * @see {@link NutrientViewer.EventName.BOOKMARKS_WILL_SAVE} | {@link NutrientViewer.EventName.BOOKMARKS_DID_SAVE}
 * @see {@link NutrientViewer.EventName.BOOKMARKS_LOAD} | {@link NutrientViewer.EventName.BOOKMARKS_CREATE}
 * @see {@link NutrientViewer.EventName.BOOKMARKS_UPDATE} | {@link NutrientViewer.EventName.BOOKMARKS_DELETE}
 */
export declare class Bookmark extends Bookmark_base {
  id: ID_2;
  action: Action;
  /** Bookmark serializer. Converts a bookmark to InstantJSON compliant objects. */
  static toSerializableObject: typeof toJSON;
  /** Bookmark deserializer. Converts a bookmark object to a {@link NutrientViewer.Bookmark}. */
  static fromSerializableObject: (bookmark: Serializers.BookmarkJSON) => Bookmark;
}

declare const Bookmark_base: Immutable.Record.Factory<BookmarkProps>;

/** @inline */
declare type BookmarkProps = {
  /**
   * A unique identifier to describe the bookmark. When a bookmark is created in the UI, the
   * viewer has to generate a unique ID.
   *
   * When changes are saved to the underlying bookmark provider, we call
   * {@link Instance#ensureChangesSaved} to make sure the annotation has been persisted
   * from the provider.
   */
  id: ID_2 | null;
  /**
   * When the bookmark is extracted directly from a PDF file, the `pdfBookmarkId` refers to the
   * identifier that was used in the PDF document.
   *
   * This ID is optional since newly created bookmarks using the SYNCProvider annotation provider
   * won't have a `pdfBookmarkId` assigned.
   *
   * @default null
   */
  pdfBookmarkId: ID_2 | null;
  /**
   * *optional*
   *
   * An optional name to associate to the bookmark.
   *
   * @default null
   */
  name: string | null;
  /**
   * The action that will be triggered when the bookmark is either clicked or tapped.
   *
   * Please refer to {@link NutrientViewer.Actions} for an in-depth look at PDF actions.
   */
  action: Action | null;
};

declare function BookmarksMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Returns a {@link NutrientViewer.Immutable.List} of {@link Bookmark} for the current document.
     *
     * The list contains an immutable snapshot of the currently available bookmarks in the UI for
     * the page.
     *
     * When you want to keep a reference to the latest bookmarks, you can listen for
     * {@link NutrientViewer.EventName.BOOKMARKS_CHANGE},
     * {@link NutrientViewer.EventName.BOOKMARKS_WILL_SAVE}, or
     * {@link NutrientViewer.EventName.BOOKMARKS_DID_SAVE} to update your reference.
     *
     * @example
     * instance.getBookmarks().then(function (bookmarks) {
     *   bookmarks.forEach(bookmark => {
     *     console.log(bookmark.name);
     *   });
     *
     *   // Get the number of currently loaded bookmarks
     *   const totalBookmarks = bookmarks.size;
     * })
     *
     * @returns Resolves to bookmarks for the given page.
     */
    getBookmarks(): Promise<List<Bookmark>>;

  };
} & T;

/**
 * Represents one of the available border styles for the widget annotations.
 *
 * @enum
 */
declare const BorderStyle: {
  readonly solid: "solid";
  readonly dashed: "dashed";
  readonly beveled: "beveled";
  readonly inset: "inset";
  readonly underline: "underline";
};

/**
 * Performs processing via Nutrient Backend {@link https://www.nutrient.io/api/reference/public/#tag/Build-API|Build API}.
 *
 * * Document Engine (requires Document Engine >= 1.6.0)
 * * {@link https://www.nutrient.io/api/|DWS}
 *
 * In you are running in standalone mode, the resulting `ArrayBuffer` can be converted to PDF with {@link NutrientViewer.convertToPDF()} (if it's not already PDF)
 * and then loaded with {@link NutrientViewer.load()}.
 *
 * @example
 * NutrientViewer.build(
 *  // Authorize request.
 *  { jwt: authPayload.jwt },
 *  // Instructions for the processing request.
 *  {
 *    parts: [
 *      // Use first input as the first part of the final document.
 *      { file: "document" },
 *      // Use a sample DOCX document served from URL as the second part of the final document.
 *      {
 *        file: {
 *          url: "https://www.nutrient.io/api/downloads/samples/docx/document.docx",
 *        },
 *      },
 *    ],
 *  },
 *  // Inputs required by the request. These will be uploaded with the request. The remote file served from URL does not need to be uploaded.
 *  [{ name: "document", content: document }]
 *);
 *
 * @param authPayload - Information needed to authenticate processing request with Nutrient backend.
 * @param instructions - Build API instructions that describe the processing operation.
 * @param inputs - An array of all inputs required for the processing operation.
 * @returns Promise that resolves to an `ArrayBuffer` with the processing result.
 *                                  In case of an error, rejects with a {@link NutrientViewer.Error} with detailed error message.
 * @since Document Engine 1.6.0
 */
declare function build(authPayload: ProcessingAuthPayload, instructions: BuildInstructions, inputs?: BuildInput[]): Promise<ArrayBuffer>;

/**
 * Represents a processing input referenced by {@link BuildInstructions} that needs to be uploaded with the processing request.
 *
 * @property name - Name of the input, used to reference the input in {@link BuildInstructions}
 * @property content - Content of the input that will be uploaded to the backend for processing.
 */
export declare type BuildInput = {
  name: string;
  content: ArrayBuffer | Blob;
};

/**
 * The description of the processing operation performed via Build API.
 *
 * For a full reference of the Build API instructions, see the
 * {@link https://www.nutrient.io/api/reference/public/#tag/Build-API/Instructions-Schema | Instructions Schema}.
 */
export declare type BuildInstructions = {
  [key: string]: any;
};

/** @inline */
declare type BuiltInAnnotationToolbarItem = {
  type: IAnnotationToolbarType;
};

/** @inline */
declare type BuiltInColorProperty = 'color' | 'stroke-color' | 'fill-color' | 'background-color' | 'font-color' | 'outline-color' | 'border-color';

declare type BuiltInDocumentEditorFooterItem = 'cancel' | 'spacer' | 'save-as' | 'save' | 'selected-pages' | 'loading-indicator';

/** @inline */
declare type BuiltInDocumentEditorToolbarItemType = 'add' | 'remove' | 'duplicate' | 'rotate-left' | 'rotate-right' | 'move' | 'move-left' | 'move-right' | 'import-document' | 'extract-pages' | 'spacer' | 'undo' | 'redo' | 'select-all' | 'select-none' | 'zoom-out' | 'zoom-in';

declare const builtInItems: readonly ["highlight", "strikeout", "underline", "squiggle", "redact-text-highlighter", "comment", "ai-assistant"];

/**
 * See {@link https://www.nutrient.io/baseline-ui/?path=/docs/theming--docs#theme-object-structure | BUI Theme documentation} for more information.
 *
 * @interface
 * */
export declare type BUITheme = typeof themeContract;

/**
 * @class
 * A button that can be pressed.
 *
 * To retrieve a list of all form fields, use {@link Instance#getFormFields}.
 * @public
 * @summary A clickable button.
 */
export declare class ButtonFormField extends FormField {
  /**
   * The label for the button widget annotation.
   */
  buttonLabel: string | null;
}

/**
 * Properties of the arrow line attached to a callout (text) annotation.
 *
 * @summary Callout arrow line properties.
 */
declare class Callout extends InheritableImmutableRecord<ICallout> {
  /** Starting point of the arrow line. */
  start: Point | null;
  /** Knee point of the arrow line. */
  knee: Point | null;
  /** Ending point of the arrow line. */
  end: Point | null;
  /** The line cap style. */
  cap: ILineCap | null;
  /** The inner rectangle inset. */
  innerRectInset: Inset | null;
  static defaultValues: ICallout;
}

/**
 * The different possible validation states of the certificate chain.
 *
 * @enum
 */
export declare const CertificateChainValidationStatus: {
  /**
   * The certificate chain validates correctly.
   */
  readonly ok: "ok";
  /**
   * The certificate chain contains a self-signed certificate.
   */
  readonly ok_but_self_signed: "ok_but_self_signed";
  /**
   * Revocation check network error. Either due to invalid server URL or network timeout.
   * The certificate is valid with a warning.
   */
  readonly ok_but_could_not_check_revocation: "ok_but_could_not_check_revocation";
  /**
   * The certificate chain contains a certificate that has been classified as "untrusted".
   *
   * The certificate date is correct, but the identity is unknown because it has not been
   * included in the list of trusted certificates and none of its parents are trusted
   * certificates.
   */
  readonly untrusted: "untrusted";
  /**
   * The certificate used to sign the document has expired now.
   * Note that the certificate may be valid at the time the document was signed,
   * which is not checked.
   */
  readonly expired: "expired";
  /**
   * The certificate used to sign the document is not valid yet.
   */
  readonly not_yet_valid: "not_yet_valid";
  /**
   * The certificate is not valid.
   */
  readonly invalid: "invalid";
  /**
   * The certificate has been revoked.
   */
  readonly revoked: "revoked";
  /**
   * Could not fetch the contents of the signature.
   */
  readonly failed_to_retrieve_signature_contents: "failed_to_retrieve_signature_contents";
  /**
   * An unknown problem happened when the certificate trust chain was validated.
   *
   * Between the possible reasons for this could be that the signature is malformed,
   * the certificate chain is too long and other unknown conditions.
   */
  readonly general_validation_problem: "general_validation_problem";
};

/** @inline */
declare type CertificateChainValidationStatusType = (typeof CertificateChainValidationStatus)[keyof typeof CertificateChainValidationStatus];

/**
 * An union of supported types of changes.
 */
export declare type Change = AnnotationsUnion | Bookmark | FormField | FormFieldValue | Comment_2;

declare function ChangesMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * With {@link NutrientViewer.AutoSaveMode} it's possible to define when local changes get saved, but
     * it's also possible to define the point to save changes yourself.
     *
     * By choosing {@link NutrientViewer.AutoSaveMode.DISABLED}, nothing gets saved automatically, but
     * by calling `save`, it's possible to manually trigger save. This can be useful when you want
     * to have full control when new changes get saved to your backend.
     *
     * @example
     * NutrientViewer.load(configuration).then(async (instance) => {
     *   const annotation = new NutrientViewer.Annotations.InkAnnotation({
     *     pageIndex: 0,
     *     lines: NutrientViewer.Immutable.List([
     *       NutrientViewer.Immutable.List([
     *         new NutrientViewer.Geometry.DrawingPoint({ x: 0,   y: 0  }),
     *         new NutrientViewer.Geometry.DrawingPoint({ x: 100, y: 100}),
     *       ])
     *     ])
     *   });
     *
     *  await instance.create(annotation);
     *
     *  await instance.save(); // Now the annotation gets saved.
     * })
     *
     * @returns Promise that resolves once all changes are saved on remote server (in case of server-based backend) or in local backend (in case of standalone). If changes could not be saved, rejects with {@link NutrientViewer.SaveError}.
     */
    save(): Promise<void>;
    /**
     * Returns `true` if any local changes are not yet saved. This can be used in combination with
     * {@link Configuration.autoSaveMode} to implement fine grained save controls.
     *
     * Whenever changes are saved (for example, when calling {@link NutrientViewer.Instance#save}),
     * the method will return `false` again.
     *
     * @example
     * NutrientViewer.load(configuration).then(function(instance) {
     *   instance.hasUnsavedChanges(); // => false
     * });
     *
     * @returns Whether unsaved changes are present or not.
     */
    hasUnsavedChanges(): boolean;
















































    /**
     * Creates new changes and assigns them IDs.
     * If you need to ensure that changes are persisted by the backend, please refer to:
     * {@link NutrientViewer.Instance#ensureChangesSaved}.
     *
     * This method returns a promise that will resolve to an array of records with the local IDs set.
     *
     * New changes will be made visible in the UI instantly.
     *
     * @example
     * NutrientViewer.load(configuration).then(function(instance) {
     *   const annotation = new NutrientViewer.Annotations.InkAnnotation({
     *     pageIndex: 0,
     *     lines: NutrientViewer.Immutable.List([
     *       NutrientViewer.Immutable.List([
     *         new NutrientViewer.Geometry.DrawingPoint({ x: 0,   y: 0  }),
     *         new NutrientViewer.Geometry.DrawingPoint({ x: 100, y: 100}),
     *       ])
     *     ])
     *   });
     *   instance.create(annotation).then(function(createdAnnotations) {
     *     console.log(createdAnnotations);
     *   });
     * })
     *
     * @public
     * @param changes - A single change or a list/array of changes that should be created.
     * @returns A promise that resolves to an array of created changes or an error if some changes could not be created.
     */
    create(changes: Change | Array<Change> | List<Change>): Promise<Array<Change>>;
    /**
     * Updates object and changes its contents.
     *
     * If you need to ensure that changes are persisted by the backend, please refer to:
     * {@link Instance#ensureChangesSaved}.
     *
     * New changes will be made visible in the UI instantly.
     *
     * @example
     * const instance = await NutrientViewer.load(configuration);
     * // Get all annotations on the first page
     * const annotations = instance.getAnnotations(0);
     * // Grab the first one
     * const annotation = annotations.first();
     *
     * const editedAnnotation = annotation.set("noPrint", true);
     * const updatedAnnotation = await instance.update(editedAnnotation);
     *
     * editedAnnotation === updatedAnnotation; // => true
     *
     * @public
     * @param changes - A single change or list/array of changes that should be updated.
     * @returns A promise that resolves to an array of changes or an error if some changes could not be updated.
     */
    update(changes: Change | Array<Change> | List<Change>): Promise<Array<Change>>;
    /**
     * Deletes a change. This can be called with a change ID.
     *
     * If you need to ensure that changes are persisted by the backend, please refer to:
     * {@link Instance#ensureChangesSaved}.
     *
     * Deleted changes will be made visible in the UI instantly.
     *
     * If the deleted change is a `NutrientViewer.Annotations.WidgetAnnotation`
     * (which can only be deleted if the Form Creator component is present in
     * the license, and the backend is using a Form Creator capable provider),
     * and the associated `NutrientViewer.FormField` only includes that annotation in
     * its `annotationIds` list, the form field will also be deleted.
     *
     * If there are more widget annotations remaining in the `annotationIds` list,
     * as could be the case for radio buttons, for example, the form field's
     * `annotationIds` property will be updated by removing the deleted
     * annotation's `id` from it.
     *
     * @example
     * NutrientViewer.load(configuration).then(function(instance) {
     *   instance.delete(1).then(function() {
     *     console.log("Object with ID 1 deleted.");
     *   });
     * });
     *
     * @public
     * @param changeIds - A single id or a list/array of ids of changes that should be deleted.
     * @returns A promise that resolves to an array of deleted changes or an error if some changes could not be deleted.
     */
    delete(changeIds: InstantID_2 | Change | Array<InstantID_2 | Change> | List<InstantID_2 | Change>): Promise<Array<Change>>;
    /**
     * Ensures that changes have been saved to the backend and returns the current persisted state of
     * these changes.
     *
     * This method returns a promise that will resolve to an array of {@link Change}.
     *
     * @example
     * NutrientViewer.load(configuration).then(function(instance) {
     *   instance.create(newAnnotation)
     *     .then(instance.ensureChangesSaved)
     *     .then(function() {
     *       console.log('Annotation persisted by annotation provider');
     *     });
     * });
     *
     * @public
     * @param changes - A single change or a list/array of changes to ensure saved.
     * @returns A promise that resolves to an array of changes or an error if some changes could not be saved.
     */
    ensureChangesSaved(changes: Change | Array<Change> | List<Change>): Promise<Array<Change>>;

  };
} & T;

/**
 * @class
 * A check box that can either be checked or unchecked. One check box form field can also be
 * associated to multiple single check box widgets. In this case, `option` contains the value of the
 * associated {@link NutrientViewer.FormOption}
 *
 * To retrieve a list of all form fields, use {@link NutrientViewer.Instance#getFormFields}.
 * @public
 * @summary A check box or a group of many check boxes.
 */
export declare class CheckBoxFormField extends FormField {
  /**
   * An immutable list of all selected form option values. If no options are defined, a checked
   * check box will have `values: List(["Yes"]);`.
   *
   * If the list is empty, no check box is checked.
   *
   * In order to modify it, {@link NutrientViewer.Instance.setFormFieldValues | instance.setFormFieldValues()} should be used.
   */
  readonly values: List<string>;
  /**
   * Similar to the `value` property. The default values are only used when a form needs to be reset.
   */
  defaultValues: List<string>;
  /**
   * A list of {@link NutrientViewer.FormOption}s. This is necessary for multiple check boxes in a group.
   *
   * See {@link NutrientViewer.FormOption} for more information.
   */
  options: List<FormOption>;
  /**
   * Radio buttons and checkboxes can have multiple widgets with the same form value associated, but can be
   * selected independently. `optionIndexes` contains the value indexes that should be actually set.
   *
   * If set, the `value` field doesn't get used, and the widget found at the corresponding indexes in the form field's
   * `annotationIds` property are checked.
   *
   * If set on fields other than radio buttons or checkboxes, setting the form value will fail.
   */
  optionIndexes?: List<number>;
}

/**
 * @class
 *
 * Base form field type for all form fields that allow multiple choices:
 *
 * - {@link FormFields.ComboBoxFormField}
 * - {@link FormFields.ListBoxFormField}
 * @public
 * @summary Base form field for all fields allowing multiple choices.
 */
export declare class ChoiceFormField extends FormField {
  /**
   * A list of {@link FormOption}s. This is necessary for multiple check boxes in a group.
   *
   * See {@link FormOption} for more information.
   */
  options: List<FormOption>;
  /**
   * An immutable list of all selected form option values. If no options are defined, a checked
   * check box will have `values: List(["Yes"]);`.
   *
   * If the list is empty, no check box is checked.
   *
   * In order to modify it, {@link Instance#setFormFieldValues | instance.setFormFieldValues()} should be used.
   */
  readonly values: List<string>;
  /**
   * Similar to the `value` property. The default values are only used when a form needs to be reset.
   */
  readonly defaultValues: List<string>;
  /**
   * If true, more than one of the field’s option items may be selected simultaneously. Otherwise,
   * no more than one item at a time may be selected.
   *
   * @default false
   */
  multiSelect: boolean;
  /**
   * If true, the new value is committed as soon as a selection is made, without requiring the user
   * to exit the field. Otherwise, the new value is not committed until the user exits the field.
   *
   * Please note that {@link Instance#getFormFieldValues} will not return
   * the latest value for this field until the user leaves this field by default. If you
   * want this value to update on every change then set this to true.
   *
   * @default false
   */
  commitOnChange: boolean;
}

/** @inline */
declare type Class<T> = new (...args: any[]) => T;

declare function CollaborationPermissionsMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * This method is used to update the group that will be used by default in all the
     * newly created form-fields, comments and annotations. If you don't have permission to
     * change the group, you will get error when you try to add an annotation, comment or form-field.
     *
     * This method is no-op if Collaboration Permissions is not enabled.
     *
     * @public
     * @param group - The new group that you want to use for all the newly created form-fields, comments and annotations.
     */
    setGroup(group: string): void;
    /**
     * This method can be used to change the default group back to original after it was changed to
     * something else using `instance.setGroup`.
     *
     * This method is no-op if Collaboration Permissions is not enabled.
     *
     * @public
     */
    resetGroup(): void;

  };
} & T;

/**
 * Creates a Collection.
 *
 * The type of Collection created is based on the input.
 *
 *   * If an `Collection`, that same `Collection`.
 *   * If an Array-like, an `Collection.Indexed`.
 *   * If an Object with an Iterator defined, an `Collection.Indexed`.
 *   * If an Object, an `Collection.Keyed`.
 *
 * This methods forces the conversion of Objects and Strings to Collections.
 * If you want to ensure that a Collection of one item is returned, use
 * `Seq.of`.
 *
 * Note: An Iterator itself will be treated as an object, becoming a `Seq.Keyed`,
 * which is usually not what you want. You should turn your Iterator Object into
 * an iterable object by defining a Symbol.iterator (or @@iterator) method which
 * returns `this`.
 *
 * Note: `Collection` is a conversion function and not a class, and does not
 * use the `new` keyword during construction.
 */
declare function Collection<I extends Collection<any, any>>(collection: I): I;

declare function Collection<T>(collection: Iterable<T>): Collection.Indexed<T>;

declare function Collection<V>(obj: {[key: string]: V;}): Collection.Keyed<string, V>;

/**
 * The `Collection` is a set of (key, value) entries which can be iterated, and
 * is the base class for all collections in `immutable`, allowing them to
 * make use of all the Collection methods (such as `map` and `filter`).
 *
 * Note: A collection is always iterated in the same order, however that order
 * may not always be well defined, as is the case for the `Map` and `Set`.
 *
 * Collection is the abstract base class for concrete data structures. It
 * cannot be constructed directly.
 *
 * Implementations should extend one of the subclasses, `Collection.Keyed`,
 * `Collection.Indexed`, or `Collection.Set`.
 */
declare module Collection {

  /**
   * @deprecated use `const { isKeyed } = require('immutable')`
   */
  function isKeyed(maybeKeyed: any): maybeKeyed is Collection.Keyed<any, any>;

  /**
   * @deprecated use `const { isIndexed } = require('immutable')`
   */
  function isIndexed(maybeIndexed: any): maybeIndexed is Collection.Indexed<any>;

  /**
   * @deprecated use `const { isAssociative } = require('immutable')`
   */
  function isAssociative(maybeAssociative: any): maybeAssociative is Collection.Keyed<any, any> | Collection.Indexed<any>;

  /**
   * @deprecated use `const { isOrdered } = require('immutable')`
   */
  function isOrdered(maybeOrdered: any): boolean;


  /**
   * Keyed Collections have discrete keys tied to each value.
   *
   * When iterating `Collection.Keyed`, each iteration will yield a `[K, V]`
   * tuple, in other words, `Collection#entries` is the default iterator for
   * Keyed Collections.
   */
  module Keyed {}

  /**
   * Creates a Collection.Keyed
   *
   * Similar to `Collection()`, however it expects collection-likes of [K, V]
   * tuples if not constructed from a Collection.Keyed or JS Object.
   *
   * Note: `Collection.Keyed` is a conversion function and not a class, and
   * does not use the `new` keyword during construction.
   */
  function Keyed<K, V>(collection: Iterable<[K, V]>): Collection.Keyed<K, V>;
  function Keyed<V>(obj: {[key: string]: V;}): Collection.Keyed<string, V>;

  interface Keyed<K, V> extends Collection<K, V> {
    /**
     * Deeply converts this Keyed collection to equivalent native JavaScript Object.
     *
     * Converts keys to Strings.
     */
    toJS(): Object;

    /**
     * Shallowly converts this Keyed collection to equivalent native JavaScript Object.
     *
     * Converts keys to Strings.
     */
    toJSON(): {[key: string]: V;};

    /**
     * Shallowly converts this collection to an Array.
     */
    toArray(): Array<[K, V]>;

    /**
     * Returns Seq.Keyed.
     * @override
     */
    toSeq(): Seq.Keyed<K, V>;


    // Sequence functions

    /**
     * Returns a new Collection.Keyed of the same type where the keys and values
     * have been flipped.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * Map({ a: 'z', b: 'y' }).flip()
     * // Map { "z": "a", "y": "b" }
     * ```
     */
    flip(): Collection.Keyed<V, K>;

    /**
     * Returns a new Collection with other collections concatenated to this one.
     */
    concat<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): Collection.Keyed<K | KC, V | VC>;
    concat<C>(...collections: Array<{[key: string]: C;}>): Collection.Keyed<K | string, V | C>;

    /**
     * Returns a new Collection.Keyed with values passed through a
     * `mapper` function.
     *
     * ```js
     * const { Collection } = require('immutable')
     * Collection.Keyed({ a: 1, b: 2 }).map(x => 10 * x)
     * // Seq { "a": 10, "b": 20 }
     * ```
     *
     * Note: `map()` always returns a new instance, even if it produced the
     * same value at every step.
     */
    map<M>(
    mapper: (value: V, key: K, iter: this) => M,
    context?: any)
    : Collection.Keyed<K, M>;

    /**
     * Returns a new Collection.Keyed of the same type with keys passed through
     * a `mapper` function.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * Map({ a: 1, b: 2 }).mapKeys(x => x.toUpperCase())
     * // Map { "A": 1, "B": 2 }
     * ```
     *
     * Note: `mapKeys()` always returns a new instance, even if it produced
     * the same key at every step.
     */
    mapKeys<M>(
    mapper: (key: K, value: V, iter: this) => M,
    context?: any)
    : Collection.Keyed<M, V>;

    /**
     * Returns a new Collection.Keyed of the same type with entries
     * ([key, value] tuples) passed through a `mapper` function.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * Map({ a: 1, b: 2 })
     *   .mapEntries(([ k, v ]) => [ k.toUpperCase(), v * 2 ])
     * // Map { "A": 2, "B": 4 }
     * ```
     *
     * Note: `mapEntries()` always returns a new instance, even if it produced
     * the same entry at every step.
     */
    mapEntries<KM, VM>(
    mapper: (entry: [K, V], index: number, iter: this) => [KM, VM],
    context?: any)
    : Collection.Keyed<KM, VM>;

    /**
     * Flat-maps the Collection, returning a Collection of the same type.
     *
     * Similar to `collection.map(...).flatten(true)`.
     */
    flatMap<KM, VM>(
    mapper: (value: V, key: K, iter: this) => Iterable<[KM, VM]>,
    context?: any)
    : Collection.Keyed<KM, VM>;

    /**
     * Returns a new Collection with only the values for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends V>(
    predicate: (value: V, key: K, iter: this) => value is F,
    context?: any)
    : Collection.Keyed<K, F>;
    filter(
    predicate: (value: V, key: K, iter: this) => any,
    context?: any)
    : this;

    [Symbol.iterator](): IterableIterator<[K, V]>;
  }


  /**
   * Indexed Collections have incrementing numeric keys. They exhibit
   * slightly different behavior than `Collection.Keyed` for some methods in order
   * to better mirror the behavior of JavaScript's `Array`, and add methods
   * which do not make sense on non-indexed Collections such as `indexOf`.
   *
   * Unlike JavaScript arrays, `Collection.Indexed`s are always dense. "Unset"
   * indices and `undefined` indices are indistinguishable, and all indices from
   * 0 to `size` are visited when iterated.
   *
   * All Collection.Indexed methods return re-indexed Collections. In other words,
   * indices always start at 0 and increment until size. If you wish to
   * preserve indices, using them as keys, convert to a Collection.Keyed by
   * calling `toKeyedSeq`.
   */
  module Indexed {}

  /**
   * Creates a new Collection.Indexed.
   *
   * Note: `Collection.Indexed` is a conversion function and not a class, and
   * does not use the `new` keyword during construction.
   */
  function Indexed<T>(collection: Iterable<T>): Collection.Indexed<T>;

  interface Indexed<T> extends Collection<number, T> {
    /**
     * Deeply converts this Indexed collection to equivalent native JavaScript Array.
     */
    toJS(): Array<any>;

    /**
     * Shallowly converts this Indexed collection to equivalent native JavaScript Array.
     */
    toJSON(): Array<T>;

    /**
     * Shallowly converts this collection to an Array.
     */
    toArray(): Array<T>;

    // Reading values

    /**
     * Returns the value associated with the provided index, or notSetValue if
     * the index is beyond the bounds of the Collection.
     *
     * `index` may be a negative number, which indexes back from the end of the
     * Collection. `s.get(-1)` gets the last item in the Collection.
     */
    get<NSV>(index: number, notSetValue: NSV): T | NSV;
    get(index: number): T | undefined;


    // Conversion to Seq

    /**
     * Returns Seq.Indexed.
     * @override
     */
    toSeq(): Seq.Indexed<T>;

    /**
     * If this is a collection of [key, value] entry tuples, it will return a
     * Seq.Keyed of those entries.
     */
    fromEntrySeq(): Seq.Keyed<any, any>;


    // Combination

    /**
     * Returns a Collection of the same type with `separator` between each item
     * in this Collection.
     */
    interpose(separator: T): this;

    /**
     * Returns a Collection of the same type with the provided `collections`
     * interleaved into this collection.
     *
     * The resulting Collection includes the first item from each, then the
     * second from each, etc.
     *
     * <!-- runkit:activate
     *      { "preamble": "require('immutable')"}
     * -->
     * ```js
     * const { List } = require('immutable')
     * List([ 1, 2, 3 ]).interleave(List([ 'A', 'B', 'C' ]))
     * // List [ 1, "A", 2, "B", 3, "C"" ]
     * ```
     *
     * The shortest Collection stops interleave.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable')" }
     * -->
     * ```js
     * List([ 1, 2, 3 ]).interleave(
     *   List([ 'A', 'B' ]),
     *   List([ 'X', 'Y', 'Z' ])
     * )
     * // List [ 1, "A", "X", 2, "B", "Y"" ]
     * ```
     *
     * Since `interleave()` re-indexes values, it produces a complete copy,
     * which has `O(N)` complexity.
     *
     * Note: `interleave` *cannot* be used in `withMutations`.
     */
    interleave(...collections: Array<Collection<any, T>>): this;

    /**
     * Splice returns a new indexed Collection by replacing a region of this
     * Collection with new values. If values are not provided, it only skips the
     * region to be removed.
     *
     * `index` may be a negative number, which indexes back from the end of the
     * Collection. `s.splice(-2)` splices after the second to last item.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List } = require('immutable')
     * List([ 'a', 'b', 'c', 'd' ]).splice(1, 2, 'q', 'r', 's')
     * // List [ "a", "q", "r", "s", "d" ]
     * ```
     *
     * Since `splice()` re-indexes values, it produces a complete copy, which
     * has `O(N)` complexity.
     *
     * Note: `splice` *cannot* be used in `withMutations`.
     */
    splice(
    index: number,
    removeNum: number,
    ...values: Array<T>)
    : this;

    /**
     * Returns a Collection of the same type "zipped" with the provided
     * collections.
     *
     * Like `zipWith`, but using the default `zipper`: creating an `Array`.
     *
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable')" }
     * -->
     * ```js
     * const a = List([ 1, 2, 3 ]);
     * const b = List([ 4, 5, 6 ]);
     * const c = a.zip(b); // List [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
     * ```
     */
    zip<U>(other: Collection<any, U>): Collection.Indexed<[T, U]>;
    zip<U, V>(other: Collection<any, U>, other2: Collection<any, V>): Collection.Indexed<[T, U, V]>;
    zip(...collections: Array<Collection<any, any>>): Collection.Indexed<any>;

    /**
     * Returns a Collection "zipped" with the provided collections.
     *
     * Unlike `zip`, `zipAll` continues zipping until the longest collection is
     * exhausted. Missing values from shorter collections are filled with `undefined`.
     *
     * ```js
     * const a = List([ 1, 2 ]);
     * const b = List([ 3, 4, 5 ]);
     * const c = a.zipAll(b); // List [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]
     * ```
     */
    zipAll<U>(other: Collection<any, U>): Collection.Indexed<[T, U]>;
    zipAll<U, V>(other: Collection<any, U>, other2: Collection<any, V>): Collection.Indexed<[T, U, V]>;
    zipAll(...collections: Array<Collection<any, any>>): Collection.Indexed<any>;

    /**
     * Returns a Collection of the same type "zipped" with the provided
     * collections by using a custom `zipper` function.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable')" }
     * -->
     * ```js
     * const a = List([ 1, 2, 3 ]);
     * const b = List([ 4, 5, 6 ]);
     * const c = a.zipWith((a, b) => a + b, b);
     * // List [ 5, 7, 9 ]
     * ```
     */
    zipWith<U, Z>(
    zipper: (value: T, otherValue: U) => Z,
    otherCollection: Collection<any, U>)
    : Collection.Indexed<Z>;
    zipWith<U, V, Z>(
    zipper: (value: T, otherValue: U, thirdValue: V) => Z,
    otherCollection: Collection<any, U>,
    thirdCollection: Collection<any, V>)
    : Collection.Indexed<Z>;
    zipWith<Z>(
    zipper: (...any: Array<any>) => Z,
    ...collections: Array<Collection<any, any>>)
    : Collection.Indexed<Z>;


    // Search for value

    /**
     * Returns the first index at which a given value can be found in the
     * Collection, or -1 if it is not present.
     */
    indexOf(searchValue: T): number;

    /**
     * Returns the last index at which a given value can be found in the
     * Collection, or -1 if it is not present.
     */
    lastIndexOf(searchValue: T): number;

    /**
     * Returns the first index in the Collection where a value satisfies the
     * provided predicate function. Otherwise -1 is returned.
     */
    findIndex(
    predicate: (value: T, index: number, iter: this) => boolean,
    context?: any)
    : number;

    /**
     * Returns the last index in the Collection where a value satisfies the
     * provided predicate function. Otherwise -1 is returned.
     */
    findLastIndex(
    predicate: (value: T, index: number, iter: this) => boolean,
    context?: any)
    : number;

    // Sequence algorithms

    /**
     * Returns a new Collection with other collections concatenated to this one.
     */
    concat<C>(...valuesOrCollections: Array<Iterable<C> | C>): Collection.Indexed<T | C>;

    /**
     * Returns a new Collection.Indexed with values passed through a
     * `mapper` function.
     *
     * ```js
     * const { Collection } = require('immutable')
     * Collection.Indexed([1,2]).map(x => 10 * x)
     * // Seq [ 1, 2 ]
     * ```
     *
     * Note: `map()` always returns a new instance, even if it produced the
     * same value at every step.
     */
    map<M>(
    mapper: (value: T, key: number, iter: this) => M,
    context?: any)
    : Collection.Indexed<M>;

    /**
     * Flat-maps the Collection, returning a Collection of the same type.
     *
     * Similar to `collection.map(...).flatten(true)`.
     */
    flatMap<M>(
    mapper: (value: T, key: number, iter: this) => Iterable<M>,
    context?: any)
    : Collection.Indexed<M>;

    /**
     * Returns a new Collection with only the values for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends T>(
    predicate: (value: T, index: number, iter: this) => value is F,
    context?: any)
    : Collection.Indexed<F>;
    filter(
    predicate: (value: T, index: number, iter: this) => any,
    context?: any)
    : this;

    [Symbol.iterator](): IterableIterator<T>;
  }


  /**
   * Set Collections only represent values. They have no associated keys or
   * indices. Duplicate values are possible in the lazy `Seq.Set`s, however
   * the concrete `Set` Collection does not allow duplicate values.
   *
   * Collection methods on Collection.Set such as `map` and `forEach` will provide
   * the value as both the first and second arguments to the provided function.
   *
   * ```js
   * const { Collection } = require('immutable')
   * const seq = Collection.Set([ 'A', 'B', 'C' ])
   * // Seq { "A", "B", "C" }
   * seq.forEach((v, k) =>
   *  assert.equal(v, k)
   * )
   * ```
   */
  module Set {}

  /**
   * Similar to `Collection()`, but always returns a Collection.Set.
   *
   * Note: `Collection.Set` is a factory function and not a class, and does
   * not use the `new` keyword during construction.
   */
  function Set<T>(collection: Iterable<T>): Collection.Set<T>;

  interface Set<T> extends Collection<T, T> {
    /**
     * Deeply converts this Set collection to equivalent native JavaScript Array.
     */
    toJS(): Array<any>;

    /**
     * Shallowly converts this Set collection to equivalent native JavaScript Array.
     */
    toJSON(): Array<T>;

    /**
     * Shallowly converts this collection to an Array.
     */
    toArray(): Array<T>;

    /**
     * Returns Seq.Set.
     * @override
     */
    toSeq(): Seq.Set<T>;

    // Sequence algorithms

    /**
     * Returns a new Collection with other collections concatenated to this one.
     */
    concat<U>(...collections: Array<Iterable<U>>): Collection.Set<T | U>;

    /**
     * Returns a new Collection.Set with values passed through a
     * `mapper` function.
     *
     * ```
     * Collection.Set([ 1, 2 ]).map(x => 10 * x)
     * // Seq { 1, 2 }
     * ```
     *
     * Note: `map()` always returns a new instance, even if it produced the
     * same value at every step.
     */
    map<M>(
    mapper: (value: T, key: T, iter: this) => M,
    context?: any)
    : Collection.Set<M>;

    /**
     * Flat-maps the Collection, returning a Collection of the same type.
     *
     * Similar to `collection.map(...).flatten(true)`.
     */
    flatMap<M>(
    mapper: (value: T, key: T, iter: this) => Iterable<M>,
    context?: any)
    : Collection.Set<M>;

    /**
     * Returns a new Collection with only the values for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends T>(
    predicate: (value: T, key: T, iter: this) => value is F,
    context?: any)
    : Collection.Set<F>;
    filter(
    predicate: (value: T, key: T, iter: this) => any,
    context?: any)
    : this;

    [Symbol.iterator](): IterableIterator<T>;
  }

}

declare interface Collection<K, V> extends ValueObject {

  // Value equality

  /**
   * True if this and the other Collection have value equality, as defined
   * by `Immutable.is()`.
   *
   * Note: This is equivalent to `Immutable.is(this, other)`, but provided to
   * allow for chained expressions.
   */
  equals(other: any): boolean;

  /**
   * Computes and returns the hashed identity for this Collection.
   *
   * The `hashCode` of a Collection is used to determine potential equality,
   * and is used when adding this to a `Set` or as a key in a `Map`, enabling
   * lookup via a different instance.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Set,  List } = require('immutable')" }
   * -->
   * ```js
   * const a = List([ 1, 2, 3 ]);
   * const b = List([ 1, 2, 3 ]);
   * assert.notStrictEqual(a, b); // different instances
   * const set = Set([ a ]);
   * assert.equal(set.has(b), true);
   * ```
   *
   * If two values have the same `hashCode`, they are [not guaranteed
   * to be equal][Hash Collision]. If two values have different `hashCode`s,
   * they must not be equal.
   *
   * [Hash Collision]: http://en.wikipedia.org/wiki/Collision_(computer_science)
   */
  hashCode(): number;


  // Reading values

  /**
   * Returns the value associated with the provided key, or notSetValue if
   * the Collection does not contain this key.
   *
   * Note: it is possible a key may be associated with an `undefined` value,
   * so if `notSetValue` is not provided and this method returns `undefined`,
   * that does not guarantee the key was not found.
   */
  get<NSV>(key: K, notSetValue: NSV): V | NSV;
  get(key: K): V | undefined;

  /**
   * True if a key exists within this `Collection`, using `Immutable.is`
   * to determine equality
   */
  has(key: K): boolean;

  /**
   * True if a value exists within this `Collection`, using `Immutable.is`
   * to determine equality
   * @alias contains
   */
  includes(value: V): boolean;
  contains(value: V): boolean;

  /**
   * In case the `Collection` is not empty returns the first element of the
   * `Collection`.
   * In case the `Collection` is empty returns the optional default
   * value if provided, if no default value is provided returns undefined.
   */
  first<NSV>(notSetValue?: NSV): V | NSV;

  /**
   * In case the `Collection` is not empty returns the last element of the
   * `Collection`.
   * In case the `Collection` is empty returns the optional default
   * value if provided, if no default value is provided returns undefined.
   */
  last<NSV>(notSetValue?: NSV): V | NSV;

  // Reading deep values

  /**
   * Returns the value found by following a path of keys or indices through
   * nested Collections.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map, List } = require('immutable')
   * const deepData = Map({ x: List([ Map({ y: 123 }) ]) });
   * deepData.getIn(['x', 0, 'y']) // 123
   * ```
   *
   * Plain JavaScript Object or Arrays may be nested within an Immutable.js
   * Collection, and getIn() can access those values as well:
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map, List } = require('immutable')
   * const deepData = Map({ x: [ { y: 123 } ] });
   * deepData.getIn(['x', 0, 'y']) // 123
   * ```
   */
  getIn(searchKeyPath: Iterable<any>, notSetValue?: any): any;

  /**
   * True if the result of following a path of keys or indices through nested
   * Collections results in a set value.
   */
  hasIn(searchKeyPath: Iterable<any>): boolean;

  // Persistent changes

  /**
   * This can be very useful as a way to "chain" a normal function into a
   * sequence of methods. RxJS calls this "let" and lodash calls it "thru".
   *
   * For example, to sum a Seq after mapping and filtering:
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Seq } = require('immutable')
   *
   * function sum(collection) {
   *   return collection.reduce((sum, x) => sum + x, 0)
   * }
   *
   * Seq([ 1, 2, 3 ])
   *   .map(x => x + 1)
   *   .filter(x => x % 2 === 0)
   *   .update(sum)
   * // 6
   * ```
   */
  update<R>(updater: (value: this) => R): R;


  // Conversion to JavaScript types

  /**
   * Deeply converts this Collection to equivalent native JavaScript Array or Object.
   *
   * `Collection.Indexed`, and `Collection.Set` become `Array`, while
   * `Collection.Keyed` become `Object`, converting keys to Strings.
   */
  toJS(): Array<any> | {[key: string]: any;};

  /**
   * Shallowly converts this Collection to equivalent native JavaScript Array or Object.
   *
   * `Collection.Indexed`, and `Collection.Set` become `Array`, while
   * `Collection.Keyed` become `Object`, converting keys to Strings.
   */
  toJSON(): Array<V> | {[key: string]: V;};

  /**
   * Shallowly converts this collection to an Array.
   *
   * `Collection.Indexed`, and `Collection.Set` produce an Array of values.
   * `Collection.Keyed` produce an Array of [key, value] tuples.
   */
  toArray(): Array<V> | Array<[K, V]>;

  /**
   * Shallowly converts this Collection to an Object.
   *
   * Converts keys to Strings.
   */
  toObject(): {[key: string]: V;};


  // Conversion to Collections

  /**
   * Converts this Collection to a Map, Throws if keys are not hashable.
   *
   * Note: This is equivalent to `Map(this.toKeyedSeq())`, but provided
   * for convenience and to allow for chained expressions.
   */
  toMap(): Map_2<K, V>;

  /**
   * Converts this Collection to a Map, maintaining the order of iteration.
   *
   * Note: This is equivalent to `OrderedMap(this.toKeyedSeq())`, but
   * provided for convenience and to allow for chained expressions.
   */
  toOrderedMap(): OrderedMap<K, V>;

  /**
   * Converts this Collection to a Set, discarding keys. Throws if values
   * are not hashable.
   *
   * Note: This is equivalent to `Set(this)`, but provided to allow for
   * chained expressions.
   */
  toSet(): Set_2<V>;

  /**
   * Converts this Collection to a Set, maintaining the order of iteration and
   * discarding keys.
   *
   * Note: This is equivalent to `OrderedSet(this.valueSeq())`, but provided
   * for convenience and to allow for chained expressions.
   */
  toOrderedSet(): OrderedSet<V>;

  /**
   * Converts this Collection to a List, discarding keys.
   *
   * This is similar to `List(collection)`, but provided to allow for chained
   * expressions. However, when called on `Map` or other keyed collections,
   * `collection.toList()` discards the keys and creates a list of only the
   * values, whereas `List(collection)` creates a list of entry tuples.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map, List } = require('immutable')
   * var myMap = Map({ a: 'Apple', b: 'Banana' })
   * List(myMap) // List [ [ "a", "Apple" ], [ "b", "Banana" ] ]
   * myMap.toList() // List [ "Apple", "Banana" ]
   * ```
   */
  toList(): List<V>;

  /**
   * Converts this Collection to a Stack, discarding keys. Throws if values
   * are not hashable.
   *
   * Note: This is equivalent to `Stack(this)`, but provided to allow for
   * chained expressions.
   */
  toStack(): Stack<V>;


  // Conversion to Seq

  /**
   * Converts this Collection to a Seq of the same kind (indexed,
   * keyed, or set).
   */
  toSeq(): Seq<K, V>;

  /**
   * Returns a Seq.Keyed from this Collection where indices are treated as keys.
   *
   * This is useful if you want to operate on an
   * Collection.Indexed and preserve the [index, value] pairs.
   *
   * The returned Seq will have identical iteration order as
   * this Collection.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Seq } = require('immutable')
   * const indexedSeq = Seq([ 'A', 'B', 'C' ])
   * // Seq [ "A", "B", "C" ]
   * indexedSeq.filter(v => v === 'B')
   * // Seq [ "B" ]
   * const keyedSeq = indexedSeq.toKeyedSeq()
   * // Seq { 0: "A", 1: "B", 2: "C" }
   * keyedSeq.filter(v => v === 'B')
   * // Seq { 1: "B" }
   * ```
   */
  toKeyedSeq(): Seq.Keyed<K, V>;

  /**
   * Returns an Seq.Indexed of the values of this Collection, discarding keys.
   */
  toIndexedSeq(): Seq.Indexed<V>;

  /**
   * Returns a Seq.Set of the values of this Collection, discarding keys.
   */
  toSetSeq(): Seq.Set<V>;


  // Iterators

  /**
   * An iterator of this `Collection`'s keys.
   *
   * Note: this will return an ES6 iterator which does not support
   * Immutable.js sequence algorithms. Use `keySeq` instead, if this is
   * what you want.
   */
  keys(): IterableIterator<K>;

  /**
   * An iterator of this `Collection`'s values.
   *
   * Note: this will return an ES6 iterator which does not support
   * Immutable.js sequence algorithms. Use `valueSeq` instead, if this is
   * what you want.
   */
  values(): IterableIterator<V>;

  /**
   * An iterator of this `Collection`'s entries as `[ key, value ]` tuples.
   *
   * Note: this will return an ES6 iterator which does not support
   * Immutable.js sequence algorithms. Use `entrySeq` instead, if this is
   * what you want.
   */
  entries(): IterableIterator<[K, V]>;


  // Collections (Seq)

  /**
   * Returns a new Seq.Indexed of the keys of this Collection,
   * discarding values.
   */
  keySeq(): Seq.Indexed<K>;

  /**
   * Returns an Seq.Indexed of the values of this Collection, discarding keys.
   */
  valueSeq(): Seq.Indexed<V>;

  /**
   * Returns a new Seq.Indexed of [key, value] tuples.
   */
  entrySeq(): Seq.Indexed<[K, V]>;


  // Sequence algorithms

  /**
   * Returns a new Collection of the same type with values passed through a
   * `mapper` function.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Collection } = require('immutable')
   * Collection({ a: 1, b: 2 }).map(x => 10 * x)
   * // Seq { "a": 10, "b": 20 }
   * ```
   *
   * Note: `map()` always returns a new instance, even if it produced the same
   * value at every step.
   */
  map<M>(
  mapper: (value: V, key: K, iter: this) => M,
  context?: any)
  : Collection<K, M>;

  /**
   * Note: used only for sets, which return Collection<M, M> but are otherwise
   * identical to normal `map()`.
   *
   * @ignore
   */
  map<M>(...args: never[]): any;

  /**
   * Returns a new Collection of the same type with only the entries for which
   * the `predicate` function returns true.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * Map({ a: 1, b: 2, c: 3, d: 4}).filter(x => x % 2 === 0)
   * // Map { "b": 2, "d": 4 }
   * ```
   *
   * Note: `filter()` always returns a new instance, even if it results in
   * not filtering out any values.
   */
  filter<F extends V>(
  predicate: (value: V, key: K, iter: this) => value is F,
  context?: any)
  : Collection<K, F>;
  filter(
  predicate: (value: V, key: K, iter: this) => any,
  context?: any)
  : this;

  /**
   * Returns a new Collection of the same type with only the entries for which
   * the `predicate` function returns false.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * Map({ a: 1, b: 2, c: 3, d: 4}).filterNot(x => x % 2 === 0)
   * // Map { "a": 1, "c": 3 }
   * ```
   *
   * Note: `filterNot()` always returns a new instance, even if it results in
   * not filtering out any values.
   */
  filterNot(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any)
  : this;

  /**
   * Returns a new Collection of the same type in reverse order.
   */
  reverse(): this;

  /**
   * Returns a new Collection of the same type which includes the same entries,
   * stably sorted by using a `comparator`.
   *
   * If a `comparator` is not provided, a default comparator uses `<` and `>`.
   *
   * `comparator(valueA, valueB)`:
   *
   *   * Returns `0` if the elements should not be swapped.
   *   * Returns `-1` (or any negative number) if `valueA` comes before `valueB`
   *   * Returns `1` (or any positive number) if `valueA` comes after `valueB`
   *   * Is pure, i.e. it must always return the same value for the same pair
   *     of values.
   *
   * When sorting collections which have no defined order, their ordered
   * equivalents will be returned. e.g. `map.sort()` returns OrderedMap.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * Map({ "c": 3, "a": 1, "b": 2 }).sort((a, b) => {
   *   if (a < b) { return -1; }
   *   if (a > b) { return 1; }
   *   if (a === b) { return 0; }
   * });
   * // OrderedMap { "a": 1, "b": 2, "c": 3 }
   * ```
   *
   * Note: `sort()` Always returns a new instance, even if the original was
   * already sorted.
   *
   * Note: This is always an eager operation.
   */
  sort(comparator?: (valueA: V, valueB: V) => number): this;

  /**
   * Like `sort`, but also accepts a `comparatorValueMapper` which allows for
   * sorting by more sophisticated means:
   *
   *     hitters.sortBy(hitter => hitter.avgHits)
   *
   * Note: `sortBy()` Always returns a new instance, even if the original was
   * already sorted.
   *
   * Note: This is always an eager operation.
   */
  sortBy<C>(
  comparatorValueMapper: (value: V, key: K, iter: this) => C,
  comparator?: (valueA: C, valueB: C) => number)
  : this;

  /**
   * Returns a `Collection.Keyed` of `Collection.Keyeds`, grouped by the return
   * value of the `grouper` function.
   *
   * Note: This is always an eager operation.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List, Map } = require('immutable')
   * const listOfMaps = List([
   *   Map({ v: 0 }),
   *   Map({ v: 1 }),
   *   Map({ v: 1 }),
   *   Map({ v: 0 }),
   *   Map({ v: 2 })
   * ])
   * const groupsOfMaps = listOfMaps.groupBy(x => x.get('v'))
   * // Map {
   * //   0: List [ Map{ "v": 0 }, Map { "v": 0 } ],
   * //   1: List [ Map{ "v": 1 }, Map { "v": 1 } ],
   * //   2: List [ Map{ "v": 2 } ],
   * // }
   * ```
   */
  groupBy<G>(
  grouper: (value: V, key: K, iter: this) => G,
  context?: any)
  : /*Map*/Seq.Keyed<G, /*this*/Collection<K, V>>;


  // Side effects

  /**
   * The `sideEffect` is executed for every entry in the Collection.
   *
   * Unlike `Array#forEach`, if any call of `sideEffect` returns
   * `false`, the iteration will stop. Returns the number of entries iterated
   * (including the last iteration which returned false).
   */
  forEach(
  sideEffect: (value: V, key: K, iter: this) => any,
  context?: any)
  : number;


  // Creating subsets

  /**
   * Returns a new Collection of the same type representing a portion of this
   * Collection from start up to but not including end.
   *
   * If begin is negative, it is offset from the end of the Collection. e.g.
   * `slice(-2)` returns a Collection of the last two entries. If it is not
   * provided the new Collection will begin at the beginning of this Collection.
   *
   * If end is negative, it is offset from the end of the Collection. e.g.
   * `slice(0, -1)` returns a Collection of everything but the last entry. If
   * it is not provided, the new Collection will continue through the end of
   * this Collection.
   *
   * If the requested slice is equivalent to the current Collection, then it
   * will return itself.
   */
  slice(begin?: number, end?: number): this;

  /**
   * Returns a new Collection of the same type containing all entries except
   * the first.
   */
  rest(): this;

  /**
   * Returns a new Collection of the same type containing all entries except
   * the last.
   */
  butLast(): this;

  /**
   * Returns a new Collection of the same type which excludes the first `amount`
   * entries from this Collection.
   */
  skip(amount: number): this;

  /**
   * Returns a new Collection of the same type which excludes the last `amount`
   * entries from this Collection.
   */
  skipLast(amount: number): this;

  /**
   * Returns a new Collection of the same type which includes entries starting
   * from when `predicate` first returns false.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List } = require('immutable')
   * List([ 'dog', 'frog', 'cat', 'hat', 'god' ])
   *   .skipWhile(x => x.match(/g/))
   * // List [ "cat", "hat", "god"" ]
   * ```
   */
  skipWhile(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any)
  : this;

  /**
   * Returns a new Collection of the same type which includes entries starting
   * from when `predicate` first returns true.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List } = require('immutable')
   * List([ 'dog', 'frog', 'cat', 'hat', 'god' ])
   *   .skipUntil(x => x.match(/hat/))
   * // List [ "hat", "god"" ]
   * ```
   */
  skipUntil(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any)
  : this;

  /**
   * Returns a new Collection of the same type which includes the first `amount`
   * entries from this Collection.
   */
  take(amount: number): this;

  /**
   * Returns a new Collection of the same type which includes the last `amount`
   * entries from this Collection.
   */
  takeLast(amount: number): this;

  /**
   * Returns a new Collection of the same type which includes entries from this
   * Collection as long as the `predicate` returns true.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List } = require('immutable')
   * List([ 'dog', 'frog', 'cat', 'hat', 'god' ])
   *   .takeWhile(x => x.match(/o/))
   * // List [ "dog", "frog" ]
   * ```
   */
  takeWhile(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any)
  : this;

  /**
   * Returns a new Collection of the same type which includes entries from this
   * Collection as long as the `predicate` returns false.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List } = require('immutable')
   * List([ 'dog', 'frog', 'cat', 'hat', 'god' ])
   *   .takeUntil(x => x.match(/at/))
   * // List [ "dog", "frog" ]
   * ```
   */
  takeUntil(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any)
  : this;


  // Combination

  /**
   * Returns a new Collection of the same type with other values and
   * collection-like concatenated to this one.
   *
   * For Seqs, all entries will be present in the resulting Seq, even if they
   * have the same key.
   */
  concat(...valuesOrCollections: Array<any>): Collection<any, any>;

  /**
   * Flattens nested Collections.
   *
   * Will deeply flatten the Collection by default, returning a Collection of the
   * same type, but a `depth` can be provided in the form of a number or
   * boolean (where true means to shallowly flatten one level). A depth of 0
   * (or shallow: false) will deeply flatten.
   *
   * Flattens only others Collection, not Arrays or Objects.
   *
   * Note: `flatten(true)` operates on Collection<any, Collection<K, V>> and
   * returns Collection<K, V>
   */
  flatten(depth?: number): Collection<any, any>;
  flatten(shallow?: boolean): Collection<any, any>;

  /**
   * Flat-maps the Collection, returning a Collection of the same type.
   *
   * Similar to `collection.map(...).flatten(true)`.
   */
  flatMap<M>(
  mapper: (value: V, key: K, iter: this) => Iterable<M>,
  context?: any)
  : Collection<K, M>;

  /**
   * Flat-maps the Collection, returning a Collection of the same type.
   *
   * Similar to `collection.map(...).flatten(true)`.
   * Used for Dictionaries only.
   */
  flatMap<KM, VM>(
  mapper: (value: V, key: K, iter: this) => Iterable<[KM, VM]>,
  context?: any)
  : Collection<KM, VM>;

  // Reducing a value

  /**
   * Reduces the Collection to a value by calling the `reducer` for every entry
   * in the Collection and passing along the reduced value.
   *
   * If `initialReduction` is not provided, the first item in the
   * Collection will be used.
   *
   * @see `Array#reduce`.
   */
  reduce<R>(
  reducer: (reduction: R, value: V, key: K, iter: this) => R,
  initialReduction: R,
  context?: any)
  : R;
  reduce<R>(
  reducer: (reduction: V | R, value: V, key: K, iter: this) => R)
  : R;

  /**
   * Reduces the Collection in reverse (from the right side).
   *
   * Note: Similar to this.reverse().reduce(), and provided for parity
   * with `Array#reduceRight`.
   */
  reduceRight<R>(
  reducer: (reduction: R, value: V, key: K, iter: this) => R,
  initialReduction: R,
  context?: any)
  : R;
  reduceRight<R>(
  reducer: (reduction: V | R, value: V, key: K, iter: this) => R)
  : R;

  /**
   * True if `predicate` returns true for all entries in the Collection.
   */
  every(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any)
  : boolean;

  /**
   * True if `predicate` returns true for any entry in the Collection.
   */
  some(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any)
  : boolean;

  /**
   * Joins values together as a string, inserting a separator between each.
   * The default separator is `","`.
   */
  join(separator?: string): string;

  /**
   * Returns true if this Collection includes no values.
   *
   * For some lazy `Seq`, `isEmpty` might need to iterate to determine
   * emptiness. At most one iteration will occur.
   */
  isEmpty(): boolean;

  /**
   * Returns the size of this Collection.
   *
   * Regardless of if this Collection can describe its size lazily (some Seqs
   * cannot), this method will always return the correct size. E.g. it
   * evaluates a lazy `Seq` if necessary.
   *
   * If `predicate` is provided, then this returns the count of entries in the
   * Collection for which the `predicate` returns true.
   */
  count(): number;
  count(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any)
  : number;

  /**
   * Returns a `Seq.Keyed` of counts, grouped by the return value of
   * the `grouper` function.
   *
   * Note: This is not a lazy operation.
   */
  countBy<G>(
  grouper: (value: V, key: K, iter: this) => G,
  context?: any)
  : Map_2<G, number>;


  // Search for value

  /**
   * Returns the first value for which the `predicate` returns true.
   */
  find(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any,
  notSetValue?: V)
  : V | undefined;

  /**
   * Returns the last value for which the `predicate` returns true.
   *
   * Note: `predicate` will be called for each entry in reverse.
   */
  findLast(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any,
  notSetValue?: V)
  : V | undefined;

  /**
   * Returns the first [key, value] entry for which the `predicate` returns true.
   */
  findEntry(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any,
  notSetValue?: V)
  : [K, V] | undefined;

  /**
   * Returns the last [key, value] entry for which the `predicate`
   * returns true.
   *
   * Note: `predicate` will be called for each entry in reverse.
   */
  findLastEntry(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any,
  notSetValue?: V)
  : [K, V] | undefined;

  /**
   * Returns the key for which the `predicate` returns true.
   */
  findKey(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any)
  : K | undefined;

  /**
   * Returns the last key for which the `predicate` returns true.
   *
   * Note: `predicate` will be called for each entry in reverse.
   */
  findLastKey(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any)
  : K | undefined;

  /**
   * Returns the key associated with the search value, or undefined.
   */
  keyOf(searchValue: V): K | undefined;

  /**
   * Returns the last key associated with the search value, or undefined.
   */
  lastKeyOf(searchValue: V): K | undefined;

  /**
   * Returns the maximum value in this collection. If any values are
   * comparatively equivalent, the first one found will be returned.
   *
   * The `comparator` is used in the same way as `Collection#sort`. If it is not
   * provided, the default comparator is `>`.
   *
   * When two values are considered equivalent, the first encountered will be
   * returned. Otherwise, `max` will operate independent of the order of input
   * as long as the comparator is commutative. The default comparator `>` is
   * commutative *only* when types do not differ.
   *
   * If `comparator` returns 0 and either value is NaN, undefined, or null,
   * that value will be returned.
   */
  max(comparator?: (valueA: V, valueB: V) => number): V | undefined;

  /**
   * Like `max`, but also accepts a `comparatorValueMapper` which allows for
   * comparing by more sophisticated means:
   *
   *     hitters.maxBy(hitter => hitter.avgHits);
   *
   */
  maxBy<C>(
  comparatorValueMapper: (value: V, key: K, iter: this) => C,
  comparator?: (valueA: C, valueB: C) => number)
  : V | undefined;

  /**
   * Returns the minimum value in this collection. If any values are
   * comparatively equivalent, the first one found will be returned.
   *
   * The `comparator` is used in the same way as `Collection#sort`. If it is not
   * provided, the default comparator is `<`.
   *
   * When two values are considered equivalent, the first encountered will be
   * returned. Otherwise, `min` will operate independent of the order of input
   * as long as the comparator is commutative. The default comparator `<` is
   * commutative *only* when types do not differ.
   *
   * If `comparator` returns 0 and either value is NaN, undefined, or null,
   * that value will be returned.
   */
  min(comparator?: (valueA: V, valueB: V) => number): V | undefined;

  /**
   * Like `min`, but also accepts a `comparatorValueMapper` which allows for
   * comparing by more sophisticated means:
   *
   *     hitters.minBy(hitter => hitter.avgHits);
   *
   */
  minBy<C>(
  comparatorValueMapper: (value: V, key: K, iter: this) => C,
  comparator?: (valueA: C, valueB: C) => number)
  : V | undefined;


  // Comparison

  /**
   * True if `iter` includes every value in this Collection.
   */
  isSubset(iter: Iterable<V>): boolean;

  /**
   * True if this Collection includes every value in `iter`.
   */
  isSuperset(iter: Iterable<V>): boolean;
}

/**
 * @class
 * Color objects are used in annotations for defining colors. We're using an rgb representation
 * internally with the `r`, `g`, `b` values clipped between `0` and `255` inclusive, and a `transparent`
 * flag that can be used to indicate that the color is transparent, in which case the provided `r`, `g`,
 * and `b` values are ignored and set to `0` in the instantiated `Color`.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record | Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `color.set("r", 255)`.
 *
 * However, in order to obtain a transparent color the static `TRANSPARENT` value should be used instead.
 *
 * The difference between using `Color.TRANSPARENT` and `null` as values for annotation color properties
 * may depend on the context; if the annotation is being created or updated:
 * - If an annotation with a non-transparent color value is updated to have a color value of `Color.TRANSPARENT`,
 * the color value will be updated and be transparent.
 * - But if that same annotation is updated to have a color value of `null`, the color change will not be saved
 * to the document, although it may appear as transparent in the viewer.
 *
 * To avoid inconsistencies, it is recommended to always use `Color.TRANSPARENT` instead of `null` when updating
 * annotations.
 * @example
 * Create and update a color.
 * ```ts
 * var color = new NutrientViewer.Color({ r: 245, g: 0, b: 0 });
 * color = color.set("r", 255);
 * color.r; // => 255
 * ```
 *
 * @summary A simple RGB color value.
 * @param color - An object used to initialize the color. If `r`, `g` or `b` is omitted, `0`
 *        will be used instead.
 * @default { r: 0, g: 0, b: 0, transparent: false }
 */
export declare class Color extends Color_base {
  /** Simple black (CSS: `rgb(0, 0, 0)`) */
  static BLACK: Color;
  /** Grey (CSS: `rgb(128, 128, 128)`) */
  static GREY: Color;
  /** Simple white (CSS: `rgb(255, 255, 255)`) */
  static WHITE: Color;
  /** Blue (CSS: `rgb(36, 131, 199)`) */
  static DARK_BLUE: Color;
  /** Red (CSS: `rgb(248, 36, 0)`) */
  static RED: Color;
  /** Purple (CSS: `rgb(255, 0, 255)`) */
  static PURPLE: Color;
  /** Pink (CSS: `rgb(255, 114, 147)`) */
  static PINK: Color;
  /** Green (CSS: `rgb(110, 176, 0)`) */
  static GREEN: Color;
  /** Orange (CSS: `rgb(243, 149, 0)`) */
  static ORANGE: Color;
  /** Yellow (CSS: `rgb(255, 255, 0)`) */
  static YELLOW: Color;
  /** Light blue (CSS: `rgb(141, 184, 255)`) */
  static LIGHT_BLUE: Color;
  /** Light red (CSS: `rgb(247, 141, 138)`) */
  static LIGHT_RED: Color;
  /** Light green (CSS: `rgb(162, 250, 123)`) */
  static LIGHT_GREEN: Color;
  /** Light yellow (CSS: `rgb(252, 238, 124)`) */
  static LIGHT_YELLOW: Color;
  /** Blue (CSS: `rgb(34, 147, 251)`) */
  static BLUE: Color;
  /** Light orange (CSS: `rgb(255, 139, 94)`) */
  static LIGHT_ORANGE: Color;
  /** Light grey (CSS: `rgb(192, 192, 192)`) */
  static LIGHT_GREY: Color;
  /** Dark grey (CSS: `rgb(64, 64, 64)`) */
  static DARK_GREY: Color;
  /** Mauve (CSS: `rgb(245, 135, 255)`) */
  static MAUVE: Color;
  /** Transparent (CSS: `transparent`) */
  static TRANSPARENT: Color;
  /**
   * Converts a hex color value to a Color instance.
   *
   * @param hexColor - The hex color value to convert.
   * @returns A Color instance.
   */
  static fromHex: (hexColor: string) => Color;
  constructor(color: {
    r?: number;
    g?: number;
    b?: number;
    transparent?: boolean;
  });
  /**
   * Returns a lighter version of the current Color.
   *
   * @example
   * const color = NutrientViewer.Color.RED.lighter(50);
   *
   * @param percent - The percentage of lightness between 0 and 100.
   * @returns A Color with the new values.
   */
  lighter(percent: number): Color;
  /**
   * Returns a darker version of the current Color.
   *
   * @example
   * const color = NutrientViewer.Color.RED.darker(50);
   *
   * @param percent - The percentage of lightness between 0 and 100.
   * @returns A Color with the new values.
   */
  darker(percent: number): Color;
  /**
   * Returns true if the provided color or object and the current Color have the same RGB values.
   *
   * @example
   * const color = NutrientViewer.Color.RED.equals({ r: 248, g: 36, b: 0 });
   *
   * @param color - Color instance or RGB object.
   * @returns True if equal, false otherwise.
   */
  equals(color: Color | {
    r: number;
    g: number;
    b: number;
    transparent: boolean;
  }): boolean;
  /**
   * Modifies the saturation of the Color and returns a new one.
   *
   * @example
   * const color = NutrientViewer.Color.RED.saturate(50);
   *
   * @param percent - The percentage of saturation between 0 and 100.
   * @returns A Color with the new values.
   */
  saturate(percent: number): Color;
  sRGBToRGBComponent(RGBComponent: number): number;
  relativeLuminance(): number;
  contrastRatio(color: Color): number;
  /**
   * Converts the color to a CSS value (e.g. `rgb(255, 0, 0)`).
   *
   * @example
   * NutrientViewer.Color.RED.toCSSValue(); // => 'rgb(248, 36, 0)'
   *
   * @returns A CSS color value in `rgb` format.
   */
  toCSSValue(): string;
  /**
   * Converts the color to a Hex value (e.g. `#000000`).
   *
   * @example
   * NutrientViewer.Color.RED.toHex(); // => '#f82400'
   *
   * @returns A CSS color value in `hex` format.
   */
  toHex(): string;
}

declare const Color_base: Record_2.Factory<{
  /**
   * The red value of the color.
   *
   * @default 0
   */
  r: number;
  /**
   * The green value of the color.
   *
   * @default 0
   */
  g: number;
  /**
   * The blue value of the color.
   *
   * @default 0
   */
  b: number;
  /**
   * Transparency of the color.
   *
   * @default false
   */
  transparent: boolean;
}>;

export declare type ColorPreset = {
  /**
   * The Color represented by this preset. Eg: `new NutrientViewer.Color({ r: 255, g: 139, b: 94 })`.
   *
   * `null` means transparent.
   */
  color: Color | null;
  localization: {
    /** The ID of the preset color. Eg: 'red'  */
    id: string;
    /** The default message of the preset color. Eg: 'Red' */
    defaultMessage?: string;
    /** The description of the preset color. Eg: 'Red color' */
    description?: string;
  };
};

/**
 * @class
 *
 * A combo box is a drop down box with the option to add custom entries
 * (see {@link FormFields.ComboBoxFormField#edit}).
 *
 * Please note that {@link Instance#getFormFieldValues} will not return
 * the latest value for this field until the user leaves this field by default. If you
 * want this value to update on every change then set the {@link FormFields.ChoiceFormField#commitOnChange}) to
 * true.
 * @public
 * @summary A drop down box with the option to add custom entries.
 */
export declare class ComboBoxFormField extends ChoiceFormField {
  /**
   * If true, the combo box includes an editable text box as well as a drop-down list. Otherwise, it
   * includes only a drop-down list.
   *
   * @default false
   */
  edit: boolean;
  /**
   * If true, text entered in the field is not spell-checked.
   *
   * @default false
   */
  doNotSpellCheck: boolean;
}

/**
 * @class
 * A text comment made by the user that stems from an existing root annotation.
 * @summary Comment element.
 */
declare class Comment_2 extends Comment_base {
  /**
   * Comment serializer. Converts a comment to a InstantJSON compliant object.
   *
   * @param comment - The comment to serialize.
   * @returns The serialized comment.
   */
  static toSerializableObject: (comment: Comment_2) => Serializers.CommentJSON;
  /**
   * Comment deserializer. Converts a comment object to a {@link NutrientViewer.Comment}.
   *
   * @param comment - The comment to deserialize.
   * @returns The deserialized comment.
   */
  static fromSerializableObject: (comment: Serializers.CommentJSON) => Comment_2;
  /**
   * A method that returns a set of user IDs that are mentioned in the comment.
   *
   * @example
   * const ids = comment.getMentionedUserIds()
   *
   * @returns An immutable set of user IDs that are mentioned in the comment.
   */
  getMentionedUserIds(): Immutable.Set<string>;
  constructor(options?: Partial<CommentProps>);
}
export { Comment_2 as Comment };

declare const Comment_base: Immutable.Record.Factory<CommentProps>;

/**
 * A specific comment display mode that will always be applied when the visible part of the document contains comments.
 *
 * In mobile devices, comments are always displayed in a drawer a the bottom of the viewport
 *
 * @enum
 */
export declare const CommentDisplay: {
  /** Comments are displayed in a dialog or floating depending on the available viewport space. */
  readonly FITTING: "FITTING";
  /** Comments are displayed in a popover dialog next to their reference annotation marker. */
  readonly POPOVER: "POPOVER";
  /** Comments are displayed floating next to the page side, at the same height as their reference annotation marker, except when `ViewState#zoom` is set to `ZoomeMode#FIT_TO_WIDTH`, in which case they are displayed in a popover dialog instead. */
  readonly FLOATING: "FLOATING";
};

/**
 * @class
 * Annotation specific to NutrientViewer that defines a general root annotation type
 * for comments to originate from, which can be placed at an arbitrary location
 * in the document.
 *
 * See our
 * {@link https://www.nutrient.io/guides/web/current/comments/introduction-to-instant-comments/ | Instant Comments guide article}.
 * @summary Root annotation used for comments.
 */
export declare class CommentMarkerAnnotation extends Annotation {
  static readableName: string;
}

declare class CommentMarkerAnnotationSerializer extends AnnotationSerializer {
  annotation: CommentMarkerAnnotation;
  constructor(annotation: CommentMarkerAnnotation);
  toJSON(): Serializers.CommentMarkerAnnotationJSON;
  static fromJSON(id: InstantID | null, json: Omit<Serializers.CommentMarkerAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): CommentMarkerAnnotation;
}

declare type CommentParams = {
  /**
   * Unique ID for the comment.
   */
  id: string;
};

declare function CommentPermissionMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * This method is used to update the isEditableComment callback
     *
     * When the supplied callback is invalid it will throw a {@link Error} that contains a
     * detailed error message.
     *
     * To learn more check
     * {@link https://www.nutrient.io/guides/web/current/comments/introduction-to-instant-comments/#comment-permissions | this guide article}.
     *
     * @example
     * Only allow editing comments from a specific creator name
     * ```ts
     * instance.setIsEditableComment((comment) => comment.creatorName === myCurrentUser.name);
     * ```
     *
     * @throws {Error} Will throw an error when the supplied array is not valid.
     */
    setIsEditableComment(isEditableCommentCallback: IsEditableCommentCallback): void;

  };
} & T;

/** @inline */
declare type CommentProps = {
  /**
   * A unique identifier for the comment. When comment is created in the UI, the
   * viewer has to generate a unique ID.
   */
  id: InstantID | null;
  /**
   * The ID of the annotation that this comment stems from. In Nutrient Web SDK,
   * this should be either a {@link NutrientViewer.Annotations.MarkupAnnotation} or
   * a {@link NutrientViewer.Annotations.CommentMarkerAnnotation}.
   */
  rootId: InstantID | null;
  /**
   * The page index that this comment resides at.
   */
  pageIndex: null | number;
  /**
   * If this comment is from the original PDF, then this ID is from that PDF
   * note annotation that defined the comment.
   */
  pdfObjectId: number | null;
  /**
   * The name of the person who created the comment.
   */
  creatorName: string | null;
  /**
   * The time when the comment was created.
   */
  createdAt: Date;
  /**
   * The time when the comment was last updated.
   */
  updatedAt: Date;
  /**
   * The text of the comment in xhtml/plain text format.
   *
   * In case of XHTML, we support the following tags:
   * - `<b>`: Bold
   * - `<i>`: Italic
   * - `<span>`: Font color, background color and underline using the `style` attribute (e.g. `<span style="color: red; background-color: blue; text-decoration: underline">Hello</span>`)
   * - `p`: Paragraph. You can use this to add a newline between paragraphs.
   * - `a`: Link. You can use this to add a link to the comment. The `href` attribute is required.
   */
  text: {
    format: 'plain' | 'xhtml';
    value: string | null;
  };
  /**
   * Arbitrary JSON-serializable data the user can attach to the comment.
   */
  customData: Record<string, unknown> | null;
  /**
   * This property is used to define the permission scope for a particular comment.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   */
  group?: string | null;
  /**
   * This property defines whether this comment can be edited or not.
   * The value of this field depends on the set of collaboration permissions defined in the JWT token.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   */
  readonly isEditable?: boolean;
  /**
   * This property defines whether this comment can be deleted or not.
   * The value of this field depends on the set of collaboration permissions defined in the JWT token.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   */
  readonly isDeletable?: boolean;
  /**
   * This property defines whether the user has permission to edit the group of this comment.
   * The value of this field depends on the set of collaboration permissions defined in the JWT token.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   */
  readonly canSetGroup?: boolean;
};

declare function CommentsMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Returns a {@link NutrientViewer.Immutable.List} of {@link Comment} for the current document.
     *
     * The list contains an immutable snapshot of the currently available comments in the UI.
     *
     * When you want to keep a reference to the latest comments, you can listen for
     * {@link NutrientViewer.EventName.COMMENTS_CHANGE}.
     *
     * @example
     * instance.getComments().then(function (comments) {
     *   comments.forEach(comment => {
     *     console.log(comment.text);
     *   });
     *
     *   // Get the number of currently loaded comments
     *   const totalComments = comments.size;
     * })
     *
     * @param options - An object to configure the comments retrieval - {@link GetCommentsOptions}
     *
     * @returns Resolves to comments.
     */
    getComments(options?: GetCommentsOptions): Promise<List<Comment_2>>;
    /**
     * Set a list of users that can be mentioned in comments.
     *
     * @example
     * instance.setMentionableUsers([
     *   { id: "1", name: "John Doe", displayName: "John", avatar: "https://example.com/avatar.png" },
     *   { id: "2", name: "Jane Doe", displayName: "Jane", avatar: "https://example.com/avatar.png" },
     *   { id: "3", name: "John Smith", displayName: "John", avatar: "https://example.com/avatar.png" },
     * ]);
     *
     * @server
     * @param mentionableUsers - An array of {@link MentionableUser} objects.
     */
    setMentionableUsers(mentionableUsers: MentionableUser[]): void;
    /**
     * Set the maximum number of suggestions that will be shown when mentioning a user.
     *
     * @example
     * instance.setMaxMentionSuggestions(5);
     *
     * @server
     * @param maxMentionSuggestions - The maximum number of suggestions that will be shown when mentioning a user.
     */
    setMaxMentionSuggestions(maxMentionSuggestions: number): void;
    /**
     * You can programmatically modify the properties of the comment just before it is created.
     *
     * @example
     * instance.setOnCommentCreationStart((comment) => {
     *   return comment.set('text', { format: 'xhtml', value: '<p>This comment has a default value</p>' });
     * });
     *
     * @param callback - The callback to set the values of created form fields programmatically.
     */
    setOnCommentCreationStart(callback: OnCommentCreationStartCallback): void;

  };
} & T;

declare type CommentThreadParams = {
  /**
   * ID for the comment thread.
   */
  id: string;
};

/**
 * Slots for partial customization of the comment thread.
 */
declare type CommentThreadUI = {
  /**
   * Use this to render a custom UI in the header (top area) of the UI.
   */
  header?: UIFactory<CommentThreadParams>;
  /**
   * Use this to render a custom UI in the footer (bottom area) of the UI.
   */
  footer?: UIFactory<CommentThreadParams>;
  /**
   * Use this to customize the editor area.
   */
  editor?: UIFactory<CommentThreadParams>;
  /**
   * Use this to customize each comment fully or provide slots for partial customization.
   */
  comment?: CommentUIConfig;
};

declare type CommentThreadUIConfig = CommentThreadUIFactory | CommentThreadUI;

/**
 * UI function for full customization of CommentThread.
 */
declare type CommentThreadUIFactory = UIFactory<CommentThreadParams>;

declare type CommentUI = {
  /**
   * Use this to render a custom UI in the header (top area) of the UI.
   */
  header?: UIFactory<CommentParams>;
  /**
   * Use this to render a custom UI in the footer (bottom area) of the UI
   */
  footer?: UIFactory<CommentParams>;
  /**
   * Use this to customize the body of the comment.
   */
  body?: UIFactory<CommentParams>;
};

declare type CommentUIConfig = CommentUIFactory | CommentUI;

/**
 * UI function for full customization of Comment.
 */
declare type CommentUIFactory = UIFactory<CommentParams>;

/**
 * ComparisonOperation is a class that provides methods to describe a comparison operation.
 * It encapsulates the type and optional settings for the comparison.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record | Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `scale.set("options", { numberOfContextWords: 4 })`
 *
 * @example
 * Create a new text comparison operation.
 * ```ts
 * const operation = new ComparisonOperation(NutrientViewer.ComparisonOperationType.TEXT, { numberOfContextWords: 2 });
 * ```
 *
 * @example
 * Create a new AI comparison operation.
 * ```ts
 * const aiOperation = new ComparisonOperation(
 *   NutrientViewer.ComparisonOperationType.AI,
 *   { operationType: NutrientViewer.AIComparisonOperationType.ANALYZE, model: 'gpt4o' }
 * );
 * ```
 *
 * @public
 * @summary The descriptor for a comparison operation.
 * @default { type: NutrientViewer.ComparisonOperationType.TEXT, options: { numberOfContextWords: 0 } }
 */
export declare class ComparisonOperation extends ComparisonOperation_base {
  constructor(type: IComparisonOperationType, options?: ITextComparisonOperationOptions | IAIComparisonOperationOptions);
  /**
   * Returns true if this operation is a text comparison
   */
  isTextComparison(): boolean;
  /**
   * Returns true if this operation is an AI comparison
   */
  isAIComparison(): boolean;
  /**
   * Returns the AI operation type, if this is an AI comparison
   */
  getAIOperationType(): IAIComparisonOperationType | undefined;
}

declare const ComparisonOperation_base: Record_2.Factory<IComparisonOperation>;

declare type ComparisonOperationJSON = {
  type: IComparisonOperationType;
  options?: {
    numberOfContextWords?: number;
    wordLevel?: boolean;
  };
};

/**
 * Describes types for document comparison operation.
 *
 * @enum
 */
declare const ComparisonOperationType: {
  /** Compare the text of documents. */
  readonly TEXT: "text";
  /** Compare documents using AI-powered analysis. */
  readonly AI: "ai";
};

/**
 * @replaceWith export interface Configuration extends SharedConfiguration, Partial<Omit<ServerConfiguration, keyof SharedConfiguration> & Omit<StandaloneConfiguration, keyof SharedConfiguration>>{}
 */
export declare type Configuration = ServerConfiguration | StandaloneConfiguration;

/**
 * Represents one of the available conformance types for PDF/A documents.
 *
 * @enum
 */
export declare const Conformance: {
  readonly PDFA_1A: "pdfa-1a";
  readonly PDFA_1B: "pdfa-1b";
  readonly PDFA_2A: "pdfa-2a";
  readonly PDFA_2U: "pdfa-2u";
  readonly PDFA_2B: "pdfa-2b";
  readonly PDFA_3A: "pdfa-3a";
  readonly PDFA_3U: "pdfa-3u";
  readonly PDFA_3B: "pdfa-3b";
  readonly PDFA_4: "pdfa-4";
  readonly PDFA_4E: "pdfa-4e";
  readonly PDFA_4F: "pdfa-4f";
};

export declare namespace ContentEditing {
  /**
   * Describes the properties used to update a text block.
   *
   * This is a partial text block that contains the id of the text block and the new text.
   * It is used to update the text block in the document.
   *
   * @see {@link ContentEditing.Session#updateTextBlocks}
   */
  export interface UpdatedTextBlock {
    /** Unique identifier for the text block. */
    id: string;
    /** The new text content of the text block. */
    text?: string;
    /** The anchor point of the text block. */
    anchor?: {
      x?: number;
      y?: number;
    };
    /** The maximum width of the text block. */
    maxWidth?: number;
  }
  /**
   * This describes the content editor session returned by {@link Instance#beginContentEditingSession}.
   *
   * It is independent of the content editor UI session, which is used to display the content editor UI. At one time, only one content editing session can be active, either this session or a UI session. Starting the UI session will deactivate this session.
   * Also, if the contents of an opened document are modified while this session is active, the session will be deactivated.
   *
   * Using this requires a license that includes the Content Editor component.
   */
  export interface Session {
    /**
     * Completes the current editing session and saves all changes. Document will reload.
     *
     * @returns A promise that resolves when the changes have been successfully saved.
     */
    commit: () => Promise<void>;
    /**
     * Completes the current editing session without persisting any changes.
     *
     * @returns A promise that resolves when the session is successfully discarded.
     */
    discard: () => Promise<void>;
    /**
     * Retrieves all text blocks for a specific page.
     *
     * @param pageIndex - The index of the page to retrieve text blocks for.
     * @returns A promise that resolves with an array of TextBlocks for the given page.
     * @throws {Error} If the page index is out of bounds.
     */
    getTextBlocks: (pageIndex: number) => Promise<TextBlock[]>;
    /**
     * Updates an array of text blocks with partial data.
     *
     * @param textBlocks - Array of UpdatedTextBlock objects to update.
     * @returns A promise that resolves when the update is complete.
     * @throws {Error} If the ID of any text block is missing or doesn't exist.
     */
    updateTextBlocks: (textBlocks: ContentEditing.UpdatedTextBlock[]) => Promise<void>;
    /**
     * Indicates whether the session is currently active.
     */
    active: boolean;
  }
  /**
   * Describes the properties of a text block detected on a page.
   *
   * Contains the text, the bounding box in PDF coordinates, and the anchor point.
   *
   * @see {@link ContentEditing.Session#getTextBlocks}
   */
  export type TextBlock = {
    /** Unique identifier for the text block. */
    id: string;
    /** The text content of the text block. */
    text: string;
    /** The current bounding box of the text block, in PDF coordinates. */
    boundingBox: {
      /** The top coordinate of the bounding box. */
      top: number;
      /** The left coordinate of the bounding box. */
      left: number;
      /** The width of the bounding box. */
      width: number;
      /** The height of the bounding box. */
      height: number;
    };
    /** The anchor point of the text block. */
    anchor: {
      x: number;
      y: number;
    };
    /** The maximum width of the text block. */
    maxWidth: number;
  };
  /**
   * Font selection result for content editing font matching.
   */
  export interface FontMatchResult {
    /** The specific font face to use from the available fonts array */
    font: AvailableFontFace;
    /** The font size to use. If not specified, the size reported by the PDF will be used. */
    size: number | null | undefined;
  }
  /**
   * Font information extracted from PDF during content editing.
   */
  export interface FontInfo {
    /** The font name as declared in the PDF (e.g., "Helvetica-BoldOblique"). Rarely we can't find any name information. */
    name: string | null;
    /** The current font size being used. If matching is called during text selection, this may be null. */
    fontSize: number | null;
    /** Information about subset fonts detected in the PDF. */
    subsetInfo?: {
      /** Full font name with subset prefix (e.g., "ABCDEF+Helvetica") */
      originalName: string;
      /** Extracted base font name without prefix (e.g., "Helvetica") */
      demangledName: string;
    };
  }
  /**
   * Available font face for content editing font matching.
   * Each font face represents a specific combination of family and style.
   */
  export interface AvailableFontFace {
    /** The font family name (e.g., "Arial", "Times New Roman") */
    family: string;
    /** Whether this font face is bold */
    bold: boolean;
    /** Whether this font face is italic */
    italic: boolean;
  }
  /**
   * Callback to evaluate or override a font match during content editing.
   *
   * This callback is invoked when the system has determined a best-match font for text
   * during content editing operations. It allows developers to provide custom font
   * matching logic or override the system's choice.
   *
   * The callback receives the system's proposed font match, metadata about the
   * original font from the PDF, the current font size, and a list of all available
   * fonts that can be used. It can return a different font reference to override
   * the match, or `undefined` to accept the system's choice.
   *
   * @param match - The font name selected by the system as the best match.
   * @param fontInfo - Font metadata from the PDF including current size.
   * @param availableFonts - Array of all fonts available for use in content editing.
   *
   * @returns A font and size to override the match, or `undefined` to accept the system match.
   * @example
   * Simple font matching using available fonts.
   * ```ts
   * NutrientViewer.load({
   *   contentEditingFontMatcher: (match, fontInfo, availableFonts) => {
   *     // For Helvetica, try to find Arial or use the first available font
   *     if (fontInfo.name?.includes("Helvetica")) {
   *       const arialFont = availableFonts.find(font => font.family === "Arial" && !font.bold && !font.italic);
   *       if (arialFont) {
   *         return { font: arialFont, size: fontInfo.fontSize };
   *       }
   *       // Fallback to first available font
   *       if (availableFonts.length > 0) {
   *         return { font: availableFonts[0], size: fontInfo.fontSize };
   *       }
   *     }
   *     return undefined; // Accept system match
   *   }
   * });
   * ```
   */
  export type FontMatcher = (match: string, fontInfo: FontInfo, availableFonts: AvailableFontFace[]) => FontMatchResult | undefined;
  /**
   * @deprecated Use `ContentEditing.FontMatcher` instead
   */
  export type ContentEditingFontMatcher = FontMatcher;
}

declare function ContentEditorMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {

    /**
     * Creates and returns a new content editing session.
     *
     * If called in a Server-backed instance,
     * we will download the document and WASM in the background automatically.
     *
     * Using this method requires a license that includes the Content Editor component.
     *
     * @throws {Error}  If a session (either UI or API) is already in progress.
     * @returns A promise that resolves to a {@link ContentEditing.Session} object.
     */
    beginContentEditingSession(): Promise<ContentEditing.Session>;

  };
} & T;

/**
 * Converts a document to the specified supported conversion format.
 *
 * Returns a {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise|Promise}
 * resolving to an `ArrayBuffer` of the converted document, or rejecting with a {@link NutrientViewer.Error}.
 *
 * It requires a {@link Configuration | configuration object}. If the configuration is
 * invalid, the promise will be rejected with a {@link NutrientViewer.Error}.
 *
 * @example
 * NutrientViewer.convertToOffice({
 *   document: "/article.pdf",
 *   licenseKey: "YOUR_LICENSE_KEY",
 * },
 * NutrientViewer.OfficeDocumentFormat.docx
 * ).then((arrayBuffer) => {
 *   console.log("Successfully converted document", arrayBuffer);
 * }).catch((error) => {
 *   console.error(error.message);
 * })
 *
 * @public
 * @param configuration - A configuration Object.
 * @param format - Format to export the document to.
 * @returns Promise that resolves to an ArrayBuffer of the converted file
 */
declare function convertToOffice(configuration: StandaloneConfiguration, format: IDocumentOfficeFormat): Promise<ArrayBuffer>;

/**
 * Converts a file to a PDF.
 *
 * Returns a {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise|Promise}
 * resolving to an `ArrayBuffer` of a PDF, or rejecting with a {@link NutrientViewer.Error}.
 *
 * The resulting `ArrayBuffer` can be directly loaded with {@link NutrientViewer.load()}.
 *
 * It requires a {@link Configuration | configuration object}. If the configuration is
 * invalid, the promise will be rejected with a {@link NutrientViewer.Error}.
 *
 * @example
 * NutrientViewer.convertToPDF({
 *   document: "/sales-report.docx",
 *   licenseKey: "YOUR_LICENSE_KEY",
 * }).then((arrayBuffer) => {
 *   console.log("Successfully converted document", arrayBuffer);
 * }).catch((error) => {
 *   console.error(error.message);
 * })
 *
 * @public
 * @param configuration - A configuration Object
 * @param conformance - A conformance level of the output PDF
 * @param officeConversionSettings - Settings specific to office conversion
 * @returns Promise that resolves to an ArrayBuffer of a file converted to PDF
 */
declare function convertToPDF(configuration: StandaloneConfiguration, conformance?: IConformance | null, officeConversionSettings?: OfficeConversionSettings): Promise<ArrayBuffer>;

/** @inline */
declare type CoreActionJSON = {
  type: 'uri';
  uri: string;
  subactions?: Array<CoreActionJSON>;
} | {
  type: 'goTo';
  pageIndex: number;
  subactions?: Array<CoreActionJSON>;
} | {
  type: 'goToEmbedded';
  newWindow: boolean;
  relativePath: string;
  targetType: 'parent' | 'child';
  subactions?: Array<CoreActionJSON>;
} | {
  type: 'goToRemote';
  relativePath: string;
  namedDestination: string;
  subactions?: Array<CoreActionJSON>;
} | {
  type: 'hide';
  hide: boolean;
  annotationReferences: Array<AnnotationReference>;
  subactions?: Array<CoreActionJSON>;
} | {
  type: 'resetForm';
  fields: Array<AnnotationReference> | null;
  flags: string | null;
  subactions?: Array<CoreActionJSON>;
} | {
  type: 'submitForm';
  uri: string;
  fields: Array<string> | null;
  flags: Array<ActionFlags> | null;
  subactions?: Array<CoreActionJSON>;
} | {
  type: 'launch';
  filePath: string;
  subactions?: Array<CoreActionJSON>;
} | {
  type: 'named';
  action: Omit<string, 'custom'>;
  subactions?: Array<CoreActionJSON>;
} | {
  type: 'named';
  action: 'custom';
  customAction: NamedCustomAction;
  subactions?: Array<CoreActionJSON>;
} | {
  type: 'javaScript';
  script: string;
  subactions?: Array<CoreActionJSON>;
};

/**
 * This record is used to persist the information for a Custom Overlay Item.
 *
 * Custom Overlay Items are user defined DOM `Node`s that are rendered in a page at a given position.
 *
 * @example
 * Creating an image and rendering it as Custom Overlay Item.
 * ```ts
 * let img = document.createElement("img");
 * img.src = "https://example.com/logo.png";
 *
 * const item = new NutrientViewer.CustomOverlayItem({
 *   id: "logo-item",
 *   node: img,
 *   pageIndex: 0,
 *   position: new NutrientViewer.Geometry.Point({ x: 100, y: 100 }),
 *   onAppear() {
 *     console.log('rendered!');
 *   }
 * });
 *
 * instance.setCustomOverlayItem(item);
 * ```
 *
 * @summary Custom Item to render in a page.
 * @see {@link NutrientViewer.Instance#setCustomOverlayItem}
 * @see {@link Configuration}
 */
export declare class CustomOverlayItem extends CustomOverlayItem_base {
  /**
   * Whether the node should not be zoomed (scaled) with the page.
   *
   * Custom zoom handling makes sense when you want to display rasterized images for example,
   * and you need to manually re-render them (maybe when using `<canvas>` images or want to display
   * images at different resolutions).
   *
   * To track zoom changes and manually update overlay items you can subscribe to the
   * {@link Events.ViewStateZoomChangeEvent | `viewState.zoom.change`} event.
   *
   * By default items will zoom with the page using a CSS based scale transformation.
   *
   * @default false
   */
  disableAutoZoom: boolean;
  /**
   * A unique identifier to describe the custom overlay item.
   * New IDs should be generated by the user and should be unique.
   */
  id: CustomOverlayItemID;
  /**
   * A reference to the DOM `Node` to render in the page.
   */
  node: Node;
  /**
   * Whether the node should not be rotated with the page.
   */
  noRotate: boolean;
  /**
   * The page index on which the custom item is placed. It's important to notice that a custom item
   * can only ever be on one page.
   */
  pageIndex: number;
  /**
   * Position of this custom item in the page.
   * The coordinates are in the PDF page space with the origin being on the top left.
   */
  position: Point;
  /**
   * Optional callback to invoke when the custom item is created and appears in the viewport.
   */
  onAppear?: ((...args: Args) => void) | null;
  /**
   * Optional callback to invoke when the custom item is removed.
   */
  onDisappear?: ((...args: Args) => void) | null;
  constructor(args: ICustomOverlayItem);
}

declare const CustomOverlayItem_base: Record_2.Factory<ICustomOverlayItem>;

declare type CustomOverlayItemID = string;

declare function CustomOverlayItemsMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * This method is used to set a new {@link CustomOverlayItem} or update an existing one.
     *
     * @example
     * Add a text node to the first page.
     * ```ts
     * let item = new NutrientViewer.CustomOverlayItem({
     *  id: "1",
     *  node: document.createTextNode("Hello from Nutrient Web SDK."),
     *  pageIndex: 0,
     *  position: new NutrientViewer.Geometry.Point({ x: 100, y: 200 }),
     * });
     * instance.setCustomOverlayItem(item);
     * ```
     *
     * @example
     * Update a text node.
     * ```ts
     * item = item.set("node", document.createTextNode("Hello again my friend!!!"));
     * instance.setCustomOverlayItem(item);
     * ```
     *
     * @param item - The item to create or update.
     */
    setCustomOverlayItem(item: CustomOverlayItem): void;
    /**
     * This method is used to remove an existing {@link CustomOverlayItem}.
     *
     * @example
     * Create and then remove a text node.
     * ```ts
     * const id = "1";
     * const item = new NutrientViewer.CustomOverlayItem({
     *  id: id,
     *  node: document.createTextNode("Hello from Nutrient Web SDK."),
     *  pageIndex: 0,
     *  position: new NutrientViewer.Geometry.Point({ x: 100, y: 200 }),
     * });
     * instance.setCustomOverlayItem(item);
     *
     * instance.removeCustomOverlayItem(id);
     * ```
     *
     * @param id - The `id` of the item to remove.
     */
    removeCustomOverlayItem(id: CustomOverlayItemID): void;

  };
} & T;

/**
 * This object can include functions to be called when specific entities, like annotations,
 * are being rendered in the viewport, and return additional or replacement DOM content for
 * the entity instance.
 *
 * Currently only annotation's rendering can be customized using the `Annotation` key.
 *
 * If the callback returns null, the instance will be rendered normally.
 *
 * @summary Keyed list of callbacks called when entities are rendered.
 * @example
 * NutrientViewer.load({
 *   customRenderers: {
 *     Annotation: ({ annotation }) => ({
 *       node: document.createElement("div").appendChild(document.createTextNode("Custom rendered!")),
 *       append: true,
 *     })
 *   }
 * });
 *
 * @see {@link Configuration.customRenderers}
 * @see {@link NutrientViewer.Instance#setCustomRenderers}
 */
export declare type CustomRenderers = {
  /**
   * This user defined function receives the {@link AnnotationsUnion} to be rendered as argument.
   *
   * It must return a {@link RendererConfiguration} object or null.
   *
   * @public
   */
  Annotation?: (options: {
    /** Annotation to be rendered. */
    annotation: AnnotationsUnion;
  }) => RendererConfiguration | null | undefined;
  CommentAvatar?: (options: {
    comment: Comment_2;
  }) => RendererConfiguration | null | undefined;
};

export declare type CustomUI = Partial<Record<IUIElement, CustomUIElementConfiguration>>;

/**
 * This callback can be used in the {@link NutrientViewer.Instance#setCustomUIConfiguration | setCustomUIConfiguration()}
 * method to do atomic updates to the current custom UI configuration and currently rendered UI elements.
 *
 * @inline
 */
declare type CustomUIConfigurationSetter = (customUI: CustomUI | null) => CustomUI;

declare type CustomUIElementConfiguration = CustomUISidebarConfiguration;

declare type CustomUISidebarConfiguration = Partial<{ [K in
ISidebarMode]: Renderer }>;

/**
 * Defining this callback allows you to customize how dates are rendered as part
 * of the NutrientViewer UI.
 *
 * @public
 * @example
 * NutrientViewer.load({
 *   dateTimeString: ({ dateTime, element }) => {
 *     if(element === NutrientViewer.UIDateTimeElement.ANNOTATIONS_SIDEBAR) {
 *       return new Intl.DateTimeFormat("en-US", {
 *         dateStyle: "short",
 *         timeStyle: "short",
 *       }).format(dateTime);
 *     } else {
 *       return new Intl.DateTimeFormat("en-US", {
 *         dateStyle: "full",
 *         timeStyle: "long",
 *       }).format(dateTime);
 *     }
 *   }
 *   // ...
 * });
 *

 */
export declare type DateTimeStringCallback = (args: {
  /** The date to be formatted. */
  dateTime: Date;
  /** The NutrientViewer UI element on which the date is going to be rendered. */
  element: IUIDateTimeElement;
  /** The annotation or comment that contains the date that is being rendered. */
  object: AnnotationsUnion | Comment_2;
}) => string;

/**
 * Namespace for the internationalization and localization (i18n) configuration.
 * The current locale can be retrieved via {@link NutrientViewer.Instance#locale},
 * and set with {@link NutrientViewer.Instance#setLocale}.
 *
 * @public
 * @namespace NutrientViewer.I18n
 * @summary Namespace for the i18n configuration.
 */
declare const _default: {
  /**
   * Returns an array of available locales. Each entry in the array is a string representing the
   * locale e.g. `en`. The array can be mutated directly to add new locales. Note that when adding
   * new locales you also need to add the corresponding
   * {@link NutrientViewer.I18n.messages translated messages}.
   *
   * @example
   * Add a new locale.
   * ```ts
   * NutrientViewer.I18n.locales.push("fr");
   * ```
   */
  readonly locales: string[];
  /**
   * Returns an object containing the translated messages for every locale.
   * In the messages object each key represents the locale and values are objects containing
   * `messageId`-`translated message` pairs.
   *
   * The messages object can be mutated directly to change translations or add new ones.
   *
   * @example <caption>The messages object</caption>
   * {
   *   "en": {
   *     "delete": "Delete",
   *     "openPDF": "Open PDF"
   *   },
   *   "it": {
   *     "delete": "Rimuovi",
   *     "openPDF": "Apri PDF"
   *   }
   * }
   *
   * @example
   * Mutate the messages object. Replace "Open PDF" with "Open".
   * ```ts
   * NutrientViewer.I18n.messages.en.openPDF = "Open";
   * ```
   */
  readonly messages: Record<string, Record<string, string>>;
  /**
   * Nutrient Web SDK comes with a number of {@link NutrientViewer.I18n.locales predefined locales}
   * which are loaded automatically on demand when using the {@link NutrientViewer.Instance#setLocale}
   * API or when setting a locale in the main {@link Configuration}.
   *
   * The locale information are then exposed to {@link NutrientViewer.I18n.messages}.
   *
   * You can use this method to preload these information instead of loading them on demand.
   * This would allow you to modify some translations before {@link NutrientViewer.load loading Nutrient Web SDK} for example.
   *
   * @param locale - The locale to load the localization data for.
   * @param options - The options for the preloadLocalizationData function.
   * @returns Returns a promise that resolves when the locale data have been loaded.
   */
  readonly preloadLocalizationData: (locale: string, options?: {
    /** The location of the `nutrient-viewer-lib` directory. See {@link Configuration#baseUrl}. */
    baseUrl?: string;
  }) => Promise<void>;
};

/**
 * Returns a deep copy of an array containing the default
 * {@link NutrientViewer.Annotations | editable annotation types}.
 */
declare const _default_2: readonly (typeof TextAnnotation | typeof WidgetAnnotation | typeof CommentMarkerAnnotation)[];

/**
 * Returns a deep copy of an array containing the default
 * {@link ElectronicSignatureCreationMode | creationModes} offered as part of
 * the electronic signatures modal.
 *
 * 1. `DRAW`
 * 2. `IMAGE`
 * 3. `TYPE`
 */
declare const _default_3: readonly ("DRAW" | "IMAGE" | "TYPE")[];

/**
 * Returns a deep copy of an array containing the default
 * {@link NutrientViewer.Font | fonts} that are available for
 * electronic signatures.
 *
 * 1. `NutrientViewer.Font({ name: 'Caveat' })`
 * 4. `NutrientViewer.Font({ name: 'Pacifico' })`
 * 2. `NutrientViewer.Font({ name: 'Marck Script' })`
 * 3. `NutrientViewer.Font({ name: 'Meddon' })`
 */
declare const _default_4: readonly Font[];

declare const defaultAnnotationPresets: {
  [key: string]: Record<string, unknown>;
};

declare const defaultAnnotationsSidebarContent: readonly [EllipseAnnotation, HighlightAnnotation, ImageAnnotation, InkAnnotation, LineAnnotation, NoteAnnotation, PolygonAnnotation, PolylineAnnotation, RectangleAnnotation, SquiggleAnnotation, StampAnnotation, StrikeOutAnnotation, TextAnnotation, UnderlineAnnotation, WidgetAnnotation];

declare const defaultDocumentEditorFooterItems: {
  type: BuiltInDocumentEditorFooterItem;
}[];

declare const defaultDocumentEditorToolbarItems: {
  type: BuiltInDocumentEditorToolbarItemType;
}[];

declare const defaultElectronicSignatureColorPresets: ColorPreset[];

declare const defaultStampAnnotationTemplates: StampAnnotation[];

declare const defaultTextComparisonInnerToolbarItems: {
  type: string;
}[];

declare const defaultTextComparisonToolbarItems: {
  type: string;
}[];

declare const defaultToolbarItems: readonly [{
  readonly type: "sidebar-thumbnails";
}, {
  readonly type: "sidebar-document-outline";
}, {
  readonly type: "sidebar-annotations";
}, {
  readonly type: "sidebar-bookmarks";
}, {
  readonly type: "sidebar-signatures";
}, {
  readonly type: "sidebar-attachments";
}, {
  readonly type: "sidebar-layers";
}, {
  readonly type: "pager";
}, {
  readonly type: "multi-annotations-selection";
}, {
  readonly type: "pan";
}, {
  readonly type: "zoom-out";
}, {
  readonly type: "zoom-in";
}, {
  readonly type: "zoom-mode";
}, {
  readonly type: "linearized-download-indicator";
}, {
  readonly type: "spacer";
}, {
  readonly type: "annotate";
}, {
  readonly type: "ink";
}, {
  readonly type: "highlighter";
}, {
  readonly type: "text-highlighter";
}, {
  readonly type: "ink-eraser";
}, {
  readonly type: "signature";
}, {
  readonly type: "image";
}, {
  readonly type: "stamp";
}, {
  readonly type: "note";
}, {
  readonly type: "text";
}, {
  readonly type: "callout";
}, {
  readonly type: "line";
}, {
  readonly type: "link";
}, {
  readonly type: "arrow";
}, {
  readonly type: "rectangle";
}, {
  readonly type: "ellipse";
}, {
  readonly type: "polygon";
}, {
  readonly type: "cloudy-polygon";
}, {
  readonly type: "polyline";
}, {
  readonly type: "print";
}, {
  readonly type: "document-editor";
}, {
  readonly type: "document-crop";
}, {
  readonly type: "search";
}, {
  readonly type: "export-pdf";
}, {
  readonly type: "debug";
}];

/**
 * Describes the configuration used to populate a document template.
 *
 * @inline
 */
declare type DelimiterConfig = {
  /** The delimiter settings used in data parsing. */
  delimiter: DelimiterSettings;
};

/**
 * Describes the delimiter settings config used in data parsing.
 *
 * @inline
 */
declare type DelimiterSettings = {
  /** The start delimiter for data parsing. */
  start: string;
  /** The end delimiter for data parsing. */
  end: string;
};

/**
 * FormField deserializer. Converts a form field InstantJSON object to a {@link NutrientViewer.FormFields.FormField}.
 *
 * @param id - The ID of the form field.
 * @param payload - The serialized form field.
 * @param options - The options for the form field.
 * @returns The deserialized form field.
 */
declare function deserializeFormField(id: ID, payload: Serializers.FormFieldJSON, options?: ICollaboratorPermissionsOptions): FormField;

export declare namespace DigitalSignatures {
  /**
   * *Server only*
   *
   * Contains information to be optionally passed along to the signing service when
   * {@link NutrientViewer.Instance#signDocument | `instance.signDocument()`} is called in server mode, so it can be used
   * for identification, security or any other purpose.
   *
   * To learn more about how to set up the signing service check
   * {@link https://www.nutrient.io/guides/web/current/digital-signatures/digital-signatures-on-web/#setting-up-digital-signatures-on-the-server|this guide article}.
   *
   * This is the property that can be included in the object:
   *
   * @example
   * Passing a string for the signing service when signing (Server)
   * ```ts
   * instance.signDocument(null, {
   *   signingToken: "My security token"
   * })
   *   .then(function () {
   *     console.log("The document has been signed!");
   *   });
   * ```
   *
   * @summary Data for the digital signing service.
   * @server
   */
  export interface ServerSigningServiceData {
    /** Token to be passed by the backend to the signing service. */
    signingToken: string;
  }
  /**
   * *Standalone only*
   *
   * Contains information needed for signing with Nutrient backend in standalone mode. Supports the following backends:
   *
   * * Document Engine (requires Document Engine >= 1.6.0)
   * * {@link https://www.nutrient.io/api/ | DWS}
   *
   * The document loaded in your instance will not be transferred over the network, instead document hash and
   * signature properties will be prepared locally and passed to the backend to perform the signing via certificate,
   * finally digital signature is embedded into the document locally.
   *
   * Uses JSON Web Token (JWT) to authorize with the NutrientViewer backend. See Document Engine's
   * {@link https://www.nutrient.io/api/reference/document-engine/upstream/#tag/JWT-authorization | API Reference}
   * for more details about the JWT authorization.
   *
   * @example
   * Signing document in Web standalone via NutrientViewer backend
   * ```ts
   * instance.signDocument(null, {
   *   jwt: "<auth_token>"
   * })
   *   .then(function () {
   *     console.log("The document has been signed!");
   *   });
   * ```
   *
   * @standalone
   * @summary Data for the hash signing process.
   * @since Document Engine 1.6.0
   */
  export interface StandaloneSigningServiceData {
    /** Authentication token needed to authenticate the signing request with the backend. */
    jwt: string;
    /**
     * Base server URL to use as the signing backend.
     *
     * The `<server_url>/api/sign_hash` is used as the signing endpoint
     * and `<server_url>/api/get_certificates` is used to retrieve the certificates.
     * */
    serverUrl?: string;
    /** Optional signing token to be passed by the backend to the signing service. Valid only when signing via Document Engine. */
    signingToken?: string;
  }
  /**
   * Contains information to be optionally passed along to the backend signing service when
   * {@link NutrientViewer.Instance#signDocument | `instance.signDocument()`} is called, so it can be used
   * for identification, security or any other purpose.
   *
   * @summary Data for the digital signing service.
   */
  export type SigningServiceData = ServerSigningServiceData | StandaloneSigningServiceData;
  /**
   * Represents a digital certificate used for signing documents.
   *
   * @summary Information about the signing certificate.
   */
  export type SigningCertificate = {
    type: 'pspdfkit/certificate';
    isCACertificate: boolean;
    isSelfSigned: boolean;
    issuerCommonName: string;
    serialNumberHex: string;
    subjectCommonName: string;
    validFrom: string;
    validUntil: string;
  };
  /**
   * Contains metadata information to be included in a Digital Signature.
   *
   * This object can be passed optionally to {@link Instance#signDocument | `Instance.signDocument()`}
   * as part of {@link SignaturePreparationData}.
   *
   * @example
   * Specifying the signer name, signature reason and location for a Digital Signature (Standalone)
   * ```ts
   * instance.signDocument(
   *   {
   *     signatureMetadata: {
   *       signerName: "John Doe",
   *       signatureReason: "Testing",
   *       signatureLocation: "San Francisco"
   *     }
   *   }, getPKCS7Container)
   *   .then(function () {
   *     console.log("The document has been signed!");
   *   });
   * ```
   *
   * @summary Digital signing preparation data.
   */
  export type SignatureMetadata = {
    signerName?: string;
    signatureReason?: string;
    signatureLocation?: string;
  };
  /**
   * @inline
   * @summary Page, coordinates and dimensions of a digital signature.
   */
  export interface SignaturePosition {
    /** Index of the page for the digital signature. */
    pageIndex: number;
    /** Coordinates and dimensions of the digital signature. */
    boundingBox: Rect;
  }
  /**
   * This object can be provided optionally as part of the {@link SignaturePreparationData | `NutrientViewer.SignaturePreparationData`}
   * passed as first argument when calling {@link NutrientViewer.Instance#signDocument | `instance.signDocument()`} and contains
   * the certificates, private key and signature type for the SDK to use for signing the document using the Web Crypto API.
   *
   * `certificates` must be an `Array` of `ArrayBuffer` (DER-encoded) or `string` (PEM-encoded) containing X.509 certificates.
   *
   * The SDK can sign the document using the {@link https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto | Web SubtleCrypto API}
   * as long as the certificate chain and private key are provided here.
   *
   * `privatekey` must be a `string` that contains the private key to sign (PEM-encoded). If `privateKey` is not included, {@link TwoStepSignatureCallback | `NutrientViewer.TwoStepSignatureCallback`} needs to be passed
   * as second argument for the `instance.signDocument()` call to perform the signing.
   *
   * If `certificates` is not provided, only `NutrientViewer.SignatureType.CMS` can be created.
   *
   * If `signatureType` is not provided, `NutrientViewer.SignatureType.CAdES` will be used by default as long as `certificates` is provided,
   * and will default to `NutrientViewer.SignatureType.CMS` otherwise.
   *
   * If `timestamp` is provided, the `signatureType` must be `NutrientViewer.SignatureType.CAdES`.
   */
  export interface SigningData {
    /** Certificates used to sign the document. */
    certificates?: ArrayBuffer[] | string[];
    signatureType: SignatureTypeType;
    /** Signature container type. Can be `NutrientViewer.SignatureContainerType.raw` or `NutrientViewer.SignatureContainerType.pkcs7`. */
    signatureContainer?: SignatureContainerType_2;
    /** Private key used to sign the document. */
    privateKey?: string;
    /** Timestamping authority information (Standalone only). */
    timestamp?: TimestampType;
    /** Flag to enable LTV (Long Term Validation) for the signature (Standalone only). */
    ltv?: boolean;
    /** PAdES level to use when creating the signature (Document Engine only). This parameter is ignored when the signatureType is `cms`. Defaults to `b-lt`. */
    padesLevel?: PAdESLevelType;
  }
  export interface SignatureCreationData extends DigitalSignatures.SignaturePreparationData {
    signatureMetadata?: DigitalSignatures.SignatureMetadata;
    signingData?: SigningData;
  }
  /**
   * Contains information to be used for preparing a document to be signed digitally.
   *
   * This object can be passed optionally to {@link NutrientViewer.Instance#signDocument | `instance.signDocument()`}
   * with specific parameters for the preparation of the digital signature.
   *
   * `formFieldName` and `position` cannot be set at the same time, or an error will be thrown.
   *
   * This is the property that can be included in the object:
   *
   * @example
   * Setting the digital signature container reserved size when signing (Server)
   * ```ts
   * instance.signDocument({
   *   placeholderSize: 65536 // Specify a container with a 64 KB size
   * })
   *   .then(function () {
   *     console.log("The document has been signed!");
   *   });
   * ```
   *
   * @summary Digital signing preparation data.
   */
  export interface SignaturePreparationData {
    /** Size (bytes) to be reserved for the digital signature container. The default is 32 KB (32768 bytes). */
    placeholderSize?: number;
    /** Whether the document should be flatten before digitally signing it. The default is `false`. Note that flattening a document may remove previous digital signatures. */
    flatten?: boolean;
    /** Name of the existing signature form field to apply the signature to. */
    formFieldName?: string;
    /** Page index and bounding box of the signature. */
    position?: DigitalSignatures.SignaturePosition;
    /** Appearance options for the digital signature. */
    appearance?: SignatureAppearance;
  }
  /**
   * This callback is called when a document has been prepared for digitally signing by calling
   * {@link Instance#signDocument | `instance.signDocument()`}. It receives the current document hash, file contents and data to be signed
   * as arguments, and must return a `Promise` object that resolves to any of these types:
   * - An `ArrayBuffer` that contains either the signed data or a PKCS7 container that includes it.
   * - A `SignatureCallbackResponsePkcs7` that is structured type for when the signature device or service creates signatures
   * in the PKCS#7 format.
   * - A `SignatureCallbackResponseRaw` that is structured type for when the signature device or service creates signatures
   * in the raw (for instance, PKCS#1.5) format.
   * If the returned `Promise` object rejects, the document will not be signed.
   *
   * The provided file contents or the data to be signed can be used as input for the Web Crypto API, or for a
   * signing service of your choice to be signed (hashed and encrypted). The file contents hash is
   * also provided so it can be used it to verify the validity of the contents.
   *
   * See
   * {@link https://www.nutrient.io/guides/web/current/digital-signatures/digital-signatures-on-web/#setting-up-digital-signatures-on-standalone | this guide article}
   * for more information on how to digitally sign a document on Standalone.
   *
   * @returns A promise that resolves to any of these:
   *  - An `ArrayBuffer` that contains the signed data in the PKCS#1.5 or PKCS#7 format.
   *  - A `SignatureCallbackResponsePkcs7`, for when the signature device or service creates signatures in the PKCS#7 format.
   *  - A `SignatureCallbackResponseRaw`, for when the signature device or service creates signatures in the raw (for instance, PKCS#1.5) format.
   * The `ArrayBuffer` return type is deprecated. It's recommended to return either a `SignatureCallbackResponsePkcs7` or `SignatureCallbackResponseRaw`, depending on the signature format.
   *
   * @example
   * Sign document (Standalone)
   * ```ts
   * instance.signDocument(null, function({ hash, fileContents }) {
   *   return new Promise(function(resolve, reject) {
   *     const PKCS7Container = getPKCS7Container(hash, fileContents);
   *     if (PKCS7Container != null) {
   *       return resolve(PKCS7Container)
   *     }
   *     reject(new Error("Could not retrieve the PKCS7 container."))
   *   })
   * }).then(function() {
   *   console.log("Document signed!");
   * })
   * ```
   *
     */

  export type TwoStepSignatureCallback = (result: {
    /** Hash of the current document */
    hash: string;
    /** Content of the file to be signed. Provided only for CMS signatures. */
    fileContents: ArrayBuffer | null;
    /** Data to be signed for CAdES signatures. */
    dataToBeSigned: ArrayBuffer;
  }) => Promise<ArrayBuffer | SignatureCallbackResponsePkcs7 | SignatureCallbackResponseRaw>;
  /**
   * Represents the result of a signing process that returns a raw, (for instance, PKCS#1) signature.
   */
  export type SignatureCallbackResponseRaw = {
    /**
     * The certificate chain to include in the digital signature.
     * It can be a list of DER-encoded (represented as an `ArrayBuffer`) or PEM-encoded certificates.
     */
    certificates: ArrayBuffer[] | string[];
    /**
     * The raw (for example, PKCS#1) signature as an ArrayBuffer.
     */
    signedData: ArrayBuffer;
    /**
     * Optional timestamp token, DER-encoded. The format should be as
     * specified by [RFC3161]{@link https://www.rfc-editor.org/info/rfc3161}. If no timestamp response is provided, the signing
     * process will fallback to the optional `signingData.timestamp` field of
     * `NutrientViewer.SignaturePreparationData`.
     */
    timestampResponse?: ArrayBuffer;
    /**
     * Optional array of OCSP responses. Required if the signature needs to be LTV enabled.
     */
    ocspResponses?: OcspResponse[];
  };
  /**
   * Represents the result of a signing process that returns a PKCS#7 (CMS) signature.
   */
  export type SignatureCallbackResponsePkcs7 = {
    /**
     * The DER-encoded PKCS#7 signature as an `ArrayBuffer`.
     */
    pkcs7: ArrayBuffer;
    /**
     * Optional array of OCSP responses. Required if the signature needs to be LTV enabled.
     */
    ocspResponses?: OcspResponse[];
  };
  /**
   * On Standalone, by implementing this callback you have a fine grained control over
   * which certificates are going to be used for digital signatures validation.
   *
   * For more information, see {@link Configuration#trustedCAsCallback}
   *
   * @example
   * Fetch and use custom set of certificates (Standalone)
   *
   * ```ts
   * NutrientViewer.load({
   *   trustedCAsCallback: function() {
   *     return new Promise((resolve, reject) => {
   *        fetch("/your-certificate.cer")
   *         .then(res => res.arrayBuffer())
   *         .then(cert => resolve([cert]))
   *         .catch(reject)
   *     });
   *   },
   *   // ...
   * });
   * ```
   *
   * @returns The CA certificates in DER (`ArrayBuffer`) or PEM (`string`) format.
   */
  export type TrustedCAsCallback = () => Promise<Array<ArrayBuffer | string>>;
  /**
   * Represents an OCSP (Online Certificate Status Protocol) response.
   */
  export type OcspResponse = {
    /**
     * The serial number of the certificate whose revocation status was checked.
     */
    serialNumber: string;
    /**
     * The OCSP response body as an `ArrayBuffer` (DER-encoded structure), as defined in [RFC6960]{@link https://www.rfc-editor.org/info/rfc6960}.
     */
    body: ArrayBuffer;
  };
  /**
   * Describes and persists the overall validation status of the document, based on the
   * digital signatures it contains.
   *
   * The information contained in the digital signatures included in a document
   * can be extracted using {@link NutrientViewer.Instance#getSignaturesInfo}, which resolves with
   * a `NutrientViewer.SignaturesInfo` object. This object represent the overall validation status
   * of the document. For getting information about each individual signature from the document,
   * an array of {@link SignatureInfo} is included under the `signatures` property.
   *
   * To learn more about digital signatures validation check
   * {@link https://www.nutrient.io/guides/web/current/digital-signatures/digital-signatures-on-web/#digital-signatures-validation | this guide article}.
   *
   * @example
   * Getting digital signatures data from a document
   * ```ts
   * instance.getSignaturesInfo()
   *   .then(function (signaturesInfo) {
   *      console.log(signaturesInfo)
   *   });
   * ```
   *
   * @summary Digital signatures validation information.
   * @see {@link NutrientViewer.Instance#getSignaturesInfo} | {@link NutrientViewer.ViewState#showSignatureValidationStatus}
   * @see {@link Configuration#trustedCAsCallback}
   */
  export type SignaturesInfo = {
    /** The different possible validation states of the document. */
    status: DocumentValidationStatusType;
    checkedAt: Date;
    /** Array with the properties of each digital signature. */
    signatures?: Array<SignatureInfo>;
    /** The document has been modified since the last signature was added to it. */
    documentModifiedSinceSignature?: boolean;
  };
  /**
   * @summary Appearance options for a visible digital signature.
   */
  export type SignatureAppearance = {
    /** Signature appearance mode: with graphics, description or both; defaults to both. */
    mode?: ISignatureAppearanceMode;
    /** Whether to include the signer in the signature appearance; defaults to true. */
    showSigner?: boolean;
    /** Whether to include the signature date in the signature appearance; defaults to true. */
    showSignDate?: boolean;
    /** Whether to include the reason for the signature in the signature appearance; defaults to true. */
    showReason?: boolean;
    /** Whether to include the location for the signature in the signature appearance; defaults to true. */
    showLocation?: boolean;
    /** Whether to show the watermark image; defaults to true. */
    showWatermark?: boolean;
    /** Whether to show the timezone when `showSignDate` is true; defaults to false. */
    showDateTimezone?: boolean;
    /** Watermark image for the digital signature; can be a PDF, a JPEG or a PNG image. */
    watermarkImage?: Blob | File;
    /** Signer image (for instance, a handwritten signature). Can be a PDF, a JPEG or a PNG image. */
    graphicImage?: Blob | File;
  };
}

declare function DigitalSignaturesMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Gets the digital signatures validation information for all the signatures present
     * in the current document. See {@link DigitalSignatures.SignaturesInfo}.
     *
     * @example
     * Retrieve signatures information
     * ```ts
     * instance.getSignaturesInfo()
     *   .then(signaturesInfo => {
     *     console.log(signaturesInfo.status)
     *     if(signaturesInfo.signatures) {
     *       const invalidSignatures = signaturesInfo.signatures
     *         .filter(signature => signature.signatureValidationStatus !== NutrientViewer.SignatureValidationStatus.valid);
     *       console.log(invalidSignatures);
     *     }
     * });
     * ```
     *
     * Additional information can be found in
     * {@link https://www.nutrient.io/guides/web/current/digital-signatures/digital-signatures-on-web/#digital-signatures-validation | this guide article}.
     *
     * @returns Promise that resolves with a {@link DigitalSignatures.SignaturesInfo}.
     */
    getSignaturesInfo(): Promise<DigitalSignatures.SignaturesInfo>;
    /**
     * Digitally signs the document. On Standalone it can make sign the document  with the certificates and private key
     * provided by the user in {@link DigitalSignatures.SignaturePreparationData}, or use the signing service optionally provided
     * in the callback argument.
     *
     * On Server, you can optionally specify additional data to be passed to the signing service.
     *
     * Check the related {@link https://www.nutrient.io/guides/web/current/digital-signatures/digital-signatures-on-web | guide article}.
     *
     * @example
     * Sign document with CMS signature (Standalone)
     * ```ts
     * instance.signDocument(null, function({ hash, fileContents }) {
     *   return new Promise(function(resolve, reject) {
     *     const PKCS7Container = getPKCS7Container(hash, fileContents);
     *     if (PKCS7Container != null) {
     *       return resolve(PKCS7Container)
     *     }
     *     reject(new Error("Could not retrieve the PKCS7 container."))
     *   })
     * }).then(function() {
     *   console.log("Document signed!");
     * })
     * ```
     *
     * @example
     * Sign document (Server)
     * ```ts
     * instance.signDocument(null, { signingToken: "My security token" })
     *   .then(function() {
     *     console.log("Document signed!");
     *   })
     * ```
     *
     * @param signaturePreparationData - Properties to prepare the signature with.
     * @param twoStepSignatureCallbackOrSigningServiceData - Either
     * a callback to be executed when the document is ready for signing (Standalone only) or optional data to be passed to the
     * signing service.
     * @returns Promise that resolves when the document is signed.
     */
    signDocument(signaturePreparationData: DigitalSignatures.SignatureCreationData | null, twoStepSignatureCallbackOrSigningServiceData?: DigitalSignatures.TwoStepSignatureCallback | DigitalSignatures.SigningServiceData): Promise<void>;
    /**
     * Adds LTV (Long Term Validation) information to an existing signature.
     * See {@link DigitalSignatures.SignaturesInfo}.
     *
     * @example
     * Add LTV information to an existing signature
     * ```ts
     * instance.setSignaturesLTV(certificates)
     *   .then(signaturesInfo => {
     *     console.log(signaturesInfo.status)
     *     if(signaturesInfo.signatures) {
     *       const invalidSignatures = signaturesInfo.signatures
     *         .filter(signature => !signature.ltv);
     *       console.log(invalidSignatures);
     *     }
     * });
     * ```
     * Additional information can be found in
     * {@link https://www.nutrient.io/guides/web/signatures/digital-signatures/signature-lifecycle/sign-a-pdf-document/ | this guide article}.
     *
     * @public
     * @standalone
     * @param certificates - Certificates used to sign the document.
     * @returns Promise that resolves with a {@link DigitalSignatures.SignaturesInfo}.
     */
    setSignaturesLTV(certificates?: ArrayBuffer[] | string[]): Promise<DigitalSignatures.SignaturesInfo>;









  };
} & T;

declare type Dispatch<A> = (value: A) => void;

export declare namespace DocumentComparison {
  /**
   * Represents a pair of documents to be compared.
   */
  export type ComparisonDocuments = {
    /** The original document. */
    originalDocument: DocumentDescriptor;
    /** The changed document. */
    changedDocument: DocumentDescriptor;
  };
  export type DocumentDescriptorWithBuffer = DocumentDescriptor & {
    arrayBuffer: ArrayBuffer;
  };
  export type ComparisonDocumentsWithBuffers = {
    originalDocument: DocumentDescriptorWithBufferJSON;
    changedDocument: DocumentDescriptorWithBufferJSON;
  };
  /**
   * Describes a range within a document.
   */
  export type Range = {
    /** The starting position of the range. */
    position: number;
    /** The length of the range. */
    length: number;
  };
  export type Config = {
    originalDocument: DocumentDescriptorWithBuffer;
    changedDocument: DocumentDescriptorWithBuffer;
    comparisonOperation: ComparisonOperationJSON;
  };
  /**
   * Describes a block of text within a document.
   */
  export type TextBlock = {
    /** The range of the text block. */
    range: Range;
    /** The rectangular coordinates of the text block. */
    rect: [number, number, number, number];
  };
  /**
   * Describes an operation within a text comparison.
   */
  export type Operation = {
    /** The type of operation. */
    type: 'insert' | 'delete' | 'equal';
    /** The text involved in the operation. */
    text: string;
    /** The text blocks from the original document. */
    originalTextBlocks: TextBlock[];
    /** The text blocks from the changed document. */
    changedTextBlocks: TextBlock[];
  };
  /**
   * Describes a hunk of changes within a document comparison.
   */
  export type Hunk = {
    /** The range in the original document. */
    originalRange: Range;
    /** The range in the changed document. */
    changedRange: Range;
    /** The operations within the hunk. */
    operations: Operation[];
  };
  /**
   * Describes the result of a text comparison.
   */
  export type TextComparisonResult = {
    /** The type of comparison result. Only "text" is supported for now. */
    type: 'text';
    /** The hunks of changes within the comparison result. */
    hunks: Hunk[];
  };
  /**
   * Describes the result of a page comparison.
   */
  export type PageComparisonResult = {
    /** The index of the original page. */
    originalPageIndex?: number;
    /** The index of the changed page. */
    changedPageIndex?: number;
    /** The comparison results for the page. */
    comparisonResults: TextComparisonResult[];
  };
  /**
   * Object containing the result of a document comparison operation.
   */
  export type DocumentComparisonResult = {
    /** The comparison results for each page. */
    documentComparisonResults: PageComparisonResult[];
  } | null;
}

/**
 * Defines specific configuration options related to the document comparison feature. Passed when calling {@link Instance#setDocumentComparisonMode}.
 *
 * @public
 * @summary Object containing configuration options for document comparison.
 * @example
 * instance.setDocumentComparisonMode({
 *   documentA: {
 *     source: NutrientViewer.DocumentComparisonSourceType.USE_OPEN_DOCUMENT
 *   },
 *   documentB: {
 *     source: NutrientViewer.DocumentComparisonSourceType.USE_FILE_DIALOG
 *   },
 *   autoCompare: false
 * });
 */
export declare type DocumentComparisonConfiguration = {
  /**
   * Settings for the base document used for document comparison.
   */
  documentA: DocumentComparisonSource;
  /**
   * Settings for the second document used for document comparison.
   */
  documentB: DocumentComparisonSource;
  /**
   * Stroke colors to be used for the base and second documents strokes when overlaid for document comparison.
   *
   * @default { documentA: new NutrientViewer.Color({ r: 245, g: 40, b: 27 }), documentB: new NutrientViewer.Color({ r: 49, g: 193, b: 255 }) }
   */
  strokeColors?: DocumentComparisonStrokeColors;
  /**
   * {@link NutrientViewer.BlendMode | Blend mode} to be used for overlaying the two source documents when performing document comparison.
   *
   * @default "darken"
   */
  blendMode?: IBlendMode;
  /**
   * Set to `true` to perform automatic comparison without manual alignment of both documents. Set to `false` to manually align them.
   */
  autoCompare: boolean;
};

declare function DocumentComparisonMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * ***Standalone only***
     *
     * Enables or disables the document comparison UI.
     *
     * When a {@link DocumentComparisonConfiguration} object is passed, the document comparison UI is
     * mounted and initialized with the provided settings.
     *
     * When `null` is passed, the document comparison UI is hidden if it was being shown.
     *
     * @example
     * Initialize and show the document comparison UI
     * ```ts
     * instance.setDocumentComparisonMode({
     *   documentA: {
     *     source: fetch("old-document.pdf").then(res => res.arrayBuffer())
     *   },
     *   documentB: {
     *     source: fetch("old-document.pdf").then(res => res.arrayBuffer())
     *   },
     *   autoCompare: true
     * });
     * ```
     *
     * @public
     * @param documentComparisonConfiguration - Initial document comparison configuration.
     * @returns Promise that resolves when the document comparison UI is hidden.
     */
    setDocumentComparisonMode(documentComparisonConfiguration: DocumentComparisonConfiguration | null): Promise<void>;

  };
} & T;

/**
 * Specifies the data and settings for documents used for document comparison.
 *
 * @public
 * @summary Object containing data and settings for documents used for document comparison.
 * @example
 * instance.setDocumenComparisonMode({
 *   documentA: {
 *     source: NutrientViewer.DocumentComparisonSourceType.USE_OPEN_DOCUMENT,
 *     pageIndex: 0,
 *     strokeColor: NutrientViewer.Color.RED
 *   },
 *   documentB: {
 *     source: NutrientViewer.DocumentComparisonSource.USE_FILE_DIALOG,
 *     pageIndex: 0,
 *     strokeColor: NutrientViewer.Color.BLUE
 *   },
 *   autoCompare: false
 * });
 */
export declare type DocumentComparisonSource = {
  /**
   * Data for one of the source documents used for document comparison.
   */
  source: IDocumentComparisonSourceType | string | ArrayBuffer | Promise<string | ArrayBuffer>;
  /**
   * ***optional***
   *
   * Page index of the source document to be used for document comparison.
   *
   * Defaults to page `0`.
   *
   * @default 0
   */
  pageIndex?: number;
};

/**
 * Represents one of the available document sources to be used
 * in document comparison.
 *
 * @enum
 */
declare const DocumentComparisonSourceType: {
  /** Use the currently open document as source. */
  readonly USE_OPEN_DOCUMENT: "USE_OPEN_DOCUMENT";
  /** Show the file dialog for the user to choose the source document from the local file system. */
  readonly USE_FILE_DIALOG: "USE_FILE_DIALOG";
};

/**
 * Specifies the stroke colors used for overlaid strokes of the base and second documents documents used in document comparison.
 *
 * @summary Object containing the stroke colors used for overlaid strokes of the base and second documents documents used in document comparison.
 * @example
 * instance.setDocumentComparisonMode({
 *   documentA: {
 *     source: NutrientViewer.DocumentComparisonSourceType.USE_OPEN_DOCUMENT,
 *     pageIndex: 0
 *   },
 *   documentB: {
 *     source: NutrientViewer.DocumentComparisonSourceType.USE_FILE_DIALOG,
 *     pageIndex: 0
 *   },
 *   strokeColors: {
 *     documentA: NutrientViewer.Color.RED,
 *     documentB: NutrientViewer.Color.BLUE
 *   },
 *   autoCompare: false
 * });
 */
export declare type DocumentComparisonStrokeColors = {
  /**
   * Stroke color for the base document used for document comparison.
   *
   * @default new NutrientViewer.Color({ r: 245, g: 40, b: 27 })
   */
  documentA?: Color;
  /**
   * Stroke color for the second document used for document comparison.
   *
   * @default new NutrientViewer.Color({ r: 49, g: 193, b: 255 })
   */
  documentB?: Color;
};

/**
 * @class
 * DocumentDescriptor is a class that provides methods to describe a document for comparison.
 * It encapsulates the file path, optional password, and page indexes for the document.
 * @example
 * Create a new DocumentDescriptor.
 * ```ts
 * const doc = new DocumentDescriptor({ filePath: "path/to/document.pdf", pageIndexes: [0, 1] });
 * ```
 *
 * @public
 * @summary The descriptor for a document to be compared.
 */
declare class DocumentDescriptor extends DocumentDescriptor_base {
  constructor(documentDescriptorOptions: IDocumentDescriptor);
}

declare const DocumentDescriptor_base: Record_2.Factory<IDocumentDescriptor>;

declare type DocumentDescriptorJSON = {
  filePath?: string | ArrayBuffer;
  password?: string;
  pageIndexes: Array<number | [number, number]>;
  jwt?: string;
};

declare type DocumentDescriptorWithBufferJSON = DocumentDescriptorJSON & {
  arrayBuffer: ArrayBuffer;
};

/** @inline */
declare interface DocumentEditorBuiltinToolbarItem extends BaseDocumentEditorToolbarItem {
  type: BuiltInDocumentEditorToolbarItemType;
  onPress?: (e: Event) => void;
}

/** @inline */
declare interface DocumentEditorCustomToolbarItem extends BaseDocumentEditorToolbarItem {
  type: 'custom';
  /**
   * Callback to invoke when the item is clicked or tapped (on touch devices). It gets the `event` as
   * first argument, a document editor UI object as the second, and the `id` of the tool item as the third.
   *
   * @param e - The event that is fired on press. `onPress` is also fired when pressing enter while the item has focus.
   * @param documentEditorUIHandler - An instance object to set and retrieve different state properties of the document editor UI.
   */
  onPress?: (e: Event, documentEditorUIHandler: DocumentEditorUIHandler, id?: string) => void;
}

/**
 * Describes the properties of a Document Editor Footer Item.
 *
 * Check out [our guides](https://www.nutrient.io/guides/web/customizing-the-interface/customizing-the-document-editor-toolbar-and-footer/)
 * for more examples.
 *
 * @see {@link NutrientViewer.Instance#setDocumentEditorFooterItems}
 * @see {@link Configuration#documentEditorFooterItems}
 */
export declare interface DocumentEditorFooterItem {
  /**
   * `custom` tool items have to define a DOM node which NutrientViewer will render.
   *
   * In this case the tool item is rendered inside of a container div. The `className` which you pass is set to this container div and not to the node that you passed.
   *
   * The `onPress` event is registered and fires any time the item is clicked.
   */
  node?: Node;
  /**
   * Useful to set a custom CSS class name on the item.
   *
   * For {@link NutrientViewer.defaultDocumentEditorFooterItems | default document editor footer items} the `className` is appended to the default
   * item ones.
   */
  className?: string;
  /**
   * Unique identifier for the item.
   *
   * This is useful to identify items whose `type` is `custom`.
   *
   * @example
   * // In your JavaScript
   * const documentEditorFooterItems = NutrientViewer.defaultDocumentEditorFooterItems
   * documentEditorFooterItems.push({ type: 'custom', id: 'my-button', ... })
   * NutrientViewer.load({
   *  ...otherOptions,
   *  documentEditorFooterItems
   * });
   *
   * Note: It is ***not*** possible to override this option for built-in document editor footer items.
   */
  id?: string;
  /**
   * The type of a document editor footer item.
   *
   * It can either be `custom` for user defined items or one from the {@link NutrientViewer.defaultDocumentEditorFooterItems}.
   * Note: It is ***not*** possible to override this option for built-in toolbar items.
   *
   * @example
   * // In your JavaScript
   * const documentEditorFooterItems = NutrientViewer.defaultDocumentEditorFooterItems
   * documentEditorFooterItems.push({ type: 'custom', ... })
   * NutrientViewer.load({
   *  ...otherOptions,
   *  documentEditorFooterItems
   * });
   */
  type: BuiltInDocumentEditorFooterItem | 'custom';
  /**
   * Callback to invoke when the item is clicked or tapped (on touch devices). It gets the `event` as
   * first argument, a document editor UI handler object as the second, and the `id` of the tool item as the third.
   *
   * Built in items do not receive a documentEditorUIHandler
   *
   * @param event - The event that is fired on press. `onPress` is also fired when pressing enter while the item has focus.
   * @param documentEditorUIHandler - An instance object to set and retrieve different state properties of the document editor UI. Built in items do not receive a documentEditorUIHandler
   * @param id - The tool item id.
   */
  onPress?: (event: Event, documentEditorUIHandler?: DocumentEditorUIHandler, id?: string) => void;
}

declare function DocumentEditorMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Returns a deep copy of the latest document editor footer items. This value changes whenever the user
     * interacts with NutrientViewer or whenever {@link Instance#setDocumentEditorFooterItems} is called.
     *
     * Mutating this array will have no effect.
     *
     * @returns A deep copy of the latest document editor footer items.
     */
    readonly documentEditorFooterItems: any[];
    /**
     * Returns a deep copy of the latest document editor toolbar items. This value changes whenever the user
     * interacts with NutrientViewer or whenever {@link Instance#setDocumentEditorToolbarItems} is called.
     *
     * Mutating this array will have no effect.
     *
     */
    readonly documentEditorToolbarItems: any[];
    /**
     * This method is used to update the document editor footer of the PDF editor.
     * It makes it possible to add new {@link DocumentEditorFooterItem | items} and edit or remove existing ones.
     *
     * When you pass in an `array` of {@link DocumentEditorFooterItem}, the current items will be immediately
     * updated. Calling this method is also idempotent.
     *
     * If you pass in a function, it will be immediately invoked and will receive the current
     * `array` of {@link DocumentEditorFooterItem} as argument. You can use this to modify the list based on its
     * current value. This type of update is guaranteed to be atomic - the value of `currentDocumentEditorFooterItems`
     * can't change in between.
     *
     * When one of the supplied {@link DocumentEditorFooterItem} is invalid, this method will throw an
     * {@link Error} that contains a detailed error message.
     *
     * Since `items` is a regular JavaScript `Array` of object literals it can be manipulated using
     * standard array methods like `forEach`, `map`, `reduce`, `splice` and so on.
     * Additionally you can use any 3rd party library for array manipulation like {@link https://lodash.com | lodash}
     * or {@link http://anguscroll.com/just | just}.
     *
     * @example
     * Use ES2015 arrow functions and the update callback to reduce boilerplate
     * ```ts
     * instance.setDocumentEditorFooterItems(items => items.reverse());
     * ```
     *
     * @example
     * The new changes will be applied immediately
     * ```ts
     * instance.setDocumentEditorFooterItems(newItems);
     * instance.documentEditorFooterItems === newItems; // => true
     * ```
     *
     * @example
     * Changing a property of a custom button
     * ```ts
     * const myButton = {
     *   type: "custom",
     *   id: "my-button",
     *   onPress() {
     *     alert("test");
     *   },
     * };
     * ```
     *
     * @throws {Error} will throw an error when the supplied items array is not valid. This will also throw an error if you don not have document editor license.
     * @param documentEditorFooterItemsOrFunction - Either a
     *   new `array` of DocumentEditorFooterItem which would overwrite the existing one, or a callback that will get
     *   invoked with the current footer items and is expected to return the new `array` of items.
     */
    setDocumentEditorFooterItems(documentEditorFooterItemsOrFunction: DocumentEditorFooterItem[] | SetDocumentEditorFooterFunction): void;
    /**
     * This method is used to update the document editor toolbar of the PDF editor.
     * It makes it possible to add new {@link DocumentEditorToolbarItem | items} and edit or remove existing ones.
     *
     * When you pass in an `array` of {@link DocumentEditorToolbarItem}, the current items will be immediately
     * updated. Calling this method is also idempotent.
     *
     * If you pass in a function, it will be immediately invoked and will receive the current
     * `array` of {@link DocumentEditorToolbarItem} as argument. You can use this to modify the list based on its
     * current value. This type of update is guaranteed to be atomic - the value of `currentDocumentEditorToolbarItems`
     * can't change in between.
     * See: {@link SetDocumentEditorToolbarFunction | DocumentEditorToolbarItemsSetter}
     *
     * When one of the supplied {@link DocumentEditorToolbarItem} is invalid, this method will throw an
     * {@link Error} that contains a detailed error message.
     *
     * Since `items` is a regular JavaScript `Array` of object literals it can be manipulated using
     * standard array methods like `forEach`, `map`, `reduce`, `splice` and so on.
     * Additionally you can use any 3rd party library for array manipulation like {@link https://lodash.com|lodash}
     * or {@link http://anguscroll.com/just|just}.
     *
     * @example
     * Use ES2015 arrow functions and the update callback to reduce boilerplate
     * ```ts
     * instance.setDocumentEditorToolbarItems(items => items.reverse());
     * ```
     *
     * @example
     * The new changes will be applied immediately
     * ```ts
     * instance.setDocumentEditorToolbarItems(newItems);
     * instance.documentEditorToolbarItems === newItems; // => true
     * ```
     *
     * @example
     * Changing a property of a custom button
     * ```ts
     * const myButton = {
     *   type: "custom",
     *   id: "my-button",
     *   onPress() {
     *     alert("test");
     *   },
     * };
     * ```
     *
     * @throws {Error} will throw an error when the supplied items array is not valid. This will also throw an error if you don not have document editor license.
     * @param documentEditorToolbarItemsOrFunction - Either a
     *   new `array` of DocumentEditorToolbarItem which would overwrite the existing one, or a callback that will get
     *   invoked with the current toolbar items and is expected to return the new `array` of items.
     */
    setDocumentEditorToolbarItems(documentEditorToolbarItemsOrFunction: DocumentEditorToolbarItem[] | SetDocumentEditorToolbarFunction): void;

  };
} & T;

/**
 * Describes the properties of a Document Editor Toolbar Item.
 *
 * Check out [our guides](https://www.nutrient.io/guides/web/customizing-the-interface/customizing-the-document-editor-toolbar-and-footer/)
 * for more examples.
 *
 * @see {@link NutrientViewer.Instance#setDocumentEditorToolbarItems}
 * @see {@link Configuration#documentEditorToolbarItems}
 *
 * @replaceWith export interface DocumentEditorToolbarItem extends DocumentEditorBuiltinToolbarItem, DocumentEditorCustomToolbarItem { type: BuiltInDocumentEditorToolbarItemType | 'custom' }
 */
export declare type DocumentEditorToolbarItem = DocumentEditorBuiltinToolbarItem | DocumentEditorCustomToolbarItem;

/**
 * An object provided the Nutrient Web SDK to custom items in the document editor toolbar and footer. This object contains methods that can be
 * invoked to retrieve and modify the current stack of document operations to be applied to the open document.
 */
export declare type DocumentEditorUIHandler = {
  setOperations: SetOperationsCallback;
  /**
   * Retrieve the page indexes of the currently selected pages. This function can be used to set the scope of a new document operation, for example.
   *
   * @returns The page indexes of the currently selected pages.
   */
  getSelectedPageIndexes: () => number[];
};

/**
 * The different signature validation states the document can be in.
 *
 * @enum
 */
export declare const DocumentIntegrityStatus: {
  /**
   * The part of the document covered by the signature has not been modified.
   */
  readonly ok: "ok";
  /**
   * The part of the document covered by the signature has been modified.
   */
  readonly tampered_document: "tampered_document";
  /**
   * The signature /Contents couldn't be parsed.
   */
  readonly failed_to_retrieve_signature_contents: "failed_to_retrieve_signature_contents";
  /**
   * The signature /ByteRange couldn't be parsed.
   */
  readonly failed_to_retrieve_byterange: "failed_to_retrieve_byterange";
  /**
   * The digest of the document couldn't be calculated.
   */
  readonly failed_to_compute_digest: "failed_to_compute_digest";
  /**
   * The signing certificate from the signature contents couldn't be extracted.
   */
  readonly failed_retrieve_signing_certificate: "failed_retrieve_signing_certificate";
  /**
   * The public key from the signature contents couldn't be extracted.
   */
  readonly failed_retrieve_public_key: "failed_retrieve_public_key";
  /**
   * The encryption padding from the signature contents couldn't be extracted.
   */
  readonly failed_encryption_padding: "failed_encryption_padding";
  /**
   * The digital signature contains a timestamp that is not valid or the timestamped data was tampered with.
   */
  readonly tampered_or_invalid_timestamp: "tampered_or_invalid_timestamp";
  /**
   * An unspecific error.
   */
  readonly general_failure: "general_failure";
};

/** @inline */
declare type DocumentIntegrityStatusType = (typeof DocumentIntegrityStatus)[keyof typeof DocumentIntegrityStatus];

declare type DocumentMarkupMode =
/** Revisions are not shown in the resulting PDF. */
'noMarkup'
/** Revisions are shown as they would appear in the original DOCX document. */ |
'original'
/** Revisions are shown with simple indicators (e.g., strikethrough for deletions, underline for additions). */ |
'simpleMarkup'
/** All revision details are shown, including comments and tracked changes. */ |
'allMarkup';

/** @inline */
declare type DocumentMetadata = {
  title?: string;
  author?: string;
};

/**
 * The DocumentOperation namespace contains all the operations that can be applied to a document.
 *
 * @example
 * Apply a rotation operation to the document after load.
 *
 * ```ts
 * instance.applyOperations([{
 *   type: 'rotatePages',
 *   pageIndexes: [0],
 *   rotateBy: 90
 * }])
 * ```
 *
 * @example
 * Export the document with the operations applied.
 *
 * ```ts
 * instance.exportPDFWithOperations([{
 *   type: 'rotatePages',
 *   pageIndexes: [0],
 *   rotateBy: 90
 * }])
 * ```
 *
 * @see {@link Instance#applyOperations}
 * @see {@link Instance#exportPDFWithOperations}
 */
export declare namespace DocumentOperations {
  /**
   * Adds a blank page after the specified page index using the provided configuration.
   */
  export interface AddPageAfterOperation extends AddPageConfiguration {
    type: 'addPage';
    afterPageIndex: number;
  }
  /**
   * Adds a blank page before the specified page index using the provided configuration.
   */
  export interface AddPageBeforeOperation extends AddPageConfiguration {
    type: 'addPage';
    beforePageIndex: number;
  }
  /**
   * Crops the pages of PDF document. If the `pageIndexes` property is undefined,
   * the cropping operation is applied to all pages.
   *
   * @example
   * ```ts
   * instance.applyOperations([{
   * type: "cropPages",
   * pageIndexes: [1, 2],
   * cropBox: new NutrientViewer.Geometry.Rect({
   *    top: 100,
   *    left: 100,
   *    width: 100,
   *    height: 100
   *  })
   * }]);
   * ```
   */
  export interface CropPagesOperation {
    type: 'cropPages';
    pageIndexes?: Array<number>;
    cropBox: Rect;
  }
  /**
   * Adds margins to the pages of the document. If the `pageIndexes` property is undefined,
   * the new margins are applied to all pages. Negative numbers will shrink the page.
   *
   * Content and annotations will be repositioned back to the original location on the page,
   * and other boxes (crop, bleed, trim, art) will be adjusted to encompass the same area.
   *
   * @example
   * ```ts
   * instance.applyOperations([{
   * type: "addPageMargins",
   * pageIndexes: [1, 2],
   * margins: new NutrientViewer.Geometry.Inset({
   *    top: 100,
   *    left: 100,
   *    right: 100,
   *    bottom: 100
   *  })
   * }]);
   * ```
   */
  export interface AddPageMarginsOperation {
    type: 'addPageMargins';
    pageIndexes?: Array<number>;
    margins: Inset;
  }
  /**
   * Removes the pages specified in the `pageIndexes` array.
   */
  export interface RemovePagesOperation {
    type: 'removePages';
    pageIndexes: Array<number>;
  }
  /**
   * Duplicates the pages specified in the `pageIndexes` array. Each new page will
   * be inserted after the original page.
   */
  export interface DuplicatePagesOperation {
    type: 'duplicatePages';
    pageIndexes: Array<number>;
  }
  /**
   * Moves the pages specified in the `pageIndexes` array after the page specified.
   */
  export interface MovePagesAfterOperation {
    type: 'movePages';
    pageIndexes: Array<number>;
    afterPageIndex: number;
  }
  /**
   * Moves the pages specified in the `pageIndexes` array before the page specified.
   */
  export interface MovePagesBeforeOperation {
    type: 'movePages';
    pageIndexes: Array<number>;
    beforePageIndex: number;
  }
  /**
   * Rotates the pages specified in the `pageIndexes` array by the amount of degrees set
   * in `rotateBy`.
   */
  export interface RotatePagesOperation {
    type: 'rotatePages';
    pageIndexes: Array<number>;
    rotateBy: Rotation;
  }
  /**
   * Removes all pages from the document except for the pages specified in the
   * `pageIndexes` array.
   *
   * @example
   * ```ts
   * instance.applyOperations([{
   *  type: "keepPages",
   *  pageIndexes: [1, 2]
   * }]);
   * ```
   */
  export interface KeepPagesOperation {
    type: 'keepPages';
    pageIndexes: Array<number>;
  }
  /**
   * Imports the provided document after the specified page index. `treatImportedDocumentAsOnePage`
   * determines whether it will be treated as a single page for other document operations
   * (e.g. a rotation) provided during the same call. After these operations
   * are applied, the imported pages will behave like regular pages in the document.
   *
   * Flattening and importing a document where `treatImportedDocumentAsOnePage` in the same operations
   * batch is not supported and will raise an error.
   *
   * Importing the same document more than once in the same operations block is not allowed with the UI
   * in order to prevent possible user mistakes, but can be done programmatically.
   */
  export interface ImportDocumentAfterOperation {
    type: 'importDocument';
    afterPageIndex: number;
    treatImportedDocumentAsOnePage?: boolean;
    document: OperationAttachment;
    importedPageIndexes?: ImportPageIndex;
  }
  /**
   * Imports the provided document before the specified page index. `treatImportedDocumentAsOnePage`
   * determines whether it will be treated as a single page for other document operations
   * (e.g. a rotation) provided during the same call. After these operations
   * are applied, the imported pages will behave like regular pages in the document.
   *
   * Flattening and importing a document where `treatImportedDocumentAsOnePage` in the same operations
   * batch is not supported and will raise an error.
   *
   * Importing the same document more than once in the same operations block is not allowed with the UI
   * in order to prevent possible user mistakes, but can be done programmatically.
   */
  export interface ImportDocumentBeforeOperation {
    type: 'importDocument';
    beforePageIndex: number;
    treatImportedDocumentAsOnePage?: boolean;
    document: OperationAttachment;
    importedPageIndexes?: ImportPageIndex;
  }
  /**
   * Sets the page label for the pages specified in the `pageIndexes` array.
   */
  export interface SetPageLabelOperation {
    type: 'setPageLabel';
    pageIndexes?: Array<number>;
    pageLabel?: string;
  }
  /**
   * If the OCR component is present in the license, performs OCR on the pages given with the language requested. See {@link https://www.nutrient.io/guides/server/current/ocr/language-support/} for supported languages.
   *
   * @server
   * @example
   * instance.applyOperations([{
   *  type: "performOcr",
   *  pageIndexes: "all",
   *  language: "en"
   * }]);
   */
  export interface PerformOcrOperation {
    type: 'performOcr';
    pageIndexes?: Array<number> | 'all';
    language: string;
  }
  /**
   * If the Redaction component is present in the license, applies any redaction annotations, redacting the page content and removing the annotations.
   */
  export interface ApplyRedactionsOperation {
    type: 'applyRedactions';
  }
  /**
   * Updates metadata on the destination document.
   */
  export interface UpdateMetadataOperation {
    type: 'updateMetadata';
    metadata: DocumentMetadata;
  }
  /**
   * Applies the given Instant JSON object specified in the `instantJson` property.
   * To learn about Instant JSON please refer to
   * {@link https://www.nutrient.io/guides/web/importing-exporting/instant-json/ | this guide article}.
   */
  export interface ApplyInstantJsonOperation {
    type: 'applyInstantJson';
    instantJson: InstantJSON;
    dataFilePath?: OperationAttachment;
  }
  /**
   * Applies the given XFDF string specified in the `xfdf` property.
   * To learn about XFDF please refer to
   * {@link https://www.nutrient.io/guides/web/current/importing-exporting/xfdf-support/ | this guide article}.
   *
   * @see {@link Configuration#XFDF}
   */
  export interface ApplyXfdfOperation {
    type: 'applyXfdf';
    xfdf: string;
    ignorePageRotation?: boolean;
    dataFilePath?: OperationAttachment;
    richTextEnabled?: boolean;
  }
  /**
   * Flattens the annotations of the specified pages, or of all pages if none is specified.
   *
   * Flattening and importing a document where `treatImportedDocumentAsOnePage` in the same operations
   * batch is not supported and will raise an error.
   */
  export interface FlattenAnnotationsOperation {
    type: 'flattenAnnotations';
    pageIndexes?: Array<number>;
    annotationIds?: string[];
    noteAnnotationBackgroundColor?: Color;
    noteAnnotationOpacity?: number;
  }
  export type DocumentOperationsUnion = AddPageAfterOperation | AddPageBeforeOperation | CropPagesOperation | AddPageMarginsOperation | RemovePagesOperation | DuplicatePagesOperation | MovePagesAfterOperation | MovePagesBeforeOperation | RotatePagesOperation | KeepPagesOperation | ImportDocumentAfterOperation | ImportDocumentBeforeOperation | SetPageLabelOperation | PerformOcrOperation | ApplyRedactionsOperation | UpdateMetadataOperation | ApplyInstantJsonOperation | ApplyXfdfOperation | FlattenAnnotationsOperation;
}

declare function DocumentOperationsMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Applies operations to the current document. If multiple operations are provided,
     * each operation is performed on the resulting document from the previous operation. This API works only if you have the document editor component in your license.
     *
     * @example
     * Apply 90 degrees rotation to page 0
     * ```ts
     * instance
     *   .applyOperations([
     *     {
     *       type: "rotatePages",
     *       pageIndexes: [0],
     *       rotateBy: 90
     *     }
     *   ]);
     * ```
     *
     * @param operations - Operations to be performed on the document.
     * @returns Promise that resolves with an array of results.
     */
    applyOperations(operations: Array<DocumentOperations.DocumentOperationsUnion>): Promise<unknown>;
    /**
     * Exports the PDF contents after applying operations on the current document, which is not modified.
     * If multiple operations are provided, each operation is performed on the resulting document from the previous operation.
     * Returns an `ArrayBuffer` that can be used to download the PDF.
     *
     * @example
     * Export the modified PDF content
     * ```ts
     * const operations = [
     *   {
     *     type: "rotatePages",
     *     pageIndexes: [0],
     *     rotateBy: 90
     *   }
     * ];
     * instance.exportPDFWithOperations(operations).then(function (buffer) {
     *   buffer; // => ArrayBuffer
     * });
     * ```
     *
     * @example
     * Download the modified PDF by using an `&lt;a&gt;` tag
     * ```ts
     * const operations = [
     *   {
     *     type: "rotatePages",
     *     pageIndexes: [0],
     *     rotateBy: 90
     *   }
     * ];
     * instance.exportPDFWithOperations(operations).then(function(buffer) {
     *   const supportsDownloadAttribute = HTMLAnchorElement.prototype.hasOwnProperty(
     *     "download"
     *   );
     *   const blob = new Blob([buffer], { type: "application/pdf" });
     *   if (navigator.msSaveOrOpenBlob) {
     *     navigator.msSaveOrOpenBlob(blob, "download.pdf");
     *   } else if (!supportsDownloadAttribute) {
     *     const reader = new FileReader();
     *     reader.onloadend = function() {
     *       const dataUrl = reader.result;
     *       downloadPdf(dataUrl);
     *     };
     *     reader.readAsDataURL(blob);
     *   } else {
     *     const objectUrl = window.URL.createObjectURL(blob);
     *     downloadPdf(objectUrl);
     *     window.URL.revokeObjectURL(objectUrl);
     *   }
     * });
     * function downloadPdf(blob) {
     *   const a = document.createElement("a");
     *   a.href = blob;
     *   a.style.display = "none";
     *   a.download = "download.pdf";
     *   a.setAttribute("download", "download.pdf");
     *   document.body.appendChild(a);
     *   a.click();
     *   document.body.removeChild(a);
     * }
     * ```
     *
     * @param operations - Operations to be performed on the document.
     * @returns Promise that resolves with the binary contents of the modified PDF.
     */
    exportPDFWithOperations(operations: Array<DocumentOperations.DocumentOperationsUnion>): Promise<ArrayBuffer>;

  };
} & T;

/**
 * Flags representing permissions that can be granted to users for a document.
 *
 * These permissions control what actions are allowed, such as editing, printing, or extracting content.
 * Combine these flags to specify the allowed operations when exporting or encrypting a document.
 *
 * @enum
 */
declare const DocumentPermissionsEnum: {
  /**
   * Allows adding or modifying text annotations and interactive form fields.
   * If `fillForms` is also set, the user can fill existing forms (including digital signatures).
   */
  readonly annotationsAndForms: "annotationsAndForms";
  /**
   * Allows assembling the document: inserting, rotating, or deleting pages, and creating bookmarks or thumbnails.
   */
  readonly assemble: "assemble";
  /**
   * Allows copying or extracting text and graphics from the document.
   */
  readonly extract: "extract";
  /**
   * Allows extracting text and graphics for accessibility purposes (e.g., screen readers).
   */
  readonly extractAccessibility: "extractAccessibility";
  /**
   * Allows filling in existing interactive form fields, including digital signatures.
   */
  readonly fillForms: "fillForms";
  /**
   * Allows modifying the document contents by operations other than assembling.
   */
  readonly modification: "modification";
  /**
   * Allows high-quality printing (up to 300 dpi). If not set, printing is limited to 150 dpi.
   */
  readonly printHighQuality: "printHighQuality";
  /**
   * Allows printing the document. If `printHighQuality` is not set, printing is limited to degraded quality.
   */
  readonly printing: "printing";
};

declare function DocumentTextComparisonMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Compares documents based on the operation provided. It supports both standard text comparison and AI-powered analysis and tagging.
     *
     * @example
     * Compare two documents
     * ```ts
     * const operation = new NutrientViewer.ComparisonOperation("text", { numberOfContextWords: 2 });
     *
     * const originalDocument = new NutrientViewer.DocumentDescriptor({ filePath: "path/to/original.pdf", pageIndexes: [0]});
     * const changedDocument = new NutrientViewer.DocumentDescriptor({ filePath: "path/to/changed.pdf", pageIndexes: [0]});
     *
     * const comparisonDocuments = { originalDocument, changedDocument };
     *
     * instance.compareDocuments(operation, comparisonDocuments)
     *   .then((comparisonResults) => {
     *     console.log(comparisonResults);
     *   });
     * ```
     *
     * @example
     * AI-powered analysis
     * ```ts
     * const aiOperation = new NutrientViewer.ComparisonOperation(
     *   NutrientViewer.ComparisonOperationType.AI,
     *   { operationType: NutrientViewer.AIComparisonOperationType.ANALYZE }
     * );
     *
     * instance.compareDocuments(comparisonDocuments, aiOperation)
     *   .then((result) => {
     *     // For AI operations, check the result type
     *     if (NutrientViewer.isAIDocumentComparisonResult(result)) {
     *       console.log('AI Summary:', result.summary);
     *       console.log('Categories:', result.categories);
     *     }
     *   });
     * ```
     *
     * @example
     * AI-powered tagging with categories
     * ```ts
     * const tagOperation = new NutrientViewer.ComparisonOperation(
     *   NutrientViewer.ComparisonOperationType.AI,
     *   {
     *     operationType: NutrientViewer.AIComparisonOperationType.TAG,
     *     categories: ["Legal", "Financial"]
     *   }
     * );
     *
     * instance.compareDocuments(comparisonDocuments, tagOperation)
     *  .then((result) => {
     *    // For AI operations, check the result type
     *    if (NutrientViewer.isAIDocumentComparisonResult(result)) {
     *      console.log('Tagged References:', result.references);
     *      // result.changes contains the original DocumentComparisonResult
     *    }
     *  });
     * ```
     *
     * @param comparisonDocuments - Descriptors of the original and changed documents.
     * @param operation - The comparison operation to be applied (either standard text or AI).
     * @returns A promise that resolves to the result of the comparison. The type depends on the operation: `DocumentComparisonResult` for text comparison, `AIDocumentComparisonResult` for AI operations.
     */
    compareDocuments(comparisonDocuments: DocumentComparison.ComparisonDocuments, operation: ComparisonOperation): Promise<DocumentComparison.DocumentComparisonResult | AIDocumentComparisonResult>;

  };
} & T;

/**
 * The different possible validation states of the document. Based on the validation
 * of the digital signatures it contains.
 *
 * @enum
 */
export declare const DocumentValidationStatus: {
  /**
   * All of the signatures of the document are valid, that is, it should be shown with a green
   * checkmark or similar in the UI.
   */
  valid: string;
  /**
   * All of the signatures of the document are valid with concerns, that is, it should be shown with
   * a yellow warning or similar in the UI.
   */
  warning: string;
  /**
   * At least one signature of the document is invalid, that is, it should be shown with
   * a red cross of similar in the UI.
   */
  error: string;
  /**
   * The document does not contain digital signatures.
   */
  not_signed: string;
};

declare type DocumentValidationStatusType = keyof typeof DocumentValidationStatus;

/** @inline */
declare type DoNotSpellCheckPropertyPair = XOR<Record<'doNotSpellCheck', boolean>, Record<'doNotSpellcheck', boolean>>;

declare type dotNetObject = {
  invokeMethodAsync(methodName: string, ...args: any): Promise<any>;
};

/**
 * @class
 * An extension of the {@link NutrientViewer.Geometry.Point} that can also store an `intensity` value.
 * This is used for example inside an ink annotation, where the intensity is the pressure that was
 * exerted by the touch device.
 * @example
 * Create and update a point
 * ```ts
 * const point = new DrawingPoint({
 *   x: 20,
 *   y: 30,
 *   intensity: 0.3
 * });
 * point.intensity; // => 0.3
 * ```
 *
 * @public
 * @summary A 3D vector that describes a point in space and an intensity value.
 * @param args - An object used to initialize the Point. If `x` or `y` is omitted, `0` will
 *        be used instead. If `intensity` is omitted, `0.5` will be used (the neutral intensity
 *        value).
 * @default { x: 0, y: 0, intensity: 0.5 }
 */
export declare class DrawingPoint extends Point {
  /**
   * The `intensity` is used to describe the pressure of a point inside an ink annotation. It is
   * capped between 0 and 1 inclusive.
   *
   * If the touch input does not allow to measure the pressure, a value of `0.5` should be used.
   *
   * @default 0.5
   */
  intensity: number;
  static defaultValues: IObject;
  constructor(options?: IDrawingPoint);
}

/**
 * Represents one of the available signing methods for adding
 * new electronic signatures using the UI.
 *
 * @enum
 */
declare const ElectronicSignatureCreationMode: {
  /** UI in which users draw a signature. */
  readonly DRAW: "DRAW";
  /** UI in which users pick or drag an image to use that as the signature. */
  readonly IMAGE: "IMAGE";
  /** UI in which users can type a text and generate an image signature from it. */
  readonly TYPE: "TYPE";
};

/**
 * @public
 * @summary Callback that returns the default text for the Type Electronic Signature UI.
 * @returns The default text for the Type Electronic Signature UI.
 */
export declare type ElectronicSignatureDefaultTextCallback = () => string | undefined | void;

/**
 * Defines specific configuration options related to the electronic signatures feature.
 *
 * @public
 * @summary Object containing configuration options for electronic signatures
 * @example
 * NutrientViewer.load({
 *   electronicSignatures: {
 *     creationModes: [NutrientViewer.ElectronicSignatureCreationMode.IMAGE],
 *     fonts: [new NutrientViewer.Font("mycustomfont")]
 *   }
 * });
 */
export declare type ElectronicSignaturesConfiguration = {
  /**
   * Array of tabs that should be offered to users on the
   * electronic signatures modal.
   */
  creationModes?: IElectronicSignatureCreationMode[];
  /**
   * Array of {@link NutrientViewer.Font} fonts that users can choose from
   * when typing text for adding a new electronic signature.
   *
   * You can specify any additional font to use on a custom style sheet
   * set via {@link Configuration#styleSheets} via `@font-face`
   * CSS at-rule.
   *
   * When specifying the `name` of each `NutrientViewer.Font` record make sure
   * that it matches the one specified on the style sheet.
   */
  fonts?: Readonly<Font[]>;
  /**
   * Optionally set an initial default text for the Type Electronic Signature UI.
   *
   * The default placeholder will be shown if the callback does not return a non-empty string,
   * or is not set to a non-empty string.
   *
   * @example
   * Setting a default text for the Type Electronic Signature UI
   * ```ts
   *  NutrientViewer.load({
   *   electronicSignatures: {
   *    setDefaultTypeText: () => "My default text"
   *  }
   * });
   * ```
   */
  setDefaultTypeText?: ElectronicSignatureDefaultTextCallback | string;
  /**
   * Optionally set color presets to be used in the Electronic Signatures dialog.
   *
   * @example
   * Setting custom color presets for the Type Electronic Signature UI
   * ```ts
   *  NutrientViewer.load({
   *   electronicSignatures: {
   *     colorPresets: [
   *       {
   *         color: Color.RED,
   *         localization: {
   *           id: 'red',
   *           defaultMessage: 'Red',
   *           description: 'Red color',
   *         },
   *       },
   *       {
   *         color: Color.ORANGE,
   *         localization: {
   *           id: 'orange',
   *           defaultMessage: 'Orange',
   *           description: 'Orange color',
   *         },
   *       },
   *       {
   *         color: Color.YELLOW,
   *         localization: {
   *           id: 'yellow',
   *           defaultMessage: 'Yellow',
   *           description: 'Yellow color',
   *         },
   *       },
   *     ],
   *   }
   * });
   * ```
   */
  colorPresets?: Readonly<ColorPreset[]>;
};

/**
 * @class
 * Ellipse annotations are used to draw ellipses on a page.
 *
 * Ellipse annotations with transparent fill color are only selectable around their visible lines.
 * This means that you can create a page full of ellipse annotations while
 * annotations behind the ellipse annotation are still selectable.
 *
 * Right now, ellipse annotations are implemented using SVG images. This behavior is subject to
 * change.
 *
 * <center>
 *   <img title="Example of an ellipse annotation" src="img/annotations/shape_ellipse_annotation.png" width="388" height="266" class="shadow">
 * </center>
 * @example
 * Create an ellipse annotation
 * ```ts
 * const annotation = new NutrientViewer.Annotations.EllipseAnnotation({
 *   pageIndex: 0,
 *   boundingBox: new NutrientViewer.Geometry.Rect({
 *     left: 10,
 *     top: 10,
 *     width: 100,
 *     height: 100,
 *   }),
 *   cloudyBorderIntensity: 2,
 *   cloudyBorderInset: new NutrientViewer.Geometry.Inset({
 *     left: 9,
 *     top: 9,
 *     right: 9,
 *     bottom: 9,
 *   })
 * });
 * ```
 *
 * @public
 * @summary Display an ellipse on a page.
 * @param args - An object of the members.
 */
export declare class EllipseAnnotation extends ShapeAnnotation<IEllipseAnnotation> {
  /**
   * Intensity of the cloudy border.
   *
   * If not present or 0, the annotation will use a normal border.
   *
   * @default null Normal border.
   */
  cloudyBorderIntensity: null | number;
  /**
   * Cloudy border inset.
   *
   * For ellipse annotations with a cloudy border, it contains the values for the distances from
   * the bounding box to bounding box wrapped by the inner, where the content fits.
   *
   * Visual representation of the property:
   *
   * <center>
   * <img title="Example of a cloudy ellipse annotation" src="img/annotations/ellipse_inset.png" width="600" height="405" class="shadow">
   * </center>
   */
  cloudyBorderInset: null | Inset;
  static defaultValues: IObject;
  static readableName: string;
  constructor(options?: Partial<IEllipseAnnotation>);
}

/**
 * @deprecated Use {@link Serializers.EllipseAnnotationJSON} instead.
 * @hidden
 */
export declare type EllipseAnnotationJSON = Serializers.EllipseAnnotationJSON;

declare class EllipseAnnotationSerializer extends ShapeAnnotationSerializer {
  annotation: EllipseAnnotation;
  toJSON(): Serializers.EllipseAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<Serializers.EllipseAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): EllipseAnnotation;
}

/**
 * This record is used to persist the information for an embedded file.
 *
 * @summary Embedded File.
 * @hideconstructor
 * @see {@link Instance#getEmbeddedFiles}
 * @see {@link Instance#getAttachment}
 */
export declare class EmbeddedFile extends EmbeddedFile_base {}

declare const EmbeddedFile_base: Immutable.Record.Factory<IEmbeddedFile>;

/**
 * This call back defines which text annotations should be treated as rich text annotation.
 * By default, all the text annotations are treated as plain text annotations, which means that
 * when you edit them, you will see the plain text editor. You can change this behavior by
 * returning `true` for the text annotations that you want to be treated as rich text annotations.
 *
 * For more information, see {@link Configuration#enableRichText}.
 *
 * @param annotation - The text annotation.
 * @example
 * Only treat newly created annotations as rich text annotations
 * ```ts
 * NutrientViewer.load({
 *   enableRichText: annotation => annotation.pageIndex === null
 *   // ...
 * });
 * ```
 *

 */
export declare type EnableRichTextCallback = (annotation: TextAnnotation) => boolean;

declare const EnvironmentSpecificNutrientViewer: typeof NutrientViewer;
export default EnvironmentSpecificNutrientViewer;

declare class EventEmitter {
  listeners: Record<string, EventListener_2[]>;
  events: Array<string>;
  /**
   * Creates a new EventEmitter that only accepts the events defined in `events`. If this is an
   * empty array, it accepts all event names.
   */
  constructor(events?: Array<string>);
  /**
   * Register a new event listener for the `event` event
   *
   * @param event - The event you want to listen to
   * @param listener - The callback that should be triggered on each `event`
   */
  on(event: string, listener: EventListener_2): void;
  /**
   * Unregisters an event listener for the `event` event
   *
   * @param event - The event you want to listen to
   * @param listener - The callback that should be triggered on each `event`
   */
  off(event: string, listener: EventListener_2): void;
  /**
   * Emits an event
   *
   * @param event - The event you want to trigger
   * @param args - The parameters that will get forwarded to the callbacks
   */
  emit(event: string, ...args: Args): void;
  supportsEvent(event: string): boolean;
  isListening(events: Array<keyof Events.EventNameToHandlerMap>): boolean;
}

declare type EventListener_2 = (...args: any) => any;

/**
 * @enum
 */
declare const EventName: {
  /**
   * This event will be emitted whenever the current view state changes either by the user (via
   * clicking the UI) or via {@link Instance#setViewState | setViewState()}. It will be
   * called after other view state specific events. If, for example, the page index changes,
   * {@link Events.ViewStateCurrentPageIndexChangeEvent} will emit first.
   *
   * If you update multiple properties at once, this event will only be dispatched once.
   *
   * The callback takes the current {@link ViewState} as first argument, and the previous `ViewState` as second.
   *
   * @example
   * Log the previous and current view state whenever the view state changes.
   * ```ts
   * instance.addEventListener("viewState.change", (viewState, previousViewState) => {
   *   console.log(previousViewState.toJS());
   *   console.log(viewState.toJS());
   * });
   * ```
   *
   * @example
   * Show the order in which page index and view state change events are emitted.
   * ```ts
   * instance.addEventListener("viewState.currentPageIndex.change", () => console.log("first"));
   * instance.addEventListener("viewState.change", () => console.log("second"));
   * ```
   *
   * @group ViewState
   */
  readonly VIEW_STATE_CHANGE: "viewState.change";
  /**
   * This event will be emitted whenever the current page index changes. It can be used to
   * track the current view of a user.
   *
   * @example
   * Log the new page index when the page changes.
   * ```ts
   * instance.addEventListener("viewState.currentPageIndex.change", (pageIndex) => {
   *   console.log(pageIndex);
   * });
   * ```
   *
   * @group ViewState
   */
  readonly VIEW_STATE_CURRENT_PAGE_INDEX_CHANGE: "viewState.currentPageIndex.change";
  /**
   * This event will be emitted whenever the zoom level or the zoom mode changes. This could either
   * be a number multiplier or a distinct {@link ZoomConfiguration | zoom configuration or zoom mode}.
   *
   * @example
   * Log the new zoom value when the zoom changes.
   * ```ts
   * instance.addEventListener("viewState.zoom.change", (zoom) => {
   *   console.log(zoom);
   * });
   * ```
   *
   * @group ViewState
   */
  readonly VIEW_STATE_ZOOM_CHANGE: "viewState.zoom.change";
  /**
   * This event will be emitted whenever the current preset is about to be updated with new property values
   * set by the user in the annotation toolbar.
   *
   * @example
   * Prevent the current preset from being updated in the annotation toolbar.
   * ```ts
   * instance.addEventListener("annotationPresets.update", (event) => {
   *   event.preventDefault();
   * });
   * ```
   *
   * @group Annotation
   */
  readonly ANNOTATION_PRESETS_UPDATE: "annotationPresets.update";
  /**
   * This event will be emitted whenever an annotation loses focus.
   *
   * The parameter is a {@link Events.AnnotationsBlurEvent}.
   *
   * @example
   * Log the annotation and event type when an annotation loses focus.
   * ```ts
   * instance.addEventListener("annotations.blur", (event) => {
   *   console.log(event.annotation, event.nativeEvent.type)
   * });
   * ```
   *
   * @group Annotation
   */
  readonly ANNOTATIONS_BLUR: "annotations.blur";
  /**
   * This event will be emitted whenever the current annotations change either due to a user
   * action (eg. clicking the UI) or via {@link Instance#create},
   * {@link Instance#update} or {@link Instance#delete}.
   *
   * The event might also be emitted every time the NutrientViewer's annotations model changes.
   * This for example can happen when scrolling to a page and NutrientViewer loads the annotations
   * for that page or when opening the annotations sidebar and NutrientViewer (has to) loads
   * all the document annotations.
   *
   * The change event will fire before all specific events and it could be used
   * in case you want to perform some action regardless of which event caused the annotation
   * to "change" (create, delete, update, load, internal load, etc).
   * Consider using the specific events for more advanced use cases.
   *
   * @example
   * Perform a custom action whenever the annotations change.
   * ```ts
   * instance.addEventListener("annotations.change", () => {
   *   // ...
   * });
   * ```
   *
   * @group Annotation
   */
  readonly ANNOTATIONS_CHANGE: "annotations.change";
  /**
   * This event will be emitted whenever new annotations were created (either via the public
   * API or via the UI).
   *
   * If Nutrient Instant is enabled, annotations created by remote clients will also cause
   * this event to be emitted.
   *
   * The parameter is a {@link NutrientViewer.Immutable.List} of created {@link NutrientViewer.Annotations.Annotation}.
   *
   * @example
   * Log the list of created annotations.
   * ```ts
   * instance.addEventListener("annotations.create", (createdAnnotations) => {
   *   console.log(createdAnnotations);
   * });
   * ```
   *
   * @group Annotation
   */
  readonly ANNOTATIONS_CREATE: "annotations.create";
  /**
   * This event will be emitted whenever new annotations were deleted (either via the public
   * API or via the UI).
   *
   * The parameter is a {@link NutrientViewer.Immutable.List} of deleted {@link NutrientViewer.Annotations}.
   *
   * @example
   * Log the list of deleted annotations.
   * ```ts
   * instance.addEventListener("annotations.delete", (deletedAnnotations) => {
   *   console.log(deletedAnnotations);
   * });
   * ```
   *
   * @group Annotation
   */
  readonly ANNOTATIONS_DELETE: "annotations.delete";
  /**
   * This event will be emitted whenever annotations were saved to the annotation provider.
   *
   * This event will follow a {@link Events.AnnotationsWillSaveEvent}.
   *
   * @example
   * Perform an action after annotations are saved.
   * ```ts
   * instance.addEventListener("annotations.didSave", () => {
   *   // ...
   * });
   * ```
   *
   * @group Annotation
   */
  readonly ANNOTATIONS_DID_SAVE: "annotations.didSave";
  /**
   * This event will be emitted whenever an annotation is focused.
   *
   * The parameter is a {@link Events.AnnotationsFocusEvent}.
   *
   * @example
   * Log the annotation and event type when an annotation is focused.
   * ```ts
   * instance.addEventListener("annotations.focus", (event) => {
   *   console.log(event.annotation, event.nativeEvent.type)
   * });
   * ```
   *
   * @group Annotation
   */
  readonly ANNOTATIONS_FOCUS: "annotations.focus";
  /**
   * This event will be emitted whenever annotations are loaded from the annotation provider.
   * This can happen more than once since we often load annotations on demand only.
   *
   * The parameter is a {@link NutrientViewer.Immutable.List} of loaded {@link NutrientViewer.Annotations}.
   *
   * @example
   * Log the loaded annotations when they are loaded from the provider.
   * ```ts
   * instance.addEventListener("annotations.load", (loadedAnnotations) => {
   *   console.log(loadedAnnotations);
   * });
   * ```
   *
   * @group Annotation
   */
  readonly ANNOTATIONS_LOAD: "annotations.load";
  /**
   * This event will be emitted whenever an annotation is pressed i.e. either clicked or tapped.
   *
   * The parameter is a {@link Events.AnnotationsPressEvent}.
   *
   * @example
   * Prevent the default behavior for LinkAnnotation and redirect to another site when an annotation is pressed.
   * ```ts
   * instance.addEventListener("annotations.press", (event) => {
   *   if (event.annotation instanceof Annotations.LinkAnnotation) {
   *     event.preventDefault();
   *     window.location.href = "https://example.com";
   *   }
   * });
   * ```
   *
   * @group Annotation
   */
  readonly ANNOTATIONS_PRESS: "annotations.press";
  /**
   * This event will be emitted whenever new annotations were updated (either via the public
   * API or via the UI).
   *
   * The parameter is a {@link NutrientViewer.Immutable.List} of updated {@link NutrientViewer.Annotations.Annotation}.
   *
   * @example
   * Log the list of updated annotations.
   * ```ts
   * instance.addEventListener("annotations.update", (updatedAnnotations) => {
   *   console.log(updatedAnnotations);
   * });
   * ```
   *
   * @group Annotation
   */
  readonly ANNOTATIONS_UPDATE: "annotations.update";
  /**
   * This event will be emitted when the user starts or ends an interaction
   * with an annotation. See {@link NutrientViewer.AnnotationsWillChangeReason}
   * for a comprehensive list of actions supported.
   *
   * Note that this event is only emitted for actions performed through the UI.
   *
   * Despite the name, it is not necessarily fired before each emission of
   * {@link NutrientViewer.EventName.ANNOTATIONS_CHANGE}, since that would not
   * correspond to the list of possible reasons described in
   * {@link NutrientViewer.AnnotationsWillChangeReason} on all cases.
   *
   * @example
   * Show a message depending on whether the user started or finished deleting an annotation.
   * ```ts
   * instance.addEventListener("annotations.willChange", event => {
   *   const annotation = event.annotations.get(0);
   *   if (event.reason === AnnotationsWillChangeReason.DELETE_START) {
   *     console.log("Will open deletion confirmation dialog");
   *   } else if (
   *     event.reason === AnnotationsWillChangeReason.DELETE_END
   *   ) {
   *     if (annotation) {
   *       console.log("The user decided to delete the annotation.");
   *     } else {
   *       console.log("The user decided to not delete the annotation.");
   *     }
   *   }
   * });
   * ```
   *
   * @group Annotation
   */
  readonly ANNOTATIONS_WILL_CHANGE: "annotations.willChange";
  /**
   * This event will be emitted before annotations will be saved to the annotation provider.
   *
   * Right now, this happens whenever attributes of the annotation change (either via the
   * public API or via the UI) and the annotation is in a valid state.
   *
   * You can use this to display a loading spinner for example. This event will always be
   * followed by {@link Events.AnnotationsDidSaveEvent}.
   *
   * @example
   * Show a loading spinner before annotations are saved.
   * ```ts
   * instance.addEventListener("annotations.willSave", () => {
   *   // ...
   * });
   * ```
   *
   * @group Annotation
   */
  readonly ANNOTATIONS_WILL_SAVE: "annotations.willSave";
  /**
   * This event will fire whenever an annotation is being selected or unselected.
   *
   * @example
   * Log whether an annotation is selected or not when the selection changes.
   * ```ts
   * instance.addEventListener("annotationSelection.change", (annotations) => {
   *   if (annotations.size !== 0) {
   *     console.log("annotation is selected");
   *   } else {
   *     console.log("no annotation is selected");
   *   }
   * });
   * ```
   *
   * @group Annotation
   */
  readonly ANNOTATION_SELECTION_CHANGE: "annotationSelection.change";
  /**
   * This event will be emitted whenever an annotation is dragged or resized using the UI.
   *
   * The parameter is a {@link Events.AnnotationsTransformEvent}
   *
   * @example
   * Log the bounding box of an annotation when it is transformed.
   * ```ts
   * instance.addEventListener("annotations.transform", (event) => {
   *   console.log(event.annotation.boundingBox)
   * });
   * ```
   *
   * @group Annotation
   */
  readonly ANNOTATIONS_TRANSFORM: "annotations.transform";
  /**
   * This event will be emitted whenever an annotation is copied using Cmd/Ctrl+C keyboard shortcut.
   *
   * The parameter is a {@link Events.AnnotationsCopyEvent}
   *
   * @example
   * Log the annotation that was copied.
   * ```ts
   * instance.addEventListener("annotations.copy", (event) => {
   *   console.log(event.annotation)
   * });
   * ```
   *
   * @group Annotation
   */
  readonly ANNOTATIONS_COPY: "annotations.copy";
  /**
   * This event will be emitted whenever an annotation is cut using Cmd/Ctrl+X keyboard shortcut.
   *
   * The parameter is a {@link Events.AnnotationsCutEvent}
   *
   * @example
   * Log the annotation that was cut.
   * ```ts
   * instance.addEventListener("annotations.cut", (event) => {
   *   console.log(event.annotation)
   * });
   * ```
   *
   * @group Annotation
   */
  readonly ANNOTATIONS_CUT: "annotations.cut";
  /**
   * This event will be emitted whenever an annotation is pasted using Cmd/Ctrl+V keyboard shortcut.
   *
   * The parameter is a {@link Events.AnnotationsPasteEvent}
   *
   * @example
   * Log the annotations that were pasted.
   * ```ts
   * instance.addEventListener("annotations.paste", (event) => {
   *   console.log(event.annotations)
   * });
   * ```
   *
   * @group Annotation
   */
  readonly ANNOTATIONS_PASTE: "annotations.paste";
  /**
   * This event will be emitted whenever an annotation is duplicated using the Ctrl/Cmd+D keyboard shortcut.
   *
   * The parameter is a {@link Events.AnnotationsDuplicateEvent}
   *
   * @example
   * Log the annotation that was duplicated.
   * ```ts
   * instance.addEventListener("annotations.duplicate", (event) => {
   *   console.log(event.annotation)
   * });
   * ```
   *
   * @group Annotation
   */
  readonly ANNOTATIONS_DUPLICATE: "annotations.duplicate";
  /**
   * This event will be emitted whenever the current bookmarks change either
   * via {@link Instance#create}, {@link Instance#update} or {@link Instance#delete}.
   *
   * The change event will fire before all specific events. Consider using the specific events
   * for more advanced use cases.
   *
   * @example
   * Perform a custom action whenever the bookmarks change.
   * ```ts
   * instance.addEventListener("bookmarks.change", () => {
   *   // ...
   * });
   * ```
   *
   * @group Bookmark
   */
  readonly BOOKMARKS_CHANGE: "bookmarks.change";
  /**
   * This event will be emitted whenever new bookmarks are created (either via the public
   * API or via the UI).
   *
   * The parameter is a {@link NutrientViewer.Immutable.List} of created {@link Bookmark}.
   *
   * @example
   * Log the list of created bookmarks.
   * ```ts
   * instance.addEventListener("bookmarks.create", (createdBookmarks) => {
   *   console.log(createdBookmarks);
   * });
   * ```
   *
   * @group Bookmark
   */
  readonly BOOKMARKS_CREATE: "bookmarks.create";
  /**
   * This event will be emitted whenever bookmarks are updated (either via the public
   * API or via the UI).
   *
   * The parameter is a {@link NutrientViewer.Immutable.List} of updated {@link Bookmark}.
   *
   * @example
   * Log the list of updated bookmarks.
   * ```ts
   * instance.addEventListener("bookmarks.update", (updatedBookmarks) => {
   *   console.log(updatedBookmarks);
   * });
   * ```
   *
   * @group Bookmark
   */
  readonly BOOKMARKS_UPDATE: "bookmarks.update";
  /**
   * This event will be emitted whenever bookmarks are deleted (either via the public
   * API or via the UI).
   *
   * The parameter is a {@link NutrientViewer.Immutable.List} of deleted {@link Bookmark}.
   *
   * @example
   * Log the list of deleted bookmarks.
   * ```ts
   * instance.addEventListener("bookmarks.delete", (deletedBookmarks) => {
   *   console.log(deletedBookmarks);
   * });
   * ```
   *
   * @group Bookmark
   */
  readonly BOOKMARKS_DELETE: "bookmarks.delete";
  /**
   * This event will be emitted whenever bookmarks are loaded from the bookmark provider.
   * This can happen more than once since we often load bookmarks on demand only.
   *
   * The parameter is a {@link NutrientViewer.Immutable.List} of loaded {@link Bookmark}.
   *
   * @example
   * Log the loaded bookmarks when they are loaded from the provider.
   * ```ts
   * instance.addEventListener("bookmarks.load", (loadedBookmarks) => {
   *   console.log(loadedBookmarks);
   * });
   * ```
   *
   * @group Bookmark
   */
  readonly BOOKMARKS_LOAD: "bookmarks.load";
  /**
   * This event will be emitted whenever bookmarks were saved to the bookmark provider.
   *
   * This event will follow a {@link NutrientViewer.EventName.BOOKMARKS_WILL_SAVE}.
   *
   * @example
   * Perform an action after bookmarks are saved.
   * ```ts
   * instance.addEventListener("bookmarks.didSave", () => {
   *   // ...
   * });
   * ```
   *
   * @group Bookmark
   */
  readonly BOOKMARKS_DID_SAVE: "bookmarks.didSave";
  /**
   * This event will be emitted before bookmarks will be saved to the bookmark provider.
   *
   * Right now, this happens whenever attributes of the bookmark change (either via the
   * public API or via the UI) and the bookmark is in a valid state.
   *
   * You can use this to display a loading spinner for example. This event will always be
   * followed by {@link NutrientViewer.EventName.BOOKMARKS_DID_SAVE}.
   *
   * @example
   * Show a loading spinner before bookmarks are saved.
   * ```ts
   * instance.addEventListener("bookmarks.willSave", () => {
   *   // ...
   * });
   * ```
   *
   * @group Bookmark
   */
  readonly BOOKMARKS_WILL_SAVE: "bookmarks.willSave";
  /**
   * This event will be emitted whenever the current comments change either
   * via {@link Instance#create},
   * {@link Instance#update} or {@link Instance#delete}.
   *
   * The change event will fire before all specific events. Consider using the specific events
   * for more advanced use cases.
   *
   * @example
   * Perform a custom action whenever the comments change.
   * ```ts
   * instance.addEventListener("comments.change", () => {
   *   // ...
   * });
   * ```
   *
   * @group Comment
   */
  readonly COMMENTS_CHANGE: "comments.change";
  /**
   * This event will be emitted whenever new comments are created (either via the public
   * API or via the UI).
   *
   * The parameter is a {@link NutrientViewer.Immutable.List} of created {@link Comment}.
   *
   * @example
   * Log the list of created comments.
   * ```ts
   * instance.addEventListener("comments.create", (createdComments) => {
   *   console.log(createdComments);
   * });
   * ```
   *
   * @group Comment
   */
  readonly COMMENTS_CREATE: "comments.create";
  /**
   * This event will be emitted whenever comments are deleted (either via the public
   * API or via the UI).
   *
   * The parameter is a {@link NutrientViewer.Immutable.List} of deleted {@link Comment}.
   *
   * @example
   * Log the list of deleted comments.
   * ```ts
   * instance.addEventListener("comments.delete", (deletedComments) => {
   *   console.log(deletedComments);
   * });
   * ```
   *
   * @group Comment
   */
  readonly COMMENTS_DELETE: "comments.delete";
  /**
   * This event will be emitted whenever comments are updated (either via the public
   * API or via the UI).
   *
   * The parameter is a {@link NutrientViewer.Immutable.List} of updated {@link Comment}.
   *
   * @example
   * Log the list of updated comments.
   * ```ts
   * instance.addEventListener("comments.update", (updatedComments) => {
   *   console.log(updatedComments);
   * });
   * ```
   *
   * @group Comment
   */
  readonly COMMENTS_UPDATE: "comments.update";
  /**
   * This event will be emitted whenever comments are loaded from the comment provider.
   * This can happen more than once since we often load comments on demand only.
   *
   * The parameter is a {@link NutrientViewer.Immutable.List} of loaded {@link Comment}.
   *
   * @example
   * Log the loaded comments when they are loaded from the provider.
   * ```ts
   * instance.addEventListener("comments.load", (loadedComments) => {
   *   console.log(loadedComments);
   * });
   * ```
   *
   * @group Comment
   */
  readonly COMMENTS_LOAD: "comments.load";
  /**
   * This event will be emitted before comments will be saved to the comment provider.
   *
   * Right now, this happens whenever attributes of the comment change (either via the
   * public API or via the UI) and the comment is in a valid state.
   *
   * You can use this to display a loading spinner for example. This event will always be
   * followed by {@link NutrientViewer.EventName.COMMENTS_DID_SAVE}.
   *
   * @example
   * Show a loading spinner before comments are saved.
   * ```ts
   * instance.addEventListener("comments.willSave", () => {
   *   // ...
   * });
   * ```
   *
   * @group Comment
   */
  readonly COMMENTS_WILL_SAVE: "comments.willSave";
  /**
   * This event will be emitted whenever comments were saved to the comment provider.
   *
   * This event will follow a {@link NutrientViewer.EventName.COMMENTS_WILL_SAVE}.
   *
   * @example
   * Perform an action after comments are saved.
   * ```ts
   * instance.addEventListener("comments.didSave", () => {
   *   // ...
   * });
   * ```
   *
   * @group Comment
   */
  readonly COMMENTS_DID_SAVE: "comments.didSave";
  /**
   * This event will be emitted whenever an instant client connects or disconnects from the current
   * document. See {@link Instance#connectedClients} for more information.
   *
   * To receive this callback, make sure to set up Nutrient Instant correctly.
   *
   * @example
   * Log the list of connected clients when the instant client list changes.
   * ```ts
   * instance.addEventListener("instant.connectedClients.change", (clients) => {
   *   console.log(clients.toJS());
   * });
   * ```
   *
   * @group Instant
   */
  readonly INSTANT_CONNECTED_CLIENTS_CHANGE: "instant.connectedClients.change";
  /**
   * This event will be emitted whenever operations have been performed in the document.
   *
   * The event listener will receive the array of {@link DocumentOperations} operations
   * performed on the document.
   *
   * @example
   * Perform a custom action when document operations are performed.
   * ```ts
   * instance.addEventListener("document.change", (operations) => {
   *   // ...
   * });
   * ```
   *
   * @group Document
   */
  readonly DOCUMENT_CHANGE: "document.change";
  /**
   * This event will be emitted whenever document save state changes. This reflects changes to
   * return value of {@link Instance.hasUnsavedChanges}.
   *
   * The parameter is {@link Events.SaveStateChangeEvent}.
   *
   * @example
   * Log whether the document has unsaved changes when the save state changes.
   * ```ts
   * instance.addEventListener("document.saveStateChange", (event) => {
   *   console.log(`Document has unsaved changes: ${event.hasUnsavedChanges}`);
   * });
   * ```
   *
   * @group Document
   */
  readonly DOCUMENT_SAVE_STATE_CHANGE: "document.saveStateChange";
  /**
   * This event will be emitted whenever the current value of form field were updated either due
   * to a user action or when {@link Instance#setFormFieldValues} is invoked.
   *
   * @example
   * Perform a custom action when form field values are updated.
   * ```ts
   * instance.addEventListener("formFieldValues.update", formFields => {
   *   // ...
   * });
   * ```
   *
   * @group Form
   */
  readonly FORM_FIELD_VALUES_UPDATE: "formFieldValues.update";
  /**
   * This event will be emitted before form field values will be saved to the data provider.
   *
   * You can use this to display a loading spinner, for example. This event will always be
   * followed by {@link NutrientViewer.EventName.FORM_FIELD_VALUES_WILL_SAVE}.
   *
   * @example
   * Show a loading spinner before form field values are saved.
   * ```ts
   * instance.addEventListener("formFieldValues.willSave", () => {
   *   // ...
   * });
   * ```
   *
   * @group Form
   */
  readonly FORM_FIELD_VALUES_WILL_SAVE: "formFieldValues.willSave";
  /**
   * This event will be emitted whenever the form field values were saved to the data provider.
   *
   * This event will follow a {@link NutrientViewer.EventName.FORM_FIELD_VALUES_WILL_SAVE}.
   *
   * @example
   * Perform an action after form field values are saved.
   * ```ts
   * instance.addEventListener("formFieldValues.didSave", () => {
   *   // ...
   * });
   * ```
   *
   * @group Form
   */
  readonly FORM_FIELD_VALUES_DID_SAVE: "formFieldValues.didSave";
  /**
   * This event will be emitted whenever the form values will be submitted.
   *
   * To cancel the form submission, call the `preventDefault` function with no arguments. This
   * event will follow a {@link NutrientViewer.EventName.FORMS_WILL_SUBMIT}, when the submission got
   * not canceled with `preventDefault`.
   *
   * @example
   * Perform a custom action or cancel the form submission.
   * ```ts
   * instance.addEventListener("forms.willSubmit", ({ preventDefault }) => {
   *   // ...
   * });
   * ```
   *
   * @group Form
   */
  readonly FORMS_WILL_SUBMIT: "forms.willSubmit";
  /**
   * This event will be emitted whenever the form got submitted to the specified URI.
   * The event will receive a object from the form submission. If the submission got transmitted
   * successfully, the object will contain a response key, which has a {@link
   * https://developer.mozilla.org/en-US/docs/Web/API/Response|response} object as a value. When
   * an error occurred during the submission, the object parameter will have an error key with
   * the error object as a value.
   *
   * @example
   * Handle the response or error after a form is submitted.
   * ```ts
   * instance.addEventListener("formFieldValues.didSave", ({ response, error }) => {
   *   // ...
   * });
   * ```
   *
   * @group Form
   */
  readonly FORMS_DID_SUBMIT: "forms.didSubmit";
  /**
   * This event will be emitted whenever the current form fields change either due to a user
   * action (eg. clicking the UI) or via {@link Instance#create},
   * {@link Instance#update} or {@link Instance#delete}.
   *
   * The change event will fire before all specific events and it could be used
   * in case you want to perform some action regardless of which event caused the form fields
   * to "change" (create, delete, update, load, internal load, etc).
   * Consider using the specific events for more advanced use cases.
   *
   * @example
   * Perform a custom action whenever the form fields change.
   * ```ts
   * instance.addEventListener("formFields.change", () => {
   *   // ...
   * });
   * ```
   *
   * @group Form
   */
  readonly FORM_FIELDS_CHANGE: "formFields.change";
  /**
   * This event will be emitted whenever new form fields where created (either via the public
   * API or via the UI).
   *
   * The parameter is a {@link NutrientViewer.Immutable.List} of created {@link NutrientViewer.FormFields}.
   *
   * @example
   * Log the list of created form fields.
   * ```ts
   * instance.addEventListener("formFields.create", (createdFormFields) => {
   *   console.log(createdFormFields);
   * });
   * ```
   *
   * @group Form
   */
  readonly FORM_FIELDS_CREATE: "formFields.create";
  /**
   * This event will be emitted whenever new form fields where deleted (either via the public
   * API or via the UI).
   *
   * The parameter is a {@link NutrientViewer.Immutable.List} of deleted {@link NutrientViewer.FormFields}.
   *
   * @example
   * Log the list of deleted form fields.
   * ```ts
   * instance.addEventListener("formFields.delete", (deletedFormFields) => {
   *   console.log(deletedFormFields);
   * });
   * ```
   *
   * @group Form
   */
  readonly FORM_FIELDS_DELETE: "formFields.delete";
  /**
   * This event will be emitted whenever form fields were saved to the form field provider.
   *
   * This event will follow a {@link NutrientViewer.EventName.FORM_FIELDS_WILL_SAVE}.
   *
   * @example
   * Perform an action after form fields are saved.
   * ```ts
   * instance.addEventListener("formFields.didSave", () => {
   *   // ...
   * });
   * ```
   *
   * @group Form
   */
  readonly FORM_FIELDS_DID_SAVE: "formFields.didSave";
  /**
   * This event will be emitted whenever form fields are loaded from the form field provider.
   * This can happen more than once since we often load form fields on demand only.
   *
   * The parameter is a {@link NutrientViewer.Immutable.List} of loaded {@link NutrientViewer.FormFields}.
   *
   * @example
   * Log the loaded form fields when they are loaded from the provider.
   * ```ts
   * instance.addEventListener("formFields.load", (loadedFormFields) => {
   *   console.log(loadedFormFields);
   * });
   * ```
   *
   * @group Form
   */
  readonly FORM_FIELDS_LOAD: "formFields.load";
  /**
   * This event will be emitted whenever new form fields where updated (either via the public
   * API or via the UI).
   *
   * The parameter is a {@link NutrientViewer.Immutable.List} of updated {@link NutrientViewer.FormFields}.
   *
   * @example
   * Log the list of updated form fields.
   * ```ts
   * instance.addEventListener("formFields.update", (updatedFormFields) => {
   *   console.log(updatedFormFields);
   * });
   * ```
   *
   * @group Form
   */
  readonly FORM_FIELDS_UPDATE: "formFields.update";
  /**
   * This event will be emitted before form fields will be saved to the form field provider.
   *
   * Right now, this happens whenever attributes of the form fields change (either via the
   * public API or via the UI) and the form field is in a valid state.
   *
   * You can use this to display a loading spinner for example. This event will always be
   * followed by {@link NutrientViewer.EventName.FORM_FIELDS_DID_SAVE}.
   *
   * @example
   * Show a loading spinner before form fields are saved.
   * ```ts
   * instance.addEventListener("formFields.willSave", () => {
   *   // ...
   * });
   * ```
   *
   * @group Form
   */
  readonly FORM_FIELDS_WILL_SAVE: "formFields.willSave";
  /**
   * Whenever the search state changes, this event will fire with the latest state.
   *
   * @example
   * Log whether the search UI is focused when the search state changes.
   * ```ts
   * instance.addEventListener("search.stateChange", (searchState) => {
   *   console.log(searchState.isFocused);
   * });
   * ```
   *
   * @group Search
   */
  readonly SEARCH_STATE_CHANGE: "search.stateChange";
  /**
   * This event will fire whenever the customer types in a new search term in the search UI. It can
   * be used to plug the default search into your own search UI.
   *
   * For an example, see {@link Events.SearchTermChangeEvent}.
   *
   * @group Search
   */
  readonly SEARCH_TERM_CHANGE: "search.termChange";
  /**
   * This event will fire whenever the list of ink signatures is changed (either a signature was
   * added, updated, or deleted).
   *
   * @example
   * Log a message when the ink signature list changes.
   * ```ts
   * instance.addEventListener("storedSignatures.change", () => {
   *   console.log("ink signature list changed");
   * });
   * ```
   *
   * @group StoredSignature
   */
  readonly STORED_SIGNATURES_CHANGE: "storedSignatures.change";
  /**
   * This event will fire whenever a signature is created and stored.
   *
   * @example
   * Log the annotation when a signature is created and stored.
   * ```ts
   * instance.addEventListener("storedSignatures.create", annotation => {
   *   console.log(annotation);
   * });
   * ```
   *
   * @group StoredSignature
   */
  readonly STORED_SIGNATURES_CREATE: "storedSignatures.create";
  /**
   * This event will fire whenever a signature is deleted.
   *
   * @example
   * Log the annotation when a signature is deleted.
   * ```ts
   * instance.addEventListener("storedSignatures.delete", annotation => {
   *   console.log(annotation);
   * });
   * ```
   *
   * @group StoredSignature
   */
  readonly STORED_SIGNATURES_DELETE: "storedSignatures.delete";
  /**
   * This event will fire whenever one ink signature is updated.
   *
   * @example
   * Log the updated annotations when an ink signature is updated.
   * ```ts
   * instance.addEventListener("storedSignatures.update", annotations => {
   *   console.log(annotations);
   * });
   * ```
   *
   * @group StoredSignature
   */
  readonly STORED_SIGNATURES_UPDATE: "storedSignatures.update";
  /**
   * This event will be emitted whenever a click on a text line occurs that is not handled by any
   * occluding page element (annotation, form, etc.).
   *
   * The parameter is a {@link Events.TextLinePressEvent}.
   *
   * @example
   * Log the point in PDF page coordinates when a text line is clicked.
   * ```ts
   * instance.addEventListener("textLine.press", (event) => {
   *   console.log(event.point);
   * });
   * ```
   *
   * @group Text
   */
  readonly TEXT_LINE_PRESS: "textLine.press";
  /**
   * Whenever the text selection changes, this event will fire with the latest selection.
   *
   * `textSelection` might be `null` when the selection was cleared.
   *
   * @example
   * Log whether text is selected or not when the selection changes.
   * ```ts
   * instance.addEventListener("textSelection.change", (textSelection) => {
   *   if (textSelection) {
   *     console.log("text is selected");
   *   } else {
   *     console.log("no text is selected");
   *   }
   * });
   * ```
   *
   * @group Text
   */
  readonly TEXT_SELECTION_CHANGE: "textSelection.change";
  /**
   * This event will be emitted after calling {@link NutrientViewer.Instance#history}.undo or
   * {@link NutrientViewer.Instance#history}.redo, or after pressing the main toolbar Undo or Redo
   * buttons, optionally available.
   *
   * If provided, the listener callback will receive a {@link Events.HistoryChangeEvent} object.
   *
   * @example
   * Log the history change event after undo or redo.
   * ```ts
   * instance.addEventListener("history.change", (historyChangeEvent) => {
   *   console.log(historyChangeEvent);
   * });
   * ```
   *
   * @group History
   */
  readonly HISTORY_CHANGE: "history.change";
  /**
   * This event will be emitted before adding an annotation change to the actions history; if the
   * event's `preventDefault()` method is called, the change will not be added and the action
   * will not be undoable.
   *
   * If provided, the listener callback will receive a {@link Events.HistoryWillChangeEvent} object.
   *
   * @example
   * Log the history will change event before adding to the actions history.
   * ```ts
   * instance.addEventListener("history.willChange", (historyWillChangeEvent) => {
   *   console.log(historyWillChangeEvent);
   * });
   * ```
   *
   * @group History
   */
  readonly HISTORY_WILL_CHANGE: "history.willChange";
  /**
   * This event will be emitted after calling {@link NutrientViewer.Instance#history}.clear.
   *
   * @example
   * Log a message when the history is cleared.
   * ```ts
   * instance.addEventListener("history.clear", () => {
   *   console.log('History cleared.');
   * });
   * ```
   *
   * @group History
   */
  readonly HISTORY_CLEAR: "history.clear";
  /**
   * This event will be emitted after calling {@link NutrientViewer.Instance#history}.redo or after
   * pressing the main toolbar Redo button, optionally available.
   *
   * If provided, the listener callback will receive a {@link Events.HistoryChangeEvent} object.
   *
   * @example
   * Log the history redo event after a redo action.
   * ```ts
   * instance.addEventListener("history.redo", (historyRedoEvent) => {
   *   console.log(historyRedoEvent);
   * });
   * ```
   *
   * @group History
   */
  readonly HISTORY_REDO: "history.redo";
  /**
   * This event will be emitted after calling {@link NutrientViewer.Instance#history}.undo or after
   * pressing the main toolbar Undo button, optionally available.
   *
   * If provided, the listener callback will receive a {@link Events.HistoryChangeEvent} object.
   *
   * @example
   * Log the history undo event after an undo action.
   * ```ts
   * instance.addEventListener("history.undo", (historyUndoEvent) => {
   *   console.log(historyUndoEvent);
   * });
   * ```
   *
   * @group History
   */
  readonly HISTORY_UNDO: "history.undo";
  /**
   * This event will be emitted whenever a click on a page occurs that is not handled by any
   * occluding page element (annotation, form, etc.).
   *
   * This event internally uses the `onpointerup` event triggered by the browser. This is an
   * implementation detail which we are documenting because it is useful to prevent the propagation of click events on custom overlay items.
   * Please don't rely on this behavior if possible and use it wisely as it might break in future.
   *
   * The parameter is a {@link Events.PagePressEvent}.
   *
   * @example
   * Log the point in PDF page coordinates when a page is clicked.
   * ```ts
   * instance.addEventListener("page.press", (event) => {
   *   console.log(event.point);
   * });
   * ```
   *
   * @group Page
   */
  readonly PAGE_PRESS: "page.press";
  /**
   * This event will fire whenever a signature is created and stored.
   * `storedSignatures.create` payload returns `null` values for the annotation
   * `id` and `name`. We return these values because the created signature is
   * not attached to the document hence it isn't assigned an `id` or `name`.
   * If you want to retrieve a complete list of values of the signature
   * annotation we suggest to listen to the `annotations.create` event.
   *
   * @example
   * Log the annotation when an ink signature is created and stored.
   * ```ts
   * instance.addEventListener("inkSignatures.create", annotation => {
   *   console.log(annotation);
   * });
   * ```
   *
   * @group InkSignature
   */
  readonly INK_SIGNATURES_CREATE: "inkSignatures.create";
  /**
   * This event will fire whenever a signature is deleted.
   *
   * @example
   * Log the annotation when an ink signature is deleted.
   * ```ts
   * instance.addEventListener("inkSignatures.delete", annotation => {
   *   console.log(annotation);
   * });
   * ```
   *
   * @group InkSignature
   */
  readonly INK_SIGNATURES_DELETE: "inkSignatures.delete";
  /**
   * This event will fire whenever one ink signature is updated.
   *
   * @example
   * Log the updated annotations when an ink signature is updated.
   * ```ts
   * instance.addEventListener("inkSignatures.update", annotations => {
   *   console.log(annotations);
   * });
   * ```
   *
   * @group InkSignature
   */
  readonly INK_SIGNATURES_UPDATE: "inkSignatures.update";
  /**
   * This event will fire whenever the list of ink signatures is changed (either a signature was
   * added, updated, or deleted).
   *
   * @example
   * Log a message when the ink signature list changes.
   * ```ts
   * instance.addEventListener("inkSignatures.change", () => {
   *   console.log("ink signature list changed");
   * });
   * ```
   *
   * @group InkSignature
   */
  readonly INK_SIGNATURES_CHANGE: "inkSignatures.change";
  /**
   * This event will be emitted whenever the CropArea begins being created, moved, or resized (via UI interaction).
   *
   * @example
   * Log the crop area and page index when the crop area starts changing.
   * ```ts
   * instance.addEventListener("cropArea.changeStart", ({ area, pageIndex }) => {
   *   console.log(area, pageIndex);
   * });
   * ```
   *
   * @group CropArea
   */
  readonly CROP_AREA_CHANGE_START: "cropArea.changeStart";
  /**
   * This event will be emitted whenever the crop area stops being created, moved or resized (via UI interaction).
   *
   * @example
   * Log the crop area and page index when the crop area stops changing.
   * ```ts
   * instance.addEventListener("cropArea.changeStop", ({ area, pageIndex }) => {
   *   console.log(area, pageIndex);
   * });
   * ```
   *
   * @group CropArea
   */
  readonly CROP_AREA_CHANGE_STOP: "cropArea.changeStop";
  /**
   * This event will be emitted whenever the document comparison UI is shown.
   *
   * The event listener will receive the {@link DocumentComparisonConfiguration | document comparison configuration object} with which
   * {@link Instance#setDocumentComparisonMode | setDocumentComparisonMode()} has been called.
   *
   * @example
   * Perform an action when the document comparison UI is shown.
   * ```ts
   * instance.addEventListener("documentComparisonUI.start", (documentComparisonConfiguration) => {
   *   // ...
   * });
   * ```
   *
   * @group DocumentComparison
   */
  readonly DOCUMENT_COMPARISON_UI_START: "documentComparisonUI.start";
  /**
   * This event will be emitted whenever the document comparison UI is hidden.
   *
   * @example
   * Perform an action when the document comparison UI is hidden.
   * ```ts
   * instance.addEventListener("documentComparisonUI.end", () => {
   *   // ...
   * });
   * ```
   *
   * @group DocumentComparison
   */
  readonly DOCUMENT_COMPARISON_UI_END: "documentComparisonUI.end";
  /**
   * This event will be emitted whenever an annotation note is selected by pressing its associated icon.
   *
   * The parameter is a {@link Events.AnnotationNotePressEvent}.
   *
   * @example
   * Prevent the default annotation note UI from showing when an annotation note icon is pressed.
   * ```ts
   * instance.addEventListener("annotationNote.press", (event) => {
   *   event.preventDefault();
   * });
   * ```
   *
   * @group AnnotationNote
   */
  readonly ANNOTATION_NOTE_PRESS: "annotationNote.press";
  /**
   * This event will be emitted whenever an annotation note icon is hovered, which by default shows the annotation note editor popover element.
   *
   * The parameter is a {@link Events.AnnotationNotePressEvent}.
   *
   * @example
   * Prevent the default annotation note UI from showing when an annotation note icon is hovered.
   * ```ts
   * instance.addEventListener("annotationNote.hover", (event) => {
   *   event.preventDefault();
   * });
   * ```
   *
   * @group AnnotationNote
   */
  readonly ANNOTATION_NOTE_HOVER: "annotationNote.hover";
  /**
   * This event is emitted when the list of users mentioned in a comment changes or a new
   * comment is created with mentions. The `modifications` property contains a list of
   * modifications that were applied to the comment. Each modification contains the user ID
   * and the action that was performed.
   *
   * The event is *only emitted for the user that created or updated the comment* either via the
   * UI or the API. If you want to listen for changes to comments made by other users, you can
   * use the `comments.create`, `comments.change` and `comments.delete` event. You get the affected
   * comment in the event payload and can check the mentioned users using {@link Comment.getMentionedUserIds} method.
   *
   * @example
   * Log which users were mentioned or unmentioned in a comment.
   * ```ts
   * instance.addEventListener("comments.mention", (event) => {
   *  const { comment, modifications } = event;
   *  modifications.forEach((modification) => {
   *    const { userId, action } = modification;
   *    if (action === "ADDED") {
   *      console.log(`User ${userId} was mentioned in comment ${comment.id}`);
   *    } else {
   *      console.log(`User ${userId} was unmentioned in comment ${comment.id}`);
   *    }
   *  });
   * });
   * ```
   *
   * @group Comment
   */
  readonly COMMENTS_MENTION: "comments.mention";
};

/**
 * The `Events` namespace contains all the event types that can be used with the
 * `addEventListener()` method. These events provide a comprehensive way to monitor
 * and respond to changes within the PDF viewer.
 *
 * @example
 *
 * ```ts
 * // Listen for view state changes
 * instance.addEventListener("viewState.change", (viewState, previousViewState) => {
 *   console.log("View state changed:", viewState.toJS());
 * });
 *
 * // Listen for annotation creation
 * instance.addEventListener("annotations.create", (annotations) => {
 *   console.log("New annotations created:", annotations.toJS());
 * });
 *
 * // Listen for page navigation
 * instance.addEventListener("viewState.currentPageIndex.change", (pageIndex) => {
 *   console.log("Current page changed to:", pageIndex);
 * });
 * ```
 *
 * #### Event Handler Types
 *
 * Each event has a corresponding event listener type that defines the expected function signature.
 * These types ensure type safety when registering event listeners and provide clear
 * documentation of the parameters each event listener receives.
 *
 * #### Event Lifecycle
 *
 * Many events follow a lifecycle pattern:
 * - **Will** events: Fired before an action occurs, allowing you to prevent it
 * - **Change** events: Fired when the state changes
 * - **Did** events: Fired after an action completes
 *
 * For example, with annotations:
 * - `annotations.willSave` → `annotations.change` → `annotations.didSave`
 **/
export declare namespace Events {
  /**
   * This event will be emitted whenever the document comparison UI is shown.
   *
   * The event listener will receive the {@link DocumentComparisonConfiguration | document comparison configuration object} with which
   * {@link Instance#setDocumentComparisonMode} has been called.
   */
  export type DocumentComparisonUIStartEvent = DocumentComparisonConfiguration;
  /**
   * This event will be emitted whenever the document comparison UI is hidden.
   *
   * The event listener will receive the {@link DocumentComparisonConfiguration | document comparison configuration object} with which
   * {@link Instance#setDocumentComparisonMode} has been called.
   */
  export type DocumentComparisonUIEndEvent = DocumentComparisonConfiguration;
  /**
   * This event is emitted when the user **starts** changing the dimensions of the crop area on the document.
   */
  export interface CropAreaChangeStartEvent {
    cropBox: Rect;
    pageIndex: number;
  }
  /**
   * This event is emitted when the dimensions or position of the CropBox is changed.
   */
  export interface CropAreaChangeStopEvent {
    cropBox: Rect;
    pageIndex: number;
  }
  /**
   * This event is emitted when the list of users mentioned in a comment changes or a new
   * comment is created with mentions. The `modifications` property contains a list of
   * modifications that were applied to the comment. Each modification contains the user ID
   * and the action that was performed.
   *
   * The event is *only emitted for the user that created or updated the comment* either via the
   * UI or the API. If you want to listen for changes to comments made by other users, you can
   * use the `comments.create`, `comments.change` and `comments.delete` event. You get the affected
   * comment in the event payload and can check the mentioned users using {@link Comment.getMentionedUserIds} method.
   *
   * @example
   * Listen for changes to the changes in the list of mentioned users in a comment
   * ```ts
   * instance.addEventListener("comments.mention", (event) => {
   *  const { comment, modifications } = event;
   *  modifications.forEach((modification) => {
   *    const { userId, action } = modification;
   *    if (action === "ADDED") {
   *      console.log(`User ${userId} was mentioned in comment ${comment.id}`);
   *    } else {
   *      console.log(`User ${userId} was unmentioned in comment ${comment.id}`);
   *    }
   *  });
   * });
   * ```
   *
   * @see {@link Comment.getMentionedUserIds}
   */
  export interface CommentsMentionEvent {
    /**
     * The comment that was updated.
     */
    comment: Comment_2;
    /**
     * A list of modifications that were applied to the comment.
     */
    modifications: List<{
      userId: string;
      action: 'ADDED' | 'REMOVED';
    }>;
  }
  /**
   * This event is emitted when certain user actions are performed to an
   * annotation.
   */
  export interface AnnotationsWillChangeEvent {
    /**
     * A list of affected annotations. At the moment, this can contain at most
     * a single annotation.
     *
     * In some cases, it can return an empty list. Please See
     * {@link AnnotationsWillChangeReason} for a complete reference when
     * this is the case.
     */
    annotations: List<AnnotationsUnion>;
    /** This indicates the reason why the annotation will change. */
    reason: keyof typeof AnnotationsWillChangeReason;
  }
  /**
   * This event is emitted whenever an annotation is either dragged
   * or resized.
   *
   * @example
   * Get current bounding box of an transforming annotation
   * ```ts
   * instance.addEventListener("annotations.transform", (event) => {
   *   const boundingBox = event.annotation.boundingBox;
   * });
   * ```
   */
  export interface AnnotationsTransformEvent {
    /**
     * The annotation that is being transformed.
     */
    annotation: AnnotationsUnion;
  }
  /**
   * This event is emitted whenever an annotation is either clicked
   * or touched (on devices with touch capabilities) as well as when an already selected
   * annotation receives a click or touch event.
   *
   * Use this event to add custom behavior or prevent default ones from happening on press.
   *
   * Please note that this event will not be fired for annotations which are not
   * editable. If you still want to detect clicks for such annotations, for
   * example, to show a focus ring when clicked, you can use custom renderers to
   * made a clickable area above each annotation. This method is described fully
   * in our [Knowledge Base](https://www.nutrient.io/guides/web/current/knowledge-base/show-focus-ring-read-only).
   *
   * @example
   * Prevent click and touch events on selected annotations
   * ```ts
   * instance.addEventListener("annotations.press", (event) => {
   *   if (event.selected) {
   *     event.preventDefault();
   *   }
   * });
   * ```
   */
  export interface AnnotationsPressEvent {
    /**
     * The annotation that was pressed.
     * Remember that annotations are `Immutable.map`.
     */
    annotation: AnnotationsUnion;
    /**
     * The browser event which caused the press event to dispatch. This is either a MouseEvent,
     * TouchEvent, or a PointerEvent.
     */
    nativeEvent: Event;
    /**
     * When invoked, the `preventDefault` method prevents the default press
     * actions associated with the annotation to occur.
     */
    preventDefault?: () => void;
    /**
     * Tells whether the pressed annotation is selected or not.
     */
    selected: boolean;
  }
  /**
   * This event is emitted whenever an annotation is pasted.
   *
   * @example
   * Get current pasted annotation
   * ```ts
   * instance.addEventListener("annotations.paste", (event) => {
   *   const pastedAnnotations = event.annotations;
   * });
   * ```
   */
  export interface AnnotationsPasteEvent extends AnnotationsDuplicateEvent {
    /**
     * The action that was taken on the original annotation.
     * This can be `CUT` or `COPY`.
     */
    previousAction: 'COPY' | 'CUT';
    /**
     * The annotation that was pasted.
     */
    annotations: AnnotationsUnion[];
    /**
     * The form field generated for the pasted annotation.
     */
    formFields?: FormField[];
    /**
     * The original annotation that was cut or copied.
     */
    originalAnnotations: AnnotationsUnion[];
    /**
     * The form field associated with the original widget annotation that was cut or copied.
     */
    originalFormFields?: Map_2<string, FormField>;
  }
  /**
   * This event is emitted whenever an annotation is focused. Selecting an annotation also focuses it.
   *
   * When an annotation is deselected by pressing the `Escape` key, successive `annotations.blur`
   * and `annotations.focus` events will be dispatched for the same annotation.
   *
   * Use this event to add custom behavior like announcing the annotation value to screen readers.
   *
   * @example
   * Log text annotation value
   * ```ts
   * instance.addEventListener("annotations.focus", (event) => {
   *   if (event.annotation instanceof Annotations.TextAnnotation) {
   *     console.log(event.annotation.text);
   *   }
   * });
   * ```
   */
  export interface AnnotationsFocusEvent {
    /**
     * The annotation that was focused.
     *
     * Remember that annotations are `Immutable.map`.
     */
    annotation: AnnotationsUnion;
    /**
     * The browser event `FocusEvent` which caused the `annotations.focus` event to dispatch.
     * Its `type` property is set to `focus`.
     */
    nativeEvent: FocusEvent;
  }
  /**
   * This event is emitted whenever an annotation loses focus. Deselecting an annotation
   * with the pointer also blurs it.
   *
   * When an annotation is deselected by pressing the `Escape` key, successive `annotations.blur`
   * and `annotations.focus` events will be dispatched for the same annotation.
   *
   * Use this event to add custom behavior like announcing the annotation value to screen readers.
   *
   * @example
   * Log widget annotation new value
   * ```ts
   * instance.addEventListener("annotations.blur", (event) => {
   *  instance.getFormFields().then(formFields => {
   *    const formField = formFields.find(formField => formField.name === event.annotation.formFieldName);
   *    console.log(formField);
   *  });
   * });
   * ```
   */
  export interface AnnotationsBlurEvent {
    /**
     * The annotation that was focused.
     *
     * Remember that annotations are `Immutable.map`.
     */
    annotation: AnnotationsUnion;
    /**
     * The browser event `FocusEvent` which caused the `annotations.blur` event to dispatch.
     * Its `type` property is set to `blur`.
     */
    nativeEvent: FocusEvent;
  }
  /**
   * This event is emitted whenever an annotation is duplicated. You can
   * do this by pressing `Cmd/Ctrl+D` on the keyboard.
   *
   * @example
   * Get current duplicate annotation
   * ```ts
   * instance.addEventListener("annotations.duplicate", (event) => {
   *   const duplicatedAnnotations = event.annotations;
   * });
   * ```
   */
  export interface AnnotationsDuplicateEvent {
    /**
     * The annotation that was duplicated.
     */
    annotations: AnnotationsUnion[];
    /**
     * The newly created form field for the duplicated widget annotation.
     */
    formFields?: FormField[];
    /**
     * The original annotation that was duplicated.
     */
    originalAnnotations: AnnotationsUnion[];
    /**
     * The form field of the widget annotation that was duplicated.
     */
    originalFormFields?: Map_2<string, FormField>;
  }
  /**
   * This event is emitted whenever an annotation is cut.
   *
   * @example
   * Get current cut annotation
   * ```ts
   * instance.addEventListener("annotations.cut", (event) => {
   *   const cutAnnotation = event.annotation;
   * });
   * ```
   */
  export interface AnnotationsCutEvent {
    /**
     * The annotation that was cut.
     */
    annotation: AnnotationsUnion;
  }
  /**
   * This event is emitted whenever an annotation is copied
   *
   * @example
   * Get current copied annotation
   * ```ts
   * instance.addEventListener("annotations.copy", (event) => {
   *   const copiedAnnotation = event.annotation;
   * });
   * ```
   */
  export interface AnnotationsCopyEvent {
    /**
     * The annotation that was copied.
     */
    annotation: AnnotationsUnion;
  }
  /**
   * This event will be emitted whenever the current preset is about to be updated with new property values
   * set by the user in the annotation toolbar.
   *
   * @example
   * Register a AnnotationPresetsUpdateEvent using NutrientViewer.EventName.ANNOTATION_PRESETS_UPDATE and prevent the current preset from being updated.
   * ```ts
   * instance.addEventListener("annotationPresets.update", (event) => {
   *   event.preventDefault();
   * });
   * ```
   */
  export interface AnnotationPresetsUpdateEvent {
    /**
     * Call this method to opt-out from updating the current preset.
     */
    preventDefault: () => boolean;
    /**
     * Current active preset ID.
     */
    currentPreset: AnnotationPresetID_2;
    /**
     * Properties and values of the current active preset.
     */
    currentPresetProperties: AnnotationPreset_2;
    /**
     * Properties and values to be merged with the ones in the current active preset.
     */
    newPresetProperties: AnnotationPreset_2;
  }
  /**
   * This event will be emitted whenever an annotation note is selected by pressing its associated icon.
   *
   * @example
   * Register a AnnotationNotePressEvent using NutrientViewer.EventName.ANNOTATION_NOTE_PRESS and prevent the default annotation note UI from showing.
   * ```ts
   * instance.addEventListener("annotationNote.press", (event) => {
   *   event.preventDefault();
   * });
   * ```
   */
  export interface AnnotationNotePressEvent {
    /** Call this method to opt-out from showing the default annotation note UI. */
    preventDefault: () => boolean;
    /** Annotation note for which the icon has been pressed. */
    annotationNote?: AnnotationNote | null;
  }
  /**
   * This event will be emitted whenever an annotation note is hovered.
   *
   * @example
   * Register a AnnotationNoteHoverEvent using NutrientViewer.EventName.ANNOTATION_NOTE_HOVER and prevent the default annotation note UI from showing.
   * ```ts
   * instance.addEventListener("annotationNote.press", (event) => {
   *   event.preventDefault();
   * });
   * ```
   */
  export interface AnnotationNoteHoverEvent {
    /**
     * Call this method to opt-out from showing the default annotation note UI.
     */
    preventDefault: () => boolean;
    /**
     * Annotation note for which the icon has been hovered.
     */
    annotationNote?: AnnotationNote | null;
  }
  /**
   * This event will be emitted whenever a click on a page occurs that is not handled by any
   * occluding page element (annotation, form, etc.).
   *
   * @example
   * Register a PagePressEvent and get the point in PDF page coordinates.
   * ```ts
   * instance.addEventListener("page.press", (event) => {
   *   console.log(event.point);
   * });
   * ```
   */
  export interface PagePressEvent {
    /**
     * The index of the page that was pressed.
     */
    pageIndex: number;
    /**
     * The point where the press event was detected in PDF page space coordinates.
     */
    point: Point;
    /**
     * The browser event which caused the press event to dispatch. Either a MouseEvent, TouchEvent, or
     * a PointerEvent.
     */
    nativeEvent: Event;
  }
  /**
   * This event will be emitted whenever a click on a text line occurs that is not handled by any
   * occluding page element (annotation, form, etc.).
   *
   * @example
   * Register a TextLinePressEvent and get the point in PDF page coordinates.
   * ```ts
   * instance.addEventListener("textLine.press", (event) => {
   *   console.log(event.point);
   * });
   * ```
   */
  export interface TextLinePressEvent {
    /**
     * The text line that was clicked.
     */
    textLine: TextLine;
    /**
     * The point where the press event was detected in PDF page space coordinates.
     */
    point: Point;
    /**
     * The browser event which caused the press event to dispatch. This is either a MouseEvent,
     * TouchEvent, or a PointerEvent.
     */
    nativeEvent: Event;
  }
  /**
   * This event is emitted when document save state changes.
   */
  export interface SaveStateChangeEvent {
    /** Indicates whether there are any local changes. */
    hasUnsavedChanges: boolean;
  }
  export interface HistoryRedoEvent {
    /** Type of history change. */
    action: 'redo';
    /** Annotation state before the action. */
    before: AnnotationsUnion;
    /** Annotation state after the action. */
    after: AnnotationsUnion;
  }
  export interface HistoryUndoEvent {
    /** Type of history change. */
    action: 'undo';
    /** Annotation state before the action. */
    before: AnnotationsUnion;
    /** Annotation state after the action. */
    after: AnnotationsUnion;
  }
  export interface HistoryChangeEvent {
    /** Type of history change. */
    action: 'undo' | 'redo' | 'change' | 'willChange' | 'clear';
    /** Annotation state before the action. */
    before: AnnotationsUnion;
    /** Annotation state after the action. */
    after: AnnotationsUnion;
  }
  export interface HistoryWillChangeEvent {
    type: 'create' | 'update' | 'delete';
    annotation: Annotation;
    preventDefault: () => void;
  }
  /**
   * This event will fire whenever the customer types in a new search term in the search UI. It can
   * be used to plug the default search into your own search UI.
   *
   * @example
   * Implement your custom search backend
   * ```ts
   * instance.addEventListener("search.termChange", async (event) => {
   *   // Opt-out from the default implementation.
   *   event.preventDefault();
   *
   *   // We clear the search state, when the search term was removed.
   *   if (term.length == 0) {
   *     instance.setSearchState(searchState => searchState.set("term", ""));
   *   }
   *
   *   // Manually update the UI. If `SearchState#term` is not updated, the update will
   *   // be ignored.
   *   instance.setSearchState(searchState =>
   *     searchState
   *       .set("term", event.term)
   *       .set("isLoading", true)
   *   );
   *
   *   // Make sure to cancel all outstanding requests so that the loading state won't be
   *   // overwritten by an outdated search response (e.g. When the user types "foo" we
   *   // want to cancel all requests for "f" and "fo" while the user types - otherwise
   *   // incoming responses for "f" will clear the loading state of "foo"). This should
   *   // make `myCustomSearch` no longer resolve its promise.
   *   cancelSearchRequest();
   *
   *   // Implement your custom search logic that returns SearchResult objects. This can use
   *   // `Instance#search()` internally.
   *   const results = await myCustomSearch(term);
   *
   *   // Apply the new search results. For an actual use case, you probably want to update
   *   // `SearchState#focusedResultIndex` as well.
   *   instance.setSearchState(searchState =>
   *     searchState
   *       .set("isLoading", false)
   *       .set("results", results)
   *   );
   * });
   * ```
   */
  export interface SearchTermChangeEvent {
    /**
     * The updated search term.
     */
    term: string;
    /**
     * Call this method to opt-out from the default search logic.
     */
    preventDefault: () => void;
  }
  /**
   * This event is emitted when new annotations are created. The event includes the list of created annotations.
   *
   * @example
   * Get the list of created annotations.
   * ```ts
   * instance.addEventListener("annotations.create", (annotations: AnnotationsCreateEvent) => {
   *   console.log(annotations.toJS());
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.ANNOTATIONS_CREATE}
   */
  export type AnnotationsCreateEvent = List<AnnotationsUnion>;
  /**
   * This event is emitted when annotations are deleted. The event includes the list of deleted annotations.
   *
   * @example
   * Get the list of deleted annotations.
   * ```ts
   * instance.addEventListener("annotations.delete", (annotations) => {
   *   console.log(annotations.toJS());
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.ANNOTATIONS_DELETE}
   */
  export type AnnotationsDeleteEvent = List<AnnotationsUnion>;
  /**
   * This event is emitted when annotations are updated. The event includes the list of updated annotations.
   *
   * @example
   * Get the list of updated annotations.
   * ```ts
   * instance.addEventListener("annotations.update", (annotations: AnnotationsUpdateEvent) => {
   *   console.log(annotations.toJS());
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.ANNOTATIONS_UPDATE}
   */
  export type AnnotationsUpdateEvent = List<AnnotationsUnion>;
  /**
   * This event is emitted when annotations are loaded. The event includes the list of loaded annotations.
   *
   * @example
   * Get the list of loaded annotations.
   * ```ts
   * instance.addEventListener("annotations.load", (annotations: AnnotationsLoadEvent) => {
   *   console.log(annotations.toJS());
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.ANNOTATIONS_LOAD}
   */
  export type AnnotationsLoadEvent = List<AnnotationsUnion>;
  /**
   * This event is emitted when annotations are saved. The event includes the list of saved annotations.
   *
   * @example
   * Get the list of saved annotations.
   * ```ts
   * instance.addEventListener("annotations.willSave", (annotations: AnnotationsWillSaveEvent) => {
   *   console.log("Annotations will be saved");
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.ANNOTATIONS_WILL_SAVE}
   */
  export type AnnotationsWillSaveEvent = void;
  /**
   * This event is emitted when annotations are saved. The event includes the list of saved annotations.
   *
   * @example
   * Get the list of saved annotations.
   * ```ts
   * instance.addEventListener("annotations.didSave", (annotations: AnnotationsDidSaveEvent) => {
   *   console.log("Annotations were saved");
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.ANNOTATIONS_DID_SAVE}
   */
  export type AnnotationsDidSaveEvent = void;
  /**
   * This event is emitted when the annotation selection changes. The event includes the list of selected annotations.
   *
   * @example
   * Get the list of selected annotations.
   * ```ts
   * instance.addEventListener("annotationSelection.change", (annotations: AnnotationSelectionChangeEvent) => {
   *   console.log(annotations.toJS());
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.ANNOTATION_SELECTION_CHANGE}
   */
  export type AnnotationSelectionChangeEvent = List<AnnotationsUnion>;
  /**
   * This event is emitted when new bookmarks are created. The event includes the list of created bookmarks.
   *
   * @example
   * Get the list of created bookmarks.
   * ```ts
   * instance.addEventListener("bookmarks.create", (bookmarks: BookmarksCreateEvent) => {
   *   console.log(bookmarks.toJS());
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.BOOKMARKS_CREATE}
   */
  export type BookmarksCreateEvent = List<Bookmark>;
  /**
   * This event is emitted when bookmarks are updated. The event includes the list of updated bookmarks.
   *
   * @example
   * Get the list of updated bookmarks.
   * ```ts
   * instance.addEventListener("bookmarks.update", (bookmarks: BookmarksUpdateEvent) => {
   *   console.log(bookmarks.toJS());
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.BOOKMARKS_UPDATE}
   */
  export type BookmarksUpdateEvent = List<Bookmark>;
  /**
   * This event is emitted when bookmarks are deleted. The event includes the list of deleted bookmarks.
   *
   * @example
   * Get the list of deleted bookmarks.
   * ```ts
   * instance.addEventListener("bookmarks.delete", (bookmarks: BookmarksDeleteEvent) => {
   *   console.log(bookmarks.toJS());
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.BOOKMARKS_DELETE}
   */
  export type BookmarksDeleteEvent = List<Bookmark>;
  /**
   * This event is emitted when bookmarks are loaded. The event includes the list of loaded bookmarks.
   *
   * @example
   * Get the list of loaded bookmarks.
   * ```ts
   * instance.addEventListener("bookmarks.load", (bookmarks) => {
   *   console.log(bookmarks.toJS());
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.BOOKMARKS_LOAD}
   */
  export type BookmarksLoadEvent = List<Bookmark>;
  /**
   * This event is emitted when new comments are created. The event includes the list of created comments.
   *
   * @example
   * Get the list of created comments.
   * ```ts
   * instance.addEventListener("comments.create", (comments: CommentsCreateEvent) => {
   *   console.log(comments.toJS());
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.COMMENTS_CREATE}
   */
  export type CommentsCreateEvent = List<Comment_2>;
  /**
   * This event is emitted when comments are updated. The event includes the list of updated comments.
   *
   * @example
   * Get the list of updated comments.
   * ```ts
   * instance.addEventListener("comments.update", (comments: CommentsUpdateEvent) => {
   *   console.log(comments.toJS());
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.COMMENTS_UPDATE}
   */
  export type CommentsUpdateEvent = List<Comment_2>;
  /**
   * This event is emitted when comments are deleted. The event includes the list of deleted comments.
   *
   * @example
   * Get the list of deleted comments.
   * ```ts
   * instance.addEventListener("comments.delete", (comments: CommentsDeleteEvent) => {
   *   console.log(comments.toJS());
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.COMMENTS_DELETE}
   */
  export type CommentsDeleteEvent = List<Comment_2>;
  /**
   * This event is emitted when comments are loaded. The event includes the list of loaded comments.
   *
   * @example
   * Get the list of loaded comments.
   * ```ts
   * instance.addEventListener("comments.load", (comments) => {
   *   console.log(comments.toJS());
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.COMMENTS_LOAD}
   */
  export type CommentsLoadEvent = List<Comment_2>;
  /**
   * This event is emitted when form field values are updated. The event includes the list of updated form field values.
   *
   * @example
   * Get the list of updated form field values.
   * ```ts
   * instance.addEventListener("formFieldValues.update", (formFieldValues: FormFieldValuesUpdateEvent) => {
   *   console.log(formFieldValues.toJS());
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.FORM_FIELD_VALUES_UPDATE}
   */
  export type FormFieldValuesUpdateEvent = List<FormField>;
  export type FormsWillSubmitEvent = {
    /** Call this method to opt-out from the default form submission. */
    preventDefault: () => void;
  };
  /**
   * This event is emitted when form fields are created. The event includes the list of created form fields.
   *
   * @example
   * Get the list of created form fields.
   * ```ts
   * instance.addEventListener("formFields.create", (formFields: FormFieldsCreateEvent) => {
   *   console.log(formFields.toJS());
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.FORM_FIELDS_CREATE}
   */
  export type FormFieldsCreateEvent = List<FormField>;
  /**
   * This event is emitted when form fields are updated. The event includes the list of updated form fields.
   *
   * @example
   * Get the list of updated form fields.
   * ```ts
   * instance.addEventListener("formFields.update", (formFields: FormFieldsUpdateEvent) => {
   *   console.log(formFields.toJS());
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.FORM_FIELDS_UPDATE}
   */
  export type FormFieldsUpdateEvent = List<FormField>;
  /**
   * This event is emitted when form fields are deleted. The event includes the list of deleted form fields.
   *
   * @example
   * Get the list of deleted form fields.
   * ```ts
   * instance.addEventListener("formFields.delete", (formFields: FormFieldsDeleteEvent) => {
   *   console.log(formFields.toJS());
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.FORM_FIELDS_DELETE}
   */
  export type FormFieldsDeleteEvent = List<FormField>;
  /**
   * This event is emitted when form fields are loaded. The event includes the list of loaded form fields.
   *
   * @example
   * Get the list of loaded form fields.
   * ```ts
   * instance.addEventListener("formFields.load", (formFields: FormFieldsLoadEvent) => {
   *   console.log(formFields.toJS());
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.FORM_FIELDS_LOAD}
   */
  export type FormFieldsLoadEvent = List<FormField>;
  /**
   * This event is emitted when the search state changes. The event includes the latest search state.
   *
   * @example
   * Get the latest search state.
   * ```ts
   * instance.addEventListener("search.stateChange", (searchState: SearchStateChangeEvent) => {
   *   console.log(searchState.toJS());
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.SEARCH_STATE_CHANGE}
   */
  export type SearchStateChangeEvent = SearchState;
  /**
   * This event is emitted when a new signature is created and stored.
   *
   * @example
   * Get the new signature.
   * ```ts
   * instance.addEventListener("storedSignatures.create", (signature: StoredSignatureCreateEvent) => {
   *   console.log(signature.toJS());
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.STORED_SIGNATURES_CREATE}
   */
  export type StoredSignatureCreateEvent = Signature;
  /**
   * This event is emitted when a signature is updated.
   *
   * @example
   * Get the list of updated signatures.
   * ```ts
   * instance.addEventListener("storedSignatures.update", (signatures: StoredSignatureUpdateEvent) => {
   *   console.log(signatures.toJS());
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.STORED_SIGNATURES_UPDATE}
   */
  export type StoredSignatureUpdateEvent = List<Signature>;
  /**
   * This event is emitted when a signature is deleted.
   *
   * @example
   * Get the deleted signature.
   * ```ts
   * instance.addEventListener("storedSignatures.delete", (signature: StoredSignatureDeleteEvent) => {
   *   console.log(signature.toJS());
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.STORED_SIGNATURES_DELETE}
   */
  export type StoredSignatureDeleteEvent = Signature;
  /**
   * This event will fire whenever a signature is created and stored `storedSignatures.create` payload
   * returns `null` values for the annotation id and name. We return these values because
   * the created signature is not attached to the document hence it isn't assigned an id or name.
   * If you want to retrieve a complete list of values of the signature annotation we suggest to listen to the annotations.create event.
   *
   * @example
   * Get the new signature.
   * ```ts
   * instance.addEventListener("inkSignatures.create", (signature: InkSignatureCreateEvent) => {
   *   console.log(signature.toJS());
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.INK_SIGNATURES_CREATE}
   */
  export type InkSignatureCreateEvent = Signature;
  /**
   * This event is emitted when a signature is deleted.
   *
   * @example
   * Get the deleted signature.
   * ```ts
   * instance.addEventListener("inkSignatures.delete", (signature: InkSignatureDeleteEvent) => {
   *   console.log(signature.toJS());
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.INK_SIGNATURES_DELETE}
   */
  export type InkSignatureDeleteEvent = Signature;
  /**
   * This event is emitted when a signature is updated.
   *
   * @example
   * Get the list of updated signatures.
   * ```ts
   * instance.addEventListener("inkSignatures.update", (signatures: InkSignatureUpdateEvent) => {
   *   console.log(signatures.toJS());
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.INK_SIGNATURES_UPDATE}
   */
  export type InkSignatureUpdateEvent = List<Signature>;
  /**
   * This event is emitted when the current page index in the viewer changes. The event value is the new page index.
   *
   * @example
   * Get the new page index.
   * ```ts
   * instance.addEventListener("viewState.currentPageIndex.change", (pageIndex: ViewStateCurrentPageIndexChangeEvent) => {
   *   console.log(pageIndex);
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.VIEW_STATE_CURRENT_PAGE_INDEX_CHANGE}
   */
  export type ViewStateCurrentPageIndexChangeEvent = number;
  /**
   * This event is emitted when the zoom level in the viewer changes. The event value is the new zoom level.
   *
   * @example
   * Get the new zoom level.
   * ```ts
   * instance.addEventListener("viewState.zoom.change", (zoom: ViewStateZoomChangeEvent) => {
   *   console.log(zoom);
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.VIEW_STATE_ZOOM_CHANGE}
   */
  export type ViewStateZoomChangeEvent = number;
  /**
   * This event is emitted when form field values are saved.
   *
   * @example
   * Get the list of saved form field values.
   * ```ts
   * instance.addEventListener("formFieldValues.didSave", () => {
   *   console.log("Form field values were saved");
   * });
   * ```
   *
   * @see {@link NutrientViewer.EventName.FORM_FIELD_VALUES_DID_SAVE}
   */
  export interface FormFieldValuesDidSaveEvent {
    /** The response from the backend. */
    response: Response;
    /** The error from the backend. */
    error: Error;
  }
  export interface EventNameToHandlerMap {
    [EventName.VIEW_STATE_CHANGE]: (previousViewState: ViewState, viewState: ViewState) => void;
    [EventName.VIEW_STATE_CURRENT_PAGE_INDEX_CHANGE]: (event: Events.ViewStateCurrentPageIndexChangeEvent) => void;
    [EventName.VIEW_STATE_ZOOM_CHANGE]: (event: Events.ViewStateZoomChangeEvent) => void;
    [EventName.ANNOTATION_PRESETS_UPDATE]: (event: Events.AnnotationPresetsUpdateEvent) => void;
    [EventName.ANNOTATIONS_BLUR]: (event: Events.AnnotationsBlurEvent) => void;
    [EventName.ANNOTATIONS_CHANGE]: () => void;
    [EventName.ANNOTATIONS_CREATE]: (event: Events.AnnotationsCreateEvent) => void;
    [EventName.ANNOTATIONS_DELETE]: (event: Events.AnnotationsDeleteEvent) => void;
    [EventName.ANNOTATIONS_DID_SAVE]: () => void;
    [EventName.ANNOTATIONS_FOCUS]: (event: Events.AnnotationsFocusEvent) => void;
    [EventName.ANNOTATIONS_LOAD]: (event: Events.AnnotationsLoadEvent) => void;
    [EventName.ANNOTATIONS_PRESS]: (event: Events.AnnotationsPressEvent) => void;
    [EventName.ANNOTATIONS_UPDATE]: (event: Events.AnnotationsUpdateEvent) => void;
    [EventName.ANNOTATIONS_WILL_CHANGE]: (event: Events.AnnotationsWillChangeEvent) => void;
    [EventName.ANNOTATIONS_WILL_SAVE]: () => void;
    [EventName.ANNOTATION_SELECTION_CHANGE]: (event: Events.AnnotationSelectionChangeEvent) => void;
    [EventName.ANNOTATIONS_TRANSFORM]: (event: Events.AnnotationsTransformEvent) => void;
    [EventName.ANNOTATIONS_COPY]: (event: Events.AnnotationsCopyEvent) => void;
    [EventName.ANNOTATIONS_CUT]: (event: Events.AnnotationsCutEvent) => void;
    [EventName.ANNOTATIONS_PASTE]: (event: Events.AnnotationsPasteEvent) => void;
    [EventName.ANNOTATIONS_DUPLICATE]: (event: Events.AnnotationsDuplicateEvent) => void;
    [EventName.BOOKMARKS_CHANGE]: () => void;
    [EventName.BOOKMARKS_CREATE]: (event: Events.BookmarksCreateEvent) => void;
    [EventName.BOOKMARKS_UPDATE]: (event: Events.BookmarksUpdateEvent) => void;
    [EventName.BOOKMARKS_DELETE]: (event: Events.BookmarksDeleteEvent) => void;
    [EventName.BOOKMARKS_LOAD]: (event: Events.BookmarksLoadEvent) => void;
    [EventName.BOOKMARKS_DID_SAVE]: () => void;
    [EventName.BOOKMARKS_WILL_SAVE]: () => void;
    [EventName.COMMENTS_CHANGE]: () => void;
    [EventName.COMMENTS_CREATE]: (event: Events.CommentsCreateEvent) => void;
    [EventName.COMMENTS_DELETE]: (event: Events.CommentsDeleteEvent) => void;
    [EventName.COMMENTS_UPDATE]: (event: Events.CommentsUpdateEvent) => void;
    [EventName.COMMENTS_LOAD]: (event: Events.CommentsLoadEvent) => void;
    [EventName.COMMENTS_WILL_SAVE]: () => void;
    [EventName.COMMENTS_DID_SAVE]: () => void;
    [EventName.INSTANT_CONNECTED_CLIENTS_CHANGE]: (clients: Map_2<string, InstantClient>) => void;
    [EventName.DOCUMENT_CHANGE]: () => void;
    [EventName.DOCUMENT_SAVE_STATE_CHANGE]: (event: Events.SaveStateChangeEvent) => void;
    [EventName.FORM_FIELD_VALUES_UPDATE]: (event: Events.FormFieldValuesUpdateEvent) => void;
    [EventName.FORM_FIELD_VALUES_WILL_SAVE]: () => void;
    [EventName.FORM_FIELD_VALUES_DID_SAVE]: (event: Events.FormFieldValuesDidSaveEvent) => void;
    [EventName.FORMS_WILL_SUBMIT]: (event: {
      preventDefault: () => void;
    }) => void;
    [EventName.FORMS_DID_SUBMIT]: () => void;
    [EventName.FORM_FIELDS_CHANGE]: () => void;
    [EventName.FORM_FIELDS_CREATE]: (event: Events.FormFieldsCreateEvent) => void;
    [EventName.FORM_FIELDS_DELETE]: (event: Events.FormFieldsDeleteEvent) => void;
    [EventName.FORM_FIELDS_DID_SAVE]: () => void;
    [EventName.FORM_FIELDS_LOAD]: (event: Events.FormFieldsLoadEvent) => void;
    [EventName.FORM_FIELDS_UPDATE]: (event: Events.FormFieldsUpdateEvent) => void;
    [EventName.FORM_FIELDS_WILL_SAVE]: () => void;
    [EventName.SEARCH_STATE_CHANGE]: (event: Events.SearchStateChangeEvent) => void;
    [EventName.SEARCH_TERM_CHANGE]: (event: Events.SearchTermChangeEvent) => void;
    [EventName.STORED_SIGNATURES_CHANGE]: () => void;
    [EventName.STORED_SIGNATURES_CREATE]: (event: Events.StoredSignatureCreateEvent) => void;
    [EventName.STORED_SIGNATURES_DELETE]: (event: Events.StoredSignatureDeleteEvent) => void;
    [EventName.STORED_SIGNATURES_UPDATE]: (event: Events.StoredSignatureUpdateEvent) => void;
    [EventName.TEXT_LINE_PRESS]: (event: Events.TextLinePressEvent) => void;
    [EventName.TEXT_SELECTION_CHANGE]: (selection: TextSelection_2 | null) => void;
    [EventName.HISTORY_CHANGE]: (event: Events.HistoryChangeEvent) => void;
    [EventName.HISTORY_WILL_CHANGE]: (event: Events.HistoryWillChangeEvent) => void;
    [EventName.HISTORY_CLEAR]: () => void;
    [EventName.HISTORY_REDO]: (event: Events.HistoryRedoEvent) => void;
    [EventName.HISTORY_UNDO]: (event: Events.HistoryUndoEvent) => void;
    [EventName.PAGE_PRESS]: (event: Events.PagePressEvent) => void;
    [EventName.INK_SIGNATURES_CREATE]: (event: Events.InkSignatureCreateEvent) => void;
    [EventName.INK_SIGNATURES_DELETE]: (event: Events.InkSignatureDeleteEvent) => void;
    [EventName.INK_SIGNATURES_UPDATE]: (event: Events.InkSignatureUpdateEvent) => void;
    [EventName.INK_SIGNATURES_CHANGE]: () => void;
    [EventName.CROP_AREA_CHANGE_START]: (event: Events.CropAreaChangeStartEvent) => void;
    [EventName.CROP_AREA_CHANGE_STOP]: (event: Events.CropAreaChangeStopEvent) => void;
    [EventName.DOCUMENT_COMPARISON_UI_START]: (event: Events.DocumentComparisonUIStartEvent) => void;
    [EventName.DOCUMENT_COMPARISON_UI_END]: () => void;
    [EventName.ANNOTATION_NOTE_PRESS]: (event: Events.AnnotationNotePressEvent) => void;
    [EventName.ANNOTATION_NOTE_HOVER]: (event: Events.AnnotationNoteHoverEvent) => void;
    [EventName.COMMENTS_MENTION]: (event: Events.CommentsMentionEvent) => void;
  }
}

/** Export options object **/
export declare type ExportOfficeFlags = {
  /** One of {@link NutrientViewer.OfficeDocumentFormat} values. */
  format: IDocumentOfficeFormat;
};

/** Export options object **/
export declare type ExportPDFFlags = {
  /**
   * Whether the document annotations should be converted to PDF content and therefore not editable in the future.
   *
   * @default false
   */
  flatten?: boolean;
  /**
   * Whether the document should be exported using "full" or "incremental" saving. Default: `false`, or `true` if the document is digitally signed and the license includes the Digital Signatures component.
   *
   * @standalone
   */
  incremental?: boolean;
  /**
   * @server
   * @default true
   */
  includeComments?: boolean;
  /**
   * @standalone
   * @default false
   */
  saveForPrinting?: boolean;
  /**
   * Whether the document annotations should be exported.
   *
   * @default false
   */
  excludeAnnotations?: boolean;
  /**
   * Contain the `userPassword` and `ownerPassword` to encrypt the PDF along with the `documentPermissions`.
   */
  permissions?: {
    /** The user password to encrypt the PDF. */
    userPassword: string;
    /** The owner password to encrypt the PDF. */
    ownerPassword: string;
    /** An Array that specifies what users can do with the output PDF. */
    documentPermissions: Array<IDocumentPermissions>;
  };
  /**
   * If set to `true`, a default set of options will be applied to the exported document:
   *
   * ```ts
   * {
   * conformance: NutrientViewer.Conformance.PDFA_2B,
   * vectorization: true,
   * rasterization: true,
   * }
   * ```
   *
   * Instead of a boolean value you can pass your own object ith custom values for the properties above.
   *
   * @default false
   */
  outputFormat?: boolean | PDFAFlags;
  /**
   * If set to `true` the exported document will have a default set of options:
   *
   * ```ts
   * {
   * documentFormat: 'pdf',
   * grayscaleText: false,
   * grayscaleGraphics: false,
   * grayscaleFormFields: false,
   * grayscaleAnnotations: false,
   * grayscaleImages: false,
   * disableImages: false,
   * mrcCompression: false,
   * imageOptimizationQuality: 2,
   * linearize: false,
   * }
   * ```
   *
   * Otherwise, you can pass the above options object customised with your own values
   * instead of a boolean value.
   *
   * @server
   * @default false
   */
  optimize?: boolean | OptimizationFlags;
  flattenElectronicSignatures?: boolean;
  officeConversionSettings?: OfficeConversionSettings;
};

/**
 * @class
 * This record is used to persist information related to custom fonts on Standalone deployments.
 * Custom fonts need to be specified during the instance load and correctly fetched.
 * They will be used while rendering the document contents and exporting its annotations.
 * @example
 * Create a new Font object
 * ```ts
 * const fetcher = name =>
 *   fetch(`https://example.com/${name}`).then(r => {
 *     if (r.status === 200) {
 *       return r.blob();
 *     } else {
 *       throw new Error();
 *     }
 *   });
 *
 * const customFonts = ["arial.ttf", "helvetica.ttf", "tahoma.ttf"]
 *   .map(font => new NutrientViewer.Font({ name: font, callback: fetcher }));
 *
 * NutrientViewer.load({
 *   customFonts,
 *   regular options...
 * }).then(instance => {});
 * ```
 *
 * @public
 * @summary An object used to load a new font.
 */
export declare class Font extends Font_base {
  /** A unique identifier to name the custom font. */
  name: string | null;
  /** Non-optional callback to fetch the custom font. */
  callback: FontCallback | null;
  constructor(args: {
    name: string;
    callback?: FontCallback;
  });
}

declare const Font_base: Record_2.Factory<IFont>;

/**
 * On Standalone, this callback receives the name of a font to retrieve as an argument
 * and you can return from it a `Promise` that resolves to a `Blob` with the font data to
 * use.
 *
 * See {@link https://www.nutrient.io/guides/web/current/features/custom-fonts/ | this guide}
 * to learn more.
 *
 * @public
 * @param fontName - The `name` specified on the same {@link Font} constructor.
 * @example
 * Create a custom font for retrieving "Arial.ttf"
 * ```ts
 * new NutrientViewer.Font({
 *   name: "Arial.ttf",
 *   callback: name => fetch(`https://example.com/${name}`).then(r => r.blob());
 * })
 * ```
 *

 */
export declare type FontCallback = (fontName: string) => Promise<Blob>;

declare type FontSize = 'auto' | number;

/**
 * Describes the fonts that you would like to substitute in a document and the fonts you would like to use for that substitution
 *
 * Patterns are matched using the following rules:
 * - `*` matches multiple characters.
 * - `?` matches a single character.
 *
 * **Ordering matters** - As names could match multiple patterns, it's important to note that the order of the patterns matters.
 * **Case-insensitive** - Both the pattern and the target name are case-insensitive.
 *
 * @summary An array of fonts to be substituted and the fonts to substitute them with
 * @example
 * Substitute all Noto fonts found in the document with AwesomeFont
 * ```ts
 *
 * const myFontsSubstitutions = [{
 *  pattern: "Noto*",
 *  target: "AwesomeFont"
 * }]
 *
 * NutrientViewer.load({
 *  //...
 *  fontSubstitutions: myFontsSubstitutions,
 * })
 * ```
 */
export declare type FontSubstitution = {
  /** The font you would like to be substituted. */
  pattern: string;
  /** The font you would like to substitute the "from" font with. */
  target: string;
};

/**
 * @class
 * Form field type from which all form fields inherit. You can not instantiate from this type.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record | Immutable.Record}.
 *
 * To retrieve a list of all form fields, use {@link NutrientViewer.Instance#getFormFields}.
 *
 * Please see our {@link https://www.nutrient.io/guides/web/current/forms/introduction-to-forms/ | forms guide
 * article} to learn more about form fields and for examples on how to create them.
 * @example
 * Creating a form field.
 * ```ts
 * const widget = new NutrientViewer.Annotations.WidgetAnnotation({
 *    // Generate unique ID so it can be referenced in form field before the widget is created.
 *    id: NutrientViewer.generateInstantId(),
 *    pageIndex: 0,
 *    formFieldName: 'form-field',
 *    boundingBox: new NutrientViewer.Geometry.Rect({
 *       left: 50,
 *       top: 50,
 *       width: 50,
 *       height: 50,
 *    }),
 * }),
 * const formField = new NutrientViewer.FormFields.TextFormField({
 *    name: 'form-field',
 *    annotationIds: new NutrientViewer.Immutable.List([widget.id]),
 * })
 * instance.create([widget, formField]);
 * ```
 *
 * @public
 * @summary Base form field type from which all form fields inherit.
 * @see {@link NutrientViewer.Instance#create} | {@link NutrientViewer.Instance#delete}
 * @see {@link NutrientViewer.Instance#ensureChangesSaved} | {@link NutrientViewer.Instance#getFormFields}
 * @see {@link NutrientViewer.Instance#hasUnsavedChanges} | {@link NutrientViewer.Instance#save}
 * @see {@link NutrientViewer.Instance#update}
 * @see {@link Configuration#disableForms} | {@link NutrientViewer.EventName.FORM_FIELDS_LOAD}
 * @see {@link NutrientViewer.EventName.FORM_FIELDS_CHANGE} | {@link NutrientViewer.EventName.FORM_FIELDS_CREATE}
 * @see {@link NutrientViewer.EventName.FORM_FIELDS_UPDATE} | {@link NutrientViewer.EventName.FORM_FIELDS_DELETE}
 * @see {@link NutrientViewer.EventName.FORM_FIELDS_WILL_SAVE} | {@link NutrientViewer.EventName.FORM_FIELDS_DID_SAVE}
 * @see {@link NutrientViewer.EventName.FORMS_WILL_SUBMIT} | {@link NutrientViewer.EventName.FORMS_DID_SUBMIT}
 */
export declare class FormField extends FormField_base {
  /**
   * A unique identifier to describe the form field record. When a form field is created in the UI, the
   * viewer has to generate a unique ID.
   *
   * When changes are saved to the underlying form field provider, we call
   * {@link NutrientViewer.Instance#ensureChangesSaved} to make sure the form field has been persisted
   * from the provider.
   */
  id: ID;
  /**
   * Unique name of the form field (often referred to as fully qualified name). This name is used
   * to link {@link NutrientViewer.Annotations.WidgetAnnotation} and is also used as an identifier for
   * form field values.
   */
  name: FormFieldName;
  /**
   * The object ID of the form field object in the PDF.
   */
  pdfObjectId: number;
  /**
   * Holds an immutable list of {@link NutrientViewer.Annotations.WidgetAnnotation#id}s.
   */
  annotationIds: List<string>;
  /**
   * Used to identify the form field in the UI or for accessibility.
   */
  label: string;
  /**
   * Read only form fields can not be filled out (similar to disabled HTML input elements).
   *
   * @default false
   */
  readOnly: boolean;
  /**
   * Required form fields must be filled out in order to submit the form.
   *
   * {@link NutrientViewer.FormFields.TextFormField}, {@link NutrientViewer.FormFields.ComboBoxFormField} and
   * {@link NutrientViewer.FormFields.ListBoxFormField} with this flag set will be rendered with
   * the [`PSPDFKit-Annotation-Widget-Required`]{@link https://www.nutrient.io/api/web/css-Widget-Annotation.html#.PSPDFKit-Annotation-Widget-Required} public CSS class and the HTML `required` attribute set.
   *
   * @default false
   */
  required: boolean;
  /**
   * Form fields with the `noExport` flag won't appear in the serialized payload of a form
   * submission.
   *
   * @default false
   */
  noExport: boolean;
  /**
   * Optional actions to execute when an event is triggered.
   *
   * @default null
   *
   * TODO_RITESH: https://www.nutrient.io/api/web/NutrientViewer.FormFieldAdditionalActions.html
   */
  additionalActions: any;
  /**
   * This property is used to define the permission scope for this form-field, it's corresponding widget-annotations and form field values. If you change the `group` of a form field, the corresponding widget annotations and form field values will inherit it.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   */
  group?: string | null;
  /**
   * This property defines whether this form-field can be edited or not.
   * The value of this field depends on the set of collaboration permissions defined in the JWT token.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   */
  readonly isEditable?: boolean;
  /**
   * This property defines whether this form-field can be filled or not.
   * The value of this field depends on the set of collaboration permissions defined in the JWT token.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   */
  readonly isFillable?: boolean;
  /**
   * This property defines whether this form field can be deleted or not.
   * The value of this field depends on the set of collaboration permissions defined in the JWT token.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   */
  readonly isDeletable?: boolean;
  /**
   * This property defines whether the user has permission to edit the group of this form field.
   * The value of this field depends on the set of collaboration permissions defined in the JWT token.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   */
  readonly canSetGroup?: boolean;
  constructor(args?: IFormField);
}

declare const FormField_base: Immutable.Record.Factory<IFormField>;

/** @inline */
declare type FormFieldAdditionalActionsType = {
  /**
   * Execute an action when the value of the field changes.
   *
   * The name of this event in the PDF spec is `V` and can check the new value for validity.
   */
  onChange?: Action;
  /**
   * Action to be performed to recalculate the value of a field.
   *
   * The name of this event in the PDF spec is `C`.
   */
  onCalculate?: Action;
};

declare type FormFieldEventTriggerType = keyof FormFieldAdditionalActionsType;

/** @inline */
declare type FormFieldFlags = Array<'readOnly' | 'required' | 'noExport'>;

/** @inline */
declare type FormFieldInputAdditionalActionsType = FormFieldAdditionalActionsType & {
  /**
   * Action to be performed when the user types a key-stroke into a text field or combo box
   * or modifies the selection in a scrollable list box.
   *
   * The name of this event in the PDF spec is `K`.
   */
  onInput?: Action;
  /**
   * Action to be performed before the field is formatted to display its current value.
   *
   * For signature form fields, this action will be executed when the form field
   * is digitally signed.
   *
   * The name of this event in the PDF spec is `F`.
   */
  onFormat?: Action;
};

declare type FormFieldInputEventTriggerType = keyof FormFieldInputAdditionalActionsType;

/** @inline */
declare type FormFieldName = string;

export declare namespace FormFields {
  export {
    FormField,
    ButtonFormField,
    CheckBoxFormField,
    ChoiceFormField,
    ComboBoxFormField,
    ListBoxFormField,
    RadioButtonFormField,
    TextFormField,
    SignatureFormField,
    serializeFormField as toSerializableObject,
    deserializeFormField as fromSerializableObject };

}

/**
 * @class
 * Record representing a form field value.
 *
 * To retrieve a list of all form field values, use {@link Instance#getFormFieldValues}.
 *
 * Please see our {@link https://www.nutrient.io/guides/web/current/forms/introduction-to-forms/ | forms guide
 * article} to learn more about forms and for examples on how to set form field values.
 * @example
 * Setting a form field value.
 * ```ts
 * const formFieldValue = new FormFieldValue({
 *   name: 'Form field name',
 *   value: 'Form field value'
 * });
 * instance.update(formFieldValue);
 * ```
 *
 * @summary Type representing a single form field value.
 * @see {@link Instance#update}
 * @see {@link Instance#setFormFieldValues}
 * @see {@link Instance#getFormFieldValues}
 */
export declare class FormFieldValue extends FormFieldValue_base {
  /**
   * Unique name of the form field (often referred to as fully qualified name). This name is used
   * to link form field value to a {@link FormFields.FormField}.
   */
  name: string;
  /**
   * The value of the form field.
   */
  value: string | Immutable.List<string> | null;
  /**
   * Radio buttons and checkboxes can have multiple widgets with the same form value associated, but can be
   * selected independently. `optionIndexes` contains the value indexes that should be actually set.
   *
   * If set, the `value` field doesn't get used, and the widget found at the corresponding indexes in the form field's
   * `annotationIds` property are checked.
   *
   * If set on fields other than radio buttons or checkboxes, setting the form value will fail.
   */
  optionIndexes?: Immutable.List<number>;







  isFitting?: boolean;
  static defaultValues: IObject;
  constructor(args?: IObject);
}

declare const FormFieldValue_base: Immutable.Record.Factory<{
  name?: string | undefined;
  value?: string | number | Immutable.List<string> | null | undefined;
  optionIndexes?: Immutable.List<number> | undefined;
  isFitting?: boolean | undefined;
}>;

/**
 * @class
 * A form option is used to identify all possible options for the following form field types:
 *
 * - {@link NutrientViewer.FormFields.CheckBoxFormField}
 * - {@link NutrientViewer.FormFields.ListBoxFormField}
 * - {@link NutrientViewer.FormFields.RadioButtonFormField}
 * - {@link NutrientViewer.FormFields.ComboBoxFormField}
 *
 * The index of the {@link WidgetAnnotation#id} in the
 * {@link FormField#annotationIds} property is used to find the option
 * for this widget annotation (the index is the same):
 *
 * ```
 * const index = formField.annotationIds.findIndex(id => id === annotation.id);
 * const option = formField.options.get(index);
 * console.log(option.value);
 * ```
 * @public
 * @summary Form field options
 */
export declare class FormOption extends FormOption_base {}


declare const FormOption_base: Record_2.Factory<{
  label: string;
  value: string;
}>;

/**
 * Defines specific configuration options related to forms.
 *
 * @summary Object containing configuration options for forms
 * @example
 * NutrientViewer.load({
 *   formsConfiguration: {
 *     export: { disableComboBoxArrow: true }
 *   }
 * });
 */
export declare type FormsConfiguration = {
  export?: FormsConfigurationExport;
};

/**
 * Defines configuration options regarding settings when exporting/saving a PDF.
 *
 * @summary Object containing configuration options for exporting/saving a PDF with forms.
 * @example
 * NutrientViewer.load({
 *   formsConfiguration: {
 *     export: { disableComboBoxArrow: true }
 *   }
 * });
 */
export declare type FormsConfigurationExport = {
  /**
   * When true, disables writing the arrow button into the saved PDF.
   *
   * @default false
   */
  disableComboBoxArrow?: boolean;
};

declare function FormsMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Returns a {@link NutrientViewer.Immutable.List} of all {@link NutrientViewer.FormFields} for this
     * document.
     *
     * @example
     * instance.getFormFields().then(formFields => {
     *   formFields.forEach(formField => {
     *     console.log(formField.name);
     *   });
     *
     *   // Filter form fields by type
     *   formFields.filter(formField => (
     *     formField instanceof NutrientViewer.FormFields.TextFormField
     *   ));
     *
     *   // Get the total number of form fields
     *   const totalFormFields = formFields.size;
     * })
     *
     * @returns Resolves to a list of all form fields.
     */
    getFormFields(): Promise<List<FormField>>;
    /**
     * Returns a simplified object that contains all form fields currently loaded and maps to their values. This
     * object can be used to serialize form field values.
     *
     * Values can be of type `null`, `string`, or `Array.<string>`.
     *
     * This method does not check if all the form fields have been loaded. If you want to make sure that
     * the all the document's form field values are retrieved, you have to make sure that the form fields
     * have been retrieved first.
     *
     * @example
     * await instance.getFormFields()
     * const formFieldValues = instance.getFormFieldValues();
     * console.log(formFieldValues); // => { textField: 'Text Value', checkBoxField: ['A', 'B'], buttonField: null }
     *
     * @returns A simplified object that contains all form field values.
     */
    getFormFieldValues(): Record<string, null | string | Array<string>>;
    /**
     * Updates the values of form fields. It's possible to update multiple form fields at once.
     *
     * The object must use the {@link NutrientViewer.FormFields.FormField#name} as a key and the
     * values must be of type `null`, `string`, or `Array.<string>`. A `null` value will reset
     * the form field to either `null`, or its default value if available.
     *
     * This method returns a Promise that resolves when all the form fields have been updated, so
     * it should be awaited whenever you need to get or modify form fields immediately to ensure the form field
     * value is synchronized.
     *
     * @example
     * instance.setFormFieldValues({
     *   textField: "New Value",
     *   checkBoxField: ["B", "C"],
     * });
     *
     * @param formFieldValues - An object that contains the form field names that should be updated as keys and their value as values.
     * @returns Resolves when the values have been set.
     */
    setFormFieldValues(formFieldValues: Record<string, null | string | Array<string>>): Promise<void>;
    /**
     * You can programmatically modify the properties of the widget annotation and the associated form field just
     * before it is created via the form creator UI.
     *
     * @example
     * instance.setOnWidgetAnnotationCreationStart((annotation, formField) => {
     *   return { annotation: annotation.set('opacity', 0.7) };
     * });
     *
     * @param callback - The callback to set the values of created form fields programmatically.
     */
    setOnWidgetAnnotationCreationStart(callback: OnWidgetAnnotationCreationStartCallback): void;

  };
} & T;

/**
 * Deeply converts plain JS objects and arrays to Immutable Maps and Lists.
 *
 * If a `reviver` is optionally provided, it will be called with every
 * collection as a Seq (beginning with the most nested collections
 * and proceeding to the top-level collection itself), along with the key
 * referring to each collection and the parent JS object provided as `this`.
 * For the top level, object, the key will be `""`. This `reviver` is expected
 * to return a new Immutable Collection, allowing for custom conversions from
 * deep JS objects. Finally, a `path` is provided which is the sequence of
 * keys to this value from the starting value.
 *
 * `reviver` acts similarly to the [same parameter in `JSON.parse`][1].
 *
 * If `reviver` is not provided, the default behavior will convert Objects
 * into Maps and Arrays into Lists like so:
 *
 * <!-- runkit:activate -->
 * ```js
 * const { fromJS, isKeyed } = require('immutable')
 * function (key, value) {
 *   return isKeyed(value) ? value.toMap() : value.toList()
 * }
 * ```
 *
 * `fromJS` is conservative in its conversion. It will only convert
 * arrays which pass `Array.isArray` to Lists, and only raw objects (no custom
 * prototype) to Map.
 *
 * Accordingly, this example converts native JS data to OrderedMap and List:
 *
 * <!-- runkit:activate -->
 * ```js
 * const { fromJS, isKeyed } = require('immutable')
 * fromJS({ a: {b: [10, 20, 30]}, c: 40}, function (key, value, path) {
 *   console.log(key, value, path)
 *   return isKeyed(value) ? value.toOrderedMap() : value.toList()
 * })
 *
 * > "b", [ 10, 20, 30 ], [ "a", "b" ]
 * > "a", {b: [10, 20, 30]}, [ "a" ]
 * > "", {a: {b: [10, 20, 30]}, c: 40}, []
 * ```
 *
 * Keep in mind, when using JS objects to construct Immutable Maps, that
 * JavaScript Object properties are always strings, even if written in a
 * quote-less shorthand, while Immutable Maps accept keys of any type.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { Map } = require('immutable')
 * let obj = { 1: "one" };
 * Object.keys(obj); // [ "1" ]
 * assert.equal(obj["1"], obj[1]); // "one" === "one"
 *
 * let map = Map(obj);
 * assert.notEqual(map.get("1"), map.get(1)); // "one" !== undefined
 * ```
 *
 * Property access for JavaScript Objects first converts the key to a string,
 * but since Immutable Map keys can be of any type the argument to `get()` is
 * not altered.
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Example.3A_Using_the_reviver_parameter
 *      "Using the reviver parameter"
 */
declare function fromJS(
jsValue: any,
reviver?: (
key: string | number,
sequence: Collection.Keyed<string, any> | Collection.Indexed<any>,
path?: Array<string | number>)
=> any)
: any;

/**
 * Annotation deserializer. Converts an annotation object to a {@link AnnotationsUnion}.
 *
 * @param annotation - Serialized Annotation
 */
declare function fromSerializableObject<K extends Serializers.AnnotationJSONUnion | AnnotationsBackendJSONUnion>(annotation: K): AnnotationJSONToAnnotation<K>;

/**
 *
 *Generates a new unique ID usable as an ID of annotation, formField, bookmark or comment.
 *
 * @returns A unique identifier.
 */
declare function generateInstantId(): InstantID;

export declare namespace Geometry {
  export {
    Point,
    DrawingPoint,
    Rect,
    Size,
    Inset };

}

/**
 * Returns the value within the provided collection associated with the
 * provided key, or notSetValue if the key is not defined in the collection.
 *
 * A functional alternative to `collection.get(key)` which will also work on
 * plain Objects and Arrays as an alternative for `collection[key]`.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { get } = require('immutable')
 * get([ 'dog', 'frog', 'cat' ], 2) // 'frog'
 * get({ x: 123, y: 456 }, 'x') // 123
 * get({ x: 123, y: 456 }, 'z', 'ifNotSet') // 'ifNotSet'
 * ```
 */
declare function get<K, V>(collection: Collection<K, V>, key: K): V | undefined;

declare function get<K, V, NSV>(collection: Collection<K, V>, key: K, notSetValue: NSV): V | NSV;

declare function get<TProps extends Object, K extends keyof TProps>(record: Record_2<TProps>, key: K, notSetValue: any): TProps[K];

declare function get<V>(collection: Array<V>, key: number): V | undefined;

declare function get<V, NSV>(collection: Array<V>, key: number, notSetValue: NSV): V | NSV;

declare function get<C extends Object, K extends keyof C>(object: C, key: K, notSetValue: any): C[K];

declare function get<V>(collection: {[key: string]: V;}, key: string): V | undefined;

declare function get<V, NSV>(collection: {[key: string]: V;}, key: string, notSetValue: NSV): V | NSV;

/** @inline */
declare interface GetCommentsOptions {
  /**
   * Whether to include draft comments in the returned list.
   *
   * @default false
   */
  includeDrafts?: boolean;
}

/**
 * Returns the value at the provided key path starting at the provided
 * collection, or notSetValue if the key path is not defined.
 *
 * A functional alternative to `collection.getIn(keypath)` which will also
 * work with plain Objects and Arrays.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { getIn } = require('immutable')
 * getIn({ x: { y: { z: 123 }}}, ['x', 'y', 'z']) // 123
 * getIn({ x: { y: { z: 123 }}}, ['x', 'q', 'p'], 'ifNotSet') // 'ifNotSet'
 * ```
 */
declare function getIn(collection: any, keyPath: Iterable<any>, notSetValue: any): any;

declare type GetTypeFromAnnotationJSON<T extends {
  type: keyof AnnotationSerializerTypeMap;
}> = T extends {
  type: infer U;
} ? U : never;

/**
 * @class
 * PDF action to go to a destination (page) in the current document.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record | Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `action.set("pageIndex", 2);`.
 *
 * A GoToAction can define a different `pageIndex` in the same document. When clicking on it, we
 * will update the scroll position to make the page visible. We will not update the zoom level in
 * that case.
 * @example
 * Create a new GoToAction
 * ```ts
 * const action = new NutrientViewer.Actions.GoToAction({ pageIndex: 10 });
 * ```
 *
 * @summary Go to a destination (page) in the current document.
 */
export declare class GoToAction extends Action {
  /**
   * The page index of the page that should be made visible when triggering this action.
   *
   * `pageIndex` is zero-based and has a maximum value of `totalPageCount - 1`.
   */
  pageIndex: number;
  constructor(options?: IGoToAction);
}

/**
 * @class
 * PDF action to go to an embedded file. This action is not implemented yet.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record | Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example:
 * `action.set("relativePath", "/other_document.pdf");`.
 * @example
 * Create a new GoToEmbeddedAction
 * ```ts
 * const action = new NutrientViewer.Actions.GoToEmbeddedAction({
 *   relativePath: "/other_document.pdf"
 * });
 * ```
 *
 * @summary Go to an embedded file.
 */
export declare class GoToEmbeddedAction extends Action {
  /**
   * Should the file be opened in a new window?
   */
  newWindow: boolean;
  /**
   * The relative path to the embedded file.
   */
  relativePath: string;
  /**
   * The target type. Can either be `parent` or `child`.
   */
  targetType: 'parent' | 'child';
  constructor(args?: IGoToEmbeddedAction);
}

/**
 * @class
 * PDF action to go to a different (remote) file. This action is not implemented yet.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record | Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example:
 * `action.set("relativePath", "/other_document.pdf");`.
 * @example
 * Create a new GoToRemoteAction
 * ```ts
 * const action = new NutrientViewer.Actions.GoToRemoteAction({
 *   relativePath: "/other_document.pdf"
 * });
 * ```
 *
 * @summary Go to a different (remote) file.
 */
export declare class GoToRemoteAction extends Action {
  /**
   * The relative path of the file to open.
   */
  relativePath: string;
  /**
   * A named destination.
   */
  namedDestination: string;
  constructor(options?: IGoToRemoteAction);
}

/**
 * Returns true if the key is defined in the provided collection.
 *
 * A functional alternative to `collection.has(key)` which will also work with
 * plain Objects and Arrays as an alternative for
 * `collection.hasOwnProperty(key)`.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { has } = require('immutable')
 * has([ 'dog', 'frog', 'cat' ], 2) // true
 * has([ 'dog', 'frog', 'cat' ], 5) // false
 * has({ x: 123, y: 456 }, 'x') // true
 * has({ x: 123, y: 456 }, 'z') // false
 * ```
 */
declare function has(collection: Object, key: any): boolean;

/**
 * The `hash()` function is an important part of how Immutable determines if
 * two values are equivalent and is used to determine how to store those
 * values. Provided with any value, `hash()` will return a 31-bit integer.
 *
 * When designing Objects which may be equal, it's important that when a
 * `.equals()` method returns true, that both values `.hashCode()` method
 * return the same value. `hash()` may be used to produce those values.
 *
 * For non-Immutable Objects that do not provide a `.hashCode()` functions
 * (including plain Objects, plain Arrays, Date objects, etc), a unique hash
 * value will be created for each *instance*. That is, the create hash
 * represents referential equality, and not value equality for Objects. This
 * ensures that if that Object is mutated over time that its hash code will
 * remain consistent, allowing Objects to be used as keys and values in
 * Immutable.js collections.
 *
 * Note that `hash()` attempts to balance between speed and avoiding
 * collisions, however it makes no attempt to produce secure hashes.
 *
 * *New in Version 4.0*
 */
declare function hash(value: any): number;

/**
 * Returns true if the key path is defined in the provided collection.
 *
 * A functional alternative to `collection.hasIn(keypath)` which will also
 * work with plain Objects and Arrays.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { hasIn } = require('immutable')
 * hasIn({ x: { y: { z: 123 }}}, ['x', 'y', 'z']) // true
 * hasIn({ x: { y: { z: 123 }}}, ['x', 'q', 'p']) // false
 * ```
 */
declare function hasIn(collection: any, keyPath: Iterable<any>): boolean;

/**
 * @class
 * PDF action to hide an annotation or form field.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record | Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `action.set("hide", true);`.
 *
 * When clicking on an annotation with a `HideAction`, the annotations specified in its
 * `annotationReferences` property will be hidden.
 * @example
 * Create a new HideAction
 * ```ts
 * const action = new NutrientViewer.Actions.HideAction({ hide: true });
 * ```
 *
 * @summary Hide an annotation or form field.
 */
export declare class HideAction extends Action {
  /**
   * If `true`, the action will hide the annotation, otherwise it will show it.
   */
  hide: boolean;
  /**
   * A list of references to annotations, either via the `pdfObjectId` or a form field name.
   */
  annotationReferences: List<AnnotationReference>;
  constructor(options?: IHideAction);
}

/**
 * @class
 * A highlight markup annotation. Please refer to {@link NutrientViewer.Annotations.MarkupAnnotation} for
 * more information.
 *
 * <center>
 *   <img title="Example of all markup annotation types" src="img/annotations/markup_annotations.png" width="450" class="shadow">
 * </center>
 * @example
 * Create a highlight annotation
 * ```ts
 * var rects = NutrientViewer.Immutable.List([
 *   new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 200, height: 10 }),
 *   new NutrientViewer.Geometry.Rect({ left: 10, top: 25, width: 200, height: 10 })
 * ]);
 * var annotation = new NutrientViewer.Annotations.HighlightAnnotation({
 *   pageIndex: 0,
 *   rects: rects,
 *   boundingBox: NutrientViewer.Geometry.Rect.union(rects)
 * });
 * ```
 *
 * @summary Highlight markup annotation.
 */
export declare class HighlightAnnotation extends TextMarkupAnnotation<IHighlightAnnotation> {
  /**
   * The blend mode defines how the color of the annotation will be applied to its background.
   *
   * @default "multiply"
   */
  blendMode: IBlendMode;
  /**
   * The color of the highlight annotation.
   *
   * @default Color.LIGHT_YELLOW
   */
  color: Color;
  static className: string;
  static readableName: string;
}

export declare class HighlightState extends HighlightState_base {}

declare const HighlightState_base: Record_2.Factory<IHighlightState>;

declare type Hints = {
  glyphs: Array<number | string>;
};

declare function HistoryMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * The History API includes methods to undo and redo annotation operations: creation,
     * updates and deletions may be reverted and restored by means of this API.
     *
     * The implementation does not fully revert an annotation to its previous state:
     * - The `updatedAt` field will have changed to the current time.
     * - If an annotation deletion is undone, the restored annotation will have a different `id`
     * than the original.
     * - If an annotation deletion is undone, the restored annotation will appear at the front,
     * regardless of its original stacking position.
     * - Annotation changes that only affect the `updatedAt` property are not tracked, and the updated
     * annotation is considered identical to the previous one in this case.
     * - Newly created empty text annotations are not recorded in the history. This ensures that
     * accidental creation of such annotations, followed by pressing escape or clicking outside,
     * will not persist in the undo and redo history.
     *
     * The feature only accounts for annotations modified locally, wether using the API or the
     * toolbar Undo and Redo buttons. If an annotation is modified externally, by another Instant client,
     * for example, undoing will not revert the annotation state to the one just before the external change,
     * but to the previous to that one: external annotation operations are not undone, but
     * overridden.
     *
     * Annotation operations performed while the History API is disabled can also be considered external
     * for that effect. This is also the case for annotation operations that result from Instant Comments
     * changes, like deleting the last comment of a comment thread, which results on the comment marker
     * being deleted, and which cannot therefore be undone.
     *
     * However, comment markers directly deleted with the API may be restored with its former comments.
     *
     * {@link AnnotationPresets | Annotation presets} are not restored by undo and redo operations.
     *
     * @summary History namespace.
     */
    history: {
      /**
       * When called, the last local annotation operation will be reverted. The outcome
       * will vary depending on the type of that operation:
       *
       * - Annotation creation: the annotation will be deleted.
       * - Annotation modification: the previous state of the annotation will be reverted.
       * - Annotation deletion: the annotation will be restored.
       *
       * Note that if a deleted annotation is restored by calling this function, it will
       * reappear in front of any other annotations, even if that was not its original stacking order.
       *
       * Returns `true` if the operation has been undone successfully, `false` if there are no
       * undoable operations available or the History API is disabled.
       *
       * @example
       * await instance.create(new NutrientViewer.Annotations.RectangleAnnotation({
       *   pageIndex: 0,
       *   boundingBox: new NutrientViewer.Geometry.Rect({
       *     left: 200,
       *     top: 150,
       *     width: 250,
       *     height: 75
       *   })
       * }));
       * console.log("Annotation created!");
       * await instance.history.undo();
       * console.log("Annotation creation undone: annotation deleted!");
       *
       * @example
       * Undo all previous actions
       * ```ts
       * // Undo all previous actions
       * while (await instance.history.undo()) {}
       * ```
       *
       * @returns The result of the undo operation.
       */
      undo: () => boolean;
      /**
       * When called, the last undone annotation operation will be performed again.
       *
       * Note that if an annotation deletion has been undone, and then redone by calling this function, it will
       * reappear in front of any other annotations, even if that was not its original stacking order.
       *
       * Returns `true` if the operation has been redone successfully, `false` if there are no
       * redoable operations available or the History API is disabled.
       *
       * @example
       * await instance.create(new NutrientViewer.Annotations.RectangleAnnotation({
       *   pageIndex: 0,
       *   boundingBox: new NutrientViewer.Geometry.Rect({
       *     left: 200,
       *     top: 150,
       *     width: 250,
       *     height: 75
       *   })
       * }));
       * console.log("Annotation created!");
       * await instance.delete();
       * console.log("Annotation deleted!");
       * await instance.history.undo();
       * console.log("Annotation creation undone: annotation deleted!");
       * await instance.history.redo();
       * console.log("Annotation creation redone: annotation created!");
       */
      redo: () => boolean;
      /**
       * Returns `true` if it's possible to undo a previous operation, `false` otherwise,
       * also if the History API is disabled.
       */
      canUndo: () => boolean;
      /**
       * Returns `true` if it's possible to redo a previously undone operation, `false` otherwise,
       * also if the History API is disabled.
       */
      canRedo: () => boolean;
      /**
       * Removes all undoable and redoable operations available.
       *
       */
      clear: () => void;
      /**
       * Enables the History API, making undoing and redoing possible. If there were previous undoable or
       * redoable operations, they will be now available.
       *
       */
      enable: () => void;
      /**
       * Disables the History API: attempting to undo or redo previous operations with the API or the UI
       * will not be possible, but the previous undoable and redoable operations will be preserved, and
       * available if the History API is enabled again with {@link NutrientViewer.Instance#history}.enable.
       *
       */
      disable: () => void;
    };

  };
} & T;

declare function I18nMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Sets the locale for the application. When setting a locale that doesn't exist it tries to
     * fall back to the parent locale when available. For example `en-US` falls back to `en`.
     *
     * See {@link NutrientViewer.I18n.locales} to get a list of all the available locales.
     *
     * @throws {Error} Will throw an error when the locale does not exist.
     * @param locale - The locale to set the app to. It must be one of {@link NutrientViewer.I18n.locales}.
     * @returns Returns a promise that resolves once the locale is set.
     */
    setLocale(locale: string): Promise<void>;
    /**
     * Returns the current locale for the application.
     *
     * @returns The current locale for the application.
     */
    readonly locale: string;

  };
} & T;

declare interface IAIComparisonOperationOptions extends IComparisonOperationOptions {
  operationType: IAIComparisonOperationType;
  categories?: string[];
}

declare type IAIComparisonOperationType = (typeof AIComparisonOperationType)[keyof typeof AIComparisonOperationType];

declare type IAIComparisonPhase = (typeof AIComparisonPhase)[keyof typeof AIComparisonPhase];

/** @inline */
declare type IAlignment = (typeof Alignment)[keyof typeof Alignment];

declare type IAnnotationJSON = Omit<BaseAnnotationJSON, 'id' | 'group' | 'permissions'>;

/** @inline */
declare type IAnnotationToolbarType = 'stroke-color' | 'fill-color' | 'background-color' | 'opacity' | 'line-width' | 'blend-mode' | 'spacer' | 'delete' | 'annotation-note' | 'border-color' | 'border-width' | 'border-style' | 'color' | 'linecaps-dasharray' | 'line-style' | 'font' | 'overlay-text' | 'outline-color' | 'apply-redactions' | 'measurementType' | 'measurementScale' | 'back' | 'crop-current' | 'crop-all' | 'close';

/** @inline */
declare type IAutoSaveMode = (typeof AutoSaveMode)[keyof typeof AutoSaveMode];

/** @inline */
declare type IBlendMode = (typeof BlendMode)[keyof typeof BlendMode];

/** @inline */
declare type IBorderStyle = (typeof BorderStyle)[keyof typeof BorderStyle];

/** @inline */
declare type ICallout = {
  start: Point | null;
  knee: Point | null;
  end: Point | null;
  cap: ILineCap | null;
  innerRectInset: Inset | null;
};

/** @inline */
declare type ICollaboratorPermissionsOptions = {
  group?: IGroup;
  permissions?: IPermissions;
};

/** @inline */
declare type ICommentDisplay = (typeof CommentDisplay)[keyof typeof CommentDisplay];

declare interface IComparisonOperation {
  type: IComparisonOperationType;
  options?: IComparisonOperationOptions;
}

declare interface IComparisonOperationOptions {
  [key: string]: any;
}

/** @inline */
declare type IComparisonOperationType = (typeof ComparisonOperationType)[keyof typeof ComparisonOperationType];

/**
 * @inline
 * */
declare interface IconAnnotationToolbarItem extends Omit<Shared, 'icon'> {
  id: string;
  type: 'custom';
  /**
   * Icon for the custom item.
   *
   * In case of mobile devices, the icon is displayed on the first level of the annotation toolbar. Once
   * you click on the icon, the `node` element opens on the second level.
   *
   * If you do not pass the `icon`, the node is present on the first level.
   */
  icon?: string | Node;
  /**
   * The `custom` tool items can define a DOM node.
   * NutrientViewer renders this node instead of a standard tool button.
   *
   * In this case the tool item is rendered inside of a container
   * which gets the `title` and `className` attributes set.
   *
   * The `selected` and `disabled` are used just to toggle the
   * PSPDFKit-Tool-Node-active and PSPDFKit-Tool-Node-disabled
   * class names but making the node effectively selected or disabled is up to
   * the implementation of the item.
   *
   * The `onPress` event is registered and fires any time the item is either clicked
   * or tapped (on touch devices).
   */
  node?: Node;
}

/** @inline */
declare type IConformance = (typeof Conformance)[keyof typeof Conformance];

/** @inline */
declare interface ICustomOverlayItem {
  disableAutoZoom?: boolean;
  id: CustomOverlayItemID | null;
  node: Node | null;
  noRotate?: boolean;
  pageIndex: number;
  position: Point;
  onAppear?: null | ((...args: Args) => void);
  onDisappear?: null | ((...args: Args) => void);
}

/** @inline */
declare type ID = string;

/** @inline */
declare type ID_2 = string;

/** @inline */
declare type IDocumentComparisonSourceType = (typeof DocumentComparisonSourceType)[keyof typeof DocumentComparisonSourceType];

/** @inline */
declare interface IDocumentDescriptor {
  filePath?: string | ArrayBuffer;
  password?: string;
  pageIndexes: Array<number | [number, number]>;
  jwt?: string;
}

/** @inline */
declare type IDocumentOfficeFormat = (typeof OfficeDocumentFormat)[keyof typeof OfficeDocumentFormat];

/** @inline */
declare type IDocumentPermissions = (typeof DocumentPermissionsEnum)[keyof typeof DocumentPermissionsEnum];

/** @inline */
declare interface IDrawingPoint extends PointCtorProps {
  intensity?: number;
}

/** @inline */
declare type IElectronicSignatureCreationMode = (typeof ElectronicSignatureCreationMode)[keyof typeof ElectronicSignatureCreationMode];

/** @inline */
declare interface IEllipseAnnotation extends IShapeAnnotation {
  cloudyBorderIntensity?: number | null;
  cloudyBorderInset?: Inset | null;
}

/** @inline */
declare interface IEmbeddedFile {
  id: ID;
  attachmentId: string;
  description: null | string;
  fileName: null | string;
  fileSize: null | number;
  updatedAt: null | Date;
}

/** @inline */
declare interface IFont {
  name: string | null;
  callback: FontCallback | null;
}

/** @inline */
declare interface IFormField {
  id?: ID;
  pdfObjectId?: number | null;
  annotationIds?: List<string>;
  name?: FormFieldName;
  label?: string;
  readOnly?: boolean;
  required?: boolean;
  noExport?: boolean;
  additionalActions?: any;
  group?: string | null;
  isEditable?: boolean;
  isFillable?: boolean;
  isDeletable?: boolean;
  canSetGroup?: boolean;
  [key: string]: any;
}

/** @inline */
declare type IFunction<T = void> = (...args: any[]) => T;

/** @inline */
declare interface IGoToAction extends ActionProperties {
  pageIndex?: number;
}

/** @inline */
declare interface IGoToEmbeddedAction extends ActionProperties {
  newWindow?: boolean;
  relativePath?: string;
  targetType?: 'parent' | 'child';
}

/** @inline */
declare interface IGoToRemoteAction extends ActionProperties {
  relativePath?: string;
  namedDestination?: string;
}

declare type IGroup = string | null | undefined;

/** @inline */
declare interface IHideAction extends ActionProperties {
  hide?: boolean;
  annotationReferences?: List<AnnotationReference>;
}

/** @inline */
declare interface IHighlightAnnotation extends ITextMarkupAnnotation {
  color: Color;
  blendMode: IBlendMode | 'multiply';
}

/** @inline */
declare interface IHighlightState {
  pageIndex: number;
  rectsOnPage: List<Rect>;
}

/** @inline */
declare interface IImageAnnotation extends AnnotationProperties {
  description: string | null;
  fileName: string | null;
  contentType: string | null;
  imageAttachmentId: string | null;
  isSignature: boolean;
  xfdfAppearanceStream: string | null;
  xfdfAppearanceStreamOriginalPageRotation: number | null;
}

/** @inline */
declare interface IInkAnnotation extends AnnotationProperties {
  lines: List<List<DrawingPoint>>;
  lineWidth: number | null;
  strokeColor: Color | null;
  backgroundColor: Color | null;
  isDrawnNaturally: boolean;
  isSignature: boolean;
}

/** @inline */
declare interface IInset {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

/** @inline */
declare type IInteractionMode = (typeof InteractionMode)[keyof typeof InteractionMode];

/** @inline */
declare interface IJavaScriptAction extends ActionProperties {
  script?: string;
}

/** @inline */
declare interface ILaunchAction extends ActionProperties {
  filePath?: string;
}

/** @inline */
declare type ILayoutMode = (typeof LayoutMode)[keyof typeof LayoutMode];

/** @inline */
declare interface ILineAnnotation extends IShapeAnnotation {
  startPoint: Point | null;
  endPoint: Point | null;
  lineCaps: LineCapsType | null;
  points: List<Point> | null;
}

/** @inline */
declare type ILineCap = (typeof LineCap)[keyof typeof LineCap];

/** @inline */
declare interface ILinkAnnotation extends AnnotationProperties {
  action: Action | null;
  borderColor: Color | null;
  borderStyle: IBorderStyle | null;
  borderWidth: number | null;
}

/**
 * @class
 * Image annotations are images that are added to a PDF document.
 *
 * It is also possible to import the first page of a PDF by setting the
 * appropriate {@link ImageAnnotation#contentType | `contentType`},
 * however the imported PDF won't include the annotations unless they are flattened in
 * advance.
 * @example
 * Create an image annotation
 * ```ts
 * const request = await fetch("https://example.com/image.jpg");
 * const blob = await request.blob();
 * const imageAttachmentId = await instance.createAttachment(blob);
 * const annotation = new NutrientViewer.Annotations.ImageAnnotation({
 *   pageIndex: 0,
 *   contentType: "image/jpeg",
 *   imageAttachmentId,
 *   description: "Example Image Annotation",
 *   boundingBox: new NutrientViewer.Geometry.Rect({
 *     left: 10,
 *     top: 20,
 *     width: 150,
 *     height: 150,
 *   }),
 * });
 * ```
 *
 * @summary Display an image annotation, which represent an images in a PDF file.
 * @see {@link Instance#createAttachment}
 * @see {@link Instance#getAttachment}
 */
export declare class ImageAnnotation extends Annotation<IImageAnnotation> {
  /**
   * A description of the image content.
   */
  description: null | string;
  /**
   * The file name of the attached file.
   */
  fileName: null | string;
  /**
   * The content type of the connected attachment binary data.
   *
   * We currently support:
   * - `image/jpeg`
   * - `image/png`
   * - `application/pdf`
   */
  contentType: string;
  /**
   * The attachment identifier of the image. It holds the image data as binary.
   */
  imageAttachmentId: string;
  /**
   * The counter-clockwise rotation value in degrees relative to the rotated PDF page. Inserting an
   * annotation with a rotation value of `0` will make it appear in the same direction as the UI
   * appears, when no {@link ViewState#pagesRotation} is set.
   *
   * Can either be 0°, 90°, 180°, or 270°. Multiple or negative values are normalized to this
   * interval.
   *
   * @default 0
   */
  rotation: number;
  /**
   * When an image annotation is created via the signature UI, this flag is set to true.
   *
   * @default false
   */
  isSignature: boolean;
  xfdfAppearanceStream: null | string;
  xfdfAppearanceStreamOriginalPageRotation: null | number;
  static readableName: string;
}

/**
 * @deprecated Use {@link Serializers.ImageAnnotationJSON} instead.
 * @hidden
 */
export declare type ImageAnnotationJSON = Serializers.ImageAnnotationJSON;

declare class ImageAnnotationSerializer extends AnnotationSerializer {
  annotation: ImageAnnotation;
  constructor(annotation: ImageAnnotation);
  toJSON(): Serializers.ImageAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<Serializers.ImageAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): ImageAnnotation;
}

declare interface IMauiBridge {
  initialize(webEventDispatcher: dotNetObject): void;
  addAdvanceAccessScript(path: string): Promise<void>;
  loadDocumentFromPath(path: string, viewerConfigurationJson: string): Promise<void>;
  loadDocumentFromBase64String(fileContentAsBase64String: string, viewerConfigurationJson: string): Promise<void>;
  loadDocumentFromBuffer(documentBuffer: Uint8Array, viewerConfigurationJson: string): Promise<void>;
  setMainToolbarItems(toolbarItems: string): void;
  setAnnotationToolbarItems(annotationType: string, toolbarItems: string): void;
  setViewState(propertyName: keyof IViewState, value: object): void;
  exportDocument(configurationJSON: string): Promise<Uint8Array>;
  unload(): void;
  applyRedactions(): void;
  createAnnotation(annotationJson: string): Promise<string>;
  deleteAnnotations(annotationIdsJson: string): void;
  flattenAnnotations(pageIndices: number[]): Promise<void>;
  getAnnotations(pageIndex: number): Promise<string>;
  setSelectedAnnotations(annotationIdsJson: string): void;
  updateAnnotation(annotationJson: string): void;
  subscribeToEvent(event: string): void;
  unsubscribeFromEvent(event: string): void;
  showDocumentLoadingIndicator(): void;
  showGenericProcessingIndicator(): void;
  hideGenericProcessingIndicator(): void;
}

/** @inline */
declare type IMeasurementPrecision = (typeof MeasurementPrecision)[keyof typeof MeasurementPrecision];

/** @inline */
declare interface IMeasurementScale {
  unitFrom: IMeasurementScaleUnitFrom;
  unitTo: IMeasurementScaleUnitTo;
  fromValue: number;
  toValue: number;
}

/** @inline */
declare type IMeasurementScaleUnitFrom = (typeof MeasurementScaleUnitFrom)[keyof typeof MeasurementScaleUnitFrom];

/** @inline */
declare type IMeasurementScaleUnitTo = (typeof MeasurementScaleUnitTo)[keyof typeof MeasurementScaleUnitTo];

/** @inline */
declare interface IMediaAnnotation extends AnnotationProperties {
  description: null | string;
  fileName: null | string;
  contentType: string | null;
  mediaAttachmentId: string | null;
}

declare namespace Immutable {
  export {
    List,
    Map_2 as Map,
    OrderedMap,
    Set_2 as Set,
    OrderedSet,
    Stack,
    Range_2 as Range,
    Repeat,
    Record_2 as Record,
    Seq,
    Collection,
    fromJS,
    is,
    hash,
    isImmutable,
    isCollection,
    isKeyed,
    isIndexed,
    isAssociative,
    isOrdered,
    isValueObject,
    isSeq,
    isList,
    isMap,
    isOrderedMap,
    isStack,
    isSet,
    isOrderedSet,
    isRecord,
    get,
    has,
    remove,
    set,
    update,
    getIn,
    hasIn,
    removeIn,
    setIn,
    updateIn,
    merge,
    mergeWith,
    mergeDeep,
    mergeDeepWith,
    RecordOf,
    ValueObject };

}

export declare namespace Immutable_2 {
  export {
    List,
    Set_2 as Set,
    Map_2 as Map };

}

/** @inline */
declare type IModificationType = (typeof ModificationType)[keyof typeof ModificationType];

/** @inline */
declare type ImportPageIndex = Array<number | Range_3>;

/** @inline */
declare interface INamedAction extends ActionProperties {
  action?: string;
}

declare const InheritableImmutableRecord: new <T extends Record<string, unknown>>(values?: Partial<T> | Iterable<[string, unknown]> | undefined) => __dangerousImmutableRecordFactory<T>;

/**
 * @class
 * Ink annotations are used for free hand drawings on a page. They can contain multiple segments
 * (see the definition of `lines` below). Points within the same segment are connected to a line.
 *
 * Ink annotations are only selectable around their visible lines. This means that you can create a
 * page full of line annotations while annotations behind the ink annotation are still selectable.
 *
 * Right now, ink annotations are implemented using SVG images. This behavior is object to change.
 *
 * <center>
 *   <img title="Example of an ink annotation" src="img/annotations/ink_annotation.png" width="350" class="shadow">
 *
 * </center>
 * @example
 * Create an ink annotation that displays a cross
 * ```ts
 * const annotation = new NutrientViewer.Annotations.InkAnnotation({
 *   pageIndex: 0,
 *   lines: NutrientViewer.Immutable.List([
 *     NutrientViewer.Immutable.List([
 *       new NutrientViewer.Geometry.DrawingPoint({ x: 5,  y: 5 }),
 *       new NutrientViewer.Geometry.DrawingPoint({ x: 95, y: 95}),
 *     ]),
 *     NutrientViewer.Immutable.List([
 *       new NutrientViewer.Geometry.DrawingPoint({ x: 95, y: 5 }),
 *       new NutrientViewer.Geometry.DrawingPoint({ x: 5,  y: 95}),
 *     ])
 *   ]),
 *   boundingBox: new NutrientViewer.Geometry.Rect({
 *     left: 0,
 *     top: 0,
 *     width: 100,
 *     height: 100,
 *   }),
 * });
 * ```
 *
 * @public
 * @summary Display free hand drawings on a page.
 * @param args - An object of the members.
 * @see {@link Instance#getInkSignatures} | {@link Instance#setInkSignatures}
 * @see {@link Configuration#populateInkSignatures}
 * @see {@link NutrientViewer.EventName.INK_SIGNATURES_CREATE} | {@link NutrientViewer.EventName.INK_SIGNATURES_CHANGE}
 * @see {@link NutrientViewer.EventName.INK_SIGNATURES_UPDATE} | {@link NutrientViewer.EventName.INK_SIGNATURES_DELETE}
 */
export declare class InkAnnotation extends Annotation<IInkAnnotation> {
  /**
   * A list of line segments. Every segment consists again of a list of points with additional
   * intensity information.
   *
   * The two nested lists are required since one ink annotation can consist of multiple lines.
   * Within one segment, points will be connected using lines or curves.
   *
   * We use {@link NutrientViewer.Geometry.DrawingPoint} for an additional intensity value (usually
   * the pressure of a pointer device) that is used to reconstruct the naturally drawn image. If a
   * device without intensity is used, the default intensity of `0.5` will be used.
   *
   * If no lines are present, the annotation will not be visible.
   *
   * @default NutrientViewer.Immutable.List() Empty list
   */
  lines: List<List<DrawingPoint>>;
  /**
   * The blend mode defines how the color of the annotation will be applied to its background.
   *
   * @default "normal"
   */
  blendMode: IBlendMode;
  /**
   * The width of the lines in page size pixels. Per default, we use values between 1 and 40 in
   * the UI.
   *
   * The line width will scale when you zoom in.
   *
   * @default 5
   */
  lineWidth: number;
  /**
   * A {@link NutrientViewer.Color} for the visible line
   *
   * @default Color.BLUE
   */
  strokeColor: Color | null;
  /**
   * Optional background color that will fill the complete bounding box.
   *
   * @default null
   */
  backgroundColor: Color | null;
  /**
   * NutrientViewer's Natural Drawing mode. This value will currently not effect rendering on NutrientViewer
   * for Web.
   *
   * @default false
   */
  isDrawnNaturally: boolean;
  /**
   * When an ink annotation is created via the signature UI, this flag is set to true.
   *
   * @default false
   */
  isSignature: boolean;
  static readableName: string;
}

/**
 * @deprecated Use {@link Serializers.InkAnnotationJSON} instead.
 * @hidden
 */
export declare type InkAnnotationJSON = Serializers.InkAnnotationJSON;

declare class InkAnnotationSerializer extends AnnotationSerializer {
  annotation: InkAnnotation;
  constructor(annotation: InkAnnotation);
  toJSON(): Serializers.InkAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<Serializers.InkAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): InkAnnotation;
  _linesToJSON(): {
    points: [number, number][][];
    intensities: number[][];
  };
  static _JSONToLines(linesJSON: {
    points: Array<Array<[number, number]>>;
    intensities: Array<Array<number>>;
  }): List<List<DrawingPoint>>;
}







declare const InkEraserMode: {
  /** Individual points of the ink annotation are removed as they're touched. This is the default mode. */
  readonly POINT: "POINT";
  /** Whole strokes of the ink annotation are removed as they're touched. */
  readonly STROKE: "STROKE";
};

export declare type InlineTextSelectionToolbarItem = Omit<ToolItem_2, 'type'> & {
  type: InlineToolbarType | 'custom';
};

/**
 * This callback can be run on specific text selection to modify its inline toolbar items. Nutrient Web SDK comes with a built-in toolbar that shows whenever some text is selected on a document, we will refer to said tooltip as inline toolbar from now on.
 * This callback allows users to customize said inline toolbar.
 *
 * @param options - The object that can be helpful in implementing custom toolbar.
 * @param selection - The reference to the text that is currently selected.
 */
export declare type InlineTextSelectionToolbarItemsCallback = (options: {
  /** The list of default items that are shown for this particular annotation. */
  defaultItems: InlineTextSelectionToolbarItem[];
  /** Whether the screen is in desktop layout. */
  hasDesktopLayout: boolean;
}, selection: TextSelection_2) => InlineTextSelectionToolbarItem[];

declare type InlineToolbarType = (typeof builtInItems)[number];

/** @inline */
declare interface INoteAnnotation extends AnnotationProperties {
  text: {
    format: 'plain';
    value: string;
  };
  icon: string | INoteIcon;
  color: Color;
}

/** @inline */
declare type INoteIcon = (typeof NoteIcon)[keyof typeof NoteIcon];

/**
 * An inset describes a rectangle by enumerating the distance from each side to the corresponding
 * side of a reference rectangle. Therefore it does not hold coordinates, nor dimensions, only
 * relative values for `left`, `top`, `right` and `bottom`. Provided values are defined in same units
 * used by the page, point units. Point units are only equal to pixels when zoom value is `1`.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record | Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `inset.set("right", 15)`.
 *
 * @example
 * Create and update an inset.
 * ```ts
 * const inset = new NutrientViewer.Geometry.Inset({
 *   left: 5,
 *   top: 15,
 *   right: 10,
 *   bottom: 5
 * });
 * inset = inset.set("bottom", 7);
 * rect.bottom; // => 7
 * ```
 *
 * @public
 * @summary A relative rectangle inset in 2D space.
 * @param args - An object used to initialize the Point. If `left`, `top`, `right` or `bottom`
 *        is omitted, `0` will be used instead.
 * @default { left: 0, top: 0, right: 0, bottom: 0 }
 */
export declare class Inset extends Inset_base {
  /**
   * Returns a new Rect by adding the provided inset values to the provided Rect.
   *
   * @example
   * const rect = NutrientViewer.Geometry.Inset.applyToRect(
   *   rectangleAnnotation.cloudyBorderInset,
   *   rectangleAnnotation.boundingBox
   * );
   *
   * @param inset - An Inset instance.
   * @param rect - A Rect instance.
   * @returns A new `Rect`.
   */
  static applyToRect(inset: Inset, rect: Rect): Rect;
  static fromRect(rect: Rect): Inset;
  /**
   * Returns a new inset using the provided vale for all properties.
   *
   * @example
   * const inset = NutrientViewer.Geometry.Inset.fromValue(10);
   * // inset ->
   * // {
   * //    left: 10,
   * //    top: 10,
   * //    right: 10,
   * //    bottom: 10,
   * // }
   *
   * @param insetValue - An inset value to be applied to all the properties.
   * @returns A new `Inset`.
   */
  static fromValue(insetValue: number): Inset;
  /**
   * Applies a transformation to the inset. We will transform
   * each of the corners represented by the inset and then
   * find the max and min values to generate the resulting
   * inset.
   */
  apply(matrix: TransformationMatrix): Inset;
  /**
   * Returns a new inset with the provided scale applied to all properties.
   *
   * @param scale - The scale to apply to the inset.
   */
  setScale(scale: number): Inset;
}

declare const Inset_base: Record_2.Factory<IInset>;

/** @inline */
declare type InsetJSON = [left: number, top: number, right: number, bottom: number];

/**
 * A mounted document instance.
 *
 * You can generate an instance by using {@link NutrientViewer.load}.
 *
 * @summary A mounted document instance.
 * @public
 * @hideconstructor
 */
export declare class Instance extends Instance_base {
  constructor(config: any);
}

export declare interface Instance extends BaseMixin, InstanceType<ReturnType<typeof AnnotationSelectionMixin>>, InstanceType<ReturnType<typeof AnnotationPermissionMixin>>, InstanceType<ReturnType<typeof ViewStateMixin>>, InstanceType<ReturnType<typeof ToolbarItemsMixin>>, InstanceType<ReturnType<typeof TextSelectionMixin>>, InstanceType<ReturnType<typeof StampAnnotationTemplatesMixin>>, InstanceType<ReturnType<typeof SignaturesMixin>>, InstanceType<ReturnType<typeof SearchMixin>>, InstanceType<ReturnType<typeof RenderPageMixin>>, InstanceType<ReturnType<typeof RedactionsMixin>>, InstanceType<ReturnType<typeof PrivateAPIMixin>>, InstanceType<ReturnType<typeof I18nMixin>>, InstanceType<ReturnType<typeof HistoryMixin>>, InstanceType<ReturnType<typeof FormsMixin>>, InstanceType<ReturnType<typeof DocumentTextComparisonMixin>>, InstanceType<ReturnType<typeof DocumentOperationsMixin>>, InstanceType<ReturnType<typeof DocumentEditorMixin>>, InstanceType<ReturnType<typeof DocumentComparisonMixin>>, InstanceType<ReturnType<typeof DigitalSignaturesMixin>>, InstanceType<ReturnType<typeof CustomOverlayItemsMixin>>, InstanceType<ReturnType<typeof ContentEditorMixin>>, InstanceType<ReturnType<typeof CommentsMixin>>, InstanceType<ReturnType<typeof CommentPermissionMixin>>, InstanceType<ReturnType<typeof CollaborationPermissionsMixin>>, InstanceType<ReturnType<typeof ChangesMixin>>, InstanceType<ReturnType<typeof BookmarksMixin>>, InstanceType<ReturnType<typeof AnnotationTabOrderMixin>>, InstanceType<ReturnType<typeof AnnotationPresetsMixin>>, InstanceType<ReturnType<typeof AIAssistantMixin>>, InstanceType<ReturnType<typeof MiscellaneousMixin>>, InstanceType<ReturnType<typeof AnnotationsMixin>> {
}

declare const Instance_base: any;

declare type Instant = {
  public: boolean;
};

/**
 * @class
 * An InstantClient describes a single connection of a given user with the server.
 *
 * This class is only available if you have a valid Nutrient Instant license.
 *
 * You can retrieve an instance of InstantClient by using {@link Instance#connectedClients}.
 * @summary A single Instant connection.
 * @hideconstructor
 * @public
 * @server
 */
export declare class InstantClient {
  /**
   * A unique ID string for every connected client. It does not persist across client reconnects.
   *
   * @server
   * */
  readonly clientId: string;
  /**
   * A user ID of the client. This ID is supplied by your backend. If the value is `null`, the client is considered anonymous.
   *
   * @server
   * */
  userId: string | null | undefined;
}

/** @inline */
declare type InstantID = string;

declare type InstantID_2 = InstantID;

export declare interface InstantJSON extends SerializedJSON {
  format: 'https://pspdfkit.com/instant-json/v1';
  pdfId?: {
    permanent: string;
    changing: string;
  };
}

/**
 * Controls the current interaction mode in the viewer.
 *
 * @enum
 */
declare const InteractionMode: {
  /** When this mode is activated, the creation of new highlight annotations will be enabled and the text will be highlighted as it's selected. */
  readonly TEXT_HIGHLIGHTER: "TEXT_HIGHLIGHTER";
  /** When this mode is activated, the creation of new ink annotations will be enabled. This transforms the page to a drawable canvas and an annotation is created while drawing on it. If properties (e.g. color) or the page index changes, a new annotation is created. */
  readonly INK: "INK";
  /** When this mode is activated, the creation of new ink signatures will be enabled. This shows a dialog where it is possible to select an existing ink signature or create a new one and store it. */
  readonly INK_SIGNATURE: "INK_SIGNATURE";
  /** When this mode is activated, the creation of new signatures will be enabled. This shows a dialog where it is possible to select an existing signature or create a new one and potentially save it. */
  readonly SIGNATURE: "SIGNATURE";
  /** When this mode is activated, the stamp annotation templates picker modal UI will be shown. Once a template is selected, the new annotation is configured and created\ in the document. */
  readonly STAMP_PICKER: "STAMP_PICKER";
  /** When this mode is activated, the custom stamp annotation template editor modal UI will be shown. Once a the custom template is edited, the new custom stamp annotation will be created in the document. */
  readonly STAMP_CUSTOM: "STAMP_CUSTOM";
  /** When this mode is activated, the creation of new line annotations will be enabled. This transforms the page to a drawable canvas and an annotation is created while drawing on it. */
  readonly SHAPE_LINE: "SHAPE_LINE";
  /** When this mode is activated, the creation of new rectangle annotations will be enabled. This transforms the page to a drawable canvas and an annotation is created while drawing on it. */
  readonly SHAPE_RECTANGLE: "SHAPE_RECTANGLE";
  /** When this mode is activated, the creation of new ellipse annotations will be enabled. This transforms the page to a drawable canvas and an annotation is created while drawing on it. If properties (e.g. color) or the page index changes, a new annotation is created. */
  readonly SHAPE_ELLIPSE: "SHAPE_ELLIPSE";
  /** When this mode is activated, the creation of new polygon annotations will be enabled. This transforms the page to a drawable canvas and an annotation is created while drawing on it. If properties (e.g. color) or the page index changes, a new annotation is created. */
  readonly SHAPE_POLYGON: "SHAPE_POLYGON";
  /** When this mode is activated, the creation of new polyline annotations will be enabled. This transforms the page to a drawable canvas and an annotation is created while drawing on it. If properties (e.g. color) or the page index changes, a new annotation is created. */
  readonly SHAPE_POLYLINE: "SHAPE_POLYLINE";
  /** When this mode is activated, removing of current ink annotation points will be enabled. This transforms the page to a canvas where the cursor can remove ink annotation points by hand, as well as choose the cursor width. */
  readonly INK_ERASER: "INK_ERASER";
  /** When this mode is activated, the creation of new note annotations will be enabled. This transforms the page to a clickable area where the annotation will be created at the position of the click. */
  readonly NOTE: "NOTE";
  /** When this mode is activated, the creation of new comment marker annotations will be enabled. This transforms the page to a clickable area where the annotation will be created at the position of the click. */
  readonly COMMENT_MARKER: "COMMENT_MARKER";
  /** When this mode is activated, the creation of new text annotations will be enabled. This transforms the page to a clickable area where the annotation will be created at the position of the click. */
  readonly TEXT: "TEXT";
  /** When this mode is activated, the creation of new callout annotations will be enabled. This transforms the page to a clickable area where the annotation will be created at the position of the click. */
  readonly CALLOUT: "CALLOUT";
  /** This enables the pan tool to allow the user to navigate on a desktop browser using mouse dragging. This will disable text selection. */
  readonly PAN: "PAN";
  /** Enables the search mode and focuses the search input field. */
  readonly SEARCH: "SEARCH";
  /** This shows the document editor modal. */
  readonly DOCUMENT_EDITOR: "DOCUMENT_EDITOR";
  /** This enables the Marquee Zoom tool. When enabled, you can draw a rectangle on the screen which is zoomed into and scrolled to, once the pointer is released. */
  readonly MARQUEE_ZOOM: "MARQUEE_ZOOM";
  /** When this mode is activated, the creation of new redaction annotations will be enabled by highlighting regions of text and the text will be marked for redaction as it's selected. */
  readonly REDACT_TEXT_HIGHLIGHTER: "REDACT_TEXT_HIGHLIGHTER";
  /** When this mode is activated, the creation of new redaction annotations will be enabled by drawing rectangles on the pages. This transforms the page to a drawable canvas and annotations are created while drawing on it. */
  readonly REDACT_SHAPE_RECTANGLE: "REDACT_SHAPE_RECTANGLE";
  /** When this mode is activated, the creation of cropping area selection is enabled. */
  readonly DOCUMENT_CROP: "DOCUMENT_CROP";
  /** When this mode is activated, the creation of button widget annotations is enabled. */
  readonly BUTTON_WIDGET: "BUTTON_WIDGET";
  /** When this mode is activated, the creation of text widget annotations is enabled. */
  readonly TEXT_WIDGET: "TEXT_WIDGET";
  /** When this mode is activated, the creation of radio button widget annotations is enabled. */
  readonly RADIO_BUTTON_WIDGET: "RADIO_BUTTON_WIDGET";
  /** When this mode is activated, the creation of checkbox widget annotations is enabled. */
  readonly CHECKBOX_WIDGET: "CHECKBOX_WIDGET";
  /** When this mode is activated, the creation of combo box widget annotations is enabled. */
  readonly COMBO_BOX_WIDGET: "COMBO_BOX_WIDGET";
  /** When this mode is activated, the creation of list box widget annotations is enabled. */
  readonly LIST_BOX_WIDGET: "LIST_BOX_WIDGET";
  /** When this mode is activated, the creation of signature widget annotations is enabled. */
  readonly SIGNATURE_WIDGET: "SIGNATURE_WIDGET";
  /** When this mode is activated, the creation of date widget annotations is enabled. */
  readonly DATE_WIDGET: "DATE_WIDGET";
  /** When this mode is activated, you will be able to edit and create widget annotations. */
  readonly FORM_CREATOR: "FORM_CREATOR";
  /** When this mode is activated, you will be able to create link annotations. */
  readonly LINK: "LINK";
  /** When this mode is activated, you will be able to create distance annotations. This transforms the page to a drawable canvas and an annotation is created while drawing on it. */
  readonly DISTANCE: "DISTANCE";
  /** When this mode is activated, you will be able to create perimeter annotations. This transforms the page to a drawable canvas and an annotation is created while drawing on it. */
  readonly PERIMETER: "PERIMETER";
  /** When this mode is activated, you will be able to create Rectangle Area annotations. This transforms the page to a drawable canvas and an annotation is created while drawing on it. */
  readonly RECTANGLE_AREA: "RECTANGLE_AREA";
  /** When this mode is activated, you will be able to create Ellipse Area annotations. This transforms the page to a drawable canvas and an annotation is created while drawing on it. */
  readonly ELLIPSE_AREA: "ELLIPSE_AREA";
  /** When this mode is activated, you will be able to create Polygon Area annotations. This transforms the page to a drawable canvas and an annotation is created while drawing on it. */
  readonly POLYGON_AREA: "POLYGON_AREA";
  /** Available only in Standalone mode with the content editor license: when this mode is activated, you will be able to edit the page contents. */
  readonly CONTENT_EDITOR: "CONTENT_EDITOR";
  /** When this mode is activated, multiple annotations can be selected with the UI. */
  readonly MULTI_ANNOTATIONS_SELECTION: "MULTI_ANNOTATIONS_SELECTION";
  /** Available only with the measurement license: when this mode is activated, the measurement annotations mode will be activated. */
  readonly MEASUREMENT: "MEASUREMENT";
  /** Available only with the measurement license: when this mode is activated, the measurement settings mode will be activated. */
  readonly MEASUREMENT_SETTINGS: "MEASUREMENT_SETTINGS";
  /** When this mode is activated, the attachment preview mode will be activated. */
  readonly ATTACHMENT_PREVIEW: "ATTACHMENT_PREVIEW";
};

export declare type Interfaces = Record<string, string>;

declare type Intersection<T, U> = T extends U ? T : never;

/** @inline */
declare type IObject = Record<string, any>;

/** @inline */
declare type IPermissions = {
  edit: boolean;
  delete: boolean;
  setGroup: boolean;
  fill?: boolean;
  reply?: boolean;
};

/** @inline */
declare interface IPolygonAnnotation extends IShapeAnnotation {
  points: List<Point> | null;
  cloudyBorderIntensity: number | null;
}

/** @inline */
declare interface IPolyLineAnnotation extends IShapeAnnotation {
  points: List<Point> | null;
  lineCaps: LineCapsType | null;
}

/** @inline */
declare type IPrintMode = (typeof PrintMode)[keyof typeof PrintMode];

/** @inline */
declare type IPrintQuality = (typeof PrintQuality)[keyof typeof PrintQuality];

/** @inline */
declare type IProcessorEngine = (typeof ProcessorEngine)[keyof typeof ProcessorEngine];

/** @inline */
declare type IProductId = (typeof ProductId)[keyof typeof ProductId];

/** @inline */
declare interface IRect {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
}

/** @inline */
declare interface IRectangleAnnotation extends IShapeAnnotation {
  cloudyBorderIntensity?: number | null;
  cloudyBorderInset?: Inset | null;
}

/** @inline */
declare type IRectJSON = [left: number, top: number, width: number, height: number];

/** @inline */
declare interface IRedactionAnnotation extends ITextMarkupAnnotation {
  color: Color;
  fillColor: null | Color;
  overlayText: null | string;
  repeatOverlayText: null | boolean;
  outlineColor: null | Color;
}

/** @inline */
declare interface IResetFormAction extends ActionProperties {
  fields?: List<string> | null | undefined;
  includeExclude?: boolean;
}

/**
 * Value equality check with semantics similar to `Object.is`, but treats
 * Immutable `Collection`s as values, equal if the second `Collection` includes
 * equivalent values.
 *
 * It's used throughout Immutable when checking for equality, including `Map`
 * key equality and `Set` membership.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { Map, is } = require('immutable')
 * const map1 = Map({ a: 1, b: 1, c: 1 })
 * const map2 = Map({ a: 1, b: 1, c: 1 })
 * assert.equal(map1 !== map2, true)
 * assert.equal(Object.is(map1, map2), false)
 * assert.equal(is(map1, map2), true)
 * ```
 *
 * `is()` compares primitive types like strings and numbers, Immutable.js
 * collections like `Map` and `List`, but also any custom object which
 * implements `ValueObject` by providing `equals()` and `hashCode()` methods.
 *
 * Note: Unlike `Object.is`, `Immutable.is` assumes `0` and `-0` are the same
 * value, matching the behavior of ES6 Map key equality.
 */
declare function is(first: any, second: any): boolean;

/**
 * Type guard to determine if a result is an AIDocumentAnalysisResult
 * This helper checks if the result comes from an "analyze" operation (AIADocumentChangesAnalysisResponse).
 *
 * @param result - The result to check
 * @returns Whether the result is an AI document analysis result
 * @example
 * if (NutrientViewer.isAIDocumentAnalysisResult(result)) {
 *   console.log('AI Summary:', result.summary);
 *   console.log('Categories:', result.categories);
 * }
 */
declare function isAIDocumentAnalysisResult(result: DocumentComparison.DocumentComparisonResult | AIDocumentComparisonResult): result is AIADocumentChangesAnalysisResponse;

/**
 * Type guard to determine if a result is an AIDocumentComparisonResult
 * This helper checks if the result comes from any AI-powered comparison operation
 * (either "analyze" or "tag" operation types).
 *
 * @param result - The result to check
 * @returns Whether the result is an AI document comparison result
 * @example
 * if (NutrientViewer.isAIDocumentComparisonResult(result)) {
 *   // Result is from AI comparison - could be analysis or tagging
 *   if (NutrientViewer.isAIDocumentAnalysisResult(result)) {
 *     console.log('AI Analysis Result:', result.summary);
 *   } else if (NutrientViewer.isAIDocumentTaggingResult(result)) {
 *     console.log('AI Tagging Result:', result.references);
 *   }
 * }
 */
declare function isAIDocumentComparisonResult(result: DocumentComparison.DocumentComparisonResult | AIDocumentComparisonResult): result is AIDocumentComparisonResult;

/**
 * Type guard to determine if a result is an AIDocumentTaggingResult
 * Checks if the result is from a "tag" operation (AIADocumentChangesTaggingResponse).
 *
 * @param result - The result to check
 * @returns Whether the result is an AI document tagging result
 * @example
 * if (NutrientViewer.isAIDocumentTaggingResult(result)) {
 *   console.log('Tagged references:', result.references);
 * }
 */
declare function isAIDocumentTaggingResult(result: unknown): result is AIADocumentChangesTaggingResponse;

/**
 * True if `maybeAssociative` is either a Keyed or Indexed Collection.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { isAssociative, Map, List, Stack, Set } = require('immutable');
 * isAssociative([]); // false
 * isAssociative({}); // false
 * isAssociative(Map()); // true
 * isAssociative(List()); // true
 * isAssociative(Stack()); // true
 * isAssociative(Set()); // false
 * ```
 */
declare function isAssociative(maybeAssociative: any): maybeAssociative is Collection.Keyed<any, any> | Collection.Indexed<any>;

/**
 * True if `maybeCollection` is a Collection, or any of its subclasses.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { isCollection, Map, List, Stack } = require('immutable');
 * isCollection([]); // false
 * isCollection({}); // false
 * isCollection(Map()); // true
 * isCollection(List()); // true
 * isCollection(Stack()); // true
 * ```
 */
declare function isCollection(maybeCollection: any): maybeCollection is Collection<any, any>;

/** @inline */
declare type IScrollMode = (typeof ScrollMode)[keyof typeof ScrollMode];

/** @inline */
declare type ISearchPattern = (typeof SearchPattern)[keyof typeof SearchPattern];

/** @inline */
declare type ISearchType = (typeof SearchType)[keyof typeof SearchType];

/**
 * This callback defines which annotations are read-only. This callback will receive the Annotation
 * a user wants to modify and by returning `true` or `false` you can define if the annotation should
 * be read-only (`false`) or modifiable (`true`).
 *
 * For more information, see {@link Configuration#isEditableAnnotation}.
 *
 * @public
 * @param annotation - The annotation.
 * @example
 * Only allow the modification of annotations from the same author
 * ```ts
 * NutrientViewer.load({
 *   isEditableAnnotation: function(annotation) {
 *     return annotation.creatorName === myCurrentUser.name;
 *   },
 * });
 * ```
 *

 */
export declare type IsEditableAnnotationCallback = (annotation: AnnotationsUnion) => boolean;

/**
 * This callback can be run on individual comments to detect whether the comment
 * can be edited based on its returned boolean.
 *
 * For more information, see {@link Configuration#isEditableComment}
 *
 * @public
 * @param comment - The comment.
 * @example
 * Only allow the modification of comment from the same author.
 * ```ts
 * NutrientViewer.load({
 *   isEditableComment: function(comment) {
 *     return comment.creatorName === myCurrentUser.name;
 *   },
 * });
 * ```
 *

 */
export declare type IsEditableCommentCallback = (comment: Comment_2) => boolean;

/** @inline */
declare interface IShapeAnnotation extends AnnotationProperties {
  strokeDashArray: [number, number] | null;
  strokeWidth: number | null;
  strokeColor: Color | null;
  fillColor: Color | null;
  measurementScale: MeasurementScale | null;
  measurementPrecision: IMeasurementPrecision | null;
}

/** @inline */
declare type IShowSignatureValidationStatusMode = (typeof ShowSignatureValidationStatusMode)[keyof typeof ShowSignatureValidationStatusMode];

/** @inline */
declare type ISidebarMode = (typeof SidebarMode)[keyof typeof SidebarMode] | (string & {});

/** @inline */
declare type ISidebarPlacement = (typeof SidebarPlacement)[keyof typeof SidebarPlacement];

/** @inline */
declare type ISignatureAppearanceMode = (typeof SignatureAppearanceMode)[keyof typeof SignatureAppearanceMode];

/** @inline */
declare type ISignatureSaveMode = (typeof SignatureSaveMode)[keyof typeof SignatureSaveMode];

/**
 * True if `maybeImmutable` is an Immutable Collection or Record.
 *
 * Note: Still returns true even if the collections is within a `withMutations()`.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { isImmutable, Map, List, Stack } = require('immutable');
 * isImmutable([]); // false
 * isImmutable({}); // false
 * isImmutable(Map()); // true
 * isImmutable(List()); // true
 * isImmutable(Stack()); // true
 * isImmutable(Map().asMutable()); // true
 * ```
 */
declare function isImmutable(maybeImmutable: any): maybeImmutable is Collection<any, any>;

/**
 * True if `maybeIndexed` is a Collection.Indexed, or any of its subclasses.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { isIndexed, Map, List, Stack, Set } = require('immutable');
 * isIndexed([]); // false
 * isIndexed({}); // false
 * isIndexed(Map()); // false
 * isIndexed(List()); // true
 * isIndexed(Stack()); // true
 * isIndexed(Set()); // false
 * ```
 */
declare function isIndexed(maybeIndexed: any): maybeIndexed is Collection.Indexed<any>;

/**
 * True if `maybeKeyed` is a Collection.Keyed, or any of its subclasses.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { isKeyed, Map, List, Stack } = require('immutable');
 * isKeyed([]); // false
 * isKeyed({}); // false
 * isKeyed(Map()); // true
 * isKeyed(List()); // false
 * isKeyed(Stack()); // false
 * ```
 */
declare function isKeyed(maybeKeyed: any): maybeKeyed is Collection.Keyed<any, any>;

/**
 * True if `maybeList` is a List.
 */
declare function isList(maybeList: any): maybeList is List<any>;

/**
 * True if `maybeMap` is a Map.
 *
 * Also true for OrderedMaps.
 */
declare function isMap(maybeMap: any): maybeMap is Map_2<any, any>;

/**
 * True if `maybeOrdered` is a Collection where iteration order is well
 * defined. True for Collection.Indexed as well as OrderedMap and OrderedSet.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { isOrdered, Map, OrderedMap, List, Set } = require('immutable');
 * isOrdered([]); // false
 * isOrdered({}); // false
 * isOrdered(Map()); // false
 * isOrdered(OrderedMap()); // true
 * isOrdered(List()); // true
 * isOrdered(Set()); // false
 * ```
 */
declare function isOrdered(maybeOrdered: any): boolean;

/**
 * True if `maybeOrderedMap` is an OrderedMap.
 */
declare function isOrderedMap(maybeOrderedMap: any): maybeOrderedMap is OrderedMap<any, any>;

/**
 * True if `maybeOrderedSet` is an OrderedSet.
 */
declare function isOrderedSet(maybeOrderedSet: any): maybeOrderedSet is OrderedSet<any>;

/** @inline */
declare interface ISquiggleAnnotation extends ITextMarkupAnnotation {
  color: Color;
}

/**
 * True if `maybeRecord` is a Record.
 */
declare function isRecord(maybeRecord: any): maybeRecord is Record_2<any>;

/**
 * True if `maybeSeq` is a Seq.
 */
declare function isSeq(maybeSeq: any): maybeSeq is Seq.Indexed<any> | Seq.Keyed<any, any> | Seq.Set<any>;

/**
 * True if `maybeSet` is a Set.
 *
 * Also true for OrderedSets.
 */
declare function isSet(maybeSet: any): maybeSet is Set_2<any>;

/**
 * True if `maybeStack` is a Stack.
 */
declare function isStack(maybeStack: any): maybeStack is Stack<any>;

/** @inline */
declare interface IStampAnnotation extends AnnotationProperties {
  stampType: string | StampKind | null;
  title: string | null;
  subtitle: string | null;
  color: Color | null;
  xfdfAppearanceStream: string | null;
  xfdfAppearanceStreamOriginalPageRotation: number | null;
}

/** @inline */
declare interface IStrikeOutAnnotation extends ITextMarkupAnnotation {
  color: Color;
}

/** @inline */
declare interface ISubmitFormAction extends ActionProperties {
  uri?: string;
  fields?: List<string>;
  includeExclude?: boolean;
  includeNoValueFields?: boolean;
  exportFormat?: boolean;
  getMethod?: boolean;
  submitCoordinated?: boolean;
  xfdf?: boolean;
  includeAppendSaves?: boolean;
  includeAnnotations?: boolean;
  submitPDF?: boolean;
  canonicalFormat?: boolean;
  excludeNonUserAnnotations?: boolean;
  excludeFKey?: boolean;
  embedForm?: boolean;
}

/**
 * True if `maybeValue` is a JavaScript Object which has *both* `equals()`
 * and `hashCode()` methods.
 *
 * Any two instances of *value objects* can be compared for value equality with
 * `Immutable.is()` and can be used as keys in a `Map` or members in a `Set`.
 */
declare function isValueObject(maybeValue: any): maybeValue is ValueObject;

declare type ItemCustomRenderer = (itemRendererProps: ItemRendererProps) => void;

declare type ItemRendererProps = {
  itemContainerNode: Node;
  item: any;
};

/** @inline */
declare interface ITextAnnotation extends AnnotationProperties {
  text: {
    format: 'plain' | 'xhtml';
    value: string | null;
  };
  fontColor: Color | null;
  backgroundColor: Color | null;
  font: string;
  fontSize: number | null;
  isBold: boolean | null;
  isItalic: boolean | null;
  isUnderline: boolean | null;
  horizontalAlign: 'left' | 'center' | 'right';
  verticalAlign: 'top' | 'center' | 'bottom';
  callout: Callout | null;
  borderStyle: IBorderStyle | null;
  borderWidth: number | null;
  borderColor: Color | null;
  isFitting: boolean;
  lineHeightFactor: number | null;
}

/** @inline */
declare interface ITextComparisonOperationOptions extends IComparisonOperationOptions {
  numberOfContextWords?: number;
  wordLevel?: boolean;
}

/** @inline */
declare interface ITextLine {
  /** An ID that is unique inside one page to reference the text line across the document. */
  id: number | null;
  /**
   * The page index on which the text line is placed.
   *
   * `pageIndex` is zero-based and has a maximum value of `totalPageCount - 1`.
   */
  pageIndex: number | null;
  /** Position of this text line on the page. */
  boundingBox: Rect;
  /**
   * Content of the text line.
   *
   * Text lines end with CRLF (`\r\n`).
   */
  contents: string;
  /** Hints for the text line. */
  hints: Hints | null;
}

/** @inline */
declare interface ITextMarkupAnnotation extends AnnotationProperties {
  rects: List<Rect>;
  color: Color;
  blendMode: IBlendMode;
}

/** @inline */
declare interface ITextRange {
  startNode: Text | null;
  startOffset: number | null;
  endNode: Text | null;
  endOffset: number | null;
}

/** @inline */
declare interface ITextSelection {
  startNestedContentBlockId: string | null;
  startTextLineId: number | null;
  startPageIndex: number | null;
  startNode: Text | null;
  startOffset: number | null;
  endNestedContentBlockId: string | null;
  endTextLineId: number | null;
  endPageIndex: number | null;
  endNode: Text | null;
  endOffset: number | null;
  getText: (() => Promise<string>) | null;
  getSelectedTextLines: (() => Promise<List<TextLine>>) | null;
  getBoundingClientRect: (() => Promise<Rect | null>) | null;
  getSelectedRectsPerPage: (() => Promise<List<{
    pageIndex: number;
    rects: List<Rect>;
  }>>) | null;
}

/** @inline */
declare interface ITextSelection_2 {
  textRange: TextRange | null;
  startTextLineId: number | null;
  endTextLineId: number | null;
  startNestedContentBlockId: string | null;
  endNestedContentBlockId: string | null;
  startPageIndex: number | null;
  endPageIndex: number | null;
}

/** @inline */
declare type ITheme = (typeof Theme)[keyof typeof Theme];

/** @inline */
declare type IToolbarPlacement = (typeof ToolbarPlacement)[keyof typeof ToolbarPlacement];

/** @inline */
declare type IUIDateTimeElement = (typeof UIDateTimeElement)[keyof typeof UIDateTimeElement];

/** @inline */
declare type IUIElement = (typeof UIElement)[keyof typeof UIElement];

/** @inline */
declare interface IUnderlineAnnotation extends ITextMarkupAnnotation {
  color: Color;
}

/** @inline */
declare interface IURIAction extends ActionProperties {
  uri?: string;
}

/** @inline */
declare interface IViewState {
  /**
   * Control whether or not the printing button in the toolbar should be disabled. If the user has
   * insufficient permissions, the feature will automatically be disabled.
   *
   * This feature requires the `download` permission in the JWT, because on some browsers we have to
   * fall back to downloading the PDF in order to allow performant printing.
   *
   * It is possible to remove the print button with the {@link Instance#setToolbarItems Toolbar API}.
   *
   * @default true
   */
  allowPrinting: boolean;
  /**
   * Control whether or not the export PDF button in the toolbar should be disabled. If the user has
   * insufficient permissions, the feature will automatically be disabled.
   *
   * This feature requires the `download` permission in the JWT.
   *
   * It is possible to remove the export PDF button with the {@link Instance#setToolbarItems Toolbar API}.
   *
   * @default true
   */
  allowExport: boolean;
  /**
   * The page index of the page that's currently visible. If there is more than one page visible
   * this will return the page that is using the most space in the viewport. The `pageIndex` is
   * zero-based and has a maximum value of `totalPageCount - 1`.
   *
   * @default 0
   */
  currentPageIndex: number;
  /**
   * An optional reference to a mounted {@link Instance}. This is required to call the
   * following methods on {@link ViewState}:
   *
   * - `{@link ViewState#zoomIn}`
   * - `{@link ViewState#zoomOut}`
   * - `{@link ViewState#nextZoomLevel}`
   */
  instance: Instance | null;
  /**
   * Controls the current interaction mode in the viewer. When this value is changed, we will make
   * sure that the state is properly transformed.
   *
   * If, for example, the user is currently creating an ink annotation and you change this value to
   * `InteractionMode.TEXT`, we will delete the current in-memory ink annotation.
   *
   * For a list of all available mode, please refer to {@link InteractionMode}.
   *
   * If this value is null, no interaction mode will be enabled. This corresponds to the default
   * mode that allows text selection and scrolling using the mouse wheel or scrollbars (and panning
   * on mobile devices).
   *
   * @example
   *  instance.setViewState(viewState => (
   *    viewState.set("interactionMode", NutrientViewer.InteractionMode.PAN)
   *  ));
   *
   * @default null
   */
  interactionMode: IInteractionMode | null;
  /**
   * When this is enabled, the first spread will always show a single page, even when
   * {@link LayoutMode.DOUBLE} is enabled. This is useful for magazines that want to show
   * a cover page before the regular content starts.
   *
   * A spread is a container for either one or two pages, based on the configured
   * {@link ViewState#layoutMode}.
   *
   * @default false
   */
  keepFirstSpreadAsSinglePage: boolean;
  /**
   * Controls how pages inside a view are displayed.
   *
   * @default {@link LayoutMode | LayoutMode.SINGLE}
   */
  layoutMode: ILayoutMode;
  /**
   * The spacing between pages in pixels. This value will adjust to the current zoom level, so when
   * you zoom in, it does not appear fixed to the viewport. This spacing only applies for
   * {@link LayoutMode.DOUBLE}.
   *
   * @default 0
   */
  pageSpacing: number;
  /**
   * The current rotation of all pages. The value is in degrees and describes a clockwise rotation.
   *
   * Can either be 0°, 90°, 180°, or 270°. Negative values and values above 270 are normalized to one of the
   * valid rotations.
   *
   * When a page rotation is set, the values are not persisted in the PDF. This setting only affects
   * how the PDF is viewed in the application.
   *
   * @example
   * instance.setViewState(viewState => viewState.set("pagesRotation", -450))
   * // ... later
   * instance.viewState.pagesRotation; // => 270
   *
   * @default 0
   */
  pagesRotation: Rotation;
  /**
   * When the read only mode is activated, the UI for creating, updating and deleting annotations
   * will be completely hidden. In addition, the user will also no longer be able to select
   * annotations or modify form field values.
   *
   * However, it is still possible to add annotations programmatically.
   *
   * If a read only mode is specified within the JWT itself or in the PDF document permissions,
   * and {@link NutrientViewer.Options.IGNORE_DOCUMENT_PERMISSIONS} is not set, this option cannot be unset.
   *
   * @default false
   */
  readOnly: boolean;
  /**
   * Controls how pages can be scrolled.
   *
   * @default {@link ScrollMode.CONTINUOUS}
   */
  scrollMode: IScrollMode;
  /**
   * When this is set to false, annotations will no longer be rendered.
   *
   * This option can also be set to `false`, when {@link NutrientViewer.ViewState#readOnly} mode is enabled.
   *
   * @default true
   */
  showAnnotations: boolean;
  /**
   * When this is set to false, comments will no longer be rendered.
   *
   * NutrientViewer ignores this value when you haven't purchased the comments component.
   *
   * @default true
   */
  showComments: boolean;
  /**
   * When this is set to false, annotation notes will no longer be rendered.
   *
   * @default true
   */
  showAnnotationNotes: boolean;
  /**
   * Set this to `true` if you want a toolbar for navigation and annotation controls or `false`
   * if you don't.
   *
   * @default true
   */
  showToolbar: boolean;
  /**
   * Set this to `false` if you want NutrientViewer to disable the annotation toolbar when an annotation is being created or modified.
   *
   * @default true
   */
  enableAnnotationToolbar: boolean;
  /**
   * Controls the current sidebar mode in the viewer.
   *
   * For a list of all available mode, please refer to {@link SidebarMode}. This can also be set to a custom sidebar ID corresponding to a sidebar passed in `ui.sidebar`.
   *
   * If this value is null, the sidebar is hidden. This corresponds to the default
   * mode.
   *
   * @example
   * instance.setViewState(viewState => (
   *   viewState.set("sidebarMode", NutrientViewer.SidebarMode.THUMBNAILS)
   * ));
   *
   * @default null
   */
  sidebarMode: ISidebarMode | null | undefined;
  /**
   * Defines specific options that affect each individual sidebar.
   *
   * For a list of all available options, please refer to {@link SidebarOptions}.
   *
   * @example
   * instance.setViewState(viewState => (
   *   viewState.set("sidebarOptions",  {
   *       [NutrientViewer.SidebarMode.ANNOTATIONS]: {
   *         includeContent: [NutrientViewer.Annotations.TextAnnotation, NutrientViewer.Annotations.HighlightAnnotation]
   *       }
   *     })
   * ));
   */
  sidebarOptions: SidebarOptions<AnnotationsSidebarOptions> | SidebarOptions<LayersSidebarOptions> | SidebarOptions<AttachmentsSidebarOptions> | IObject;
  /**
   * Controls the current sidebar placement in the viewer.
   *
   * @example
   * instance.setViewState(viewState => (
   *   viewState.set("sidebarPlacement", NutrientViewer.SidebarPlacement.END)
   * ));
   *
   * @default null
   */
  sidebarPlacement: ISidebarPlacement;
  /**
   * The spacing between spreads in pixels. This value will adjust to the current zoom level, so when
   * you zoom in, it does not appear fixed to the viewport. This spacing only applies for
   * {@link ScrollMode.CONTINUOUS}.
   *
   * A spread is a container for either one or two pages, based on the configured
   * {@link ViewState#layoutMode}.
   *
   * @default 20
   */
  spreadSpacing: number;
  /**
   * The padding between the viewport and the document in pixels. This value will not increase, when
   * you zoom in.
   *
   * The `horizontal` value will be used as `padding-left` and `padding-right` and the `vertical`
   * value for `padding-top` and `padding-bottom`. The same value for both sides will be used, this
   * means that `horizontal: 20` is equal to `padding-left: 20px; padding-right: 20px;`.
   *
   * When you set those values to zero, there will be no space between the viewport and the
   * document.
   *
   * @default { horizontal: 20, vertical: 20 }
   */
  viewportPadding: ViewportPadding;
  /**
   * Controls the current zoom factor. This could either be a number multiplier or a
   * {@link ZoomConfiguration} or a {@link ZoomMode}.
   *
   * If a number value is used, it must be between {@link Instance#minimumZoomLevel} and
   * {@link Instance#maximumZoomLevel}.
   *
   * Note: Using a {@link ZoomMode}} will override the padding set using {@link ViewState#viewportPadding}
   *
   * @default
   * {
   *   zoomMode: NutrientViewer.ZoomMode.AUTO,
   *   wheelZoomMode: NutrientViewer.WheelZoomMode.WITH_CTRL,
   *   options: {
   *     enableKeyboardZoom: true,
   *     enableGestureZoom: true,
   *   },
   * }
   */
  zoom: ZoomConfiguration | IZoomMode | number;
  /**
   * Controls how comments are displayed in the viewer in desktop and tablet modes. In mobile devices, comments are always displayed in a drawer a the bottom of the viewport:
   *
   * - NutrientViewer.CommentDisplay.FITTING: Comments are displayed in a dialog or floating depending on the available viewport space. This is the default value.
   * - NutrientViewer.CommentDisplay.POPOVER: Comments are displayed in a dialog next to their reference annotation marker.
   * - NutrientViewer.CommentDisplay.FLOATING: Comments are displayed floating next to the page side, at the same height as their reference annotation marker, except when {@link ViewState#zoom} is set to .ZoomeMode#FIT_TO_WIDTH`, in which case they are displayed in a popover dialog instead.
   *
   * @default {@link CommentDisplay#FITTING}
   */
  commentDisplay: ICommentDisplay;
  /**
   * Controls the zoom step when zooming in or out using the toolbar buttons.
   *
   * @default 1.25
   * @example
   * instance.setViewState(viewState => (
   *   viewState.set("zoomStep", 1.1)
   * ));
   */
  zoomStep: number;
  /**
   * This flag controls what kind of UI interaction is active for widget
   * annotations.
   *
   * - When set to `false`, (default), clicking on a widget annotation will allow
   * to modify its value.
   * - When set to `true`, clicking on a widget annotation will select it and
   * allow moving, resizing and deleting it using the annotation toolbar.
   *
   * This flag can only be set to `true` if the Form Creator component is included
   * in the license and the current backend supports it.
   *
   * @example
   *  instance.setViewState(viewState => (
   *    viewState.set("formDesignMode", true)
   *  ));
   *
   * @default false
   */
  formDesignMode: boolean;
  /**
   * Controls when the digital signature validation UI will be shown.
   *
   * @example
   * instance.setViewState(viewState => (
   *   viewState.set("showSignatureValidationStatus", NutrientViewer.ShowSignatureValidationStatusMode.IF_SIGNED)
   * ));
   *
   * @default {@link ShowSignatureValidationStatusMode | ShowSignatureValidationStatusMode.NEVER}
   */
  showSignatureValidationStatus: IShowSignatureValidationStatusMode;
  /**
   * This flag controls whether to show the marked state or redacted state for
   * redaction annotations.
   *
   * - When set to `false`, (default), the marked state of redaction annotations
   * will be shown.
   * - When set to `true`, the redacted state of redaction annotations will be used.
   *
   * This flag can only be set to `true` if the Redactions component is included
   * in the license.
   *
   * @example
   *  instance.setViewState(viewState => (
   *    viewState.set("previewRedactionMode", true)
   *  ));
   *
   * @default false
   */
  previewRedactionMode: boolean;
  /**
   * This flag controls whether to enable/disable finger scrolling during
   * Ink Drawing using a pen (safari only)
   *
   * - When set to `false`, (default), scrolling with the finger in drawing mode
   * is disabled.
   * - When set to `true`, once a pen input has been detected, finger input will result in scrolling
   * the document.
   *
   * @example
   *  instance.setViewState(viewState => (
   *    viewState.set("canScrollWhileDrawing", true)
   *  ));
   *
   * @default false
   */
  canScrollWhileDrawing: boolean;
  /**
   * This flag controls whether a selected tool should maintain its selected state after an
   * annotation is created
   *
   * - When set to `false`, (default), after an annotation has been created the tool is not
   * selected anymore.
   * - When set to `true`, the tool used to create the annotation will still be selected
   * and so it'll be possible to keep adding annotations.
   *
   * This feature is available for Note Annotation, Text Annotation, Redaction Annotation, Shape Annotation and Comments. Ink Annotation behaves like this by default, the ink tool stays selected until its deselected either programmatically or via the UI.
   *
   * @example
   *  instance.setViewState(viewState => (
   *    viewState.set("keepSelectedTool", true)
   *  ));
   *
   * @default false
   */
  keepSelectedTool: boolean;
  /**
   * When in {@link LayoutMode.AUTO} mode, this property is set to the actual rendered layout mode,
   * which can either be {@link LayoutMode.SINGLE} or {@link LayoutMode.DOUBLE}.
   * It can be used to be notified when the layout mode changes while still being in {@link LayoutMode.AUTO} mode: if the rendered layout mode changes while in NutrientViewer.LayoutMode.AUTO (because of user UI
   * interactions, for example), the viewState.change event will be dispatched, and this property will hold the
   * updated value.
   *
   * @example
   *  instance.addEventListener("viewState.change", (viewState) => {
   * console.log(viewState.resolvedLayoutMode);
   * });
   */
  resolvedLayoutMode: ILayoutMode;
  /**
   * Controls the width of the sidebar in client, pixel units. Changing the `ViewState.sidebarMode` does not affect this value.
   *
   * The default value depends on the current viewport width: if the viewport width is less than 768px,
   * the sidebar will take 100% of the viewport width by default. If the viewport width is greater, the sidebar will take 300px by default.
   *
   * @example
   * instance.setViewState(viewState => (
   *   viewState.set("sidebarWidth", 400)
   * ));
   */
  sidebarWidth: number;
  /**
   * Snapping to the nearest point is enabled by default in ur SDK for measurement tools. It can be disabled by this API.
   *
   * @default false
   * @example
   * instance.setViewState(viewState =>
   *   viewState.set("disablePointSnapping", true)
   * );
   */
  disablePointSnapping: boolean;



















  forceRenderWidgetsInAnnotationsOrder: boolean;
  /**
   * Number of page spreads to prerender.
   *
   * Apart from the current page, Nutrient Web SDK prerenders a specific number of page spreads before and after the current page
   * to improve the user experience when scrolling through the document.
   *
   * A page spread is a container for either one or two pages, based on the configured layout mode. The number of prerendered page
   * spreads is set to 5 by default, which means that Nutrient Web SDK will prerender 5 page spreads before and after the current page.
   *
   * If set to `null`, all the page spreads in the document will be prerendered. This setting is not recommended for large documents, as it may
   * lead to performance issues.
   *
   * @example
   * // Prerender 10 page spreads
   * instance.setViewState(viewState =>
   *  viewState.set("prerenderedPageSpreads", 10)
   * );
   * // Prerender all page spreads
   * instance.setViewState(viewState =>
   *  viewState.set("prerenderedPageSpreads", null)
   * );
   *
   * @default 5
   */
  prerenderedPageSpreads: number | null;
  /**
   * When this is enabled, the AI Assistant chat dialog will be shown.
   * If this is disabled, the chat dialog will not be shown.
   *
   * @example
   * NutrientViewer.load({
   *   initialViewState: new NutrientViewer.ViewState({
   *     showAIAssistant: true,
   *   }),
   * });
   *
   * @default false
   */
  showAIAssistant: boolean;
}

/** @inline */
declare type IWheelZoomMode = (typeof WheelZoomMode)[keyof typeof WheelZoomMode];

/** @inline */
declare interface IWidgetAnnotation extends AnnotationProperties {
  formFieldName: string | null;
  borderColor: Color | null;
  borderStyle: IBorderStyle | null;
  borderDashArray: number[] | null;
  borderWidth: number | null;
  backgroundColor: Color | null;
  fontSize: FontSize | null;
  font: string | null;
  fontColor: Color | null;
  isBold: boolean | null;
  isItalic: boolean | null;
  horizontalAlign: 'left' | 'center' | 'right' | null;
  verticalAlign: 'top' | 'center' | 'bottom' | null;
  additionalActions: WidgetAnnotationAdditionalActionsType | null;
  rotation: number;
  lineHeightFactor: number | null;
  widgetAttachmentId: string | null;
  contentType: string | null;
  buttonIconUpdatedAt: number | null;
}

/** @inline */
declare type IZoomMode = (typeof ZoomMode)[keyof typeof ZoomMode];

/** @inline */
declare type IZoomOptions = {
  /**
   * Enable zooming via keyboard shortcuts (Ctrl/Cmd + [+-]).
   *
   * @default true
   */
  enableKeyboardZoom?: boolean;
  /**
   * Enable zooming via touch gestures.
   *
   * @default true
   */
  enableGestureZoom?: boolean;
};

/**
 * @class
 * PDF action to run arbitrary JavaScript.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record | Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `action.set("script", "alert(...)");`.
 * @example
 * Create a new JavaScriptAction
 * ```ts
 * const action = new NutrientViewer.Actions.JavaScriptAction({
 *   script: "alert(...)"
 * });
 * ```
 *
 * @example
 * Create a button to import a image using a JavaScriptAction
 * ```ts
 * const widget = new NutrientViewer.Annotations.WidgetAnnotation({
 *   id: NutrientViewer.generateInstantId(),
 *   pageIndex: 0,
 *   formFieldName: "buttonIcon",
 *   boundingBox: new NutrientViewer.Geometry.Rect({
 *     left: 100,
 *     top: 200,
 *     width: 100,
 *     height: 100
 *   }),
 *   action: new NutrientViewer.Actions.JavaScriptAction({
 *     script: "event.target.buttonImportIcon()"
 *   }),
 *   borderWidth: 0
 * });
 * const formField = new NutrientViewer.FormFields.ButtonFormField({
 *   name: "buttonIcon",
 *   annotationIds: NutrientViewer.Immutable.List([widget.id])
 * });
 * await instance.create([widget, formField]);
 * ```
 *
 * @summary Run arbitrary JavaScript.
 */
export declare class JavaScriptAction extends Action {
  /**
   * The JavaScript to run.
   */
  script: string;
  constructor(args?: IJavaScriptAction);
}

/**
 * @class
 * PDF action to launch a file. This action is not implemented yet.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record | Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `action.set("filePath", 2);`.
 * @example
 * Create a new LaunchAction
 * ```ts
 * const action = new NutrientViewer.Actions.LaunchAction({ filePath: "./some/file.mp4" });
 * ```
 *
 * @summary Launch a file.
 */
export declare class LaunchAction extends Action {
  /**
   * The file path to launch.
   */
  filePath: string;
  constructor(args?: ILaunchAction);
}

/**
 * The layers sidebar options allow to specify options available for the Layers sidebar.
 *
 * Here you can define Currently, you can define a `lockedLayers` array in which you
 * can provide an array of `id`s for the layers for which visibility should not be modifieable
 * using the sidebar.
 *
 * @public
 * @summary Keyed list of options that apply to the layers sidebar.
 * @example
 * Customizing the layers sidebar to align icons to the right
 * ```ts
 * NutrientViewer.load({
 *   initialViewState: new NutrientViewer.ViewState({
 *     sidebarOptions: {
 *       [NutrientViewer.SidebarMode.LAYERS]: {
 *         LockedLayers: [],
 *         iconsAlignment: NutrientViewer.Alignment.START
 *       }
 *     }
 *   })
 * });
 * ```
 *
 * @see {@link ViewState#sidebarOptions}
 */
export declare type LayersSidebarOptions = {
  /** Array of ocg.ocgId present in the document */
  lockedLayers: number[];
  /** Alignment relative to the parent container */
  iconsAlignment: IAlignment;
};

/**
 * Describes how the pages will be laid out in the document view.
 *
 * @enum
 */
declare const LayoutMode: {
  /** Pages will always be displayed in the single page mode. */
  readonly SINGLE: "SINGLE";
  /** Pages will always be displayed in groups of two. */
  readonly DOUBLE: "DOUBLE";
  /**
   * Automatically sets the layout mode to {@link NutrientViewer.LayoutMode.SINGLE} or
   * {@link NutrientViewer.LayoutMode.DOUBLE} depending on the available space.
   *
   * Specifically {@link NutrientViewer.LayoutMode.DOUBLE} is chosen when the NutrientViewer container is in
   * landscape mode and its size is greater than 992px.
   *
   * This mode is a perfect fit for tablets in particular since it will automatically update the
   * layout mode then device orientation changes.
   *
   * When the dimensions of the viewport change (i.e. the browser window is resized), the view will
   * be restored to make the current page visible.
   */
  readonly AUTO: "AUTO";
};

/**
 * @class
 * Line annotations are used to draw straight lines on a page.
 *
 * Line annotations are only selectable around their visible line. This means that you can create a
 * page full of line annotations while annotations behind the line annotation are still selectable.
 *
 * Right now, line annotations are implemented using SVG images. This behavior is subject to change.
 *
 * <center>
 *   <img title="Example of a line annotation" src="img/annotations/shape_line_annotation.png" width="379" height="155" class="shadow">
 * </center>
 * @example
 * Create a line annotation
 * ```ts
 * const annotation = new NutrientViewer.Annotations.LineAnnotation({
 *   pageIndex: 0,
 *   startPoint: new NutrientViewer.Geometry.Point({ x: 95, y: 95}),
 *   endPoint: new NutrientViewer.Geometry.Point({ x: 195, y: 195}),
 *   boundingBox: new NutrientViewer.Geometry.Rect({
 *     left: 90,
 *     top: 90,
 *     width: 200,
 *     height: 200,
 *   }),
 * });
 * ```
 *
 * @summary Display a straight line on a page.
 */
export declare class LineAnnotation extends ShapeAnnotation<ILineAnnotation> {
  /**
   * A point tuple with x and y coordinates of the line starting point.
   *
   * If no starting point is provided, the annotation will not be visible.
   */
  startPoint: Point;
  /**
   * A point tuple with x and y coordinates of the line ending point.
   *
   * If no ending point is provided, the annotation will not be visible.
   */
  endPoint: Point;
  /**
   * An object with start and / or end entries for line caps.
   *
   * Line caps can have one of these values: "square", "circle", "diamond", "openArrow", "closedArrow",
   * "butt", "reverseOpenArrow", "reverseClosedArrow" or "slash".
   *
   * If the fillColor field is provided, its value is used as fill color for the line cap interior.
   */
  lineCaps: LineCapsType | null;
  /** @deprecated Use `startPoint` and `endPoint` instead. */
  points: List<Point> | null;
  static defaultValues: IObject;
  static readableName: string;
}

/**
 * @deprecated Use {@link Serializers.LineAnnotationJSON} instead.
 * @hidden
 */
export declare type LineAnnotationJSON = Serializers.LineAnnotationJSON;

declare class LineAnnotationSerializer extends ShapeAnnotationSerializer {
  annotation: LineAnnotation;
  toJSON(): Serializers.LineAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<Serializers.LineAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): LineAnnotation;
}

/**
 * Represents one of the available line caps for the line and polyline annotations.
 *
 * @enum
 */
declare const LineCap: {
  /** Square line cap. */
  readonly square: "square";
  /** Circle line cap. */
  readonly circle: "circle";
  /** Diamond line cap. */
  readonly diamond: "diamond";
  /** Open arrow line cap. */
  readonly openArrow: "openArrow";
  /** Closed arrow line cap. */
  readonly closedArrow: "closedArrow";
  /** Butt line cap. */
  readonly butt: "butt";
  /** Reverse open arrow line cap. */
  readonly reverseOpenArrow: "reverseOpenArrow";
  /** Reverse closed arrow line cap. */
  readonly reverseClosedArrow: "reverseClosedArrow";
  /** Slash line cap. */
  readonly slash: "slash";
};

declare type LineCapPresets = 'none' | 'square' | 'circle' | 'diamond' | 'openArrow' | 'closedArrow' | 'butt' | 'reverseOpenArrow' | 'reverseClosedArrow' | 'slash';

declare type LineCapsType = {
  start?: ILineCap | null;
  end?: ILineCap | null;
};

/**
 * @class
 * A link can be used to trigger an action when clicked. They will not be drawn on the page but the
 * bounding box will be used for hit testing.
 *
 * Link annotations are generated for example, when the PDF document contains a reference to another
 * page or an URL.
 *
 * Every link annotation must have an `action` property.
 *
 * <center>
 *   <div class="shadow" style="width: 445px; height: 84px; position: relative">
 *      <img title="Example of a link annotation" src="img/annotations/link_annotation.png" width="445">
 *      <a href="https://www.nutrient.io" style="position: absolute; top: 23px; left: 253px; width: 174px; height: 34px"></a>
 *   </div>
 * </center>
 * @summary Display Link annotation on the page which will trigger an action when clicked.
 */
export declare class LinkAnnotation extends Annotation<ILinkAnnotation> {
  /**
   * _The border on the image above is only for visual guidance and will not be rendered in the
   * viewer._
   *
   * The action that will be triggered when the link annotation is either clicked or tapped.
   *
   * Please refer to {@link Actions} for an in-depth look at PDF actions.
   *
   * @example <caption>Create a link with a go to action</caption>
   * var action = new NutrientViewer.Actions.GoToAction({ pageIndex: 10 });
   * var annotation = new NutrientViewer.Annotations.LinkAnnotation({
   *   pageIndex: 0,
   *   boundingBox: new NutrientViewer.Geometry.Rect({ left: 10, top: 20, width: 30, height: 40 }),
   *   action: action,
   *   borderColor: new NutrientViewer.Color({ r: 245, g: 0, b: 0 })
   *   borderStyle: NutrientViewer.BorderStyle.solid
   *   borderWidth: 5
   * });
   *
   * @summary Triggers an action when clicked.
   */
  action: Action;
  /**
   * Optional border color that will be drawn at the border of the bounding box.
   *
   * @default null
   */
  borderColor: null | Color;
  /**
   * Optional border style used for the border of the bounding box. Valid options
   * are:
   *
   * - `solid`
   * - `dashed`
   * - `beveled`
   * - `inset`
   * - `underline`
   *
   * @default null
   */
  borderStyle: null | IBorderStyle;
  /**
   * Optional border width in PDF pixels, that will be used for the border of the
   * bounding box.
   *
   * @default 0
   */
  borderWidth: null | number;
  static readableName: string;
}

declare class LinkAnnotationSerializer extends AnnotationSerializer {
  annotation: LinkAnnotation;
  constructor(annotation: LinkAnnotation);
  toJSON(): Serializers.LinkAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<Serializers.LinkAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): LinkAnnotation;
}

/**
 * Create a new immutable List containing the values of the provided
 * collection-like.
 *
 * Note: `List` is a factory function and not a class, and does not use the
 * `new` keyword during construction.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { List, Set } = require('immutable')
 *
 * const emptyList = List()
 * // List []
 *
 * const plainArray = [ 1, 2, 3, 4 ]
 * const listFromPlainArray = List(plainArray)
 * // List [ 1, 2, 3, 4 ]
 *
 * const plainSet = Set([ 1, 2, 3, 4 ])
 * const listFromPlainSet = List(plainSet)
 * // List [ 1, 2, 3, 4 ]
 *
 * const arrayIterator = plainArray[Symbol.iterator]()
 * const listFromCollectionArray = List(arrayIterator)
 * // List [ 1, 2, 3, 4 ]
 *
 * listFromPlainArray.equals(listFromCollectionArray) // true
 * listFromPlainSet.equals(listFromCollectionArray) // true
 * listFromPlainSet.equals(listFromPlainArray) // true
 * ```
 */
export declare function List(): List<any>;

export declare function List<T>(): List<T>;

export declare function List<T>(collection: Iterable<T>): List<T>;

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Immutable data encourages pure functions (data-in, data-out) and lends itself
 * to much simpler application development and enabling techniques from
 * functional programming such as lazy evaluation.
 *
 * While designed to bring these powerful functional concepts to JavaScript, it
 * presents an Object-Oriented API familiar to Javascript engineers and closely
 * mirroring that of Array, Map, and Set. It is easy and efficient to convert to
 * and from plain Javascript types.
 *
 * ## How to read these docs
 *
 * In order to better explain what kinds of values the Immutable.js API expects
 * and produces, this documentation is presented in a statically typed dialect of
 * JavaScript (like [Flow][] or [TypeScript][]). You *don't need* to use these
 * type checking tools in order to use Immutable.js, however becoming familiar
 * with their syntax will help you get a deeper understanding of this API.
 *
 * **A few examples and how to read them.**
 *
 * All methods describe the kinds of data they accept and the kinds of data
 * they return. For example a function which accepts two numbers and returns
 * a number would look like this:
 *
 * ```js
 * sum(first: number, second: number): number
 * ```
 *
 * Sometimes, methods can accept different kinds of data or return different
 * kinds of data, and this is described with a *type variable*, which is
 * typically in all-caps. For example, a function which always returns the same
 * kind of data it was provided would look like this:
 *
 * ```js
 * identity<T>(value: T): T
 * ```
 *
 * Type variables are defined with classes and referred to in methods. For
 * example, a class that holds onto a value for you might look like this:
 *
 * ```js
 * class Box<T> {
 *   constructor(value: T)
 *   getValue(): T
 * }
 * ```
 *
 * In order to manipulate Immutable data, methods that we're used to affecting
 * a Collection instead return a new Collection of the same type. The type
 * `this` refers to the same kind of class. For example, a List which returns
 * new Lists when you `push` a value onto it might look like:
 *
 * ```js
 * class List<T> {
 *   push(value: T): this
 * }
 * ```
 *
 * Many methods in Immutable.js accept values which implement the JavaScript
 * [Iterable][] protocol, and might appear like `Iterable<string>` for something
 * which represents sequence of strings. Typically in JavaScript we use plain
 * Arrays (`[]`) when an Iterable is expected, but also all of the Immutable.js
 * collections are iterable themselves!
 *
 * For example, to get a value deep within a structure of data, we might use
 * `getIn` which expects an `Iterable` path:
 *
 * ```
 * getIn(path: Iterable<string | number>): any
 * ```
 *
 * To use this method, we could pass an array: `data.getIn([ "key", 2 ])`.
 *
 *
 * Note: All examples are presented in the modern [ES2015][] version of
 * JavaScript. Use tools like Babel to support older browsers.
 *
 * For example:
 *
 * ```js
 * // ES2015
 * const mappedFoo = foo.map(x => x * x);
 * // ES5
 * var mappedFoo = foo.map(function (x) { return x * x; });
 * ```
 *
 * [ES2015]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla
 * [TypeScript]: http://www.typescriptlang.org/
 * [Flow]: https://flowtype.org/
 * [Iterable]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
 */



/**
 * Lists are ordered indexed dense collections, much like a JavaScript
 * Array.
 *
 * Lists are immutable and fully persistent with O(log32 N) gets and sets,
 * and O(1) push and pop.
 *
 * Lists implement Deque, with efficient addition and removal from both the
 * end (`push`, `pop`) and beginning (`unshift`, `shift`).
 *
 * Unlike a JavaScript Array, there is no distinction between an
 * "unset" index and an index set to `undefined`. `List#forEach` visits all
 * indices from 0 to size, regardless of whether they were explicitly defined.
 */
export declare module List {

  /**
   * True if the provided value is a List
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List } = require('immutable');
   * List.isList([]); // false
   * List.isList(List()); // true
   * ```
   */
  export function isList(maybeList: any): maybeList is List<any>;

  /**
   * Creates a new List containing `values`.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List } = require('immutable');
   * List.of(1, 2, 3, 4)
   * // List [ 1, 2, 3, 4 ]
   * ```
   *
   * Note: Values are not altered or converted in any way.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List } = require('immutable');
   * List.of({x:1}, 2, [3], 4)
   * // List [ { x: 1 }, 2, [ 3 ], 4 ]
   * ```
   */
  export function of<T>(...values: Array<T>): List<T>;
}

export declare interface List<T> extends Collection.Indexed<T> {

  /**
   * The number of items in this List.
   */
  readonly size: number;

  // Persistent changes

  /**
   * Returns a new List which includes `value` at `index`. If `index` already
   * exists in this List, it will be replaced.
   *
   * `index` may be a negative number, which indexes back from the end of the
   * List. `v.set(-1, "value")` sets the last item in the List.
   *
   * If `index` larger than `size`, the returned List's `size` will be large
   * enough to include the `index`.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * const originalList = List([ 0 ]);
   * // List [ 0 ]
   * originalList.set(1, 1);
   * // List [ 0, 1 ]
   * originalList.set(0, 'overwritten');
   * // List [ "overwritten" ]
   * originalList.set(2, 2);
   * // List [ 0, undefined, 2 ]
   *
   * List().set(50000, 'value').size;
   * // 50001
   * ```
   *
   * Note: `set` can be used in `withMutations`.
   */
  set(index: number, value: T): List<T>;

  /**
   * Returns a new List which excludes this `index` and with a size 1 less
   * than this List. Values at indices above `index` are shifted down by 1 to
   * fill the position.
   *
   * This is synonymous with `list.splice(index, 1)`.
   *
   * `index` may be a negative number, which indexes back from the end of the
   * List. `v.delete(-1)` deletes the last item in the List.
   *
   * Note: `delete` cannot be safely used in IE8
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * List([ 0, 1, 2, 3, 4 ]).delete(0);
   * // List [ 1, 2, 3, 4 ]
   * ```
   *
   * Since `delete()` re-indexes values, it produces a complete copy, which
   * has `O(N)` complexity.
   *
   * Note: `delete` *cannot* be used in `withMutations`.
   *
   * @alias remove
   */
  delete(index: number): List<T>;
  remove(index: number): List<T>;

  /**
   * Returns a new List with `value` at `index` with a size 1 more than this
   * List. Values at indices above `index` are shifted over by 1.
   *
   * This is synonymous with `list.splice(index, 0, value)`.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * List([ 0, 1, 2, 3, 4 ]).insert(6, 5)
   * // List [ 0, 1, 2, 3, 4, 5 ]
   * ```
   *
   * Since `insert()` re-indexes values, it produces a complete copy, which
   * has `O(N)` complexity.
   *
   * Note: `insert` *cannot* be used in `withMutations`.
   */
  insert(index: number, value: T): List<T>;

  /**
   * Returns a new List with 0 size and no values in constant time.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * List([ 1, 2, 3, 4 ]).clear()
   * // List []
   * ```
   *
   * Note: `clear` can be used in `withMutations`.
   */
  clear(): List<T>;

  /**
   * Returns a new List with the provided `values` appended, starting at this
   * List's `size`.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * List([ 1, 2, 3, 4 ]).push(5)
   * // List [ 1, 2, 3, 4, 5 ]
   * ```
   *
   * Note: `push` can be used in `withMutations`.
   */
  push(...values: Array<T>): List<T>;

  /**
   * Returns a new List with a size ones less than this List, excluding
   * the last index in this List.
   *
   * Note: this differs from `Array#pop` because it returns a new
   * List rather than the removed value. Use `last()` to get the last value
   * in this List.
   *
   * ```js
   * List([ 1, 2, 3, 4 ]).pop()
   * // List[ 1, 2, 3 ]
   * ```
   *
   * Note: `pop` can be used in `withMutations`.
   */
  pop(): List<T>;

  /**
   * Returns a new List with the provided `values` prepended, shifting other
   * values ahead to higher indices.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * List([ 2, 3, 4]).unshift(1);
   * // List [ 1, 2, 3, 4 ]
   * ```
   *
   * Note: `unshift` can be used in `withMutations`.
   */
  unshift(...values: Array<T>): List<T>;

  /**
   * Returns a new List with a size ones less than this List, excluding
   * the first index in this List, shifting all other values to a lower index.
   *
   * Note: this differs from `Array#shift` because it returns a new
   * List rather than the removed value. Use `first()` to get the first
   * value in this List.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * List([ 0, 1, 2, 3, 4 ]).shift();
   * // List [ 1, 2, 3, 4 ]
   * ```
   *
   * Note: `shift` can be used in `withMutations`.
   */
  shift(): List<T>;

  /**
   * Returns a new List with an updated value at `index` with the return
   * value of calling `updater` with the existing value, or `notSetValue` if
   * `index` was not set. If called with a single argument, `updater` is
   * called with the List itself.
   *
   * `index` may be a negative number, which indexes back from the end of the
   * List. `v.update(-1)` updates the last item in the List.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * const list = List([ 'a', 'b', 'c' ])
   * const result = list.update(2, val => val.toUpperCase())
   * // List [ "a", "b", "C" ]
   * ```
   *
   * This can be very useful as a way to "chain" a normal function into a
   * sequence of methods. RxJS calls this "let" and lodash calls it "thru".
   *
   * For example, to sum a List after mapping and filtering:
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * function sum(collection) {
   *   return collection.reduce((sum, x) => sum + x, 0)
   * }
   *
   * List([ 1, 2, 3 ])
   *   .map(x => x + 1)
   *   .filter(x => x % 2 === 0)
   *   .update(sum)
   * // 6
   * ```
   *
   * Note: `update(index)` can be used in `withMutations`.
   *
   * @see `Map#update`
   */
  update(index: number, notSetValue: T, updater: (value: T) => T): this;
  update(index: number, updater: (value: T) => T): this;
  update<R>(updater: (value: this) => R): R;

  /**
   * Returns a new List with size `size`. If `size` is less than this
   * List's size, the new List will exclude values at the higher indices.
   * If `size` is greater than this List's size, the new List will have
   * undefined values for the newly available indices.
   *
   * When building a new List and the final size is known up front, `setSize`
   * used in conjunction with `withMutations` may result in the more
   * performant construction.
   */
  setSize(size: number): List<T>;


  // Deep persistent changes

  /**
   * Returns a new List having set `value` at this `keyPath`. If any keys in
   * `keyPath` do not exist, a new immutable Map will be created at that key.
   *
   * Index numbers are used as keys to determine the path to follow in
   * the List.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List } = require('immutable')
   * const list = List([ 0, 1, 2, List([ 3, 4 ])])
   * list.setIn([3, 0], 999);
   * // List [ 0, 1, 2, List [ 999, 4 ] ]
   * ```
   *
   * Plain JavaScript Object or Arrays may be nested within an Immutable.js
   * Collection, and setIn() can update those values as well, treating them
   * immutably by creating new copies of those values with the changes applied.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List } = require('immutable')
   * const list = List([ 0, 1, 2, { plain: 'object' }])
   * list.setIn([3, 'plain'], 'value');
   * // List([ 0, 1, 2, { plain: 'value' }])
   * ```
   *
   * Note: `setIn` can be used in `withMutations`.
   */
  setIn(keyPath: Iterable<any>, value: any): this;

  /**
   * Returns a new List having removed the value at this `keyPath`. If any
   * keys in `keyPath` do not exist, no change will occur.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List } = require('immutable')
   * const list = List([ 0, 1, 2, List([ 3, 4 ])])
   * list.deleteIn([3, 0]);
   * // List [ 0, 1, 2, List [ 4 ] ]
   * ```
   *
   * Plain JavaScript Object or Arrays may be nested within an Immutable.js
   * Collection, and removeIn() can update those values as well, treating them
   * immutably by creating new copies of those values with the changes applied.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List } = require('immutable')
   * const list = List([ 0, 1, 2, { plain: 'object' }])
   * list.removeIn([3, 'plain']);
   * // List([ 0, 1, 2, {}])
   * ```
   *
   * Note: `deleteIn` *cannot* be safely used in `withMutations`.
   *
   * @alias removeIn
   */
  deleteIn(keyPath: Iterable<any>): this;
  removeIn(keyPath: Iterable<any>): this;

  /**
   * Note: `updateIn` can be used in `withMutations`.
   *
   * @see `Map#updateIn`
   */
  updateIn(keyPath: Iterable<any>, notSetValue: any, updater: (value: any) => any): this;
  updateIn(keyPath: Iterable<any>, updater: (value: any) => any): this;

  /**
   * Note: `mergeIn` can be used in `withMutations`.
   *
   * @see `Map#mergeIn`
   */
  mergeIn(keyPath: Iterable<any>, ...collections: Array<any>): this;

  /**
   * Note: `mergeDeepIn` can be used in `withMutations`.
   *
   * @see `Map#mergeDeepIn`
   */
  mergeDeepIn(keyPath: Iterable<any>, ...collections: Array<any>): this;

  // Transient changes

  /**
   * Note: Not all methods can be safely used on a mutable collection or within
   * `withMutations`! Check the documentation for each method to see if it
   * allows being used in `withMutations`.
   *
   * @see `Map#withMutations`
   */
  withMutations(mutator: (mutable: this) => any): this;

  /**
   * An alternative API for withMutations()
   *
   * Note: Not all methods can be safely used on a mutable collection or within
   * `withMutations`! Check the documentation for each method to see if it
   * allows being used in `withMutations`.
   *
   * @see `Map#asMutable`
   */
  asMutable(): this;

  /**
   * @see `Map#wasAltered`
   */
  wasAltered(): boolean;

  /**
   * @see `Map#asImmutable`
   */
  asImmutable(): this;

  // Sequence algorithms

  /**
   * Returns a new List with other values or collections concatenated to this one.
   *
   * Note: `concat` can be used in `withMutations`.
   *
   * @alias merge
   */
  concat<C>(...valuesOrCollections: Array<Iterable<C> | C>): List<T | C>;
  merge<C>(...collections: Array<Iterable<C>>): List<T | C>;

  /**
   * Returns a new List with values passed through a
   * `mapper` function.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * List([ 1, 2 ]).map(x => 10 * x)
   * // List [ 10, 20 ]
   * ```
   */
  map<M>(
  mapper: (value: T, key: number, iter: this) => M,
  context?: any)
  : List<M>;

  /**
   * Flat-maps the List, returning a new List.
   *
   * Similar to `list.map(...).flatten(true)`.
   */
  flatMap<M>(
  mapper: (value: T, key: number, iter: this) => Iterable<M>,
  context?: any)
  : List<M>;

  /**
   * Returns a new List with only the values for which the `predicate`
   * function returns true.
   *
   * Note: `filter()` always returns a new instance, even if it results in
   * not filtering out any values.
   */
  filter<F extends T>(
  predicate: (value: T, index: number, iter: this) => value is F,
  context?: any)
  : List<F>;
  filter(
  predicate: (value: T, index: number, iter: this) => any,
  context?: any)
  : this;

  /**
   * Returns a List "zipped" with the provided collection.
   *
   * Like `zipWith`, but using the default `zipper`: creating an `Array`.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * const a = List([ 1, 2, 3 ]);
   * const b = List([ 4, 5, 6 ]);
   * const c = a.zip(b); // List [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
   * ```
   */
  zip<U>(other: Collection<any, U>): List<[T, U]>;
  zip<U, V>(other: Collection<any, U>, other2: Collection<any, V>): List<[T, U, V]>;
  zip(...collections: Array<Collection<any, any>>): List<any>;

  /**
   * Returns a List "zipped" with the provided collections.
   *
   * Unlike `zip`, `zipAll` continues zipping until the longest collection is
   * exhausted. Missing values from shorter collections are filled with `undefined`.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * const a = List([ 1, 2 ]);
   * const b = List([ 3, 4, 5 ]);
   * const c = a.zipAll(b); // List [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]
   * ```
   *
   * Note: Since zipAll will return a collection as large as the largest
   * input, some results may contain undefined values. TypeScript cannot
   * account for these without cases (as of v2.5).
   */
  zipAll<U>(other: Collection<any, U>): List<[T, U]>;
  zipAll<U, V>(other: Collection<any, U>, other2: Collection<any, V>): List<[T, U, V]>;
  zipAll(...collections: Array<Collection<any, any>>): List<any>;

  /**
   * Returns a List "zipped" with the provided collections by using a
   * custom `zipper` function.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * const a = List([ 1, 2, 3 ]);
   * const b = List([ 4, 5, 6 ]);
   * const c = a.zipWith((a, b) => a + b, b);
   * // List [ 5, 7, 9 ]
   * ```
   */
  zipWith<U, Z>(
  zipper: (value: T, otherValue: U) => Z,
  otherCollection: Collection<any, U>)
  : List<Z>;
  zipWith<U, V, Z>(
  zipper: (value: T, otherValue: U, thirdValue: V) => Z,
  otherCollection: Collection<any, U>,
  thirdCollection: Collection<any, V>)
  : List<Z>;
  zipWith<Z>(
  zipper: (...any: Array<any>) => Z,
  ...collections: Array<Collection<any, any>>)
  : List<Z>;
}

/**
 * @class
 *
 * A list box where multiple values can be selected.
 *
 * To retrieve a list of all form fields, use {@link Instance#getFormFields}.
 *
 * Please note that {@link Instance#getFormFieldValues} will not return
 * the latest value for this field until the user leaves this field by default. If you
 * want this value to update on every change then set the {@link FormFields.ChoiceFormField#commitOnChange} to
 * true.
 * @public
 * @summary A list box where multiple values can be selected.
 */
export declare class ListBoxFormField extends ChoiceFormField {
  additionalActions: FormFieldInputAdditionalActionsType | null | undefined;
}

/**
 * Creates a new NutrientViewer instance.
 *
 * Returns a {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise | Promise}
 * resolving to a new {@link NutrientViewer.Instance}, or rejecting with a {@link NutrientViewer.Error}.
 *
 * It requires a {@link Configuration | configuration object}. When the configuration is
 * invalid, the promise will be rejected with a {@link NutrientViewer.Error}.
 *
 * @example
 * Load Nutrient Web SDK Server
 * ```ts
 * NutrientViewer.load({
 *   authPayload: { jwt: "xxx.xxx.xxx" },
 *   container: ".foo",
 *   documentId: "85203",
 *   instant: true,
 * }).then((instance) => {
 *   console.log("Successfully mounted NutrientViewer", instance);
 * }).catch((error) => {
 *   console.error(error.message);
 * })
 * ```
 *
 * @example
 * Load Nutrient Web SDK Standalone
 * ```ts
 * NutrientViewer.load({
 *   document: "/sales-report.pdf",
 *   container: ".foo",
 *   licenseKey: "YOUR_LICENSE_KEY",
 * }).then((instance) => {
 *   console.log("Successfully mounted NutrientViewer", instance);
 * }).catch((error) => {
 *   console.error(error.message);
 * })
 * ```
 *
 * @public
 */
declare function load(configuration: Configuration): Promise<Instance>;

/**
 * Loads and initializes the Text Comparison UI for comparing two documents.
 *
 * This method creates a complete text comparison interface with side-by-side document views,
 * highlighting differences between documents, and providing navigation through changes.
 * Optionally supports AI-powered analysis for categorizing and summarizing differences.
 *
 * @param configuration - Configuration object containing document sources, UI options, and comparison settings
 * @returns Promise that resolves to a TextComparisonInstance for programmatic control
 * @example
 *
 * const textComparisonInstance = await NutrientViewer.loadTextComparison({
 *   container: '.text-comparison-container',
 *   documentA: 'path/to/document-a.pdf',
 *   documentB: 'path/to/document-b.pdf',
 *   comparisonSidebarConfig: {
 *     diffColors: {
 *       insertionColor: new NutrientViewer.Color({ r: 0, g: 255, b: 0 }),
 *       deletionColor: new NutrientViewer.Color({ r: 255, g: 0, b: 0 })
 *     },
 *     openByDefault: true
 *   }
 * });
 *
 */
declare function loadTextComparison(configuration: TextComparisonConfiguration): Promise<TextComparisonInstance>;

/**
 * Creates a new Immutable Map.
 *
 * Created with the same key value pairs as the provided Collection.Keyed or
 * JavaScript Object or expects a Collection of [K, V] tuple entries.
 *
 * Note: `Map` is a factory function and not a class, and does not use the
 * `new` keyword during construction.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { Map } = require('immutable')
 * Map({ key: "value" })
 * Map([ [ "key", "value" ] ])
 * ```
 *
 * Keep in mind, when using JS objects to construct Immutable Maps, that
 * JavaScript Object properties are always strings, even if written in a
 * quote-less shorthand, while Immutable Maps accept keys of any type.
 *
 * <!-- runkit:activate
 *      { "preamble": "const { Map } = require('immutable');" }
 * -->
 * ```js
 * let obj = { 1: "one" }
 * Object.keys(obj) // [ "1" ]
 * assert.equal(obj["1"], obj[1]) // "one" === "one"
 *
 * let map = Map(obj)
 * assert.notEqual(map.get("1"), map.get(1)) // "one" !== undefined
 * ```
 *
 * Property access for JavaScript Objects first converts the key to a string,
 * but since Immutable Map keys can be of any type the argument to `get()` is
 * not altered.
 */
declare function Map_2<K, V>(collection: Iterable<[K, V]>): Map_2<K, V>;

declare function Map_2<T>(collection: Iterable<Iterable<T>>): Map_2<T, T>;

declare function Map_2<V>(obj: {[key: string]: V;}): Map_2<string, V>;

declare function Map_2<K, V>(): Map_2<K, V>;

declare function Map_2(): Map_2<any, any>;

/**
 * Immutable Map is an unordered Collection.Keyed of (key, value) pairs with
 * `O(log32 N)` gets and `O(log32 N)` persistent sets.
 *
 * Iteration order of a Map is undefined, however is stable. Multiple
 * iterations of the same Map will iterate in the same order.
 *
 * Map's keys can be of any type, and use `Immutable.is` to determine key
 * equality. This allows the use of any value (including NaN) as a key.
 *
 * Because `Immutable.is` returns equality based on value semantics, and
 * Immutable collections are treated as values, any Immutable collection may
 * be used as a key.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { Map, List } = require('immutable');
 * Map().set(List([ 1 ]), 'listofone').get(List([ 1 ]));
 * // 'listofone'
 * ```
 *
 * Any JavaScript object may be used as a key, however strict identity is used
 * to evaluate key equality. Two similar looking objects will represent two
 * different keys.
 *
 * Implemented by a hash-array mapped trie.
 */
declare module Map_2 {

  /**
   * True if the provided value is a Map
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * Map.isMap({}) // false
   * Map.isMap(Map()) // true
   * ```
   */
  function isMap(maybeMap: any): maybeMap is Map_2<any, any>;

  /**
   * Creates a new Map from alternating keys and values
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * Map.of(
   *   'key', 'value',
   *   'numerical value', 3,
   *    0, 'numerical key'
   * )
   * // Map { 0: "numerical key", "key": "value", "numerical value": 3 }
   * ```
   *
   * @deprecated Use Map([ [ 'k', 'v' ] ]) or Map({ k: 'v' })
   */
  function of(...keyValues: Array<any>): Map_2<any, any>;
}

declare interface Map_2<K, V> extends Collection.Keyed<K, V> {

  /**
   * The number of entries in this Map.
   */
  readonly size: number;

  // Persistent changes

  /**
   * Returns a new Map also containing the new key, value pair. If an equivalent
   * key already exists in this Map, it will be replaced.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * const originalMap = Map()
   * const newerMap = originalMap.set('key', 'value')
   * const newestMap = newerMap.set('key', 'newer value')
   *
   * originalMap
   * // Map {}
   * newerMap
   * // Map { "key": "value" }
   * newestMap
   * // Map { "key": "newer value" }
   * ```
   *
   * Note: `set` can be used in `withMutations`.
   */
  set(key: K, value: V): this;

  /**
   * Returns a new Map which excludes this `key`.
   *
   * Note: `delete` cannot be safely used in IE8, but is provided to mirror
   * the ES6 collection API.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * const originalMap = Map({
   *   key: 'value',
   *   otherKey: 'other value'
   * })
   * // Map { "key": "value", "otherKey": "other value" }
   * originalMap.delete('otherKey')
   * // Map { "key": "value" }
   * ```
   *
   * Note: `delete` can be used in `withMutations`.
   *
   * @alias remove
   */
  delete(key: K): this;
  remove(key: K): this;

  /**
   * Returns a new Map which excludes the provided `keys`.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * const names = Map({ a: "Aaron", b: "Barry", c: "Connor" })
   * names.deleteAll([ 'a', 'c' ])
   * // Map { "b": "Barry" }
   * ```
   *
   * Note: `deleteAll` can be used in `withMutations`.
   *
   * @alias removeAll
   */
  deleteAll(keys: Iterable<K>): this;
  removeAll(keys: Iterable<K>): this;

  /**
   * Returns a new Map containing no keys or values.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * Map({ key: 'value' }).clear()
   * // Map {}
   * ```
   *
   * Note: `clear` can be used in `withMutations`.
   */
  clear(): this;

  /**
   * Returns a new Map having updated the value at this `key` with the return
   * value of calling `updater` with the existing value.
   *
   * Similar to: `map.set(key, updater(map.get(key)))`.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * const aMap = Map({ key: 'value' })
   * const newMap = aMap.update('key', value => value + value)
   * // Map { "key": "valuevalue" }
   * ```
   *
   * This is most commonly used to call methods on collections within a
   * structure of data. For example, in order to `.push()` onto a nested `List`,
   * `update` and `push` can be used together:
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Map, List } = require('immutable');" }
   * -->
   * ```js
   * const aMap = Map({ nestedList: List([ 1, 2, 3 ]) })
   * const newMap = aMap.update('nestedList', list => list.push(4))
   * // Map { "nestedList": List [ 1, 2, 3, 4 ] }
   * ```
   *
   * When a `notSetValue` is provided, it is provided to the `updater`
   * function when the value at the key does not exist in the Map.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Map } = require('immutable');" }
   * -->
   * ```js
   * const aMap = Map({ key: 'value' })
   * const newMap = aMap.update('noKey', 'no value', value => value + value)
   * // Map { "key": "value", "noKey": "no valueno value" }
   * ```
   *
   * However, if the `updater` function returns the same value it was called
   * with, then no change will occur. This is still true if `notSetValue`
   * is provided.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Map } = require('immutable');" }
   * -->
   * ```js
   * const aMap = Map({ apples: 10 })
   * const newMap = aMap.update('oranges', 0, val => val)
   * // Map { "apples": 10 }
   * assert.strictEqual(newMap, map);
   * ```
   *
   * For code using ES2015 or later, using `notSetValue` is discourged in
   * favor of function parameter default values. This helps to avoid any
   * potential confusion with identify functions as described above.
   *
   * The previous example behaves differently when written with default values:
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Map } = require('immutable');" }
   * -->
   * ```js
   * const aMap = Map({ apples: 10 })
   * const newMap = aMap.update('oranges', (val = 0) => val)
   * // Map { "apples": 10, "oranges": 0 }
   * ```
   *
   * If no key is provided, then the `updater` function return value is
   * returned as well.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Map } = require('immutable');" }
   * -->
   * ```js
   * const aMap = Map({ key: 'value' })
   * const result = aMap.update(aMap => aMap.get('key'))
   * // "value"
   * ```
   *
   * This can be very useful as a way to "chain" a normal function into a
   * sequence of methods. RxJS calls this "let" and lodash calls it "thru".
   *
   * For example, to sum the values in a Map
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Map } = require('immutable');" }
   * -->
   * ```js
   * function sum(collection) {
   *   return collection.reduce((sum, x) => sum + x, 0)
   * }
   *
   * Map({ x: 1, y: 2, z: 3 })
   *   .map(x => x + 1)
   *   .filter(x => x % 2 === 0)
   *   .update(sum)
   * // 6
   * ```
   *
   * Note: `update(key)` can be used in `withMutations`.
   */
  update(key: K, notSetValue: V, updater: (value: V) => V): this;
  update(key: K, updater: (value: V) => V): this;
  update<R>(updater: (value: this) => R): R;

  /**
   * Returns a new Map resulting from merging the provided Collections
   * (or JS objects) into this Map. In other words, this takes each entry of
   * each collection and sets it on this Map.
   *
   * Note: Values provided to `merge` are shallowly converted before being
   * merged. No nested values are altered.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * const one = Map({ a: 10, b: 20, c: 30 })
   * const two = Map({ b: 40, a: 50, d: 60 })
   * one.merge(two) // Map { "a": 50, "b": 40, "c": 30, "d": 60 }
   * two.merge(one) // Map { "b": 20, "a": 10, "d": 60, "c": 30 }
   * ```
   *
   * Note: `merge` can be used in `withMutations`.
   *
   * @alias concat
   */
  merge<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): Map_2<K | KC, V | VC>;
  merge<C>(...collections: Array<{[key: string]: C;}>): Map_2<K | string, V | C>;
  concat<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): Map_2<K | KC, V | VC>;
  concat<C>(...collections: Array<{[key: string]: C;}>): Map_2<K | string, V | C>;

  /**
   * Like `merge()`, `mergeWith()` returns a new Map resulting from merging
   * the provided Collections (or JS objects) into this Map, but uses the
   * `merger` function for dealing with conflicts.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * const one = Map({ a: 10, b: 20, c: 30 })
   * const two = Map({ b: 40, a: 50, d: 60 })
   * one.mergeWith((oldVal, newVal) => oldVal / newVal, two)
   * // { "a": 0.2, "b": 0.5, "c": 30, "d": 60 }
   * two.mergeWith((oldVal, newVal) => oldVal / newVal, one)
   * // { "b": 2, "a": 5, "d": 60, "c": 30 }
   * ```
   *
   * Note: `mergeWith` can be used in `withMutations`.
   */
  mergeWith(
  merger: (oldVal: V, newVal: V, key: K) => V,
  ...collections: Array<Iterable<[K, V]> | {[key: string]: V;}>)
  : this;

  /**
   * Like `merge()`, but when two Collections conflict, it merges them as well,
   * recursing deeply through the nested data.
   *
   * Note: Values provided to `merge` are shallowly converted before being
   * merged. No nested values are altered unless they will also be merged at
   * a deeper level.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * const one = Map({ a: Map({ x: 10, y: 10 }), b: Map({ x: 20, y: 50 }) })
   * const two = Map({ a: Map({ x: 2 }), b: Map({ y: 5 }), c: Map({ z: 3 }) })
   * one.mergeDeep(two)
   * // Map {
   * //   "a": Map { "x": 2, "y": 10 },
   * //   "b": Map { "x": 20, "y": 5 },
   * //   "c": Map { "z": 3 }
   * // }
   * ```
   *
   * Note: `mergeDeep` can be used in `withMutations`.
   */
  mergeDeep(...collections: Array<Iterable<[K, V]> | {[key: string]: V;}>): this;

  /**
   * Like `mergeDeep()`, but when two non-Collections conflict, it uses the
   * `merger` function to determine the resulting value.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * const one = Map({ a: Map({ x: 10, y: 10 }), b: Map({ x: 20, y: 50 }) })
   * const two = Map({ a: Map({ x: 2 }), b: Map({ y: 5 }), c: Map({ z: 3 }) })
   * one.mergeDeepWith((oldVal, newVal) => oldVal / newVal, two)
   * // Map {
   * //   "a": Map { "x": 5, "y": 10 },
   * //   "b": Map { "x": 20, "y": 10 },
   * //   "c": Map { "z": 3 }
   * // }
   * ```
     * Note: `mergeDeepWith` can be used in `withMutations`.
   */

  mergeDeepWith(
  merger: (oldVal: any, newVal: any, key: any) => any,
  ...collections: Array<Iterable<[K, V]> | {[key: string]: V;}>)
  : this;


  // Deep persistent changes

  /**
   * Returns a new Map having set `value` at this `keyPath`. If any keys in
   * `keyPath` do not exist, a new immutable Map will be created at that key.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * const originalMap = Map({
   *   subObject: Map({
   *     subKey: 'subvalue',
   *     subSubObject: Map({
   *       subSubKey: 'subSubValue'
   *     })
   *   })
   * })
   *
   * const newMap = originalMap.setIn(['subObject', 'subKey'], 'ha ha!')
   * // Map {
   * //   "subObject": Map {
   * //     "subKey": "ha ha!",
   * //     "subSubObject": Map { "subSubKey": "subSubValue" }
   * //   }
   * // }
   *
   * const newerMap = originalMap.setIn(
   *   ['subObject', 'subSubObject', 'subSubKey'],
   *   'ha ha ha!'
   * )
   * // Map {
   * //   "subObject": Map {
   * //     "subKey": "subvalue",
   * //     "subSubObject": Map { "subSubKey": "ha ha ha!" }
   * //   }
   * // }
   * ```
   *
   * Plain JavaScript Object or Arrays may be nested within an Immutable.js
   * Collection, and setIn() can update those values as well, treating them
   * immutably by creating new copies of those values with the changes applied.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * const originalMap = Map({
   *   subObject: {
   *     subKey: 'subvalue',
   *     subSubObject: {
   *       subSubKey: 'subSubValue'
   *     }
   *   }
   * })
   *
   * originalMap.setIn(['subObject', 'subKey'], 'ha ha!')
   * // Map {
   * //   "subObject": {
   * //     subKey: "ha ha!",
   * //     subSubObject: { subSubKey: "subSubValue" }
   * //   }
   * // }
   * ```
   *
   * If any key in the path exists but cannot be updated (such as a primitive
   * like number or a custom Object like Date), an error will be thrown.
   *
   * Note: `setIn` can be used in `withMutations`.
   */
  setIn(keyPath: Iterable<any>, value: any): this;

  /**
   * Returns a new Map having removed the value at this `keyPath`. If any keys
   * in `keyPath` do not exist, no change will occur.
   *
   * Note: `deleteIn` can be used in `withMutations`.
   *
   * @alias removeIn
   */
  deleteIn(keyPath: Iterable<any>): this;
  removeIn(keyPath: Iterable<any>): this;

  /**
   * Returns a new Map having applied the `updater` to the entry found at the
   * keyPath.
   *
   * This is most commonly used to call methods on collections nested within a
   * structure of data. For example, in order to `.push()` onto a nested `List`,
   * `updateIn` and `push` can be used together:
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map, List } = require('immutable')
   * const map = Map({ inMap: Map({ inList: List([ 1, 2, 3 ]) }) })
   * const newMap = map.updateIn(['inMap', 'inList'], list => list.push(4))
   * // Map { "inMap": Map { "inList": List [ 1, 2, 3, 4 ] } }
   * ```
   *
   * If any keys in `keyPath` do not exist, new Immutable `Map`s will
   * be created at those keys. If the `keyPath` does not already contain a
   * value, the `updater` function will be called with `notSetValue`, if
   * provided, otherwise `undefined`.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Map } = require('immutable')" }
   * -->
   * ```js
   * const map = Map({ a: Map({ b: Map({ c: 10 }) }) })
   * const newMap = map.updateIn(['a', 'b', 'c'], val => val * 2)
   * // Map { "a": Map { "b": Map { "c": 20 } } }
   * ```
   *
   * If the `updater` function returns the same value it was called with, then
   * no change will occur. This is still true if `notSetValue` is provided.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Map } = require('immutable')" }
   * -->
   * ```js
   * const map = Map({ a: Map({ b: Map({ c: 10 }) }) })
   * const newMap = map.updateIn(['a', 'b', 'x'], 100, val => val)
   * // Map { "a": Map { "b": Map { "c": 10 } } }
   * assert.strictEqual(newMap, aMap)
   * ```
   *
   * For code using ES2015 or later, using `notSetValue` is discourged in
   * favor of function parameter default values. This helps to avoid any
   * potential confusion with identify functions as described above.
   *
   * The previous example behaves differently when written with default values:
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Map } = require('immutable')" }
   * -->
   * ```js
   * const map = Map({ a: Map({ b: Map({ c: 10 }) }) })
   * const newMap = map.updateIn(['a', 'b', 'x'], (val = 100) => val)
   * // Map { "a": Map { "b": Map { "c": 10, "x": 100 } } }
   * ```
   *
   * Plain JavaScript Object or Arrays may be nested within an Immutable.js
   * Collection, and updateIn() can update those values as well, treating them
   * immutably by creating new copies of those values with the changes applied.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Map } = require('immutable')" }
   * -->
   * ```js
   * const map = Map({ a: { b: { c: 10 } } })
   * const newMap = map.updateIn(['a', 'b', 'c'], val => val * 2)
   * // Map { "a": { b: { c: 20 } } }
   * ```
   *
   * If any key in the path exists but cannot be updated (such as a primitive
   * like number or a custom Object like Date), an error will be thrown.
   *
   * Note: `updateIn` can be used in `withMutations`.
   */
  updateIn(keyPath: Iterable<any>, notSetValue: any, updater: (value: any) => any): this;
  updateIn(keyPath: Iterable<any>, updater: (value: any) => any): this;

  /**
   * A combination of `updateIn` and `merge`, returning a new Map, but
   * performing the merge at a point arrived at by following the keyPath.
   * In other words, these two lines are equivalent:
   *
   * ```js
   * map.updateIn(['a', 'b', 'c'], abc => abc.merge(y))
   * map.mergeIn(['a', 'b', 'c'], y)
   * ```
   *
   * Note: `mergeIn` can be used in `withMutations`.
   */
  mergeIn(keyPath: Iterable<any>, ...collections: Array<any>): this;

  /**
   * A combination of `updateIn` and `mergeDeep`, returning a new Map, but
   * performing the deep merge at a point arrived at by following the keyPath.
   * In other words, these two lines are equivalent:
   *
   * ```js
   * map.updateIn(['a', 'b', 'c'], abc => abc.mergeDeep(y))
   * map.mergeDeepIn(['a', 'b', 'c'], y)
   * ```
   *
   * Note: `mergeDeepIn` can be used in `withMutations`.
   */
  mergeDeepIn(keyPath: Iterable<any>, ...collections: Array<any>): this;

  // Transient changes

  /**
   * Every time you call one of the above functions, a new immutable Map is
   * created. If a pure function calls a number of these to produce a final
   * return value, then a penalty on performance and memory has been paid by
   * creating all of the intermediate immutable Maps.
   *
   * If you need to apply a series of mutations to produce a new immutable
   * Map, `withMutations()` creates a temporary mutable copy of the Map which
   * can apply mutations in a highly performant manner. In fact, this is
   * exactly how complex mutations like `merge` are done.
   *
   * As an example, this results in the creation of 2, not 4, new Maps:
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * const map1 = Map()
   * const map2 = map1.withMutations(map => {
   *   map.set('a', 1).set('b', 2).set('c', 3)
   * })
   * assert.equal(map1.size, 0)
   * assert.equal(map2.size, 3)
   * ```
   *
   * Note: Not all methods can be used on a mutable collection or within
   * `withMutations`! Read the documentation for each method to see if it
   * is safe to use in `withMutations`.
   */
  withMutations(mutator: (mutable: this) => any): this;

  /**
   * Another way to avoid creation of intermediate Immutable maps is to create
   * a mutable copy of this collection. Mutable copies *always* return `this`,
   * and thus shouldn't be used for equality. Your function should never return
   * a mutable copy of a collection, only use it internally to create a new
   * collection.
   *
   * If possible, use `withMutations` to work with temporary mutable copies as
   * it provides an easier to use API and considers many common optimizations.
   *
   * Note: if the collection is already mutable, `asMutable` returns itself.
   *
   * Note: Not all methods can be used on a mutable collection or within
   * `withMutations`! Read the documentation for each method to see if it
   * is safe to use in `withMutations`.
   *
   * @see `Map#asImmutable`
   */
  asMutable(): this;

  /**
   * Returns true if this is a mutable copy (see `asMutable()`) and mutative
   * alterations have been applied.
   *
   * @see `Map#asMutable`
   */
  wasAltered(): boolean;

  /**
   * The yin to `asMutable`'s yang. Because it applies to mutable collections,
   * this operation is *mutable* and may return itself (though may not
   * return itself, i.e. if the result is an empty collection). Once
   * performed, the original mutable copy must no longer be mutated since it
   * may be the immutable result.
   *
   * If possible, use `withMutations` to work with temporary mutable copies as
   * it provides an easier to use API and considers many common optimizations.
   *
   * @see `Map#asMutable`
   */
  asImmutable(): this;

  // Sequence algorithms

  /**
   * Returns a new Map with values passed through a
   * `mapper` function.
   *
   *     Map({ a: 1, b: 2 }).map(x => 10 * x)
   *     // Map { a: 10, b: 20 }
   */
  map<M>(
  mapper: (value: V, key: K, iter: this) => M,
  context?: any)
  : Map_2<K, M>;

  /**
   * @see Collection.Keyed.mapKeys
   */
  mapKeys<M>(
  mapper: (key: K, value: V, iter: this) => M,
  context?: any)
  : Map_2<M, V>;

  /**
   * @see Collection.Keyed.mapEntries
   */
  mapEntries<KM, VM>(
  mapper: (entry: [K, V], index: number, iter: this) => [KM, VM],
  context?: any)
  : Map_2<KM, VM>;

  /**
   * Flat-maps the Map, returning a new Map.
   *
   * Similar to `data.map(...).flatten(true)`.
   */
  flatMap<KM, VM>(
  mapper: (value: V, key: K, iter: this) => Iterable<[KM, VM]>,
  context?: any)
  : Map_2<KM, VM>;

  /**
   * Returns a new Map with only the entries for which the `predicate`
   * function returns true.
   *
   * Note: `filter()` always returns a new instance, even if it results in
   * not filtering out any values.
   */
  filter<F extends V>(
  predicate: (value: V, key: K, iter: this) => value is F,
  context?: any)
  : Map_2<K, F>;
  filter(
  predicate: (value: V, key: K, iter: this) => any,
  context?: any)
  : this;

  /**
   * @see Collection.Keyed.flip
   */
  flip(): Map_2<V, K>;
}

declare let Maui: {
  MauiBridge: typeof MauiBridgeInstance;
} | undefined;

declare const MauiBridgeInstance: IMauiBridge;

/**
 * Precision values for length of measurement annotations.
 *
 * @enum
 */
declare const MeasurementPrecision: {
  readonly WHOLE: "whole";
  readonly ONE: "oneDp";
  readonly TWO: "twoDp";
  readonly THREE: "threeDp";
  readonly FOUR: "fourDp";
  readonly HALVES: "1/2";
  readonly QUARTERS: "1/4";
  readonly EIGHTHS: "1/8";
  readonly SIXTEENTHS: "1/16";
};

/**
 * MeasurementScale is a class that represents the scale of measurement annotations.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record | Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `scale.set("fromValue", 15)`
 *
 * @example
 * Create and update a scale.
 * ```ts
 * const scale = new NutrientViewer.MeasurementScale({
 *   unitFrom: NutrientViewer.MeasurementScaleUnitFrom.Millimeters,
 *   unitTo: NutrientViewer.MeasurementScaleUnitTo.Inches,
 *   fromValue: 1,
 *   toValue: 10
 * });
 * const newScale = scale.set("fromValue", 2);
 * newScale.fromValue // => 2
 * ```
 *
 * @hideconstructor
 * @summary The scale value of a measurement annotation.
 */
export declare class MeasurementScale extends MeasurementScale_base {}

declare const MeasurementScale_base: Record_2.Factory<IMeasurementScale>;

/** @inline */
declare type MeasurementScaleJSON = {
  unitFrom: IMeasurementScaleUnitFrom;
  unitTo: IMeasurementScaleUnitTo;
  from: number;
  to: number;
};

/**
 * Represents one of the units from which you can scale from for measurement annotations.
 *
 * @enum
 */
declare const MeasurementScaleUnitFrom: {
  readonly INCHES: "in";
  readonly MILLIMETERS: "mm";
  readonly CENTIMETERS: "cm";
  readonly POINTS: "pt";
};

/**
 * Represents one of the units to which you can scale from for measurement annotations.
 *
 * @enum
 */
declare const MeasurementScaleUnitTo: {
  readonly INCHES: "in";
  readonly MILLIMETERS: "mm";
  readonly CENTIMETERS: "cm";
  readonly POINTS: "pt";
  readonly FEET: "ft";
  readonly METERS: "m";
  readonly YARDS: "yd";
  readonly KILOMETERS: "km";
  readonly MILES: "mi";
};

/** @inline */
export declare interface MeasurementValueConfiguration {
  /** Your custom configuration name. It has to be unique. */
  name?: string;
  /** The custom scale passed in the configuration, it represent the scale used in the document */
  scale: IMeasurementScale;
  /** Precision values for the length of measurement annotations */
  precision: IMeasurementPrecision;
  /** Whether a custom scale is selected or not. */
  selected?: boolean;
}

/**
 * Nutrient Web SDK allows you to pass a customized configuration for measurements annotation scale and precision through the following callback
 *
 * @example
 * Configure a custom scale and pass it to our viewer.
 * ```ts
 *
 * const customScales = [
 *   {
 *     scale: {
 *       unitFrom: NutrientViewer.MeasurementScaleUnitFrom.CENTIMETERS,
 *       unitTo: NutrientViewer.MeasurementScaleUnitTo.METERS,
 *       fromValue: 1,
 *       toValue: 2
 *     },
 *     precision: NutrientViewer.MeasurementPrecision.FOUR,
 *     selected: true
 *   }
 * ];
 *
 * NutrientViewer.load({
 *   // Other options.
 *   measurementValueConfiguration: (documentScales) => {
 *     return [...customScales, ...documentScales];
 *   }
 * });
 * ```
 *
 * @see {@link NutrientViewer.MeasurementScale}
 * @see {@link NutrientViewer.MeasurementPrecision}
 */
export declare type MeasurementValueConfigurationCallback = (configuration: MeasurementValueConfiguration[]) => MeasurementValueConfiguration[];

/**
 * @class
 * Media Annotations specifies a region of a page upon which media clips may be played.
 *
 * With the Nutrient Web SDK you can display and delete Media Annotations, meanwhile creating them is not supported.
 * @summary Display a media file in a document.
 */
export declare class MediaAnnotation extends Annotation<IMediaAnnotation> {
  /**
   * A description of the media content.
   */
  description: null | string;
  /**
   * The file name of the attached file.
   */
  fileName: null | string;
  /**
   * The content type of the connected attachment data. We expect it to be a MIME type (mp4, video, etc..).
   */
  contentType: string | null;
  /**
   * The attachment identifier of the media. It holds the media data as binary.
   */
  mediaAttachmentId: string | null;
  static readableName: string;
}

declare class MediaAnnotationSerializer extends AnnotationSerializer {
  annotation: MediaAnnotation;
  constructor(annotation: MediaAnnotation);
  toJSON(): Serializers.MediaAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<Serializers.MediaAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): MediaAnnotation;
}

export declare type MentionableUser = {
  /** The unique ID of the user. */
  id: string;
  /** The name of the user. */
  name: string;
  /** The URL of the user's avatar. */
  avatarUrl?: string;
  /** The display name of the user. */
  displayName: string;
  /**
   * The description of the user. This is shown in the mention list.
   * If you want to show the email, you can pass it here.
   */
  description?: string;
};

/**
 * Returns a copy of the collection with the remaining collections merged in.
 *
 * A functional alternative to `collection.merge()` which will also work with
 * plain Objects and Arrays.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { merge } = require('immutable')
 * const original = { x: 123, y: 456 }
 * merge(original, { y: 789, z: 'abc' }) // { x: 123, y: 789, z: 'abc' }
 * console.log(original) // { x: 123, y: 456 }
 * ```
 */
declare function merge<C>(
collection: C,
...collections: Array<Iterable<any> | Iterable<[any, any]> | {[key: string]: any;}>)
: C;

/**
 * Returns a copy of the collection with the remaining collections merged in
 * deeply (recursively).
 *
 * A functional alternative to `collection.mergeDeep()` which will also work
 * with plain Objects and Arrays.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { mergeDeep } = require('immutable')
 * const original = { x: { y: 123 }}
 * mergeDeep(original, { x: { z: 456 }}) // { x: { y: 123, z: 456 }}
 * console.log(original) // { x: { y: 123 }}
 * ```
 */
declare function mergeDeep<C>(
collection: C,
...collections: Array<Iterable<any> | Iterable<[any, any]> | {[key: string]: any;}>)
: C;

/**
 * Returns a copy of the collection with the remaining collections merged in
 * deeply (recursively), calling the `merger` function whenever an existing
 * value is encountered.
 *
 * A functional alternative to `collection.mergeDeepWith()` which will also
 * work with plain Objects and Arrays.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { mergeDeepWith } = require('immutable')
 * const original = { x: { y: 123 }}
 * mergeDeepWith(
 *   (oldVal, newVal) => oldVal + newVal,
 *   original,
 *   { x: { y: 456 }}
 * ) // { x: { y: 579 }}
 * console.log(original) // { x: { y: 123 }}
 * ```
 */
declare function mergeDeepWith<C>(
merger: (oldVal: any, newVal: any, key: any) => any,
collection: C,
...collections: Array<Iterable<any> | Iterable<[any, any]> | {[key: string]: any;}>)
: C;

/**
 * Returns a copy of the collection with the remaining collections merged in,
 * calling the `merger` function whenever an existing value is encountered.
 *
 * A functional alternative to `collection.mergeWith()` which will also work
 * with plain Objects and Arrays.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { mergeWith } = require('immutable')
 * const original = { x: 123, y: 456 }
 * mergeWith(
 *   (oldVal, newVal) => oldVal + newVal,
 *   original,
 *   { y: 789, z: 'abc' }
 * ) // { x: 123, y: 1245, z: 'abc' }
 * console.log(original) // { x: 123, y: 456 }
 * ```
 */
declare function mergeWith<C>(
merger: (oldVal: any, newVal: any, key: any) => any,
collection: C,
...collections: Array<Iterable<any> | Iterable<[any, any]> | {[key: string]: any;}>)
: C;

declare function MiscellaneousMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * **NOTE** This method is only available with Nutrient Instant.
     *
     * Use this method to obtain an up-to-date list of the current connected instance clients.
     *
     * The return value is an {@link https://facebook.github.io/immutable-js/docs/#/Map | Immutable.Map},
     * which can be used like the regular ES2015 Map.
     *
     * The {@link NutrientViewer.EventName.INSTANT_CONNECTED_CLIENTS_CHANGE | "instant.connectedClients.change"} event will be triggered, whenever
     * a new client will connect to the document, or a current client will disconnect. The event
     * will always include the full up-to-date list of the currently connected clients (the same
     * that would be returned when you call this method).
     *
     * @example
     * Find out how many total clients are currently connected
     * ```ts
     * instance.connectedClients.count();
     * ```
     *
     * @example
     * Find out how many distinct users are currently connected
     * ```ts
     * instance.connectedClients.groupBy(c => c.userId).count();
     * ```
     *
     * @example
     * Find out how many anonymous clients are currently connected
     * ```ts
     * instance.connectedClients.filter(c => !c.userId).count();
     * ```
     *
     * @returns An {@link NutrientViewer.Immutable.Map} of the connected clients.
     */
    readonly connectedClients: Map_2<string, InstantClient>;
    /**
     * Enable actions like cut, copy, paste and duplicate for annotations using keyboard shortcuts `Cmd/Ctrl+X`, `Cmd/Ctrl+C`, `Cmd/Ctrl+V` and `Cmd/Ctrl+D` respectively.
     *
     * @param enabled - Whether to enable/disable the clipboard actions.
     */
    toggleClipboardActions(enabled: boolean): void;
    /**
     * Allows the user to toggle the snapping behavior while creation of measurement annotations. The snapping points are the points are a combination of endpoints, midpoints and intersections.
     *
     * @param enabled - Whether to enable/disable snapping behaviour for creation of measurement annotations.
     */
    setMeasurementSnapping(enabled: boolean): void;
    /**
     * Set the precision value of all the newly created measurement annotations.
     *
     * @example
     * instance.setMeasurementPrecision(NutrientViewer.MeasurementPrecision.THREE);
     *
     * @param precision - Precision value
     */
    setMeasurementPrecision(precision: IMeasurementPrecision): void;
    /**
     * Set the default value of scale for all newly created measurement annotations.
     *
     * @example
     * instance.setMeasurementScale(new NutrientViewer.MeasurementScale({
     *   unitFrom: NutrientViewer.MeasurementScaleUnitFrom.CENTIMETERS,
     *   unitTo: NutrientViewer.MeasurementScaleUnitTo.INCHES,
     *   fromValue: 1,
     *   toValue: 2,
     * }));
     *
     * @param scale - Scale value
     */
    setMeasurementScale(scale: MeasurementScale): void;
    setMeasurementValueConfiguration(configurationCallback: MeasurementValueConfigurationCallback): void;
    /**
     * Given a list of rects and their page index, extracts the text intersecting them. This can be
     * useful to get the text that overlaps a focused annotation to give more context to screen reader users.
     *
     * Warning: The computed text might be partial as we just look behind the absolute coordinates of
     * a rect to see what text it is intersecting.
     *
     * @example
     * Get the text of all ink annotations on the first page:
     * ```ts
     * const annotations = await instance.getAnnotations(0);
     * const inkAnnotationsRects = annotations.filter(
     *   annotation => annotation instanceof NutrientViewer.Annotations.InkAnnotation
     * ).map(annotation => annotation.boundingBox);
     * const text = await instance.getTextFromRects(0, inkAnnotationsRects);
     * console.log(text);
     * ```
     *
     * @param pageIndex - The page index where the rects are located
     * @param rects - An immutable list of rects
     * @returns The text that intersect the rects.
     */
    getTextFromRects(pageIndex: number, rects: List<Rect>): Promise<string>;
    /**
     * Extracts the text behind a {@link NutrientViewer.Annotations.MarkupAnnotation}. This can be
     * useful to get the highlighted text.
     *
     * Warning: This is only an approximation. Highlighted text might not always 100% represent the
     * text, as we just look behind the absolute coordinates to see what text is beneath. PDF
     * highlight annotations are not markers in the content itself.
     *
     * @example
     * Get the text of all text markup annotations on the first page:
     * ```ts
     * const annotations = await instance.getAnnotations(0);
     * const markupAnnotations = annotations.filter(
     *   annotation => annotation instanceof NutrientViewer.Annotations.MarkupAnnotation
     * );
     * const text = await Promise.all(
     *   markupAnnotations.map(instance.getMarkupAnnotationText)
     * );
     * console.log(text);
     * ```
     *
     * @param annotation - The text markup annotation you want to extract the text behind.
     * @returns The text behind the annotation.
     */
    getMarkupAnnotationText(annotation: TextMarkupAnnotationsUnion): Promise<string>;
    /**
     * Load all {@link TextLine}s for the specified `pageIndex`. If there is no page
     * at the given index, the list will be empty.
     *
     * @param pageIndex - The index of the page you want to extract text from.
     * @returns A promise that resolves the text lines of the given page.
     */
    textLinesForPageIndex(pageIndex: number): Promise<List<TextLine>>;
    /**
     * Returns the current {@link DocumentPermissions} of the document.
     *
     * @example
     * const permissions = await instance.getDocumentPermissions();
     *
     * @returns A Promise resolving to an object containing the {@link DocumentPermissions | document permissions} keys along with their status (`true` or `false`).
     */
    getDocumentPermissions(): Promise<Record<IDocumentPermissions, boolean>>;
    /**
     * The current zoom level. This will be either the number set in the current
     * {@link ViewState} or calculated using the {@link ZoomMode}.
     */
    readonly currentZoomLevel: number;
    /**
     * The current annotation creator name. This is set using {@link Instance#setAnnotationCreatorName | `instance.setAnnotationCreatorName()`}.
     */
    readonly annotationCreatorName: string | null;
    /**
     * The maximum zoom level. This value depends on the current viewport and page dimensions.
     * Defaults to `10` but can be bigger so that the `FIT_TO_WIDTH` and `FIT_TO_VIEWPORT`
     * {@link ZoomMode}s always fit.
     */
    readonly maximumZoomLevel: number;
    /**
     * The minimum zoom level. This value depends on the current viewport and page dimensions.
     * Defaults to `0.5` but can be bigger so that the `FIT_TO_WIDTH` and `FIT_TO_VIEWPORT`
     * {@link ZoomMode}s always fit.
     */
    readonly minimumZoomLevel: number;
    readonly zoomStep: number;
    /**
     * Whether to disable snapping to points when creating annotations
     * for measurement tools
     *
     * @example
     * instance.setViewState(viewState => viewState.set('disablePointSnapping', true))
     */
    readonly disablePointSnapping: boolean;
    /**
     * Registers an event listener for a specific event type.
     *
     * Use this method to listen for changes and actions within the viewer, such as annotation updates,
     * page navigation, form field changes, and more. Each supported event type is associated with a
     * specific handler signature, ensuring type safety and clarity.
     *
     * A list of all supported events can be found in {@link NutrientViewer.EventName}.
     *
     * ##### Usage Notes
     * - The `action` parameter must be one of the supported event names listed above.
     * - The `listener` parameter must match the corresponding event listener type for the event.
     * - You can register multiple listeners for the same event.
     * - To remove a listener, use {@link Instance#removeEventListener} with the same function reference.
     * - The event system is modeled after the DOM API: removing a listener requires the exact same function reference as was used for registration.
     *
     * If you attempt to register a listener for an unsupported event, a {@link NutrientViewer.Error} will be thrown.
     *
     * @example
     * Registering a listener for a view state change
     * ```ts
     * instance.addEventListener("viewState.change", (viewState) => {
     *   console.log(viewState.toJS());
     * });
     * ```
     *
     * @example
     * Handling an unknown event (throws an error)
     * ```ts
     * try {
     *   instance.addEventListener("doesnotexist", () => {});
     * } catch (error) {
     *   (error instanceof NutrientViewer.Error); // => true
     * }
     * ```
     *
     * @typeParam K - The event name to listen for. Must be a key of {@link Events.EventNameToHandlerMap}.
     * @param action - The event name to listen for. See the table above for supported values.
     * @param listener - The function to be called when the event is emitted.
     * @throws {NutrientViewer.Error} If the supplied event name is not valid.
     */
    addEventListener<K extends keyof Events.EventNameToHandlerMap>(action: K, listener: Events.EventNameToHandlerMap[K]): void;
    /**
     * This method can be used to remove an event listener registered via
     * {@link Instance#addEventListener}.
     *
     * It requires the same reference to the function that was used when registering the function
     * (equality will be verified the same way as it is in the DOM API).
     *
     * @example
     * Proper approach - Use the same reference for registering and removing
     * ```ts
     * const callback = someFunction.bind(this)
     * instance.addEventListener("viewState.zoom.change", callback);
     * instance.removeEventListener("viewState.zoom.change", callback);
     * ```
     *
     * @example
     * Wrong approach - Creates two different functions
     * ```ts
     * instance.addEventListener("viewState.zoom.change", someFunction.bind(this));
     * // This will not work because `Function#bind()` will create a new function!
     * instance.removeEventListener("viewState.zoom.change", someFunction.bind(this));
     * ```
     *
     * @throws {Error} Will throw an error when the supplied event is not valid.
     * @param action - The action you want to add an event listener to. See the list
     *   on {@link Instance#addEventListener} for possible event types.
     * @param listener - A listener function.
     */
    removeEventListener<K_1 extends keyof Events.EventNameToHandlerMap>(action: K_1, listener: Events.EventNameToHandlerMap[K_1]): void;
    /**
     * Brings the rect (in PDF page coordinates) into the viewport. This function will not change
     * the zoom level.
     *
     * This can be used to scroll to specific annotations or search results.
     *
     * @example
     * Jump to the ink annotation
     * ```ts
     * instance.jumpToRect(inkAnnotation.pageIndex, inkAnnotation.boundingBox);
     * ```
     *
     * @throws {Error} Will throw an error when the supplied arguments is not valid.
     * @param pageIndex - The index of the page you want to have information about. If none
     *   is provided, the first page (pageIndex `0`) will be used.
     * @param rect - The rect in PDF page coordinates that you want to jump to.
     */
    jumpToRect(pageIndex: number, rect: Rect): void;
    /**
     * Brings the rect (in PDF page coordinates) into the viewport. This
     * function will also change the zoom level so that the rect is visible
     * completely in the best way possible.
     *
     * @example
     * Jump and zoom to the ink annotation
     * ```ts
     * instance.jumpAndZoomToRect(inkAnnotation.pageIndex, inkAnnotation.boundingBox);
     * ```
     *
     * @throws {Error} Will throw an error when the supplied arguments
     * are not valid.
     * @param pageIndex - The index of the page you want to have information about. If none is provided, the first page (pageIndex `0`) will be used.
     * @param rect - The rect in PDF page coordinates that you want to jump to.
     */
    jumpAndZoomToRect(pageIndex: number, rect: Rect): void;
    /**
     * Transforms a {@link NutrientViewer.Geometry.Point} or a {@link NutrientViewer.Geometry.Rect} from the
     * client space inside the content frame to the PDF page space.
     *
     * The content client space is relative to the NutrientViewer mounting container and the same
     * coordinates that you receive by DOM APIs like `Element.getBoundingClientRect()` or
     * `MouseEvent.clientX`, etc. that originate within the Nutrient Web SDK's iframe.
     *
     * Use this transform when you receive events inside the content frame.
     *
     * @throws {Error} Will throw an error when the supplied arguments is not valid.
     * @param rectOrPoint - The rectangle or point that needs to be transformed
     *   that needs to be transformed
     * @param pageIndex - The index of the page you want to have information about. If none is provided, the first page (pageIndex `0`) will be used.
     * @returns The transformed point or rectangle.
     */
    transformContentClientToPageSpace<T extends Point | Rect>(rectOrPoint: T, pageIndex: number): T;
    /**
     * Transforms a {@link NutrientViewer.Geometry.Point} or a {@link NutrientViewer.Geometry.Rect} from the
     * PDF page space to the client space inside the content frame.
     *
     * The content client space is relative to the NutrientViewer mounting container and the same
     * coordinates that you receive by DOM APIs like `Element.getBoundingClientRect()` or
     * `MouseEvent.clientX`, etc. that originate within the Nutrient Web SDK's iframe.
     *
     * Use this transform when you want to position elements inside the NutrientViewer content frame.
     *
     * @throws {Error} Will throw an error when the supplied arguments is not valid.
     * @param rectOrPoint - The rectangle or point that needs to be transformed
     *   that needs to be transformed
     * @param pageIndex - The index of the page you want to have information about. If none is provided, the first page (pageIndex `0`) will be used.
     * @returns The transformed point or rectangle.
     */
    transformContentPageToClientSpace<T_1 extends Point | Rect>(rectOrPoint: T_1, pageIndex: number): T_1;
    /**
     * Transforms a {@link NutrientViewer.Geometry.Point} or a {@link NutrientViewer.Geometry.Rect} from the
     * client space inside the main frame to the PDF page space.
     *
     * The client space is relative to your HTML viewport and the same coordinates that you receive
     * by DOM APIs like `Element.getBoundingClientRect()` or `MouseEvent.clientX`, etc.
     *
     * Use this transform when you receive events inside the main frame (The `document` of your
     * application).
     *
     * Note: If you apply a CSS scale transformation to the mounting node of Nutrient Web SDK, this
     * calculation will not work. In this case make sure to manually scale afterwards.
     *
     * @throws {Error} Will throw an error when the supplied arguments is not valid.
     * @param rectOrPoint - The rectangle or point that needs to be transformed
     *   that needs to be transformed
     * @param pageIndex - The index of the page you want to have information about. If none is provided, the first page (pageIndex `0`) will be used.
     * @returns The transformed point or rectangle.
     */
    transformClientToPageSpace<T_2 extends Point | Rect>(rectOrPoint: T_2, pageIndex: number): T_2;
    /**
     * Transforms a {@link NutrientViewer.Geometry.Point} or a {@link NutrientViewer.Geometry.Rect} from the
     * PDF page space to the client space inside the main frame.
     *
     * The client space is relative to your HTML viewport and the same coordinates that you receive
     * by DOM APIs like `Element.getBoundingClientRect()` or `MouseEvent.clientX`, etc.
     *
     * Use this transform when you want to position elements inside the main frame.
     *
     * Note: If you apply a CSS scale transformation to the mounting node of Nutrient Web SDK, this
     * calculation will not work. In this case make sure to manually scale afterwards.
     *
     * @throws {Error} Will throw an error when the supplied arguments is not valid.
     * @param rectOrPoint - The rectangle or point that needs to be transformed
     *   that needs to be transformed
     * @param pageIndex - The index of the page you want to have information about. If none is provided, the first page (pageIndex `0`) will be used.
     * @returns The transformed point or rectangle.
     */
    transformPageToClientSpace<T_3 extends Point | Rect>(rectOrPoint: T_3, pageIndex: number): T_3;
    /**
     * Transforms a raw PDF bounding rect from the PDF page space to NutrientViewer's page space.
     *
     * Use this transform when you want to manage entities using their raw, original coordinates
     * and dimensions according to the PDF spec (e.g. from a XFDF file).
     *
     * @throws {Error} Will throw an error when the supplied arguments is not valid.
     * @param rawInset - The inset to be transformed
     * @param pageIndex - The index of the page you want to have information about.
     * @returns The resulting transformed rectangle.
     */
    transformRawToPageSpace(rawInset: InsetJSON | Inset, pageIndex: number): Rect;
    /**
     * Transforms a NutrientViewer page space bounding box to a raw PDF bounding rect.
     *
     * A raw PDF bounding rect is an array of inset values: `[left, bottom, right, top]`,
     * in PDF page space units (as opposted to NutrientViewer page units) where the `top` and `bottom`
     * coordinates are actually relative to the distance to the bottom of the page.
     *
     * Use this transform when you want to manage document entities with external tools.
     *
     * @throws {Error} Will throw an error when the supplied arguments is not valid.
     * @param rect - The rectangle to be transformed
     * @param pageIndex - The index of the page you want to have information about.
     * @returns The resulting transformed rectangle as inset coordinates.
     */
    transformPageToRawSpace(rect: Rect, pageIndex: number): Inset;
    /**
     * Exports the document converted to the specified output format as an `ArrayBuffer`. This can be used to download the resulting file.
     *
     * An `options` object should be passed to the method with a `format` property
     * set to one of the supported conversion output formats: {@link OfficeDocumentFormat}.
     *
     * @example
     * Download as DOCX
     * ```ts
     * instance.exportOffice({ format: NutrientViewer.OfficeDocumentFormat.docx })
     *   .then(function (buffer) {
     *     const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
     *     const objectUrl = window.URL.createObjectURL(blob);
     *     downloadPdf(objectUrl);
     *     window.URL.revokeObjectURL(objectUrl);
     *   });
     *
     * function downloadPdf(blob) {
     *   const a = document.createElement("a");
     *   a.href = blob;
     *   a.style.display = "none";
     *   a.download = "download.docx";
     *   a.setAttribute("download", "download.docx");
     *   document.body.append(a);
     *   a.click();
     *   a.remove();
     * }
     * ```
     *
     * @param options - Export options object.
     * @returns The binary contents of the PDF.
     */
    exportOffice(options: ExportOfficeFlags): Promise<ArrayBuffer>;
    /**
     * Exports the PDF contents as an `ArrayBuffer`. This can be used to download the PDF.
     *
     * If the document is digitally signed and the license includes the Digital Signatures component,
     * the method will export the document incrementally saved by default, so as not to corrupt signed
     * data. Otherwise, it will be exported as fully saved by default.
     *
     * It's not possible to use `flatten` and `incremental` both set to `true` at the same time,
     * as flattening is a destructive operation that will necessarily modify the provided document.
     *
     * Please see {@link https://www.nutrient.io/guides/web/current/features/document-processing/|this guide article} for more information and examples.
     *
     * @example
     * Export the PDF content
     * ```ts
     * instance.exportPDF().then(function (buffer) {
     *   buffer; // => ArrayBuffer
     * });
     * ```
     *
     * @example
     * Export the PDF with password and permissions
     * ```ts
     * instance.exportPDF({
     *    permissions: {
     *      userPassword: "123",
     *      ownerPassword: "123",
     *      documentPermissions: [NutrientViewer.DocumentPermissions.annotationsAndForms]
     *    }
     * }).then(function (buffer) {
     *   buffer; // => ArrayBuffer
     * });
     * ```
     *
     * @example
     * Download the PDF by using an `&lt;a&gt;` tag
     * ```ts
     * instance.exportPDF().then(function(buffer) {
     *   const supportsDownloadAttribute = HTMLAnchorElement.prototype.hasOwnProperty(
     *     "download"
     *   );
     *   const blob = new Blob([buffer], { type: "application/pdf" });
     *   if (navigator.msSaveOrOpenBlob) {
     *     navigator.msSaveOrOpenBlob(blob, "download.pdf");
     *   } else if (!supportsDownloadAttribute) {
     *     const reader = new FileReader();
     *     reader.onloadend = function() {
     *       const dataUrl = reader.result;
     *       downloadPdf(dataUrl);
     *     };
     *     reader.readAsDataURL(blob);
     *   } else {
     *     const objectUrl = window.URL.createObjectURL(blob);
     *     downloadPdf(objectUrl);
     *     window.URL.revokeObjectURL(objectUrl);
     *   }
     * });
     * function downloadPdf(blob) {
     *   const a = document.createElement("a");
     *   a.href = blob;
     *   a.style.display = "none";
     *   a.download = "download.pdf";
     *   a.setAttribute("download", "download.pdf");
     *   document.body.appendChild(a);
     *   a.click();
     *   document.body.removeChild(a);
     * }
     * ```
     *
     * @param flags - Export options object.
     * @returns The binary contents of the PDF.
     */
    exportPDF(flags?: ExportPDFFlags): Promise<ArrayBuffer>;
    /**
     * [XFDF](https://en.wikipedia.org/wiki/Portable_Document_Format#XML_Forms_Data_Format_(XFDF)) can be
     * used to instantiate a viewer with a diff that is applied to the raw PDF. This format can be
     * used to store annotation and form field value changes on your server and conveniently
     * instantiate the viewer with the same content at a later time.
     *
     * Instead of storing the updated PDF, this serialization only contains a diff that is applied
     * on top of the existing PDF and thus allows you to cache the PDF and avoid transferring a
     * potentially large PDF all the time.
     *
     * This method is used to export the current annotations as XFDF. Use
     * {@link Configuration#XFDF} to load it.
     *
     * For Server-Backed setups, only [saved](https://www.nutrient.io/guides/web/current/annotations/annotation-saving-mechanism/)
     * annotations will be exported.
     *
     * @example
     * instance.exportXFDF().then(function (xmlString) {
     *   // Persist it to a server
     *   fetch("https://example.com/annotations", {
     *     "Content-Type": "application/vnd.adobe.xfdf",
     *     method: "POST",
     *     body: xmlString
     *   }).then(...);
     * });
     *
     * @param ignorePageRotation - Optional flag to ignore page rotation when exporting XFDF, by default false.
     * This means that the exported XFDF will contain the annotations in the same orientation as the page and if you
     * import this XFDF using {@link Configuration#XFDFIgnorePageRotation} the annotations will be imported in the same orientation
     * no matter the page rotation.
     * @returns XFDF as a plain text.
     */
    exportXFDF(ignorePageRotation?: boolean): Promise<string>;
    /**
     * Print the document programmatically.
     *
     * @param options - Print options object.
     * @throws {NutrientViewer.Error} This method will throw when printing is disabled, currently in
     *   process or when an invalid {@link NutrientViewer.PrintMode} was supplied.
     */
    print(options?: IPrintMode | {
      /**Optional print mode. See {@link NutrientViewer.PrintMode} */
      mode?: IPrintMode;
      /**
       * Whether to exclude annotations from the printout.
       *
       * @default false
       */
      excludeAnnotations?: boolean;
    }): void;
    /**
     * Sets the annotation creator name.
     * Each created annotation will have the creators name set in the author property.
     */
    setAnnotationCreatorName(annotationCreatorName?: string | null): void;
    /**
     * Sets the current custom renderers.
     * When this function is called with a new {@link CustomRenderers} object,
     * all visible custom rendered annotations are immediately updated.
     */
    setCustomRenderers(customRenderers: CustomRenderers): void;
    /**
     * Sets the current custom UI configuration.
     * When this function is called with a new {@link CustomUI} object,
     * all visible sidebars are immediately updated.
     *
     * @param customUIConfigurationOrCustomUIConfigurationSetter - The custom UI configuration or the custom UI configuration setter.
     */
    setCustomUIConfiguration(customUIConfigurationOrCustomUIConfigurationSetter: CustomUIConfigurationSetter | Partial<Record<"Sidebar", Partial<{
      [x: string & {}]: Renderer;
      CUSTOM: Renderer;
      ANNOTATIONS: Renderer;
      BOOKMARKS: Renderer;
      DOCUMENT_OUTLINE: Renderer;
      THUMBNAILS: Renderer;
      SIGNATURES: Renderer;
      LAYERS: Renderer;
      ATTACHMENTS: Renderer;
    }>>>): void;
    /**
     * You can use this callback to set/modify the toolbar items present in the inline toolbar
     * after the document has loaded.
     *
     * The callback will receive the
     * default items of the inline toolbar and the text that is currently selected {@link NutrientViewer.TextSelection}
     *
     * You can do the following modifications using this API:
     *
     * - Add new items.
     * - Remove existing items.
     * - Change the order of the items.
     * - Customise each item eg change the `icon` of the a default toolbar item.
     *
     * You can also use the `hasDesktopLayout` flag provided to the callback to determine if the current UI is being rendered on
     * mobile or desktop. Based on that, you can implement different designs for Desktop and Mobile.
     *
     * This callback gets called every time the inline toolbar is mounted.
     *
     * @example
     * Add a custom button and a custom node to the toolbar.
     * ```ts
     * instance.setInlineTextSelectionToolbarItems(({ defaultItems, hasDesktopLayout }, selection) => {
     *  console.log(selection)
     *  if (hasDesktopLayout) {
     *    const node = document.createElement("div");
     *    node.innerText = "Custom Item";
     *      return [
     *        ...defaultItems,
     *        {
     *          type: "custom",
     *          id: "custom-1",
     *          node: node,
     *          className: "Custom-Node",
     *          onPress: () => alert("Custom node pressed!"),
     *        },
     *        {
     *          type: "custom",
     *          id: "custom-2",
     *          title: "custom-button-2",
     *          onPress: () => alert("Custom item pressed!"),
     *        },
     *      ];
     *     }
     *    return defaultItems
     *   });
     * ```
     *
     * @public
     * @param inlineTextSelectionToolbarItemsCallback - The callback to set the inline text selection toolbar items.
     */
    setInlineTextSelectionToolbarItems(inlineTextSelectionToolbarItemsCallback: InlineTextSelectionToolbarItemsCallback): void;
    /**
     * Aborts the current print job.
     *
     * @throws {Error} This method will throw when printing is disabled or no printing is currently being processed.
     */
    abortPrint(): void;
    /**
     * Returns the document outline (table of content).
     *
     * @returns A promise that resolves to a {@link NutrientViewer.Immutable.List} of {@link NutrientViewer.OutlineElement}
     */
    getDocumentOutline(): Promise<List<OutlineElement>>;
    /**
     * Sets the document outline (table of content).
     *
     * @standalone
     * @public
     * @param outline - The outline to set.
     * @returns A promise that resolves when the outline has been set.
     */
    setDocumentOutline(outline: List<OutlineElement>): Promise<void>;










    /**
     * Returns the {@link PageInfo} for the specified page index.
     * If there is no page at the given index, returns `null`.
     *
     * @example
     * // Get information about the first page
     * const info = instance.pageInfoForIndex(0);
     * if (info) {
     *   console.log(info.width, info.height);
     * }
     *
     * @public
     * @param pageIndex - The index of the page you want to have information about
     * @returns The {@link PageInfo} or `null`.
     */
    pageInfoForIndex(pageIndex: number): PageInfo | null;
    /**
     * The total number of pages in the current document.
     *
     * @example
     * // Log the total number of pages
     * console.log(instance.totalPageCount);
     */
    readonly totalPageCount: number;










    /**
     * Access the shadow root object of the Nutrient Web SDK's viewer. This can be used to quickly
     * interact with elements (using our public CSS API) inside the viewer.
     *
     * When the iframe fallback is set, this property provides access the `document` object of
     * the Nutrient Web SDK's viewer frame instead.
     *
     * @example
     * instance.contentDocument.addEventListener("mouseup", handleMouseUp);
     */
    readonly contentDocument: Document | ShadowRoot;
    /**
     * Access the `window` object of the Nutrient Web SDK's viewer frame. This can be used to quickly
     * interact with elements (using our public CSS API) inside the viewer.
     *
     * @example
     * instance.contentWindow.location;
     */
    readonly contentWindow: Window;
    /**
     * Sets the OCG visibility state.
     *
     * This method takes an {@link OCGLayersVisibilityState} object as an argument, which contains
     * a `visibleLayerIds` `Array` that contains the list of layers identified by their `ocgId`, and
     * makes them visible, hiding any other layers not included in the `Array`.
     *
     * @example
     * instance.setLayersVisibilityState({
     *   visibleLayerIds: [1, 2, 3]
     * })
     *
     * @param layersVisibilityState - The OCG visibility state to set.
     * @returns A promise that resolves when the OCG visibility state has been set.
     */
    setLayersVisibilityState(layersVisibilityState: OCGLayersVisibilityState): Promise<void>;
    /**
     * Returns the current OCG layers visibility state.
     *
     * OCG layers are groups of content in the document, that can be shown or hidden independently.
     *
     * This method returns the current visibility state of the layers in the document as an object
     * with a `visibleLayerIds` `Array` that contains the list of layers identified by their `ocgId`
     * number, which are currently visible.
     *
     * @example
     * instance.getLayersVisibilityState().then(function (layersVisibilityState) {
     *  console.log(layersVisibilityState); // => { visibleLayerIds: [1, 2, 3] }
     * });
     *
     * @returns A promise that resolves to a {@link NutrientViewer.LayersVisibilityState}
     */
    getLayersVisibilityState(): Promise<OCGLayersVisibilityState>;
    /**
     * [Instant JSON](https://www.nutrient.io/guides/web/importing-exporting/instant-json/) can be
     * used to instantiate a viewer with a diff that is applied to the raw PDF. This format can be
     * used to store annotation and form field value changes on your server and conveniently
     * instantiate the viewer with the same content at a later time.
     *
     * Instead of storing the updated PDF, this serialization only contains a diff that is applied
     * on top of the existing PDF and thus allows you to cache the PDF and avoid transferring a
     * potentially large PDF all the time.
     *
     * This method is used to export the current annotations as Instant JSON. Use
     * {@link Configuration#instantJSON} to load it.
     *
     * `annotations` will follow the [Instant Annotation JSON format specification](https://www.nutrient.io/guides/server/current/api/json-format/).
     * `formFieldValues` will follow the [Instant Form Field Value JSON format specification](https://www.nutrient.io/guides/server/current/api/json-format/).
     *
     * Optionally a `version` argument can be provided to specify the Instant JSON version to use for exported annotations.
     *
     * For Server-Backed setups, only [saved](https://www.nutrient.io/guides/web/current/annotations/annotation-saving-mechanism/)
     * annotations will be exported.
     *
     * @example
     * instance.exportInstantJSON().then(function (instantJSON) {
     *   // Persist it to a server
     *   fetch("https://example.com/annotations", {
     *     "Content-Type": "application/json",
     *     method: "POST",
     *     body: JSON.stringify(instantJSON)
     *   }).then(...);
     * });
     *
     * @public
     * @param version - Optional Instant JSON version for annotations.
     * @returns Instant JSON as a plain JavaScript object.
     */
    exportInstantJSON(version?: number): Promise<InstantJSON>;




    /**
     * Set the UI customization config.
     * This method allows you to change the UI configuration of an already mounted instance.
     * The provided configuration will replace the previous configuration entirely.
     *
     * In case of partial updates, you should merge the previous configuration with new changes.
     *
     * Refer to {@link https://www.nutrient.io/guides/web/user-interface/ui-customization/set-ui/|this guide} for more information and examples.
     *
     * @example
     * instance.setUI({
     *  commentThread: () => ({
     *    render: () => {
     *      const div = document.createElement("div");
     *      div.innerText = "Custom Comment Thread";
     *      div.style.padding = "10px";
     *
     *      return div;
     *    }
     *  })
     * })
     *
     * @public
     * @instance
     * @function setUI
     * @memberof NutrientViewer.Instance
     * @param ui - The new UI configuration to set.
     */
    setUI(ui: UI): void;

  };
} & T;







declare const ModificationType: {
  /** The change was created. */
  readonly CREATED: "CREATED";
  /** The change was updated. */
  readonly UPDATED: "UPDATED";
  /** The change was deleted. */
  readonly DELETED: "DELETED";
};

declare interface MutableRefObject<T> {
  current: T;
}

/**
 * @class
 * PDF action to trigger a named action. This action is not implemented yet.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record | Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `action.set("action", "nextPage");`.
 * @example
 * Create a new NamedAction
 * ```ts
 * const action = new NutrientViewer.Actions.NamedAction({ action: "nextPage" });
 * ```
 *
 * @summary Trigger a named action.
 */
export declare class NamedAction extends Action {
  /**
   * The name of the action. This includes but is not limited to the following actions:
   *
   * Supported:
   * - `nextPage`
   * - `prevPage`
   * - `firstPage`
   * - `lastPage`
   * - `find`
   * - `print`
   * - `outline`
   * - `search`
   * - `zoomIn`
   * - `zoomOut`
   * - `saveAs`
   * - `fullScreen`
   *
   * Not supported:
   * - `goBack`
   * - `goForward`
   * - `goToPage`
   * - `brightness`
   * - `info`
   * - `close`
   * - `quit`
   */
  action: string;
  constructor(options?: INamedAction);
}

declare type NamedCustomAction = 'GoBack' | 'GoForward' | 'GoToPage' | 'Find' | 'Print' | 'Outline' | 'Search' | 'Brightness' | 'ZoomIn' | 'ZoomOut' | 'SaveAs' | 'Info' | 'FullScreen' | 'Close' | 'Quit';

/** @inline */
declare interface NodeAnnotationToolbarItem extends Omit<Shared, 'node'> {
  /**
   * ***required***
   *
   * The type of an annotation toolbar item.
   *
   * It can either be `custom` for user defined items, or one of the built-in annotation toolbar types.
   *
   * The built-in types are:
   *
   * - `stroke-color`
   * - `fill-color`
   * - `background-color`
   * - `opacity`
   * - `line-width`
   * - `line-style`
   * - `linecaps-dasharray`
   * - `blend-mode`
   * - `delete`
   * - `spacer`
   * - `annotation-note`
   * - `border-style`
   * - `border-width`
   * - `border-color`
   * - `apply-redactions`
   * - `color`
   * - `font`
   * - `outline-color`
   * - `overlay-text`
   * - `note-icon`
   *
   * Different annotations have different built-in toolbar items but all of them belong to the one mentioned above. If you pass a `type`
   * that isn't supported by an annotation, you will get an error.
   *
   * Note: It is ***not*** possible to override this option for built-in toolbar items.
   *
   * @example
   * NutrientViewer.load({
   *   ...otherOptions,
   *   annotationToolbarItems: (annotation, { defaultAnnotationToolbarItems }) => {
   *     return [...defaultAnnotationToolbarItems, { type: 'custom', ... }]
   *   }
   * });
   */
  type: IAnnotationToolbarType;
}

/**
 * @class
 * Note annotations are "sticky notes" attached to a point in the PDF document.
 * They are represented as markers and each of them as an icon associated to it.
 * Its text content is revealed on selection.
 *
 * <center>
 *   <img title="Example of a note annotation" src="img/annotations/note_annotation.png" width="350" class="shadow">
 * </center>
 * @example <caption>Create a note annotation</caption>
 * const annotation = new NutrientViewer.Annotations.NoteAnnotation({
 *   pageIndex: 0,
 *   text: { format: "plain", value : "Remember the milk" },
 *   boundingBox: new NutrientViewer.Geometry.Rect({ left: 10, top: 20, width: 30, height: 40 }),
 * });
 *
 * @summary A text note that will be rendered inside the bounding box.
 * @see {@link Instance#setEditingAnnotation}
 */
export declare class NoteAnnotation<T extends INoteAnnotation = INoteAnnotation> extends Annotation<T> {
  /**
   * The note contents in plain text formats.
   * We don't support rich text formatting in the text field.
   *
   * @default ""
   */
  text: {
    format: 'plain';
    value: string;
  };
  /**
   * The icon to represent the collapsed annotation in the document.
   *
   * @default {@link NutrientViewer.NoteIcon|NutrientViewer.NoteIcon.COMMENT}
   */
  icon: INoteIcon;
  /**
   * Background color that will fill the complete bounding box.
   *
   * @default new Color({ r: 255, g: 216, b: 63 }) - yellow
   */
  color: Color;
  static isEditable: boolean;
  static readableName: string;
}

/**
 * @deprecated Use {@link Serializers.NoteAnnotationJSON} instead.
 * @hidden
 */
export declare type NoteAnnotationJSON = Serializers.NoteAnnotationJSON;

declare class NoteAnnotationSerializer extends AnnotationSerializer {
  annotation: NoteAnnotation;
  constructor(annotation: NoteAnnotation);
  toJSON(): Serializers.NoteAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<Serializers.NoteAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): NoteAnnotation;
}

/**
 * Available icons for Note Annotations.
 *
 * @enum
 */
declare const NoteIcon: {
  readonly COMMENT: "COMMENT";
  readonly RIGHT_POINTER: "RIGHT_POINTER";
  readonly RIGHT_ARROW: "RIGHT_ARROW";
  readonly CHECK: "CHECK";
  readonly CIRCLE: "CIRCLE";
  readonly CROSS: "CROSS";
  readonly INSERT: "INSERT";
  readonly NEW_PARAGRAPH: "NEW_PARAGRAPH";
  readonly NOTE: "NOTE";
  readonly PARAGRAPH: "PARAGRAPH";
  readonly HELP: "HELP";
  readonly STAR: "STAR";
  readonly KEY: "KEY";
};

declare namespace NutrientViewer {
  export {
    Annotations,
    Immutable_2 as Immutable,
    Geometry,
    Actions,
    AnnotationPresets,
    FormFields,
    Comment_2 as Comment,
    Bookmark,
    CustomOverlayItem,
    OutlineElement,
    FormFieldValue,
    FormOption,
    Callout,
    ComparisonOperation,
    DocumentDescriptor,
    Instance,
    preloadWorker,
    convertToOffice,
    convertToPDF,
    load,
    populateDocumentTemplate,
    unload,
    loadTextComparison,
    build,
    PSPDFKitError as Error,
    PSPDFKitSaveError as SaveError,
    ViewState,
    TextLine,
    PageInfo,
    InstantClient,
    TextSelection,
    SearchResult,
    SearchState,
    HighlightState,
    AutoSaveMode,
    SignatureSaveMode,
    LayoutMode,
    PrintMode,
    PrintQuality,
    ScrollMode,
    ZoomMode,
    CommentDisplay,
    InteractionMode,
    InkEraserMode as unstable_InkEraserMode,
    SidebarMode,
    UIElement,
    Alignment,
    BlendMode,
    BorderStyle,
    LineCap,
    SidebarPlacement,
    SignatureAppearanceMode,
    ShowSignatureValidationStatusMode,
    NoteIcon,
    Theme,
    ToolbarPlacement,
    ElectronicSignatureCreationMode,
    _default as I18n,
    CertificateChainValidationStatus,
    DocumentIntegrityStatus,
    PAdESLevel,
    SignatureContainerType,
    SignatureType,
    SignatureValidationStatus,
    DocumentValidationStatus,
    AnnotationsWillChangeReason,
    DocumentComparisonSourceType,
    MeasurementScaleUnitFrom,
    MeasurementScaleUnitTo,
    EventName,
    MeasurementPrecision,
    MeasurementScale,
    ProductId,
    ProcessorEngine,
    Conformance,
    DocumentPermissionsEnum as DocumentPermissions,
    ComparisonOperationType,
    OfficeDocumentFormat,
    WheelZoomMode,
    SearchPattern,
    SearchType,
    UIDateTimeElement,
    AIComparisonOperationType,
    AIComparisonPhase,
    isAIDocumentAnalysisResult,
    isAIDocumentComparisonResult,
    isAIDocumentTaggingResult,
    viewStateFromOpenParameters,
    version,
    baseUrl,
    Color,
    defaultElectronicSignatureColorPresets,
    defaultToolbarItems,
    defaultDocumentEditorFooterItems,
    defaultDocumentEditorToolbarItems,
    defaultTextComparisonToolbarItems,
    defaultTextComparisonInnerToolbarItems,
    defaultAnnotationPresets,
    defaultStampAnnotationTemplates,
    defaultAnnotationsSidebarContent,
    _default_2 as defaultEditableAnnotationTypes,
    _default_3 as defaultElectronicSignatureCreationModes,
    _default_4 as defaultSigningFonts,
    Options,
    generateInstantId,
    Font,
    UI_2 as UI,
    Maui };

}













export declare type OCGLayersVisibilityState = {
  /** An array of visible layer IDs. */
  visibleLayerIds: number[];
};

/**
 * *** Standalone Only ***
 *
 * Options for exporting the document to PDF from an office format.
 *
 * Some properties are only used when exporting specific Office formats, such as XLSX or DOCX.
 *
 * @example
 * ```
 * const officeDocument = await fetch('example.xlsx').then(response => response.arrayBuffer())
 * NutrientViewer.convertToPDF(file, null, {
 *   splitExcelSheetsIntoPages: true,
 *   spreadsheetMaximumContentHeightPerSheet: 1000,
 *   spreadsheetMaximumContentWidthPerSheet: 50,
 * })
 * ```
 *
 * @example
 * ```
 * const officeDocument = await fetch('example.docx').then(response => response.arrayBuffer())
 * NutrientViewer.convertToPDF(file, null, {
 *   documentMarkupMode: 'original',
 * })
 * ```
 *
 * @standalone
 * @default { splitExcelSheetsIntoPages: false, documentMarkupMode: 'noMarkup' }
 */
export declare type OfficeConversionSettings = {
  /** If true, each sheet in the Excel document will be exported as a separate page in the PDF. */
  splitExcelSheetsIntoPages?: boolean;
  /** The maximum height of the content in a single sheet. If the content exceeds this height, it will be split into multiple pages. */
  spreadsheetMaximumContentHeightPerSheet?: number;
  /** The maximum width of the content in a single sheet. If the content exceeds this width, it will be split into multiple pages. */
  spreadsheetMaximumContentWidthPerSheet?: number;
  documentMarkupMode?: DocumentMarkupMode;
};

/**
 * Document conversion output formats.
 *
 * @enum
 */
export declare const OfficeDocumentFormat: {
  /** DOCX document format. */
  docx: string;
  /** XLSX document format. */
  xlsx: string;
  /** PPTX document format. */
  pptx: string;
};

/**
 * You can programmatically modify the properties of the comment just before it is created.
 *
 * @public
 * @param comment - The comment.
 * @example
 * Set default text of a Comment
 * ```ts
 * NutrientViewer.load({
 *   onCommentCreationStart: comment => comment.set('text', { format: 'xhtml', value: '<p>This comment has a default value</p>' })
 *   // ...
 * });
 * ```
 *

 */
export declare type OnCommentCreationStartCallback = (comment: Comment_2) => Comment_2;

/**
 * By default, all the URLs on which the user clicks explicitly open as expected but the URLs which open due to a result of JavaScript action are not opened due to security reasons.
 * You can override this behaviour using this callback. If this callback returns `true`, the URL will open.
 *
 * For more information, see {@link Configuration#onOpenURI}.
 *
 * @public
 * @param uri - The URL to open.
 * @param isUserInitiated - Tells you whether the URL is being opened because of user's interaction or not.
 * @example
 * Render rectangle annotations using their AP stream
 * ```ts
 * NutrientViewer.load({
 *   onOpenURI: (url, isUserInitiated) => {
 *     if (url.startsWith('https://abc.com') && isUserInitiated) {
 *       return true
 *     }
 *
 *     return false;
 *   }
 *   // ...
 * });
 * ```
 *

 */
export declare type OnOpenUriCallback = (uri: string, isUserInitiated: boolean) => boolean;

/**
 * You can programmatically modify the properties of the widget annotation and the associated form field just
 * before it is created via the form creator UI.
 *
 * @public
 * @param annotation - The widget annotation that is about to be created.
 * @param formField - The original form field that is associated with the widget annotation.
 * @example
 * Set the opacity of all widget annotations.
 * ```ts
 * NutrientViewer.load({
 *   onWidgetAnnotationCreationStart: (annotation, formField) => {
 *     return { annotation: annotation.set('opacity', 0.7) };
 *   }
 *   // ...
 * });
 * ```
 *

 */
export declare type OnWidgetAnnotationCreationStartCallback = (annotation: WidgetAnnotation, formField: FormField) => {
  annotation?: WidgetAnnotation;
  formField?: FormField;
};

/** @inline */
declare type OperationAttachment = string | File | Blob;

declare type OptimizationFlags = {
  documentFormat?: 'pdf' | 'pdfa';
  grayscaleText?: boolean;
  grayscaleGraphics?: boolean;
  grayscaleFormFields?: boolean;
  grayscaleAnnotations?: boolean;
  grayscaleImages?: boolean;
  disableImages?: boolean;
  mrcCompression?: boolean;
  imageOptimizationQuality?: 1 | 2 | 3 | 4;
  linearize?: boolean;
};

/**
 * Custom values for default options. These values will be frozen the first time
 * `NutrientViewer.load` is called, and won't be modifiable after that.
 *
 * @example
 * Set minimum ink annotation size.
 * ```ts
 * NutrientViewer.Options.MIN_INK_ANNOTATION_SIZE = 64;
 * NutrientViewer.load();
 * ```
 *
 * @namespace
 */
declare const Options: {
  /**
   * Minimum size of text annotations, in pixels.
   *
   * @default 5
   */
  MIN_TEXT_ANNOTATION_SIZE: number;
  /**
   * Minimum size of ink annotations, in pixels.
   *
   * @default 16
   */
  MIN_INK_ANNOTATION_SIZE: number;
  /**
   * Minimum size of shape annotations, in pixels.
   *
   * @default 16
   */
  MIN_SHAPE_ANNOTATION_SIZE: number;
  /**
   * Minimum size of image annotations, in pixels.
   *
   * @default 5
   */
  MIN_IMAGE_ANNOTATION_SIZE: number;
  /**
   * Minimum size of stamp annotations, in pixels.
   *
   * @default 15
   */
  MIN_STAMP_ANNOTATION_SIZE: number;
  /**
   * Minimum size of widget annotations, in pixels.
   *
   * @default 3
   */
  MIN_WIDGET_ANNOTATION_SIZE: number;
  /**
   * Enable smooth lines for ink annotations.
   *
   * @default true
   */
  ENABLE_INK_SMOOTH_LINES: boolean;
  /**
   * Minimum range between two points for an ink annotation, in pixels. If set to 0, the optimization is disabled.
   *
   * @default 10
   */
  INK_EPSILON_RANGE_OPTIMIZATION: number;
  /**
   * Saving strategy for ink signatures.
   *
   * @default NutrientViewer.SignatureSaveMode.USING_UI
   */
  SIGNATURE_SAVE_MODE: ISignatureSaveMode;
  /**
   * The default width of the sidebar on desktop browsers.
   *
   * @default 300
   */
  INITIAL_DESKTOP_SIDEBAR_WIDTH: number;
  /**
   * Enables all the features by ignoring the document permissions.
   *
   * @default false
   */
  IGNORE_DOCUMENT_PERMISSIONS: boolean;
  /**
   * Receives a {@link NutrientViewer.Geometry.Size} object with the current viewport dimensions (width and
   * height) and returns the padding that will be added between an annotation and the selection
   * outline in px.
   *
   * The default implementation will increase the outline padding on small devices.
   *
   * @param viewportSize
   */
  SELECTION_OUTLINE_PADDING: (viewportSize: Size) => number;
  /**
   * Receives a {@link Geometry.Size} object with the current viewport dimensions (width
   * and height) and returns the radius of the selection resize / modification anchors in px.
   *
   * The default implementation will increase the anchor radius on small device.
   *
   * @param viewportSize
   */
  RESIZE_ANCHOR_RADIUS: (viewportSize: Size) => number;
  /**
   * Stroke width of the selection outline rectangle in px.
   *
   * @default 2
   */
  SELECTION_STROKE_WIDTH: number;
  /**
   * Control whether NutrientViewer should adjust the font size
   * to fit the text in the annotation bounding box when exporting the annotation.
   *
   * @default true
   */
  TEXT_ANNOTATION_AUTOFIT_TEXT_ON_EXPORT: boolean;
  /**
   * Control whether NutrientViewer should adjust the text annotations' bounding box
   * to fit the text in the annotation when editing it.
   *
   * @default true
   */
  TEXT_ANNOTATION_AUTOFIT_BOUNDING_BOX_ON_EDIT: boolean;
  /**
   * Control whether NutrientViewer should adjust the font size when resizing text annotations
   * with the bottom right knob.
   *
   * @default true
   */
  TEXT_ANNOTATION_AUTOFIT_ON_BOTTOM_KNOB_RESIZE: boolean;
  /**
   * Disable all the NutrientViewer keyboard shortcuts.
   *
   * @default false
   */
  DISABLE_KEYBOARD_SHORTCUTS: boolean;
  /**
   * Set the default width of the ink eraser cursor.
   *
   * Note: setting the default width of the ink eraser cursor using this setting is now deprecated. Use the `inkEraserWidth` property of the `ink` annotation preset instead.
   *
   * @deprecated
   * @default false
   */
  DEFAULT_INK_ERASER_CURSOR_WIDTH: number;
  /**
   * The list of colors to use for color dropdowns in annotation toolbars.
   *
   * @deprecated
   * @default Red, Orange, Yellow, Green, Blue, Purple, Pink, Light Orange, Light Yellow, Light Green, Light Blue, Mauve, Transparent, White, Light Grey, Grey, Dark Grey, Black
   * @example
   * NutrientViewer.Options.COLOR_PRESETS = [
   * {
   *    color: new NutrientViewer.Color({ r: 255, g: 0, b: 0 }),
   *    localization: {
   *      id: "brightRed",
   *      defaultMessage: "Bright Red"
   *    }
   *  },
   * {
   *    color: new NutrientViewer.Color({ r: 0, g: 0, b: 180 }),
   *    localization: {
   *      id: "deepBlue",
   *      defaultMessage: "Deep Blue"
   *    }
   *  },
   * {
   *    color: new NutrientViewer.Color({ transparent: true }),
   *    localization: {
   *      id: "transparent",
   *      defaultMessage: "Transparent"
   *    }
   *  }
   * ];
   */
  COLOR_PRESETS: ColorPreset[];
  /**
   * The list of line caps to use for dropdowns in annotation toolbars.
   *
   * @default ["none", "square", "circle", "diamond", "openArrow", "closedArrow", "butt", "reverseOpenArrow", "reverseClosedArrow", "slash"]
   * @example
   * NutrientViewer.Options.LINE_CAP_PRESETS = ["openArrow", "closedArrow", "none"];
   */
  LINE_CAP_PRESETS: LineCapPresets[];
  /**
   * The list of line widths to use for dropdowns in annotation toolbars.
   *
   * @default null
   * @example
   * NutrientViewer.Options.LINE_WIDTH_PRESETS = [1, 2, 4, 8, 32];
   */
  LINE_WIDTH_PRESETS: number[] | null | undefined;
  /**
   * The list of colors to use in the text highlight annotation toolbar. You can't use transparent for this.
   *
   * @default Light Yellow, Light Blue, Light Green, Light Red
   * @example
   * NutrientViewer.Options.HIGHLIGHT_COLOR_PRESETS = [
   * {
   *    color: new NutrientViewer.Color({ r: 255, g: 0, b: 0 }),
   *    localization: {
   *      id: "brightRed",
   *      defaultMessage: "Bright Red"
   *    }
   *  },
   * {
   *    color: new NutrientViewer.Color({ r: 0, g: 0, b: 180 }),
   *    localization: {
   *      id: "deepBlue",
   *      defaultMessage: "Deep Blue"
   *    }
   *  }
   * ];
   */
  HIGHLIGHT_COLOR_PRESETS: ColorPreset[];
  /**
   * The list of colors to use in the text markup annotation toolbar.
   *
   * @default Black, Blue, Red, Green
   * @example
   * NutrientViewer.Options.TEXT_MARKUP_COLOR_PRESETS = [
   * {
   *    color: new NutrientViewer.Color({ r: 255, g: 0, b: 0 }),
   *    localization: {
   *      id: "brightRed",
   *      defaultMessage: "Bright Red"
   *    }
   *  },
   * {
   *    color: new NutrientViewer.Color({ r: 0, g: 0, b: 180 }),
   *    localization: {
   *      id: "deepBlue",
   *      defaultMessage: "Deep Blue"
   *    }
   *  }
   * ];
   */
  TEXT_MARKUP_COLOR_PRESETS: ColorPreset[];
  /**
   * The list of colors to use for note annotations. You can't pass transparent color as an option.
   *
   * @default Yellow, Orange, Red, Fuchsia, Blue, Green
   * @example
   * NutrientViewer.Options.NOTE_COLOR_PRESETS = [
   * {
   *    color: new NutrientViewer.Color({ r: 255, g: 0, b: 0 }),
   *    localization: {
   *      id: "brightRed",
   *      defaultMessage: "Bright Red"
   *    }
   *  },
   * {
   *    color: new NutrientViewer.Color({ r: 0, g: 0, b: 180 }),
   *    localization: {
   *      id: "deepBlue",
   *      defaultMessage: "Deep Blue"
   *    }
   *  }
   *  }
   * ];
   */
  NOTE_COLOR_PRESETS: ColorPreset[];
  /**
   * Enables PDF JavaScript support. PDF documents may contain JavaScript for interactivity.
   * This enables things like form validation, formatting, or automatic calculation which are performed by a JavaScript scripts
   * inside the PDF document.
   *
   * Disabling JavaScript improves the general performance of the framework when PDF JavaScript support is not needed.
   *
   * This feature is only available on standalone deployments for now.
   *
   * @standalone
   * @default true
   */
  PDF_JAVASCRIPT: boolean;
  /**
   * Internally our breakpoint logic is applied to singular toolbar buttons, not to the whole main toolbar.
   * The next two members allow to set custom breakpoints to control the toolbar buttons responsive mode.
   *
   * Specifies a viewport width breakpoint for medium screens used by some toolbar buttons to switch to responsive mode.
   *
   * @default 1070
   */
  BREAKPOINT_MD_TOOLBAR: number;
  /**
   * Specifies a viewport width breakpoint for small screens used by some toolbar buttons to switch to responsive mode.
   *
   * @default 768
   */
  BREAKPOINT_SM_TOOLBAR: number;
  /**
   * Specifies a viewport width breakpoint for secondary toolbar responsive mode. Beyond this breakpoint, the secondary toolbar will be displayed as a desktop toolbar
   * in its expanded state.
   *
   * @default 1070
   */
  ANNOTATION_TOOLBAR_RESPONSIVE_BREAKPOINT: number;
};

/**
 * Creates a new Immutable OrderedMap.
 *
 * Created with the same key value pairs as the provided Collection.Keyed or
 * JavaScript Object or expects a Collection of [K, V] tuple entries.
 *
 * The iteration order of key-value pairs provided to this constructor will
 * be preserved in the OrderedMap.
 *
 *     let newOrderedMap = OrderedMap({key: "value"})
 *     let newOrderedMap = OrderedMap([["key", "value"]])
 *
 * Note: `OrderedMap` is a factory function and not a class, and does not use
 * the `new` keyword during construction.
 */
declare function OrderedMap<K, V>(collection: Iterable<[K, V]>): OrderedMap<K, V>;

declare function OrderedMap<T>(collection: Iterable<Iterable<T>>): OrderedMap<T, T>;

declare function OrderedMap<V>(obj: {[key: string]: V;}): OrderedMap<string, V>;

declare function OrderedMap<K, V>(): OrderedMap<K, V>;

declare function OrderedMap(): OrderedMap<any, any>;

/**
 * A type of Map that has the additional guarantee that the iteration order of
 * entries will be the order in which they were set().
 *
 * The iteration behavior of OrderedMap is the same as native ES6 Map and
 * JavaScript Object.
 *
 * Note that `OrderedMap` are more expensive than non-ordered `Map` and may
 * consume more memory. `OrderedMap#set` is amortized O(log32 N), but not
 * stable.
 */

declare module OrderedMap {

  /**
   * True if the provided value is an OrderedMap.
   */
  function isOrderedMap(maybeOrderedMap: any): maybeOrderedMap is OrderedMap<any, any>;
}

declare interface OrderedMap<K, V> extends Map_2<K, V> {

  /**
   * The number of entries in this OrderedMap.
   */
  readonly size: number;

  /**
   * Returns a new OrderedMap also containing the new key, value pair. If an
   * equivalent key already exists in this OrderedMap, it will be replaced
   * while maintaining the existing order.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { OrderedMap } = require('immutable')
   * const originalMap = OrderedMap({a:1, b:1, c:1})
   * const updatedMap = originalMap.set('b', 2)
   *
   * originalMap
   * // OrderedMap {a: 1, b: 1, c: 1}
   * updatedMap
   * // OrderedMap {a: 1, b: 2, c: 1}
   * ```
   *
   * Note: `set` can be used in `withMutations`.
   */
  set(key: K, value: V): this;

  /**
   * Returns a new OrderedMap resulting from merging the provided Collections
   * (or JS objects) into this OrderedMap. In other words, this takes each
   * entry of each collection and sets it on this OrderedMap.
   *
   * Note: Values provided to `merge` are shallowly converted before being
   * merged. No nested values are altered.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { OrderedMap } = require('immutable')
   * const one = OrderedMap({ a: 10, b: 20, c: 30 })
   * const two = OrderedMap({ b: 40, a: 50, d: 60 })
   * one.merge(two) // OrderedMap { "a": 50, "b": 40, "c": 30, "d": 60 }
   * two.merge(one) // OrderedMap { "b": 20, "a": 10, "d": 60, "c": 30 }
   * ```
   *
   * Note: `merge` can be used in `withMutations`.
   *
   * @alias concat
   */
  merge<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): OrderedMap<K | KC, V | VC>;
  merge<C>(...collections: Array<{[key: string]: C;}>): OrderedMap<K | string, V | C>;
  concat<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): OrderedMap<K | KC, V | VC>;
  concat<C>(...collections: Array<{[key: string]: C;}>): OrderedMap<K | string, V | C>;

  // Sequence algorithms

  /**
   * Returns a new OrderedMap with values passed through a
   * `mapper` function.
   *
   *     OrderedMap({ a: 1, b: 2 }).map(x => 10 * x)
   *     // OrderedMap { "a": 10, "b": 20 }
   *
   * Note: `map()` always returns a new instance, even if it produced the same
   * value at every step.
   */
  map<M>(
  mapper: (value: V, key: K, iter: this) => M,
  context?: any)
  : OrderedMap<K, M>;

  /**
   * @see Collection.Keyed.mapKeys
   */
  mapKeys<M>(
  mapper: (key: K, value: V, iter: this) => M,
  context?: any)
  : OrderedMap<M, V>;

  /**
   * @see Collection.Keyed.mapEntries
   */
  mapEntries<KM, VM>(
  mapper: (entry: [K, V], index: number, iter: this) => [KM, VM],
  context?: any)
  : OrderedMap<KM, VM>;

  /**
   * Flat-maps the OrderedMap, returning a new OrderedMap.
   *
   * Similar to `data.map(...).flatten(true)`.
   */
  flatMap<KM, VM>(
  mapper: (value: V, key: K, iter: this) => Iterable<[KM, VM]>,
  context?: any)
  : OrderedMap<KM, VM>;

  /**
   * Returns a new OrderedMap with only the entries for which the `predicate`
   * function returns true.
   *
   * Note: `filter()` always returns a new instance, even if it results in
   * not filtering out any values.
   */
  filter<F extends V>(
  predicate: (value: V, key: K, iter: this) => value is F,
  context?: any)
  : OrderedMap<K, F>;
  filter(
  predicate: (value: V, key: K, iter: this) => any,
  context?: any)
  : this;

  /**
   * @see Collection.Keyed.flip
   */
  flip(): OrderedMap<V, K>;
}

/**
 * Create a new immutable OrderedSet containing the values of the provided
 * collection-like.
 *
 * Note: `OrderedSet` is a factory function and not a class, and does not use
 * the `new` keyword during construction.
 */
declare function OrderedSet(): OrderedSet<any>;

declare function OrderedSet<T>(): OrderedSet<T>;

declare function OrderedSet<T>(collection: Iterable<T>): OrderedSet<T>;

/**
 * A type of Set that has the additional guarantee that the iteration order of
 * values will be the order in which they were `add`ed.
 *
 * The iteration behavior of OrderedSet is the same as native ES6 Set.
 *
 * Note that `OrderedSet` are more expensive than non-ordered `Set` and may
 * consume more memory. `OrderedSet#add` is amortized O(log32 N), but not
 * stable.
 */
declare module OrderedSet {

  /**
   * True if the provided value is an OrderedSet.
   */
  function isOrderedSet(maybeOrderedSet: any): boolean;

  /**
   * Creates a new OrderedSet containing `values`.
   */
  function of<T>(...values: Array<T>): OrderedSet<T>;

  /**
   * `OrderedSet.fromKeys()` creates a new immutable OrderedSet containing
   * the keys from this Collection or JavaScript Object.
   */
  function fromKeys<T>(iter: Collection<T, any>): OrderedSet<T>;
  function fromKeys(obj: {[key: string]: any;}): OrderedSet<string>;
}

declare interface OrderedSet<T> extends Set_2<T> {

  /**
   * The number of items in this OrderedSet.
   */
  readonly size: number;

  /**
   * Returns an OrderedSet including any value from `collections` that does
   * not already exist in this OrderedSet.
   *
   * Note: `union` can be used in `withMutations`.
   * @alias merge
   * @alias concat
   */
  union<C>(...collections: Array<Iterable<C>>): OrderedSet<T | C>;
  merge<C>(...collections: Array<Iterable<C>>): OrderedSet<T | C>;
  concat<C>(...collections: Array<Iterable<C>>): OrderedSet<T | C>;

  // Sequence algorithms

  /**
   * Returns a new Set with values passed through a
   * `mapper` function.
   *
   *     OrderedSet([ 1, 2 ]).map(x => 10 * x)
   *     // OrderedSet [10, 20]
   */
  map<M>(
  mapper: (value: T, key: T, iter: this) => M,
  context?: any)
  : OrderedSet<M>;

  /**
   * Flat-maps the OrderedSet, returning a new OrderedSet.
   *
   * Similar to `set.map(...).flatten(true)`.
   */
  flatMap<M>(
  mapper: (value: T, key: T, iter: this) => Iterable<M>,
  context?: any)
  : OrderedSet<M>;

  /**
   * Returns a new OrderedSet with only the values for which the `predicate`
   * function returns true.
   *
   * Note: `filter()` always returns a new instance, even if it results in
   * not filtering out any values.
   */
  filter<F extends T>(
  predicate: (value: T, key: T, iter: this) => value is F,
  context?: any)
  : OrderedSet<F>;
  filter(
  predicate: (value: T, key: T, iter: this) => any,
  context?: any)
  : this;

  /**
   * Returns an OrderedSet of the same type "zipped" with the provided
   * collections.
   *
   * Like `zipWith`, but using the default `zipper`: creating an `Array`.
   *
   * ```js
   * const a = OrderedSet([ 1, 2, 3 ])
   * const b = OrderedSet([ 4, 5, 6 ])
   * const c = a.zip(b)
   * // OrderedSet [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
   * ```
   */
  zip<U>(other: Collection<any, U>): OrderedSet<[T, U]>;
  zip<U, V>(other1: Collection<any, U>, other2: Collection<any, V>): OrderedSet<[T, U, V]>;
  zip(...collections: Array<Collection<any, any>>): OrderedSet<any>;

  /**
   * Returns a OrderedSet of the same type "zipped" with the provided
   * collections.
   *
   * Unlike `zip`, `zipAll` continues zipping until the longest collection is
   * exhausted. Missing values from shorter collections are filled with `undefined`.
   *
   * ```js
   * const a = OrderedSet([ 1, 2 ]);
   * const b = OrderedSet([ 3, 4, 5 ]);
   * const c = a.zipAll(b); // OrderedSet [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]
   * ```
   *
   * Note: Since zipAll will return a collection as large as the largest
   * input, some results may contain undefined values. TypeScript cannot
   * account for these without cases (as of v2.5).
   */
  zipAll<U>(other: Collection<any, U>): OrderedSet<[T, U]>;
  zipAll<U, V>(other1: Collection<any, U>, other2: Collection<any, V>): OrderedSet<[T, U, V]>;
  zipAll(...collections: Array<Collection<any, any>>): OrderedSet<any>;

  /**
   * Returns an OrderedSet of the same type "zipped" with the provided
   * collections by using a custom `zipper` function.
   *
   * @see Seq.Indexed.zipWith
   */
  zipWith<U, Z>(
  zipper: (value: T, otherValue: U) => Z,
  otherCollection: Collection<any, U>)
  : OrderedSet<Z>;
  zipWith<U, V, Z>(
  zipper: (value: T, otherValue: U, thirdValue: V) => Z,
  otherCollection: Collection<any, U>,
  thirdCollection: Collection<any, V>)
  : OrderedSet<Z>;
  zipWith<Z>(
  zipper: (...any: Array<any>) => Z,
  ...collections: Array<Collection<any, any>>)
  : OrderedSet<Z>;

}

/**
 * This record is used to represent document outline elements.
 * These allow the user to navigate interactively from one part of the document to another.
 *
 * Outline elements can be nested in a tree-like structure where elements are collapsible/expandable
 * to hide/reveal their subtrees.
 *
 * @public
 * @summary Element in the document outline tree.
 */
export declare class OutlineElement extends OutlineElement_base {}


declare const OutlineElement_base: Record_2.Factory<OutlineElementProps>;

/** @inline */
declare type OutlineElementProps = {
  /**
   * Each outline element can have nested outline elements.
   * The visibility of which is controlled by {@link OutlineElement.isExpanded}.
   *
   * @see {@link Instance#getDocumentOutline}
   */
  children: List<OutlineElement>;
  /**
   * The outline element title, must be human readable.
   */
  title: string;
  /**
   * The text color of the outline element title.
   * When this value is `null` the color is the Nutrient Web SDK's UI's default color
   * which can be configured via NutrientViewer's public CSS API.
   *
   * @default null
   */
  color: Color | null;
  /**
   * Whether the outline element title is bold.
   *
   * @default false
   */
  isBold: boolean;
  /**
   * Whether the outline element title is italic.
   *
   * @default false
   */
  isItalic: boolean;
  /**
   * Whether the outline element is expanded and shows its child elements.
   *
   * @default false
   */
  isExpanded: boolean;
  /**
   * The action that will be triggered when the outline element is either clicked or tapped.
   *
   * Please refer to {@link NutrientViewer.Actions} for an in-depth look at PDF actions.
   */
  action: Action | null;
};

/**
 * The different PAdES levels.
 *
 * @enum
 */
export declare const PAdESLevel: {
  /**
   * B-B
   */
  readonly b_b: "b-b";
  /**
   * B-T
   */
  readonly b_t: "b-t";
  /**
   * B-LT
   */
  readonly b_lt: "b-lt";
};

/** @inline */
declare type PAdESLevelType = (typeof PAdESLevel)[keyof typeof PAdESLevel];

/**
 * @class
 * Holds information about a specific page inside the document.
 *
 * You can receive the page information by using {@link Instance#pageInfoForIndex}.
 * @hideconstructor
 * @public
 * @summary Information about a specific page.
 */
export declare class PageInfo {
  /**
   * The page index of the current page. It is zero-based and has a maximum value of
   * `totalPageCount - 1`.
   */
  readonly index: number;
  /**
   * The label of the current page. Must not be a number and will always be coerced into a string.
   */
  readonly label: string;
  /**
   * The default width (at a 100% zoom level) for the current page in pixels.
   */
  readonly height: number;
  /**
   * The default width (at a 100% zoom level) for the current page in pixels.
   */
  width: number;
  /**
   * The rotation angle of the current page. The value is in degrees and describes a clockwise rotation. The possible values are 0, 90, 180 and 270.
   */
  readonly rotation: number;
  /**
   * The raw PDF boxes for current PageInfo.
   */
  rawPdfBoxes: RawPdfBoxes;
}

declare type PDFAFlags = {
  conformance?: IConformance;
  /**
   * @server
   */
  vectorization?: boolean;
  /**
   * @server
   */
  rasterization?: boolean;
};

/**
 * @class
 * A point describes a 2D vector in space consisting of an `x` and `y` coordinate.
 * Provided values are defined in same units used by the page, point units. Point units are only
 * equal to pixels when zoom value is `1`.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `point.set("x", 20)`.
 * @example
 * Create and update a point.
 * ```ts
 * const point = new NutrientViewer.Geometry.Point({ x: 20, y: 30 });
 * point = point.set("y", 20);
 * point.y; // => 20
 * ```
 *
 * @public
 * @summary A 2D vector that describes a point in space.
 * @param {object} args - An object used to initialize the Point. If `x` or `y` is omitted, `0` will
 *        be used instead.
 * @default { x: 0, y: 0 }
 */
export declare class Point extends Point_base {
  /**
   * The `x` coordinate of the point.
   *
   * @default 0
   */
  x: number;
  /**
   * The `y` coordinate of the point.
   *
   * @default 0
   */
  y: number;
  static defaultValues: IObject;
  constructor(options?: PointCtorProps);
  /**
   * Scales `x` and `y` by the given `sx` and `sy` factor. If only `sx` is set and `sy` not defined,
   * it will scale `x` and `y` by `sx`.
   *
   * @example
   * const point = new NutrientViewer.Geometry.Point({ x: 10, y: 10 });
   * point.scale(2); // => Point {x: 20, y: 20}
   *
   * @param sx - Scale value for the `x` coordinate. If `sy` is not set, this scale will also
   *        be applied to `y`.
   * @param sy - If empty, it will scale `y` with `sx` as well.
   * @returns A new `Point`.
   */
  scale(sx: number, sy?: number): this;
  /**
   * Translate all values of the point by a given `Point`.
   *
   * @example
   * const point = new NutrientViewer.Geometry.Point({ x: 10, y: 10 });
   * point.translate(new NutrientViewer.Geometry.Point({ x: 5, y: -5 })); // => Point {x: 15, y: 5}
   *
   * @param point - A point that describes the translation distance.
   * @returns A new `Point`.
   */
  translate({ x: tx, y: ty


  }: {x: number;y: number;}): this;
  /**
   * Translate the `x` value by a given number.
   *
   * @example
   * const point = new NutrientViewer.Geometry.Point({ x: 10, y: 10 });
   * point.translateX(5); // => Point {x: 15, y: 10}
   *
   * @param tx - A number to translate the `x` value.
   * @returns A new `Point`.
   */
  translateX(tx: number): this;
  /**
   * Translate the `y` value by a given number.
   *
   * @example
   * const point = new NutrientViewer.Geometry.Point({ x: 10, y: 10 });
   * point.translateY(5); // => Point {x: 10, y: 15}
   *
   * @param ty - A number to translate the `y` value.
   * @returns A new `Point`.
   */
  translateY(ty: number): this;
  /**
   * Calculates the euclidean distance to another point.
   *
   * @example
   * var point1 = new NutrientViewer.Geometry.Point({ x: 10, y: 10 });
   * var point2 = new NutrientViewer.Geometry.Point({ x: 20, y: 10 });
   * point1.distance(point2); // => 10
   *
   * @param other - The other point to calculate the distance with.
   * @returns The distance between the two points.
   */
  distance(other: this): number;
  /**
   * Rotates the point at the origin [0, 0].
   */
  rotate(deg: number): this;
  /**
   * Applies a transformation to the point by multiplying the point like
   * a 2D vector to the matrix.
   */
  apply(matrix: TransformationMatrix): this;
}

declare const Point_base: Record_2.Factory<PointCtorProps>;

/** @inline */
declare interface PointCtorProps {
  x?: number;
  y?: number;
  [k: string]: unknown;
}

/**
 * @class
 * Polygon annotations are used to hand draw polygons on a page. They can contain any number of sides
 * defined by the polygon vertices.
 *
 * Polygon annotations with transparent fill color are only selectable around their visible lines.
 * This means that you can create a page full of polygon annotations while annotations
 * behind the polygon annotation are still selectable.
 *
 * Right now, polygon annotations are implemented using SVG images. This behavior is subject to change.
 *
 * <center>
 *   <img title="Example of a polygon annotation" src="img/annotations/shape_polygon_annotation.png" width="375" height="311" class="shadow">
 * </center>
 * @example
 * Create a polygon annotation that displays a triangle
 * ```ts
 * const annotation = new NutrientViewer.Annotations.PolygonAnnotation({
 *   pageIndex: 0,
 *   points: NutrientViewer.Immutable.List([
 *       new NutrientViewer.Geometry.Point({ x: 25,  y: 25 }),
 *       new NutrientViewer.Geometry.Point({ x: 35,  y: 30 }),
 *       new NutrientViewer.Geometry.Point({ x: 30,  y: 55 }),
 *   ]),
 *   strokeWidth: 10,
 *   boundingBox: new NutrientViewer.Geometry.Rect({
 *     left: 20,
 *     top: 20,
 *     width: 20,
 *     height: 40,
 *   }),
 *   cloudyBorderIntensity: 2
 * });
 * ```
 *
 * @summary Display a polygon on a page.
 */
export declare class PolygonAnnotation extends ShapeAnnotation<IPolygonAnnotation> {
  /**
   * A list of points.
   *
   * If no points are present, the annotation will not be visible.
   *
   * @default NutrientViewer.Immutable.List() Empty list
   */
  points: List<Point>;
  /**
   * Intensity of the cloudy border.
   *
   * If not present or 0, the annotation will use a normal border.
   *
   * @default null Normal border.
   */
  cloudyBorderIntensity: null | number;
  static defaultValues: IObject;
  static readableName: string;
}

/**
 * @deprecated Use {@link Serializers.PolygonAnnotationJSON} instead.
 * @hidden
 */
export declare type PolygonAnnotationJSON = Serializers.PolygonAnnotationJSON;

declare class PolygonAnnotationSerializer extends ShapeAnnotationSerializer {
  annotation: PolygonAnnotation;
  toJSON(): Serializers.PolygonAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<Serializers.PolygonAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: IObject): PolygonAnnotation;
}

/**
 * @class
 * Polyline annotations are used to hand draw polylines on a page. They can contain any number of sides
 * defined by the polyline vertices.
 *
 * Polyline annotations with transparent fill color are only selectable around their visible lines.
 * This means that you can create a page full of polyline annotations while annotations
 * behind the polyline annotation are still selectable.
 *
 * Right now, polyline annotations are implemented using SVG images. This behavior is subject to change.
 *
 * <center>
 *   <img title="Example of a polyline annotation" src="img/annotations/shape_polyline_annotation.png" width="375" height="301" class="shadow">
 * </center>
 * @example
 * Create a polyline annotation that displays a triangle
 * ```ts
 * var annotation = new NutrientViewer.Annotations.PolylineAnnotation({
 *   pageIndex: 0,
 *   points: NutrientViewer.Immutable.List([
 *       new NutrientViewer.Geometry.Point({ x: 25,  y: 25 }),
 *       new NutrientViewer.Geometry.Point({ x: 35,  y: 30 }),
 *       new NutrientViewer.Geometry.Point({ x: 30,  y: 55 }),
 *   ]),
 *   strokeWidth: 10,
 *   boundingBox: new NutrientViewer.Geometry.Rect({
 *     left: 20,
 *     top: 20,
 *     width: 20,
 *     height: 40,
 *   }),
 * });
 * ```
 *
 * @summary Display a polyline on a page.
 */
export declare class PolylineAnnotation extends ShapeAnnotation<IPolyLineAnnotation> {
  /**
   * A list of points.
   *
   * If no points are present, the annotation will not be visible.
   *
   * @default NutrientViewer.Immutable.List() Empty list
   */
  points: List<Point>;
  /**
   * An object with start and / or end entries for line caps.
   *
   * Line caps can have one of these values: "square", "circle", "diamond", "openArrow", "closedArrow",
   * "butt", "reverseOpenArrow", "reverseClosedArrow" or "slash".
   *
   * If the fillColor field is provided, its value is used as fill color for the line cap interior.
   */
  lineCaps: null | LineCapsType;
  static defaultValues: IObject;
  static readableName: string;
}

/**
 * @deprecated Use {@link Serializers.PolylineAnnotationJSON} instead.
 * @hidden
 */
export declare type PolylineAnnotationJSON = Serializers.PolylineAnnotationJSON;

declare class PolylineAnnotationSerializer extends ShapeAnnotationSerializer {
  annotation: PolylineAnnotation;
  toJSON(): Serializers.PolylineAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<Serializers.PolylineAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): PolylineAnnotation;
}

/**
 * This is used to Populate the document template (Docx format) with corresponding data.
 *
 * Returns a {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise|Promise}
 * resolving to an `ArrayBuffer` of a Docx, or rejecting with a {@link NutrientViewer.Error}.
 *
 * The resulting `ArrayBuffer` can be converted to PDF with {@link NutrientViewer.convertToPDF()}.
 * and finally loaded with {@link NutrientViewer.load()}.
 *
 * It requires a {@link Configuration | configuration object} and config object with
 * data {@link TemplateDataToPopulateDocument} which contains the data to be populated in document
 * and delimiter marker to know placeholder of the data. If the configuration is
 * invalid, the promise will be rejected with a {@link NutrientViewer.Error}.
 *
 * @example
 * NutrientViewer.populateDocumentTemplate(
 * {
 *   document: '/sales-report.docx',
 *   licenseKey: 'YOUR_LICENSE_KEY',
 * },
 * {
 *   config: {
 *     delimiter: {
 *       start: '{{',
 *       end: '}}',
 *     },
 *   },
 *   model: {
 *     products: [
 *       {
 *         title: 'Duk',
 *         name: 'DukSoftware',
 *         reference: 'DS0',
 *       },
 *       {
 *         title: 'Tingerloo',
 *         name: 'Tingerlee',
 *         reference: 'T00',
 *       },
 *     ],
 *   },
 * },
 * )
 * .then(arrayBuffer => {
 *   console.log('Successfully populated the template Document with data', arrayBuffer)
 * })
 * .catch(error => {
 *   console.error(error.message)
 * })
 * The `delimiter` object sets the pair of delimiters that encloses a template marker
 * i.e. placeholder marker that need to be substituted with the data.
 *
 * The `model` object associates a template marker with the corresponding substitution in the final, produced document.
 *
 * === Supported Template Features ===
 * Placeholders let users substitute a marker with some text and Loops generate repetitions
 * of a given pattern.
 *
 * The syntax for loops is `#` for the opening tag, and `/` for the closing one in the docs.
 *
 * For instance if the document contains:
 *
 * ```
 * {#ITEMS} {name} {price} {/ITEMS}
 * ```
 *
 * Here, `ITEMS` is the name of the loop template marker, and `name` and `price` are regular placeholder
 * template markers over which the SDK iterates replacing the `name` placeholder with corresponding `name` value
 * in `model`, and similarly the `price` placeholder is replaced by the corresponding `price` value in `model`.
 *
 * ```
 * {
 *   model: {
 *     items: [
 *       {
 *         name: "A",
 *         price: 10
 *       },
 *       {
 *         name: "B",
 *         price: 15
 *       }
 *     ]
 *   }
 * }
 * ```
 *
 * @public
 * @param configuration - A configuration Object
 * @param templateData - A template data object
 * @returns Promise that resolves to an ArrayBuffer of a file converted to PDF
 */
declare function populateDocumentTemplate(configuration: StandaloneConfiguration, templateData: TemplateDataToPopulateDocument): Promise<ArrayBuffer>;

/**
 * Preloads the standalone WASM worker.
 *
 * In cases where you don't want to load a PDF right away, the first invocation
 * of {@link NutrientViewer.load} after allowing this function to resolve will be
 * significantly faster.
 *
 * If {@link NutrientViewer.load} is called while this function has not yet resolved,
 * then {@link NutrientViewer.load} will simply reuse the request from this function
 * without adding any overhead.
 *
 * @example
 * // Fetches worker asynchronously
 * NutrientViewer.preloadWorker(configuration);
 * document.querySelector("#open-pdf-button").addEventListener(async () => {
 *   await NutrientViewer.load({ ...configuration, document: "my-doc.pdf" });
 * });
 *
 * @standalone
 * @param configuration - A configuration Object
 * @returns Promise that resolves when preloading is complete
 */
declare function preloadWorker(configuration: StandaloneConfiguration): Promise<void>;

/**
 * Describes mode used to print a PDF document.
 *
 * @enum
 */
declare const PrintMode: {
  /**
   * This method will render all pages of the PDF document in advance before it sends the results to
   * the printer. This works in all major browsers and will not give your users access to the source
   * PDF file. However, this method is CPU-bound and memory usage scales with PDF size.
   *
   * Because of its reliability and cross browsers support this method is the default.
   *
   * Some caveats when using this method:
   *
   *  - To achieve cross-browser support, we render the resulting images into the main window. We
   *    try to hide already existing HTML by applying `display: none !important`. If the printed
   *    page still contains other HTML elements, make sure to apply an appropriate print stylesheet
   *    to your web app.
   *  - This method will produce incorrect results, when pages of the document have different sizes.
   *    Unfortunately, there's no way to work around this issue since it's a CSS limitation.
   */
  readonly DOM: "DOM";
  /**
   * This method is built to be resource efficient and to avoid having to render all pages in
   * advance, which might balloon memory usage to multi-GB on PDFs with 100+ pages.
   *
   * It supports all common browsers, however some fall back to opening the PDF file in a new tab,
   * which might give your users unwanted access to the source files.
   *
   * Google Chrome and Microsoft Internet Explorer provide the APIs required to use the native
   * renderer, as a fallback on other browser we generate and open a PDF in a new tab. This allows
   * users to print the PDF in a native PDF reader which can, as opposed to browser-built
   * implementations, talk directly to the connected printer.
   *
   * When using this print mode, we can not call the {@link RenderPageCallback} when
   * printing pages.
   *
   * Note: If the PDF is password-protected, we always fall back to opening the PDF in a new tab.
   */
  readonly EXPORT_PDF: "EXPORT_PDF";
};

/**
 * Describes Quality used to print a PDF document.
 *
 * Note: With increase in the PDF print Quality speed of printing will decrease.
 *
 * @enum
 */
declare const PrintQuality: {
  /** Low will print the PDF in original quality. */
  readonly LOW: "LOW";
  /** Medium quality printing (150 dpi). */
  readonly MEDIUM: "MEDIUM";
  /** High quality printing (300 dpi). */
  readonly HIGH: "HIGH";
};

declare function PrivateAPIMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {

  };
} & T;

/**
 * Contains information needed to authenticate processing request with Nutrient backend (Document Engine or DWS API).
 *
 * **DWS API**
 *
 * JSON Web Token (JWT) are used to authorize with the DWS API. See DWS's
 * {@link https://www.nutrient.io/api/documentation/developer-guides/authentication/|guides}
 * for more details about the JWT authorization.
 *
 * Auth token can be generated via DWS API. For example, you can generate a token that can only access
 * the `document_Editor_api` operation from the `example.com` origin and expires in 1 hour, without having access to other
 * operations or origins:
 *
 * ```sh
 * curl -X POST https://api.nutrient.io/tokens \
 * -H 'Authorization: Bearer pdf_live_<rest_of_your_api_key>' \
 * -H "Content-Type: application/json" \
 * -d '{
 * "allowedOperations": [
 * "document_editor_api",
 * ],
 * "allowedOrigins": [
 * "example.com"
 * ],
 * "expirationTime": 3600
 * }'
 * ```
 *
 * **Document Engine**
 *
 * JSON Web Token (JWT) are used to authorize with the Document Engine. See Document Engine's
 * {@link https://www.nutrient.io/api/reference/document-engine/upstream/#tag/JWT-authorization|API Reference}
 * for more details about the JWT authorization.
 *
 * @property jwt - Authorization token needed to authorize the processing request with the backend.
 * @property serverUrl - Base server URL to use as the Build API endpoint (`<server_url>/api/build`).
 *                                Optional, since it's possible to encode it in the auth token, DWS API does that by default.
 */
export declare type ProcessingAuthPayload = {
  jwt: string;
  serverUrl?: string;
};

/**
 * ***optional, Standalone only***
 *
 * Document processing can be a time-consuming task, especially when working with large documents. In order to improve the user experience
 * it is possible to choose between two different processor engines with different optimizations applied: either one with a
 * smaller bundle size, but slower overall performance, or one with a larger bundle size, but faster processing time (the default).
 *
 * Either case it's recommended to enable asset compression on your Server to improve loading time.
 *
 * Processor Engine Comparison:
 *
 * | Preference                  | Bundle Size | Document Processing | Recommended Use               |
 * |-----------------------------|-------------|---------------------|-------------------------------|
 * | smallerSize                 | Smaller     | Slower              | Prioritize compact app size   |
 * | fasterProcessing (default)  | Larger      | Faster              | Quick document processing     |
 *
 * @enum
 */
declare const ProcessorEngine: {
  /** A smaller processor engine will be used for processing. */
  smallerSize: string;
  /** A faster processor engine will be used for processing (default). */
  fasterProcessing: string;
};

/** @enum */
declare const ProductId: {
  /** Enables using the SDK in a SharePoint environment. When used, the document should be loaded from a SharePoint site. */
  SharePoint: string;
  /** Enables using the SDK in a Salesforce environment. When used, the SDK should be loaded from a Salesforce site. */
  Salesforce: string;

  Maui_Android: string;

  Maui_iOS: string;

  Maui_MacCatalyst: string;

  Maui_Windows: string;

  FlutterForWeb: string;

  Electron: string;
};

/**
 * @class
 * A NutrientViewer.Error indicates a problem with NutrientViewer. It is a subclass of and behaves like a
 * regular JavaScript error.
 *
 * @example
 *   try {
 *     NutrientViewer.someFunctionThatFails()
 *   } catch (error) {
 *     error instanceof NutrientViewer.Error // => true
 *     error.message // Useful error message
 *   }
 *
 * @summary NutrientViewer related error.
 */
declare const PSPDFKitError: any;

/**
 * A save error indicates a problem with saving. It is a subclass of {@link NutrientViewer.Error}
 * that behaves like a regular JavaScript error.
 *
 * @example
 * try {
 *   await instance.save();
 * } catch (error) {
 *   (error instanceof NutrientViewer.SaveError); // => true
 *   error.message; // Useful error message
 *   error.reason; // Array of errors for changes that could not be saved.
 * }
 *
 * @class
 * @summary NutrientViewer related error related to saving.
 *
 * @param messageOrError
 */
declare function PSPDFKitSaveError(messageOrError: string | Error, reason: Array<SaveErrorReason>): Error;

declare namespace PSPDFKitSaveError {
  var prototype: any;
}

declare const PublicTextSelection_base: Record_2.Factory<ITextSelection>;

/**
 * @class
 *
 * A group of radio buttons. Similar to {@link NutrientViewer.FormFields.CheckBoxFormField}, but there can
 * only be one value set at the same time.
 *
 * To retrieve a list of all form fields, use {@link NutrientViewer.Instance#getFormFields}.
 * @public
 * @summary A group of radio buttons.
 * @hideconstructor
 */
export declare class RadioButtonFormField extends FormField {
  /**
   * If true, exactly one radio button must be selected at all times. Clicking the currently selected
   * button has no effect. Otherwise, clicking the selected button deselects it, leaving no button
   * selected.
   *
   * @default false
   */
  noToggleToOff: boolean;
  /**
   * If true, a group of radio buttons within a radio button field that use the same value for the on
   * state will turn on and off in unions: If one is checked, they are all checked (the same behavior
   * as HTML radio buttons). Otherwise, only the checked radio button will be marked checked.
   *
   * @default true
   */
  radiosInUnison: boolean;
  /**
   * The selected form option value. In order to modify it, {@link NutrientViewer.Instance.setFormFieldValues | instance.setFormFieldValues()} should be used.
   */
  readonly value: string;
  /**
   * Similar to the `value` property. The default values are only used when a form needs to be reset.
   */
  readonly defaultValue: string;
  /**
   * A list of {@link NutrientViewer.FormOption}s. This is necessary to map the multiple radio button
   * options to their values.
   *
   * See {@link NutrientViewer.FormOption} for more information.
   */
  readonly options: List<FormOption>;
  /**
   * Radio buttons and checkboxes can have multiple widgets with the same form value associated, but can be
   * selected independently. `optionIndexes` contains the value indexes that should be actually set.
   *
   * If set, the `value` field doesn't get used, and the widget found at the corresponding indexes in the form field's
   * `annotationIds` property are checked.
   *
   * If set on fields other than radio buttons or checkboxes, setting the form value will fail.
   */
  readonly optionIndexes?: List<number>;
  static defaultValues: IObject;
}

/**
 * Returns a Seq.Indexed of numbers from `start` (inclusive) to `end`
 * (exclusive), by `step`, where `start` defaults to 0, `step` to 1, and `end` to
 * infinity. When `start` is equal to `end`, returns empty range.
 *
 * Note: `Range` is a factory function and not a class, and does not use the
 * `new` keyword during construction.
 *
 * ```js
 * const { Range } = require('immutable')
 * Range() // [ 0, 1, 2, 3, ... ]
 * Range(10) // [ 10, 11, 12, 13, ... ]
 * Range(10, 15) // [ 10, 11, 12, 13, 14 ]
 * Range(10, 30, 5) // [ 10, 15, 20, 25 ]
 * Range(30, 10, 5) // [ 30, 25, 20, 15 ]
 * Range(30, 30, 5) // []
 * ```
 */
declare function Range_2(start?: number, end?: number, step?: number): Seq.Indexed<number>;

/** @inline */
declare type Range_3 = [min: number, max: number];

declare type RawPdfBoxes = {
  bleedBox: null | IRectJSON;
  cropBox: null | IRectJSON;
  mediaBox: null | IRectJSON;
  trimBox: null | IRectJSON;
};

/**
 * Unlike other types in Immutable.js, the `Record()` function creates a new
 * Record Factory, which is a function that creates Record instances.
 *
 * See above for examples of using `Record()`.
 *
 * Note: `Record` is a factory function and not a class, and does not use the
 * `new` keyword during construction.
 */
declare function Record_2<TProps extends Object>(defaultValues: TProps, name?: string): Record_2.Factory<TProps>;

/**
 * A record is similar to a JS object, but enforces a specific set of allowed
 * string keys, and has default values.
 *
 * The `Record()` function produces new Record Factories, which when called
 * create Record instances.
 *
 * ```js
 * const { Record } = require('immutable')
 * const ABRecord = Record({ a: 1, b: 2 })
 * const myRecord = ABRecord({ b: 3 })
 * ```
 *
 * Records always have a value for the keys they define. `remove`ing a key
 * from a record simply resets it to the default value for that key.
 *
 * ```js
 * myRecord.size // 2
 * myRecord.get('a') // 1
 * myRecord.get('b') // 3
 * const myRecordWithoutB = myRecord.remove('b')
 * myRecordWithoutB.get('b') // 2
 * myRecordWithoutB.size // 2
 * ```
 *
 * Values provided to the constructor not found in the Record type will
 * be ignored. For example, in this case, ABRecord is provided a key "x" even
 * though only "a" and "b" have been defined. The value for "x" will be
 * ignored for this record.
 *
 * ```js
 * const myRecord = ABRecord({ b: 3, x: 10 })
 * myRecord.get('x') // undefined
 * ```
 *
 * Because Records have a known set of string keys, property get access works
 * as expected, however property sets will throw an Error.
 *
 * Note: IE8 does not support property access. Only use `get()` when
 * supporting IE8.
 *
 * ```js
 * myRecord.b // 3
 * myRecord.b = 5 // throws Error
 * ```
 *
 * Record Types can be extended as well, allowing for custom methods on your
 * Record. This is not a common pattern in functional environments, but is in
 * many JS programs.
 *
 * However Record Types are more restricted than typical JavaScript classes.
 * They do not use a class constructor, which also means they cannot use
 * class properties (since those are technically part of a constructor).
 *
 * While Record Types can be syntactically created with the JavaScript `class`
 * form, the resulting Record function is actually a factory function, not a
 * class constructor. Even though Record Types are not classes, JavaScript
 * currently requires the use of `new` when creating new Record instances if
 * they are defined as a `class`.
 *
 * ```
 * class ABRecord extends Record({ a: 1, b: 2 }) {
 *   getAB() {
 *     return this.a + this.b;
 *   }
 * }
 *
 * var myRecord = new ABRecord({b: 3})
 * myRecord.getAB() // 4
 * ```
 *
 *
 * **Flow Typing Records:**
 *
 * Immutable.js exports two Flow types designed to make it easier to use
 * Records with flow typed code, `RecordOf<TProps>` and `RecordFactory<TProps>`.
 *
 * When defining a new kind of Record factory function, use a flow type that
 * describes the values the record contains along with `RecordFactory<TProps>`.
 * To type instances of the Record (which the factory function returns),
 * use `RecordOf<TProps>`.
 *
 * Typically, new Record definitions will export both the Record factory
 * function as well as the Record instance type for use in other code.
 *
 * ```js
 * import type { RecordFactory, RecordOf } from 'immutable';
 *
 * // Use RecordFactory<TProps> for defining new Record factory functions.
 * type Point3DProps = { x: number, y: number, z: number };
 * const defaultValues: Point3DProps = { x: 0, y: 0, z: 0 };
 * const makePoint3D: RecordFactory<Point3DProps> = Record(defaultValues);
 * export makePoint3D;
 *
 * // Use RecordOf<T> for defining new instances of that Record.
 * export type Point3D = RecordOf<Point3DProps>;
 * const some3DPoint: Point3D = makePoint3D({ x: 10, y: 20, z: 30 });
 * ```
 *
 * **Flow Typing Record Subclasses:**
 *
 * Records can be subclassed as a means to add additional methods to Record
 * instances. This is generally discouraged in favor of a more functional API,
 * since Subclasses have some minor overhead. However the ability to create
 * a rich API on Record types can be quite valuable.
 *
 * When using Flow to type Subclasses, do not use `RecordFactory<TProps>`,
 * instead apply the props type when subclassing:
 *
 * ```js
 * type PersonProps = {name: string, age: number};
 * const defaultValues: PersonProps = {name: 'Aristotle', age: 2400};
 * const PersonRecord = Record(defaultValues);
 * class Person extends PersonRecord<PersonProps> {
 *   getName(): string {
 *     return this.get('name')
 *   }
 *
 *   setName(name: string): this {
 *     return this.set('name', name);
 *   }
 * }
 * ```
 *
 * **Choosing Records vs plain JavaScript objects**
 *
 * Records offer a persistently immutable alternative to plain JavaScript
 * objects, however they're not required to be used within Immutable.js
 * collections. In fact, the deep-access and deep-updating functions
 * like `getIn()` and `setIn()` work with plain JavaScript Objects as well.
 *
 * Deciding to use Records or Objects in your application should be informed
 * by the tradeoffs and relative benefits of each:
 *
 * - *Runtime immutability*: plain JS objects may be carefully treated as
 *   immutable, however Record instances will *throw* if attempted to be
 *   mutated directly. Records provide this additional guarantee, however at
 *   some marginal runtime cost. While JS objects are mutable by nature, the
 *   use of type-checking tools like [Flow](https://medium.com/@gcanti/immutability-with-flow-faa050a1aef4)
 *   can help gain confidence in code written to favor immutability.
 *
 * - *Value equality*: Records use value equality when compared with `is()`
 *   or `record.equals()`. That is, two Records with the same keys and values
 *   are equal. Plain objects use *reference equality*. Two objects with the
 *   same keys and values are not equal since they are different objects.
 *   This is important to consider when using objects as keys in a `Map` or
 *   values in a `Set`, which use equality when retrieving values.
 *
 * - *API methods*: Records have a full featured API, with methods like
 *   `.getIn()`, and `.equals()`. These can make working with these values
 *   easier, but comes at the cost of not allowing keys with those names.
 *
 * - *Default values*: Records provide default values for every key, which
 *   can be useful when constructing Records with often unchanging values.
 *   However default values can make using Flow and TypeScript more laborious.
 *
 * - *Serialization*: Records use a custom internal representation to
 *   efficiently store and update their values. Converting to and from this
 *   form isn't free. If converting Records to plain objects is common,
 *   consider sticking with plain objects to begin with.
 */
declare module Record_2 {

  /**
   * True if `maybeRecord` is an instance of a Record.
   */
  function isRecord(maybeRecord: any): maybeRecord is Record_2<any>;

  /**
   * Records allow passing a second parameter to supply a descriptive name
   * that appears when converting a Record to a string or in any error
   * messages. A descriptive name for any record can be accessed by using this
   * method. If one was not provided, the string "Record" is returned.
   *
   * ```js
   * const { Record } = require('immutable')
   * const Person = Record({
   *   name: null
   * }, 'Person')
   *
   * var me = Person({ name: 'My Name' })
   * me.toString() // "Person { "name": "My Name" }"
   * Record.getDescriptiveName(me) // "Person"
   * ```
   */
  function getDescriptiveName(record: Record_2<any>): string;

  /**
   * A Record.Factory is created by the `Record()` function. Record instances
   * are created by passing it some of the accepted values for that Record
   * type:
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Record } = require('immutable')" }
   * -->
   * ```js
   * // makePerson is a Record Factory function
   * const makePerson = Record({ name: null, favoriteColor: 'unknown' });
   *
   * // alan is a Record instance
   * const alan = makePerson({ name: 'Alan' });
   * ```
   *
   * Note that Record Factories return `Record<TProps> & Readonly<TProps>`,
   * this allows use of both the Record instance API, and direct property
   * access on the resulting instances:
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Record } = require('immutable');const makePerson = Record({ name: null, favoriteColor: 'unknown' });const alan = makePerson({ name: 'Alan' });" }
   * -->
   * ```js
   * // Use the Record API
   * console.log('Record API: ' + alan.get('name'))
   *
   * // Or direct property access (Readonly)
   * console.log('property access: ' + alan.name)
   * ```
   *
   * **Flow Typing Records:**
   *
   * Use the `RecordFactory<TProps>` Flow type to get high quality type checking of
   * Records:
   *
   * ```js
   * import type { RecordFactory, RecordOf } from 'immutable';
   *
   * // Use RecordFactory<TProps> for defining new Record factory functions.
   * type PersonProps = { name: ?string, favoriteColor: string };
   * const makePerson: RecordFactory<PersonProps> = Record({ name: null, favoriteColor: 'unknown' });
   *
   * // Use RecordOf<T> for defining new instances of that Record.
   * type Person = RecordOf<PersonProps>;
   * const alan: Person = makePerson({ name: 'Alan' });
   * ```
   */
  module Factory {}

  interface Factory<TProps extends Object> {
    (values?: Partial<TProps> | Iterable<[string, any]>): Record_2<TProps> & Readonly<TProps>;
    new (values?: Partial<TProps> | Iterable<[string, any]>): Record_2<TProps> & Readonly<TProps>;
  }

  function Factory<TProps extends Object>(values?: Partial<TProps> | Iterable<[string, any]>): Record_2<TProps> & Readonly<TProps>;
}

declare interface Record_2<TProps extends Object> {

  // Reading values

  has(key: string): key is keyof TProps & string;

  /**
   * Returns the value associated with the provided key, which may be the
   * default value defined when creating the Record factory function.
   *
   * If the requested key is not defined by this Record type, then
   * notSetValue will be returned if provided. Note that this scenario would
   * produce an error when using Flow or TypeScript.
   */
  get<K extends keyof TProps>(key: K, notSetValue?: any): TProps[K];
  get<T>(key: string, notSetValue: T): T;

  // Reading deep values

  hasIn(keyPath: Iterable<any>): boolean;
  getIn(keyPath: Iterable<any>): any;

  // Value equality

  equals(other: any): boolean;
  hashCode(): number;

  // Persistent changes

  set<K extends keyof TProps>(key: K, value: TProps[K]): this;
  update<K extends keyof TProps>(key: K, updater: (value: TProps[K]) => TProps[K]): this;
  merge(...collections: Array<Partial<TProps> | Iterable<[string, any]>>): this;
  mergeDeep(...collections: Array<Partial<TProps> | Iterable<[string, any]>>): this;

  mergeWith(
  merger: (oldVal: any, newVal: any, key: keyof TProps) => any,
  ...collections: Array<Partial<TProps> | Iterable<[string, any]>>)
  : this;
  mergeDeepWith(
  merger: (oldVal: any, newVal: any, key: any) => any,
  ...collections: Array<Partial<TProps> | Iterable<[string, any]>>)
  : this;

  /**
   * Returns a new instance of this Record type with the value for the
   * specific key set to its default value.
   *
   * @alias remove
   */
  delete<K extends keyof TProps>(key: K): this;
  remove<K extends keyof TProps>(key: K): this;

  /**
   * Returns a new instance of this Record type with all values set
   * to their default values.
   */
  clear(): this;

  // Deep persistent changes

  setIn(keyPath: Iterable<any>, value: any): this;
  updateIn(keyPath: Iterable<any>, updater: (value: any) => any): this;
  mergeIn(keyPath: Iterable<any>, ...collections: Array<any>): this;
  mergeDeepIn(keyPath: Iterable<any>, ...collections: Array<any>): this;

  /**
   * @alias removeIn
   */
  deleteIn(keyPath: Iterable<any>): this;
  removeIn(keyPath: Iterable<any>): this;

  // Conversion to JavaScript types

  /**
   * Deeply converts this Record to equivalent native JavaScript Object.
   *
   * Note: This method may not be overridden. Objects with custom
   * serialization to plain JS may override toJSON() instead.
   */
  toJS(): { [K in keyof TProps]: any };

  /**
   * Shallowly converts this Record to equivalent native JavaScript Object.
   */
  toJSON(): TProps;

  /**
   * Shallowly converts this Record to equivalent JavaScript Object.
   */
  toObject(): TProps;

  // Transient changes

  /**
   * Note: Not all methods can be used on a mutable collection or within
   * `withMutations`! Only `set` may be used mutatively.
   *
   * @see `Map#withMutations`
   */
  withMutations(mutator: (mutable: this) => any): this;

  /**
   * @see `Map#asMutable`
   */
  asMutable(): this;

  /**
   * @see `Map#wasAltered`
   */
  wasAltered(): boolean;

  /**
   * @see `Map#asImmutable`
   */
  asImmutable(): this;

  // Sequence algorithms

  toSeq(): Seq.Keyed<keyof TProps, TProps[keyof TProps]>;

  [Symbol.iterator](): IterableIterator<[keyof TProps, TProps[keyof TProps]]>;
}

/**
 * RecordOf<T> is used in TypeScript to define interfaces expecting an
 * instance of record with type T.
 *
 * This is equivalent to an instance of a record created by a Record Factory.
 */
declare type RecordOf<TProps extends Object> = Record_2<TProps> &
Readonly<TProps>;

/**
 * @class
 * A rect describes a rectangle in 2D space. It consists of a location (`left` and `top`) and
 * dimensions (`width` and `height`). Provided values are defined in same units used by the page,
 * point units. Point units are only equal to pixels when zoom value is `1`.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `rect.set("left", 20)`.
 * @example
 * Create and update a rect.
 * ```ts
 * const rect = new NutrientViewer.Geometry.Rect({
 *   left: 10,
 *   top: 20,
 *   width: 30,
 *   height: 40
 * });
 * rect = rect.set("left", 20);
 * rect.left; // => 20
 * ```
 *
 * @public
 * @summary A rectangle in 2D space.
 * @param args - An object used to initialize the Point. If `left`, `top`, `width` or `height`
 *        is omitted, `0` will be used instead.
 * @default { left: 0, top: 0, width: 0, height: 0 }
 */
export declare class Rect extends Rect_base {
  /**
   * The `left` distance of the rect. This is equivalent to `x` of a
   * {@link Geometry.Point}.
   *
   * @default 0
   */
  left: number;
  /**
   * The `top` distance of the rect. This is equivalent to `y` of a
   * {@link Geometry.Point}.
   *
   * @default 0
   */
  top: number;
  /**
   * The `width` of the rect. This is equivalent to `width` of a {@link Geometry.Size}.
   *
   * @default 0
   */
  width: number;
  /**
   * The `height` of the rect. This is equivalent to `height` of a {@link Geometry.Size}.
   *
   * @default 0
   */
  height: number;
  static defaultValues: IObject;
  constructor(options?: IRect);
  /**
   * Computes the right point in the rect by adding `left` and `width`.
   */
  get right(): number;
  /**
   * Computes the bottom point in the rect by adding `top` and `height`.
   */
  get bottom(): number;
  /**
   * Creates a new rect from a DOM ClientRect.
   *
   * @example
   * const rect = NutrientViewer.Geometry.Rect.fromClientRect(
   *   element.getBoundingClientRect()
   * );
   *
   * @param rect - A DOM ClientRect.
   * @returns A new `Rect`.
   */
  static fromClientRect({ top, left, width, height }: ClientRect): Rect;
  /**
   * Creates a new rect from four points.
   *
   * @example
   * const rect = NutrientViewer.Geometry.Rect.fromPoints(
   *  new NutrientViewer.Geometry.Point({ x: 10, y: 10 }),
   *  new NutrientViewer.Geometry.Point({ x: 20, y: 10 }),
   *  new NutrientViewer.Geometry.Point({ x: 20, y: 20 }),
   *  new NutrientViewer.Geometry.Point({ x: 10, y: 20 })
   *  );
   *
   *  @public
   *  @param points - An array of four points.
   *  @returns A new `Rect`.
   */
  static fromPoints(...points: Point[]): Rect;
  /**
   * Expand the rect to include the list of points.
   *
   * @example
   * const rect = NutrientViewer.Geometry.Rect({
   *   left: 10,
   *   top: 10,
   *   width: 10,
   *   height: 10
   * })
   *
   * const newRect = rect.expandToIncludePoints(new NutrientViewer.Geometry.Point({ x: 30, y: 30 }));
   * // => Rect {left: 10, top: 10, width: 30, height: 30}
   *
   * @returns A new `Rect`.
   */
  expandToIncludePoints(...points: Point[]): Rect;
  static areRectsCloserThan(a: Rect, b: Rect, distance: number): boolean;
  static areVerticallyAligned(a: Rect, b: Rect, thresholdDistance: number): boolean;
  /**
   * Creates a rect that surrounds all rects in the supplied {@link NutrientViewer.Immutable.List}.
   *
   * This can be used to calculate the bounding box of a list of rects.
   *
   * @example
   * const rects = NutrientViewer.Immutable.List([
   *   new NutrientViewer.Geometry.Rect({ left: 14, top: 50, width: 50, height: 50 }),
   *   new NutrientViewer.Geometry.Rect({ left: 70, top: 20, width: 98, height: 99 }),
   *   new NutrientViewer.Geometry.Rect({ left: 14, top: 13, width: 15, height: 16 })
   * ]);
   *
   * const unionRect = NutrientViewer.Geometry.Rect.union(rects); // => Rect {left: 14, top: 13, width: 154, height: 106}
   *
   * @param rects - An immutable list of rects.
   * @returns A new `Rect`.
   */
  static union(rects: List<Rect>): Rect;
  static getCenteredRect(inner: Size, outer: Size): Rect;
  static fromInset(inset: Inset): Rect;
  /**
   * Translates the location of the rect by a point.
   *
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10, top: 10 });
   * rect.translate(new NutrientViewer.Geometry.Point({ x: 5, y: -5})); // => Rect {left: 15, top: 5, width: 0, height: 0}
   *
   * @param point - A point that describes the translation distance.
   * @returns A new `Rect`.
   */
  translate({ x: tx, y: ty }: Point): Rect;
  /**
   * Translates the horizontal location of the rect by a number.
   *
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10, top: 10 });
   * rect.translateX(5); // => Rect {left: 15, top: 10, width: 0, height: 0}
   *
   * @param tx - A number to translate the `left` value.
   * @returns A new `Rect`.
   */
  translateX(tx: number): Rect;
  /**
   * Translates the vertical location of the rect by a number.
   *
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10, top: 10 });
   * point.translateY(5); // => Rect {left: 10, top: 15, width: 0, height: 0}
   *
   * @param ty - A number to translate the `top` value.
   * @returns A new `Rect`.
   */
  translateY(ty: number): Rect;
  /**
   * Scales all values by the given `sx` and `sy` factor. If only `sx` is set and `sy` not defined,
   * it will scale the values by `sx`.
   *
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 10, height: 10 });
   * rect.scale(2); // => Rect {left: 20, top: 20, width: 20, height: 20}
   *
   * @param sx - Scale value for the `left` and `width` value. If `sy` is not set, this scale
   *        will also be applied to `top` and `height`.
   * @param sy - Scale value for the `top` an `height` value.
   * @returns A new `Rect`.
   */
  scale(sx: number, sy?: number): Rect;
  /**
   * Grows the rect by `growth` on every side but keeps the center of the Rect at the same position.
   *
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 10, height: 10 });
   * rect.grow(5); // => Rect {left: 5, top: 5, width: 20, height: 20}
   *
   * @param growth - The growth factor. It will be applied on every side, so the new `width`
   *        and `height` will increase by two times this factor.
   * @returns A new `Rect`.
   */
  grow(growth: number): Rect;
  /**
   * Returns the {@link NutrientViewer.Geometry.Point} that is the upper-left corner of this rect.
   *
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 10, height: 10 });
   * rect.getLocation(); // => Point {left: 10, top: 10}
   *
   * @returns A point that is on the upper-left corner of this rect.
   */
  getLocation(): Point;
  /**
   * Returns the {@link NutrientViewer.Geometry.Size} of the rect.
   *
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 10, height: 10 });
   * rect.getSize(); // => Size {width: 10, height: 10}
   *
   * @returns The size of the rect.
   */
  getSize(): Size;
  /**
   * Returns the {@link NutrientViewer.Geometry.Point} that is the center of this rect.
   *
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 10, height: 10 });
   * rect.getCenter(); // => Point {left: 15, top: 15}
   *
   * @returns A point that is on the center of this rect.
   */
  getCenter(): Point;
  /**
   * Updates the location of the rect by modifying `left` and `top`.
   *
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 10, height: 10 });
   * var nextLocation = new NutrientViewer.Geometry.Point({ x: 20, y: 30 });
   *
   * rect.setLocation(nextLocation); // => Rect {left: 20, top: 30, width: 10, height: 10}
   *
   * @param location - The new location for the rect.
   * @returns A new `Rect` with `left` and `top` updated.
   */
  setLocation(location: Point): Rect;
  /**
   * Rounds all coordinates to whole numbers. The resulting `Rect` will always overlap the source
   * `Rect`.
   *
   * The location (`left` and `top`) will be rounded to a number which is smaller than or equal
   * to the current value.
   *
   * The size (`width` and `height`) will be rounded to a number which is greater than or equal to
   * the current value.
   *
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10.5, top: 15.5, width: 20.5, height: 25.5 });
   * rect.roundOverlap(); // => Rect {left: 10, top: 15, width: 21, height: 26}
   *
   * @returns A new `rect`.
   */
  roundOverlap(): Rect;
  /**
   * Rounds all coordinates to whole numbers. This implementation uses `Math.round` for all
   * coordinates. The resulting `Rect` might no longer overlap the source `Rect`.
   *
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10.5, top: 15.5, width: 20.5, height: 25.5 });
   * rect.round(); // => Rect {left: 11, top: 16, width: 21, height: 26}
   *
   * @returns A new `rect`.
   */
  round(): Rect;
  /**
   * Test if a point is within the rect. This can be used for hit testing.
   *
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 10, height: 10 });
   * rect.isPointInside(new NutrientViewer.Geometry.Point({ x: 15, y: 15 })); // => true
   * rect.isPointInside(new NutrientViewer.Geometry.Point({ x: 25, y: 25 })); // => false
   *
   * @param point - The point that should be tested.
   * @returns `true` if the point is inside, `false` otherwise.
   */
  isPointInside(point: Point): boolean;
  /**
   * Test if a rect is completely inside this rect.
   *
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 10, height: 10 });
   *
   * const insideRect = new NutrientViewer.Geometry.Rect({ left: 12, top: 12, width: 5, height: 5 });
   * const overlappingRect = new NutrientViewer.Geometry.Rect({ left: 5, top: 5, width: 10, height: 10 });
   * const outsideRect = new NutrientViewer.Geometry.Rect({ left: 0, top: 0, width: 5, height: 5 });
   *
   * rect.isRectInside(insideRect); // => true
   * rect.isRectInside(overlappingRect); // => false
   * rect.isRectInside(outsideRect); // => false
   *
   * @param otherRect - The rect that should be tested.
   * @returns `true` if the rect is inside, `false` otherwise.
   */
  isRectInside(otherRect: Rect): boolean;
  /**
   * Test if the union area of two rects is greater than zero.
   *
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 10, height: 10 });
   *
   * const insideRect = new NutrientViewer.Geometry.Rect({ left: 12, top: 12, width: 5, height: 5 });
   * const overlappingRect = new NutrientViewer.Geometry.Rect({ left: 5, top: 5, width: 10, height: 10 });
   * const outsideRect = new NutrientViewer.Geometry.Rect({ left: 0, top: 0, width: 5, height: 5 });
   *
   * rect.isRectOverlapping(insideRect); // => true
   * rect.isRectOverlapping(overlappingRect); // => true
   * rect.isRectOverlapping(outsideRect); // => false
   *
   * @param other - The rect that should be tested.
   * @returns `true` if the rect is overlapping, `false` otherwise.
   */
  isRectOverlapping(other: Rect): boolean;
  /**
   * Normalizes the Rect. In case of either a negative width or a negative height, the position will
   * be updated so that the location is again the top, left point of the rectangle.
   */
  normalize(): Rect;
  /**
   * Applies a transformation to the rect. We will translate [top, left] like a 2D
   * vector but only apply the scaling to the dimension [width, height]
   */
  apply(matrix: TransformationMatrix): Rect;
}

declare const Rect_base: Record_2.Factory<IRect>;

/**
 * @class
 * Rectangle annotations are used to draw rectangles on a page.
 *
 * Rectangle annotations with transparent fill color are only selectable around their visible lines.
 * This means that you can create a page full of rectangle annotations while annotations
 * behind the rectangle annotation are still selectable.
 *
 * Right now, rectangle annotations are implemented using SVG images. This behavior is subject to change.
 *
 * <center>
 *   <img title="Example of a rectangle annotation" src="img/annotations/shape_rectangle_annotation.png" width="411" height="295" class="shadow">
 * </center>
 * @example
 * Create a rectangle annotation
 * ```ts
 * const annotation = new NutrientViewer.Annotations.RectangleAnnotation({
 *   pageIndex: 0,
 *   boundingBox: new NutrientViewer.Geometry.Rect({
 *     left: 10,
 *     top: 10,
 *     width: 100,
 *     height: 100,
 *   }),
 *   cloudyBorderIntensity: 2,
 *   cloudyBorderInset: new NutrientViewer.Geometry.Inset({
 *     left: 9,
 *     top: 9,
 *     right: 9,
 *     bottom: 9,
 *   })
 * });
 * ```
 *
 * @summary Display a rectangle on a page.
 */
export declare class RectangleAnnotation extends ShapeAnnotation<IRectangleAnnotation> {
  /**
   * Intensity of the cloudy border.
   *
   * If not present or 0, the annotation will use a normal border.
   *
   * @default null Normal border.
   */
  cloudyBorderIntensity: null | number;
  /**
   * Cloudy border inset.
   *
   * For rectangle annotations with a cloudy border, it contains the values for the distances from
   * the bounding box to bounding box wrapped by the inner, where the content fits.
   *
   * Visual representation of the property:
   *
   * <center>
   * <img title="Example of a cloudy rectangle annotation" src="img/annotations/rectangle_inset.png" width="600" height="405" class="shadow">
   * </center>
   */
  cloudyBorderInset: null | Inset;










  measurementBBox: null | Rect;
  static readableName: string;
  constructor(options?: Partial<IRectangleAnnotation>);
}

/**
 * @deprecated Use {@link Serializers.RectangleAnnotationJSON} instead.
 * @hidden
 */
export declare type RectangleAnnotationJSON = Serializers.RectangleAnnotationJSON;

declare class RectangleAnnotationSerializer extends ShapeAnnotationSerializer {
  annotation: RectangleAnnotation;
  toJSON(): Serializers.RectangleAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<Serializers.RectangleAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): RectangleAnnotation;
}

/**
 * @class
 * Redaction annotations are used to mark regions of content or text of the
 * document to eventually redact (i.e. remove the content from the document
 * in an irreversible way).
 *
 * You can customize how a redaction annotation looks in its marked state,
 * which is when the redaction hasn't been applied yet, and the redacted
 * state, that is the final appearance that the redacted region will have.
 *
 * The `fillColor`, `overlayText`, `color` and `repeatOverlayText` influence
 * the redacted appearance, while `outlineColor` influences the marked
 * appearance.
 * @summary Mark a region for redaction.
 */
export declare class RedactionAnnotation extends TextMarkupAnnotation<IRedactionAnnotation> {
  /**
   * Background color of the redacted area.
   *
   * @default NutrientViewer.Color.BLACK
   */
  fillColor: null | Color;
  /**
   * Text to be displayed at the specified region
   * when a redaction has been applied.
   */
  overlayText: null | string;
  /**
   * Whether the overlay text should be repeated
   * to fill the entire redaction area or just
   * be drawn once.
   *
   * It has no effect if there is no overlay text
   * specified.
   *
   * @default false
   */
  repeatOverlayText: null | boolean;
  /**
   * Color used for the redaction's border in its
   * marked state.
   *
   * @default NutrientViewer.Color.RED
   */
  outlineColor: null | Color;
  /**
   * Color of the overlay text.
   *
   * It has no effect if there is no overlay text
   * specified.
   *
   * @default NutrientViewer.Color.RED
   */
  color: Color;
  static readableName: string;
}

/**
 * @deprecated Use {@link Serializers.RedactionAnnotationJSON} instead.
 * @hidden
 */
export declare type RedactionAnnotationJSON = Serializers.RedactionAnnotationJSON;

/**
 *
 *Redaction Annotation presets are sets of property-value pairs for annotations that can be applied as default
 *annotations settings for Redaction Annotations. When a property of a Redaction Annotation is changed by the user,
 *the annotation preset of the redaction annotations gets updated. This means that all the Redaction annotations
 *created after this action will use that preset unless a different preset is specified.
 *
 *For properties not included in the annotation preset, the default values of those properties are used.
 *
 * @example
 * Creating an annotation preset and adding it to the available annotation presets
 * ```ts
 * const myAnnotationPresets = instance.annotationPresets
 * myAnnotationPresets['redaction'] = {
 *  color: NutrientViewer.Color.BLACK,
 * }
 * instance.setAnnotationPresets(myAnnotationPresets);
 * ```
 *
 * @public
 * @summary Annotation Preset for Redaction Annotations
 */
export declare type RedactionAnnotationPreset = {
  /**
   * Background color of the redacted area.
   *
   * @default NutrientViewer.Color.BLACK
   */
  fillColor?: Color;
  /**
   * Text to be displayed at the specified region
   * when a redaction has been applied.
   */
  overlayText?: string;
  /**
   * Whether the overlay text should be repeated
   * to fill the entire redaction area or just
   * be drawn once.
   *
   * It has no effect if there is no overlay text
   * specified.
   *
   * @default false
   */
  repeatOverlayText?: boolean;
  /**
   * Color of the overlay text.
   *
   * It has no effect if there is no overlay text
   * specified.
   *
   * @default NutrientViewer.Color.RED
   */
  color?: Color;
  /**
   * Color used for the redaction's border in its
   * marked state.
   *
   * @default NutrientViewer.Color.RED
   */
  outlineColor?: Color;
  /**
   * Name of the creator
   */
  creatorName?: string;
};

declare class RedactionAnnotationSerializer extends BaseTextMarkupSerializer {
  annotation: RedactionAnnotation;
  constructor(annotation: RedactionAnnotation);
  toJSON(): Serializers.RedactionAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<Serializers.RedactionAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): RedactionAnnotation;
}

declare function RedactionsMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Searches in the PDF document and creates a redaction annotation for each search result. You can search for a text, regex or use one of the patterns we provide. See
     * {@link NutrientViewer.SearchPattern} for the list of all the patterns we support.
     *
     * Regex syntax:
     * - Standalone: JavaScript (see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions}).
     * - Server: {@link http://userguide.icu-project.org/strings/regexp|ICU regular expression}, a derivative of Perl regular expressions.
     *
     * Notice that matches included when using one of the {@link NutrientViewer.SearchPattern} options might overfit the criteria (i.e. include false positive results). This might happen since
     * we strive for including all positive results and avoid data loss. Make sure to review the matches found.
     *
     * Note for multiline regular expressions that document text lines end with CRLF (`\r\n`).
     *
     * Regular expressions that follow the JavaScript syntax are matched in a similar way to the `RegExp.prototype.exec()` method (see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec}), but ignoring capturing groups, that is, this function only returns full string matches.
     *
     * @example
     * ```ts
     * // Search and add redactions
     * instance.createRedactionsBySearch(NutrientViewer.SearchPattern.CREDIT_CARD_NUMBER, {
     *   searchType: NutrientViewer.SearchType.PRESET,
     *   searchInAnnotations: true,
     *  annotationPreset: {
     *     overlayText: 'Redacted'
     *   }
     * }).then(function(ids) {
     *   console.log("The following annotations have been added:", ids);
     *
     *   return instance.applyRedactions();
     * });
     *
     * // We can add an "annotations.create" event listener and add custom logic based on the
     * // information for each of the newly created redaction annotations
     *
     * const {RedactionAnnotation} = NutrientViewer.Annotations
     * instance.addEventListener("annotations.create", annotations => {
     *   const redactions = annotations.filter(annot => annot instanceof RedactionAnnotation)
     *   if (redactions.size > 0) {
     *     console.log("Redactions: ", redactions.toJS())
     *   }
     * });
     * ```
     *
     * @public
     * @param term - The text, regex or pattern you want to search for.
     * @param options - Search options object.
     * @returns Promise that resolves when the redaction annotations have been created. Returns a list of new Redaction Annotation IDs.
     */
    createRedactionsBySearch(term: string | ISearchPattern, options?: {
      /**
       * Redactions Search Type.
       *
       * @default NutrientViewer.SearchType.TEXT
       */
      searchType?: ISearchType;
      /**
       * Set to `false` if you don't want to search in annotations.
       *
       * @default true
       */
      searchInAnnotations?: boolean;
      /**
       * Whether the search will be case-sensitive or not. Default is `false` if `searchType` is `NutrientViewer.SearchType.TEXT` and `true` for other types of searches.
       */
      caseSensitive?: boolean;
      /**
       * Redaction annotation preset.
       */
      annotationPreset?: RedactionAnnotationPreset;
      /**
       * The page number to start the search from.
       *
       * @default 0
       */
      startPageIndex?: number;
      /**
       * Starting from the `start` page, the number of pages to search. Default is to the end of the document.
       */
      pageRange?: number;
    }): Promise<List<string>>;
    /**
     * Applies redactions to the current document. This will overwrite the document,
     * removing content irreversibly.
     *
     * In the process of redacting the content, all the redaction annotations will
     * be removed. Any annotation that is either partially or completely covered
     * by a redaction annotation will be deleted.
     *
     * @example
     * ```ts
     * // Applies redactions
     * instance.applyRedactions().then(function() {
     *   console.log("The document has been redacted.");
     * });
     * ```
     *
     * @public
     * @returns Promise that resolves when the redactions has been applied.
     */
    applyRedactions(): Promise<void>;

  };
} & T;

/**
 * Returns a copy of the collection with the value at key removed.
 *
 * A functional alternative to `collection.remove(key)` which will also work
 * with plain Objects and Arrays as an alternative for
 * `delete collectionCopy[key]`.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { remove } = require('immutable')
 * const originalArray = [ 'dog', 'frog', 'cat' ]
 * remove(originalArray, 1) // [ 'dog', 'cat' ]
 * console.log(originalArray) // [ 'dog', 'frog', 'cat' ]
 * const originalObject = { x: 123, y: 456 }
 * remove(originalObject, 'x') // { y: 456 }
 * console.log(originalObject) // { x: 123, y: 456 }
 * ```
 */
declare function remove<K, C extends Collection<K, any>>(collection: C, key: K): C;

declare function remove<TProps extends Object, C extends Record_2<TProps>, K extends keyof TProps>(collection: C, key: K): C;

declare function remove<C extends Array<any>>(collection: C, key: number): C;

declare function remove<C, K extends keyof C>(collection: C, key: K): C;

declare function remove<C extends {[key: string]: any;}, K extends keyof C>(collection: C, key: K): C;

/**
 * Returns a copy of the collection with the value at the key path removed.
 *
 * A functional alternative to `collection.removeIn(keypath)` which will also
 * work with plain Objects and Arrays.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { removeIn } = require('immutable')
 * const original = { x: { y: { z: 123 }}}
 * removeIn(original, ['x', 'y', 'z']) // { x: { y: {}}}
 * console.log(original) // { x: { y: { z: 123 }}}
 * ```
 */
declare function removeIn<C>(collection: C, keyPath: Iterable<any>): C;

declare type Renderer = (rendererProps: RendererProps) => UIRendererConfiguration;

/**
 * This object defines the properties of a custom annotation renderer.
 *
 * It's returned from a {@link CustomRenderers.AnnotationCustomRendererCallback} function.
 *
 * Note that when `append=false` (which is the default value for the property), the default appearance
 * of the annotation is not rendered, including the pointer event listeners.
 *
 * This means that, if you want you custom content to select the annotation when clicked,
 * you'll have to add some logic to support it.
 *
 * You can add an event listener to your node in your custom renderer code,
 * and also supply a callback to the `onDisappear` property to remove the listener:
 *
 * ```js
 * NutrientViewer.load({
 *   customRenderers: {
 *     Annotation: ({ annotation }) => {
 *       function selectAnnotation(event) {
 *         event.stopImmediatePropagation();
 *         instance.setSelectedAnnotation(annotation.id);
 *       }
 *       const node = document.createElement("div").appendChild(document.createTextNode("Custom rendered!"));
 *       node.addEventListener("pointerdown", selectAnnotation, {
 *         capture: true
 *       });
 *       return {
 *         node,
 *         append: false,
 *         onDisappear: () => {
 *           node.removeEventListener("pointerdown", selectAnnotation, {
 *             capture: true
 *           });
 *         }
 *       };
 *     }
 *   }
 * });
 * ```
 *
 * The `onDisappear` callback function will be run whenever the returned node reference changes,
 * and when the custom rendered component unmounts (is removed from the DOM). With this in mind,
 * and in order to save the browser some unnecessary work, you could rewrite the previous example
 * as follows:
 *
 * ```js
 * let node
 * NutrientViewer.load({
 *   customRenderers: {
 *     Annotation: ({ annotation }) => {
 *       function selectAnnotation(event) {
 *         event.stopImmediatePropagation();
 *         instance.setSelectedAnnotation(annotation.id);
 *       }
 *       if (!node) {
 *         node = document.createElement("div").appendChild(document.createTextNode("Custom rendered!"));
 *         node.addEventListener("pointerdown", selectAnnotation, {
 *           capture: true
 *         });
 *       }
 *       return {
 *         node,
 *         append: false,
 *         onDisappear: () => {
 *           node.removeEventListener("pointerdown", selectAnnotation, {
 *             capture: true
 *           });
 *         }
 *       };
 *     }
 *   }
 * });
 * ```
 *
 * In this example the `onDisappear()` reference changes on every call, but since the `node` reference
 * doesn't change, `onDisappear()` will only be called when the component unmounts.
 *
 * Note that the component does not only unmount when the page it's included is scrolled some pages out,
 * but also, for example, when the annotation it's associated with is selected in the UI, in which case
 * the component is unmounted and mounted again.
 *
 * @public
 */
export declare type RendererConfiguration = {
  /** DOM node to be rendered. */
  node: Node;
  /**
   * Whether the DOM node should be appended after the annotation, or replace it.
   *
   * @default false
   */
  append?: boolean | null;
  /**
   * Whether to automatically zoom the DOM node as the current {@link NutrientViewer.ViewState#zoomLevel} changes.
   *
   * @default false
   */
  noZoom?: boolean | null;
  /** Callback to be called whenever the custom DOM node is unmounted. */
  onDisappear?: ((arg0: Node | null) => void) | null;
};

/**
 * This object can contain callback functions ("renderers") used to customize the appearance of different built-in UI elements.
 *
 * The UI element to which the callback corresponds is determined by its key or keys. For example, a callback function
 * used to customize the annotations sidebar should be located under `NutrientViewer.Configuration.customUI[NutrientViewer.UIElement.Sidebar][NutrientViewer.SidebarMode.ANNOTATIONS]`.
 *
 * Currently only the Sidebar Element can be customized, using the `NutrientViewer.UIElement.Sidebar` key.
 *
 * @public
 * @summary Configuration settings for customized rendering of built-in UI elements.
 * @example
 *
 * //Fully customized sidebar
 *
 * NutrientViewer.load({
 *   customUI: {
 *     [NutrientViewer.UIElement.Sidebar]: {
 *       [NutrientViewer.SidebarMode.CUSTOM]({ containerNode }) {
 *         // React Portals can be used as well.
 *         // Or Vue portals, or any other framework API that allows appending components
 *         // to arbitrary DOM nodes.
 *         // Using vanilla JS, you can just append a node to parentNode.
 *         const div = document.createElement("div");
 *         div.append("My custom sidebar");
 *         containerNode.appendChild(div);
 *
 *         return {
 *           // By returning the same node that was provided, we opt-out of having the node
 *           // appended. If we return a different node, it will be appended to the provided node.
 *           node: containerNode,
 *         };
 *       }
 *     }
 *   }
 * });
 *
 * //Partially customized sidebar
 *
 * NutrientViewer.load({
 *   customUI: {
 *     [NutrientViewer.UIElement.Sidebar]: {
 *       [NutrientViewer.SidebarMode.ANNOTATIONS]({ containerNode }) {
 *         containerNode.style.padding = "0.5rem";
 *
 *         if (!containerNode.querySelector(".MyCustomSidebarComponentHeader")) {
 *           const header = document.createElement("div");
 *           header.classList.add("MyCustomSidebarComponentHeader");
 *           containerNode.prepend(header);
 *         }
 *
 *         return {
 *           node: containerNode,
 *           onRenderItem({ itemContainerNode, item: annotation }) {
 *             const footerAuthor = itemContainerNode.querySelector(".PSPDFKit-Sidebar-Annotations-Footer span");
 *             // Change the format of the footer text by prefixing it with "Creator: " and removing the date
 *             footerAuthor.textContent = `Creator: ${annotation.creatorName}`;
 *
 *             // Add aria label to the annotation icon
 *             const annotationIcon = itemContainerNode.querySelector(".PSPDFKit-Icon");
 *             annotationIcon.setAttribute("aria-label", `Icon for an annotation created by ${annotation.creatorName}.`);
 *           }
 *         };
 *       }
 *     }
 *   }
 * });
 *
 * @see Configuration#customUI Instance#setCustomUIConfiguration
 */
/**
 * Sidebar custom UI configuration.
 *
 * @public
 * @instance
 * @property {?NutrientViewer.CustomUIRendererCallback} ANNOTATIONS - Custom UI renderer callback for the annotations sidebar.
 * @property {?NutrientViewer.CustomUIRendererCallback} THUMBNAILS - Custom UI renderer callback for the thumbnails sidebar.
 * @property {?NutrientViewer.CustomUIRendererCallback} BOOKMARKS - Custom UI renderer callback for the bookmarks sidebar.
 * @property {?NutrientViewer.CustomUIRendererCallback} DOCUMENT_OUTLINE - Custom UI renderer callback for the document outline sidebar.
 * @property {?NutrientViewer.CustomUIRendererCallback} SIGNATURES - Custom UI renderer callback for the signatures sidebar.
 * @property {?NutrientViewer.CustomUIRendererCallback} CUSTOM - Custom UI renderer callback for the custom sidebar.
 */
/**
 * This user defined function receives the element's container DOM node and the data it renders as argument. It's
 * called whenever the element is mounted, each time the data is modified, and whenever {@link NutrientViewer.Instance#setCustomUIConfiguration} is called.
 *
 * It must return a {@link NutrientViewer.CustomUIRendererConfiguration} object.
 *
 * @public
 * @callback CustomUIRendererCallback@callback CustomUIRendererCallback
 * @param {object} payload - UI element data
 * @param {Node} payload.containerNode - Container DOM element.
 * @param {NutrientViewer.Immutable.List.<any> | null} payload.items - Data rendered by the element.
 * @returns {NutrientViewer.CustomUIRendererConfiguration}
 */
/**
 * This object is returned by customer's {@link NutrientViewer.CustomUIRendererCallback} functions to enhance the default appearance of a UI element.
 *
 * Its main, fundamental property is `node`, which is the DOM node that will be appended to the container node.
 *
 * Optionally it can contain an `onRenderItem` event handler, which is called for each item in the list.
 *
 * @public
 * @property {Node} node - DOM node to be appended to the container, if different from `containerNode`.
 * @property {?NutrientViewer.CustomUIItemRendererCallback} onRenderItem - Callback to be called whenever an item is rendered.
 */
/**
 * This user defined function receives the item element's container DOM node and the item data it renders as argument. It's called whenever the item element because of the container element updates.
 *
 * @public
 * @callback CustomUIItemRendererCallback@callback CustomUIItemRendererCallback
 * @param {object} payload - UI element data
 * @param {Node} payload.itemContainerNode - Container DOM element.
 * @param {any} payload.item - Item data rendered by the element.
 */
declare type RendererProps = {
  containerNode: Node;
  items?: List<any> | null;
};

/**
 * This callback is called whenever a page is rendered or printed (only for
 * {@link NutrientViewer.PrintMode}.DOM). You can use it to render watermarks on the page.
 *
 * Make sure that the rendering commands are as efficient as possible as they might be invoked
 * multiple times per page (once per tile).
 *
 * For more information, see {@link Configuration#renderPageCallback}.
 *
 * @public
 * @param context - A 2D `<canvas/>` rendering context.
 * @param pageIndex - The current page index, starting with `0` for the first page.
 * @param pageSize - The size of the page that you're drawing at. The canvas is already scaled accordingly.
 * @example
 * Register a RenderPageCallback handler at configuration time.
 * ```ts
 * NutrientViewer.load({
 *   renderPageCallback: function(ctx, pageIndex, pageSize) {
 *     ctx.beginPath();
 *     ctx.moveTo(0, 0);
 *     ctx.lineTo(pageSize.width, pageSize.height);
 *     ctx.stroke();
 *
 *     ctx.font = "30px Comic Sans MS";
 *     ctx.fillStyle = "red";
 *     ctx.textAlign = "center";
 *     ctx.fillText(
 *       `This is page ${pageIndex + 1}`,
 *       pageSize.width / 2,
 *       pageSize.height / 2
 *     );
 *   }
 *   // ...
 * });
 * ```
 *

 */
export declare type RenderPageCallback = (context: CanvasRenderingContext2D, pageIndex: number, pageSize: Size) => unknown;

declare function RenderPageMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Provided a `dimension` and `pageIndex` renders a page of a document and returns the
     * result as `ArrayBuffer`. This can be used as thumbnail.
     *
     * You can specify a width or height (but not both at the same time) as the first `dimension`
     * argument, each accepts a value in the interval `(0; 5000]`. The other dimension will be
     * calculated based on the aspect ratio of the document.
     *
     * This method can be used to provide thumbnail images for your document list. You can use it
     * in a `<canvas>` tag. The following example will load the cover of the loaded document with a
     * width of `400px`. We set the width of the `<canvas>` tag to `200px`, so the image will be
     * sharp on high DPI screens.
     *
     * @example
     * const pageWidth = instance.pageInfoForIndex(0).width;
     * const pageHeight = instance.pageInfoForIndex(0).height;
     *
     * const width = 400;
     * const height = Math.round(width * pageHeight / pageWidth);
     *
     * instance.renderPageAsArrayBuffer({ width }, 0).then(function(buffer) {
     *   const canvas = document.createElement('canvas');
     *   canvas.width = width;
     *   canvas.height = height;
     *
     *   canvas.style.transformOrigin = "0 0";
     *   canvas.style.transform = "scale(0.5)";
     *
     *   const imageView = new Uint8Array(buffer);
     *   const ctx = canvas.getContext("2d");
     *   const imageData = ctx.createImageData(width, height);
     *   imageData.data.set(imageView);
     *   ctx.putImageData(imageData, 0, 0);
     *
     *   document.body.appendChild(canvas);
     * });
     *
     * @standalone
     * @param dimension - The size of the resulting image. Only accepts either `width` or
     * `height`, but not both. The other dimension will be calculated accordingly.
     * @param pageIndex - The index of the page you want to have information about.
     * @returns The raw image as bitmap.
     */
    renderPageAsArrayBuffer(dimension: {
      /** The width of the resulting image. */
      width: number;
    } | {
      /** The height of the resulting image. */
      height: number;
    }, pageIndex: number): Promise<ArrayBuffer>;
    /**
     * Generates a URL to an image for the first page of a document or the page of the
     * provided `pageIndex`. This can be used as thumbnail.
     *
     * You can specify a width or height (but not both at the same time) as the first `dimension`
     * argument, each accepts a value in the interval `(0; 5000]`. The other dimension will be
     * calculated based on the aspect ratio of the document.
     *
     * This endpoint can be used to provide thumbnail images for your document list. You can use it
     * as a `src` for an `img` tag. The following example will load the cover of the loaded document with a
     * width of `400px`.
     *
     * The returned URL is a Blob URL.
     *
     * In order to prevent memory leaks, it's recommended to revoke the returned object URL once the image
     * is no longer needed, as in the example.
     *
     * @example
     * let objectURL
     * instance.renderPageAsImageURL({ width: 400 }, 0).then(function(src) {
     *   const image = document.createElement('img');
     *   image.src = src;
     *   objectURL = src;
     *   document.body.appendChild(image);
     * });
     * // Once the image is no longer needed, we revoke the URL so that the associated
     * // Blob is released.
     * function callWhenTheImageIsNoLongerNeeded() {
     *   // Is it an object URL?
     *   if (objectURL.split("://")[0] === "blob") {
     *     URL.revokeObjectURL(objectURL);
     *   }
     * }
     *
     * @param dimension - The size of the resulting image. Only accepts either `width` or
     * `height`, but not both. The other dimension will be calculated accordingly.
     * @param pageIndex - The index of the page you want to have information about.
     * @returns The image url.
     */
    renderPageAsImageURL(dimension: {
      /** The width of the resulting image. */
      width: number;
    } | {
      /** The height of the resulting image. */
      height: number;
    }, pageIndex: number): Promise<string>;

  };
} & T;

/**
 * Returns a Seq.Indexed of `value` repeated `times` times. When `times` is
 * not defined, returns an infinite `Seq` of `value`.
 *
 * Note: `Repeat` is a factory function and not a class, and does not use the
 * `new` keyword during construction.
 *
 * ```js
 * const { Repeat } = require('immutable')
 * Repeat('foo') // [ 'foo', 'foo', 'foo', ... ]
 * Repeat('bar', 4) // [ 'bar', 'bar', 'bar', 'bar' ]
 * ```
 */
declare function Repeat<T>(value: T, times?: number): Seq.Indexed<T>;

/**
 * @class
 * PDF action to reset form fields in the current document.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record | Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `action.set("includeExclude", false);`.
 *
 * A ResetFormAction defines which form fields should be reset, when clicked on it. By default all
 * form fields will be reset to their default value. The `includeExclude` field defines if the
 * fields specified by `fields`, which are a {@link NutrientViewer.Immutable.List} of form field names,
 * should reset all form fields excluding the defined fields or just the defined fields. When
 * `includeExclude` is set to `true`, all form fields except the fields defined in `fields` will be
 * reset. If `includeExclude` is set to false, which is the default value for this field, only the
 * form fields defined in `fields` will be reset.
 * @example
 * Create a new ResetFormAction
 * ```ts
 * const action = new NutrientViewer.Actions.ResetFormAction({
 *   fields: List(["exampleField"])
 * });
 * ```
 *
 * @summary Reset form fields in the current document.
 */
export declare class ResetFormAction extends Action {
  /**
   * A List identifying which fields to reset or which to exclude from resetting, depending on the
   * setting of the includeExclude flag. Each element of the array shall be a text string
   * representing the fully qualified name of a field. If this entry is omitted, the includeExclude
   * flag shall be ignored; all fields in the document’s interactive form are reset.
   *
   * @default null
   */
  fields: List<string> | null | undefined;
  /**
   * If false, the fields list specifies which fields to reset.
   * If true, the fields list indicates which fields to exclude from resetting. That is, all fields
   * in the document’s interactive form shall be reset except those listed in the fields list.
   *
   * @default false
   */
  includeExclude: boolean;
  constructor(args?: IResetFormAction);
}

declare type ResizeAnchor = 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT' | 'TOP_LEFT' | 'TOP_RIGHT' | 'BOTTOM_RIGHT' | 'BOTTOM_LEFT';

/** @inline */
declare type RotatableAnnotation = TextAnnotation | StampAnnotation;

/**
 * Annotation free rotate helper. Rotates a {@link AnnotationsUnion} by the provided angle in degrees,
 * counter-clockwise. It only works with free rotatable annotations, such as {@link NutrientViewer.Annotations.TextAnnotation},
 * {@link NutrientViewer.Annotations.ImageAnnotation} and {@link NutrientViewer.Annotations.StampAnnotation}.
 *
 * In order to rotate an annotation it's not enough to just change the rotation property. The annotation's
 * bounding box need to be resized and repositioned as well so as to fit the rotated content inside.
 *
 * This helper facilitates this task by updating both the rotation property and the bounding box.
 *
 * @example
 * Rotate a text annotation to 110 degrees.
 * ```ts
 * const annotation = new NutrientViewer.Annotations.TextAnnotation({
 *   text: `This is a test text for rotating
 * an annotation to 110 degrees.`,
 *   boundingBox: new NutrientViewer.Geometry.Rect({
 *     x: 300,
 *     y: 300,
 *     width: 246,
 *     height: 44
 *   }),
 *   fontSize: 18,
 *   font: "Helvetica"
 * });
 * const rotatedAnnotation = NutrientViewer.Annotations.rotate(
 *   annotation,
 *   110
 * );
 * instance.create(rotatedAnnotation.set('pageIndex', 0));
 * ```
 *
 * There is an edge case where the original annotation is already rotated by a multiple of 45 degrees. In this case
 * it's not possible to figure out the dimensions of the content, which will default to a square that fits in the bounding box.
 * In order to use the correct content dimensions, you can optionally provide a {@link NutrientViewer.Geometry.Size} object
 * that specifies the content's width and height, which should fit in the annotation's bounding box when using the
 * annotation rotation.
 *
 * For cases when the original annotation is rotated by any other angle, the content dimensions are calculated automatically,
 * but you can still provide this object if the annotation's bounding box does not correctly bound the content, so as to obtain
 * an annotation with a correctly bounding box as a result.
 *
 * @example
 * Rotate a 45 degree rotated annotation to 60 degrees.
 * ```ts
 * const rotated45Annotation = new NutrientViewer.Annotations.TextAnnotation({
 *   text: `This is a test text for a 45
 * degree rotated text annotation.`,
 *   rotation: 45,
 *   boundingBox: new NutrientViewer.Geometry.Rect({
 *     x: 300,
 *     y: 300,
 *     width: 348,
 *     height: 348
 *   }),
 *   fontSize: 18,
 *   font: "Helvetica"
 * });
 * const rotated60Annotation = NutrientViewer.Annotations.rotate(
 *   rotated45Annotation,
 *   60,
 *   new NutrientViewer.Geometry.Size({ width: 246, height: 44 })
 * );
 * instance.create(rotated60Annotation.set('pageIndex', 0));
 * ```
 * This helper does not check if the resulting rotated annotation overflows the page limits.
 *
 * @public
 * @param annotation - The annotation to rotate
 * @param rotation - Rotation angle in degrees
 * @param contentSize - Size of the annotation's content for annotations rotated a in multiple of 45 degrees.
 * @returns
 */
declare function rotate(annotation: RotatableAnnotation, rotation: number, contentSize?: Size): RotatableAnnotation;

/** @inline */
declare type Rotation = 0 | 90 | 180 | 270;

/**
 * Reason for the error that occurred when saving a certain modification.
 *
 * @inline
 */
declare type SaveErrorReason = {
  /** Reason of the save failure. */
  error: any;
  /** Object that was being saved. */
  object: any;
  /** modificationType Type of modification that was being saved. */
  modificationType: IModificationType;
};

/**
 * Describes mode of page scrolling in the document view - either continuous, per spread
 * (paginated) or disabled (changing pages through the UI is disabled).
 *
 * @enum
 */
declare const ScrollMode: {
  /** Render all pages as a list and allow smooth scrolling. This is the default mode. */
  readonly CONTINUOUS: "CONTINUOUS";
  /**
   * Makes scrolling only possible within a spread. Whenever this mode is activated, or pages are
   * changed when this mode is active, the zoom mode will be reset to
   * {@link NutrientViewer.ZoomMode.FIT_TO_VIEWPORT}.
   */
  readonly PER_SPREAD: "PER_SPREAD";
  /**
   * Makes scrolling only possible within a spread and doesn't allow changing pages.
   * Whenever this mode is activated the zoom mode will be reset to
   * {@link NutrientViewer.ZoomMode.FIT_TO_VIEWPORT}.
   */
  readonly DISABLED: "DISABLED";
};

declare function SearchMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Queries the PDF backend for all search results of a given term. Search is case-insensitive and
     * accented letters are ignored. The minimum query length for the term query to be performed can
     * be retrieved from {@link SearchState.minSearchQueryLength}.
     *
     * Shorter queries will throw an error.
     *
     * @example
     * Search for all occurrences of `foo`
     * ```ts
     * instance.search("foo").then(results => {
     *   console.log(results.size);
     * });
     * ```
     *
     * @example
     * Search within a page range.
     * ```ts
     * instance.search("foo", { startPageIndex: 1, endPageIndex: 4 }).then(results => {
     *   console.log(results.size);
     * });
     * ```
     *
     * @example
     * Search for a regex.
     * ```ts
     * instance.search("Q[a-z]+ck\\sC.*[tT]", { searchType: NutrientViewer.SearchType.REGEX }).then(results => {
     *   console.log(results.size);
     * });
     * ```
     *
     * @example
     * Search for all date patterns on the pages.
     * ```ts
     * instance.search(NutrientViewer.SearchPattern.DATE, { searchType: NutrientViewer.SearchType.PATTERN }).then(results => {
     *   console.log(results.size);
     * });
     * ```
     *
     * @example
     * Search for a regex in a case-insensitive way.
     * ```ts
     * instance.search("he[a-z]+", { searchType: NutrientViewer.SearchType.REGEX, caseSensitive: false }).then(results => {
     *   console.log(results.size);
     * });
     * ```
     *
     * @param term - The search term.
     * @param options - Parameters used for search operation.
     * @returns Resolves to an immutable list of search results.
     */
    search(term: ISearchPattern | string, options?: {
      /** The page index to start searching from. `options.endPageIndex` must be provided if this parameter is given. */
      startPageIndex?: number;
      /** The last page index to search (inclusive). `options.startPageIndex` must be provided if this parameter is given. */
      endPageIndex?: number;
      /**
       * The search type which describes whether the query is a text, pattern or regex.
       *
       * @default NutrientViewer.SearchType.TEXT
       */
      searchType?: ISearchType;
      /**
       * Whether you want to search in annotations.
       *
       * @default false
       */
      searchInAnnotations?: boolean;
      /**
       * Whether you want the search to be case-sensitive.
       *
       * @default false
       */
      caseSensitive?: boolean;
    }): Promise<List<SearchResult>>;
    /**
     * Returns the latest search state. This value changes whenever the user interacts with
     * NutrientViewer or whenever {@link Instance#setSearchState} is called.
     *
     * The search state can be used to finely control the current search UI.
     */
    readonly searchState: SearchState;
    /**
     * This method is used to update the UI search state of the PDF editor.
     *
     * When you pass in a {@link SearchState}, the current state will be immediately
     * overwritten. Calling this method is also idempotent.
     *
     * If you pass in a function, it will be immediately invoked and will receive the current
     * {@link SearchState} as a property. You can use this to change state based on the
     * current value. This type of update is guaranteed to be atomic - the value of `currentState`
     * can't change in between.
     *
     * When the supplied {@link SearchState} is invalid, this method will throw an
     * {@link Error} that contains a detailed error message.
     *
     * {@link SearchState#minSearchQueryLength} is a readonly property and cannot be changed.
     * If the provided {@link SearchState} object includes a modified `minSearchQueryLength`
     * property, a warning will be shown and only changes to other properties will be applied.
     *
     * @example
     * Update values for the immutable search state object
     * ```ts
     * const state = instance.SearchState;
     * const newState = state.set("isLoading", true);
     * instance.setSearchState(newState);
     * ```
     *
     * @public
     * @throws {NutrientViewer.Error} Will throw an error when the supplied state is not valid.
     * @param stateOrFunction - Either a new SearchState which would overwrite the existing one, or a callback that will get invoked with the current search state and is expected to return the new state.
     */
    setSearchState(stateOrFunction: SearchState | SetSearchStateFunction): void;
    /**
     * Open the search box, fill in the search term, and start loading the search requests.
     *
     * This will set the {@link ViewState#interactionMode} to
     * {@link NutrientViewer.InteractionMode}.SEARCH so that the search box is visible.
     *
     * @example
     * Start a search for the term `foo` in the UI
     * ```ts
     * instance.startUISearch("foo");
     * ```
     * instance.startUISearch("foo");
     * ```
     * @param term - The search term.
     */
    startUISearch(term: string): void;

  };
} & T;

/**
 * Allows you to perform a search by a built-in pattern that matches common strings.
 *
 * Note that by design, some of these patterns might overfit the criteria (i.e. include false positive results). This might happen since we strive for
 * including all positive results and avoid data loss. Make sure to review the matches found.
 *
 * @enum
 * */
declare const SearchPattern: {
  /** Catches credit card numbers with a number beginning with 1-6, and must be 13 to 19 digits long. Spaces and - are allowed anywhere in the number. */
  readonly CREDIT_CARD_NUMBER: "credit_card_number";
  /**
   * Matches date formats such as mm/dd/yyyy, mm/dd/yy, dd/mm/yyyy, and dd/mm/yy.
   * It will reject any days/months greater than 31 and will match if a
   * leading zero is or is not used for a single digit day or month.
   * The delimiter can either be `-`, `.` or `/`.
   */
  readonly DATE: "date";
  /**
   *  Matches time formats such as 00:00:00, 00:00, 00:00 PM. 12 and 24 hour formats are allowed.
   * Seconds and 12 hour AM/PM denotation are both optional.
   */
  readonly TIME: "time";
  /**
   * Matches an email address with the format of xyz@xyz.xyz where xyz can be any alpha numeric character or a .
   * For more information on the pattern please see http://emailregex.com/.
   */
  readonly EMAIL_ADDRESS: "email_address";
  /** Matches International style phone numbers with a prefix of + or 00, containing between 7 - 15 digits with spaces or - occurring anywhere within the number. */
  readonly INTERNATIONAL_PHONE_NUMBER: "international_phone_number";
  /** Matches an IPV4 address limited to number ranges of 0-255 with an optional mask. */
  readonly IP_V4: "ipv4";
  /** Matches full and compressed IPv6 addresses as defined in RFC 2373. */
  readonly IP_V6: "ipv6";
  /** Matches a MAC address with delimiters of either `-` or `:`. */
  readonly MAC_ADDRESS: "mac_address";
  /**
   *  Matches a NANP (https://en.wikipedia.org/wiki/North_American_Numbering_Plan) style phone number. In general this will match US, Canadian and various other Caribbean countries.
   * The pattern will also match an optional international prefix of `+1`.
   */
  readonly NORTH_AMERICAN_PHONE_NUMBER: "north_american_phone_number";
  /**
   *  Matches a US social security number (SSN). The format of the number should be either XXX-XX-XXXX or XXXXXXXXX with X denoting [0-9].
   * We expect the number to have word boundaries on either side, or to be the start/end of the string.
   */
  readonly SOCIAL_SECURITY_NUMBER: "social_security_number";
  /** Matches a URL with a prefix of http|https|www with an optional subdomain. */
  readonly URL: "url";
  /** Matches a USA style Zip Code. The format expected is 00000 or 00000-0000, where the delimiter can either be `-` or `/`. */
  readonly US_ZIP_CODE: "us_zip_code";
  /**
   * Matches US and ISO 3779 standard VINs.
   * The format expects 17 characters with the last 5 characters being numeric. `I`,`O`,`Q`,`_` characters are not allowed in upper or lower case.
   */
  readonly VIN: "vin";
};

/**
 * @class
 * A match when searching the PDF.
 *
 * You can retrieve search results by using {@link Instance#search}
 * @public
 * @summary A match when searching the PDF.
 * @hideconstructor
 */
export declare class SearchResult extends SearchResult_base {}


declare const SearchResult_base: Record_2.Factory<SearchResultProps>;

/** @inline */
declare type SearchResultProps = {
  /**
   * The page where the result was found.
   */
  pageIndex: number | null;
  /**
   * The text surrounding the search term that can be used to list a preview.
   */
  previewText: string;
  /**
   * Location of the search term in the preview text.
   */
  locationInPreview: number | null;
  /**
   * Length of the search term in the preview text.
   */
  lengthInPreview: number | null;
  /**
   * All rects on the page that should be used to highlight the text.
   */
  rectsOnPage: List<Rect>;
  /**
   * Boolean to indicate whether the matching search result is part of an annotation.
   */
  isAnnotation: boolean | null;
  /**
   * The bounding box of the annotation in which the result was found. This property is only available when the result is an annotation.
   */
  annotationRect?: Rect | null;
};

/**
 * @class
 * The current state of the search indicators inside the web view.
 *
 * You can update the search state using {@link Instance#setSearchState}.
 * @public
 * @summary Current search UI state.
 * @hideconstructor
 */
export declare class SearchState extends SearchState_base {}


declare const SearchState_base: Record_2.Factory<SearchStateProps>;

/** @inline */
declare type SearchStateProps = {
  /**
   * Indicates that the search input has focus.
   */
  isFocused: boolean;
  /**
   * Indicates that we're currently loading search requests.
   */
  isLoading: boolean;
  /**
   * The current search term. Changing this term will not start a search. Please use
   * {@link NutrientViewer.Instance#startUISearch} for that purpose.
   */
  term: string;
  /**
   * The currently focused result. -1 if no item is focused yet.
   *
   * @default -1
   */
  focusedResultIndex: number;
  /**
   * The latest search results. These will be rendered as highlights in the page view.
   */
  results: List<SearchResult>;
  /**
   * Current minimum search query length. When using the UI or the API function
   * {@link NutrientViewer.Instance#search}, any query shorter than this number will not be performed.
   *
   * In Server mode, this value is retrieved from the server at load time.
   *
   * The default value is `1` (not configurable) in Standalone mode,
   * and `3` in Server mode (configurable in the server).
   */
  readonly minSearchQueryLength: number;
};

/**
 * Defines the search type used for text search operations or when creating redaction annotations based on text search.
 *
 * @enum
 */
declare const SearchType: {
  /** This is the default search type. This is used when you want to search for strings/text. */
  readonly TEXT: "text";
  /** The search type when you want to use the patterns provided by us. see {@link NutrientViewer.SearchPattern} for the list of all the patterns. */
  readonly PRESET: "preset";
  /**
   * The search type when you want to search using regex.
   * Regex syntax:
   * - Standalone: JavaScript (see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions}).
   * - Server: {@link http://userguide.icu-project.org/strings/regexp|ICU regular expression}, a derivative of Perl regular expressions.
   * Regular expressions that follow the JavaScript syntax are matched in a similar way to the `RegExp.prototype.exec()` method (see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec}), but ignoring capturing groups, that is, the function only returns full string matches.
   */
  readonly REGEX: "regex";
};

/**
 * Creates a Seq.
 *
 * Returns a particular kind of `Seq` based on the input.
 *
 *   * If a `Seq`, that same `Seq`.
 *   * If an `Collection`, a `Seq` of the same kind (Keyed, Indexed, or Set).
 *   * If an Array-like, an `Seq.Indexed`.
 *   * If an Iterable Object, an `Seq.Indexed`.
 *   * If an Object, a `Seq.Keyed`.
 *
 * Note: An Iterator itself will be treated as an object, becoming a `Seq.Keyed`,
 * which is usually not what you want. You should turn your Iterator Object into
 * an iterable object by defining a Symbol.iterator (or @@iterator) method which
 * returns `this`.
 *
 * Note: `Seq` is a conversion function and not a class, and does not use the
 * `new` keyword during construction.
 */
declare function Seq<S extends Seq<any, any>>(seq: S): S;

declare function Seq<K, V>(collection: Collection.Keyed<K, V>): Seq.Keyed<K, V>;

declare function Seq<T>(collection: Collection.Indexed<T>): Seq.Indexed<T>;

declare function Seq<T>(collection: Collection.Set<T>): Seq.Set<T>;

declare function Seq<T>(collection: Iterable<T>): Seq.Indexed<T>;

declare function Seq<V>(obj: {[key: string]: V;}): Seq.Keyed<string, V>;

declare function Seq(): Seq<any, any>;

/**
 * `Seq` describes a lazy operation, allowing them to efficiently chain
 * use of all the higher-order collection methods (such as `map` and `filter`)
 * by not creating intermediate collections.
 *
 * **Seq is immutable** — Once a Seq is created, it cannot be
 * changed, appended to, rearranged or otherwise modified. Instead, any
 * mutative method called on a `Seq` will return a new `Seq`.
 *
 * **Seq is lazy** — `Seq` does as little work as necessary to respond to any
 * method call. Values are often created during iteration, including implicit
 * iteration when reducing or converting to a concrete data structure such as
 * a `List` or JavaScript `Array`.
 *
 * For example, the following performs no work, because the resulting
 * `Seq`'s values are never iterated:
 *
 * ```js
 * const { Seq } = require('immutable')
 * const oddSquares = Seq([ 1, 2, 3, 4, 5, 6, 7, 8 ])
 *   .filter(x => x % 2 !== 0)
 *   .map(x => x * x)
 * ```
 *
 * Once the `Seq` is used, it performs only the work necessary. In this
 * example, no intermediate arrays are ever created, filter is called three
 * times, and map is only called once:
 *
 * ```js
 * oddSquares.get(1); // 9
 * ```
 *
 * Any collection can be converted to a lazy Seq with `Seq()`.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { Map } = require('immutable')
 * const map = Map({ a: 1, b: 2, c: 3 }
 * const lazySeq = Seq(map)
 * ```
 *
 * `Seq` allows for the efficient chaining of operations, allowing for the
 * expression of logic that can otherwise be very tedious:
 *
 * ```js
 * lazySeq
 *   .flip()
 *   .map(key => key.toUpperCase())
 *   .flip()
 * // Seq { A: 1, B: 1, C: 1 }
 * ```
 *
 * As well as expressing logic that would otherwise seem memory or time
 * limited, for example `Range` is a special kind of Lazy sequence.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { Range } = require('immutable')
 * Range(1, Infinity)
 *   .skip(1000)
 *   .map(n => -n)
 *   .filter(n => n % 2 === 0)
 *   .take(2)
 *   .reduce((r, n) => r * n, 1)
 * // 1006008
 * ```
 *
 * Seq is often used to provide a rich collection API to JavaScript Object.
 *
 * ```js
 * Seq({ x: 0, y: 1, z: 2 }).map(v => v * 2).toObject();
 * // { x: 0, y: 2, z: 4 }
 * ```
 */

declare module Seq {
  /**
   * True if `maybeSeq` is a Seq, it is not backed by a concrete
   * structure such as Map, List, or Set.
   */
  function isSeq(maybeSeq: any): maybeSeq is Seq.Indexed<any> | Seq.Keyed<any, any> | Seq.Set<any>;


  /**
   * `Seq` which represents key-value pairs.
   */
  module Keyed {}

  /**
   * Always returns a Seq.Keyed, if input is not keyed, expects an
   * collection of [K, V] tuples.
   *
   * Note: `Seq.Keyed` is a conversion function and not a class, and does not
   * use the `new` keyword during construction.
   */
  function Keyed<K, V>(collection: Iterable<[K, V]>): Seq.Keyed<K, V>;
  function Keyed<V>(obj: {[key: string]: V;}): Seq.Keyed<string, V>;
  function Keyed<K, V>(): Seq.Keyed<K, V>;
  function Keyed(): Seq.Keyed<any, any>;

  interface Keyed<K, V> extends Seq<K, V>, Collection.Keyed<K, V> {
    /**
     * Deeply converts this Keyed Seq to equivalent native JavaScript Object.
     *
     * Converts keys to Strings.
     */
    toJS(): Object;

    /**
     * Shallowly converts this Keyed Seq to equivalent native JavaScript Object.
     *
     * Converts keys to Strings.
     */
    toJSON(): {[key: string]: V;};

    /**
     * Shallowly converts this collection to an Array.
     */
    toArray(): Array<[K, V]>;

    /**
     * Returns itself
     */
    toSeq(): this;

    /**
     * Returns a new Seq with other collections concatenated to this one.
     *
     * All entries will be present in the resulting Seq, even if they
     * have the same key.
     */
    concat<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): Seq.Keyed<K | KC, V | VC>;
    concat<C>(...collections: Array<{[key: string]: C;}>): Seq.Keyed<K | string, V | C>;

    /**
     * Returns a new Seq.Keyed with values passed through a
     * `mapper` function.
     *
     * ```js
     * const { Seq } = require('immutable')
     * Seq.Keyed({ a: 1, b: 2 }).map(x => 10 * x)
     * // Seq { "a": 10, "b": 20 }
     * ```
     *
     * Note: `map()` always returns a new instance, even if it produced the
     * same value at every step.
     */
    map<M>(
    mapper: (value: V, key: K, iter: this) => M,
    context?: any)
    : Seq.Keyed<K, M>;

    /**
     * @see Collection.Keyed.mapKeys
     */
    mapKeys<M>(
    mapper: (key: K, value: V, iter: this) => M,
    context?: any)
    : Seq.Keyed<M, V>;

    /**
     * @see Collection.Keyed.mapEntries
     */
    mapEntries<KM, VM>(
    mapper: (entry: [K, V], index: number, iter: this) => [KM, VM],
    context?: any)
    : Seq.Keyed<KM, VM>;

    /**
     * Flat-maps the Seq, returning a Seq of the same type.
     *
     * Similar to `seq.map(...).flatten(true)`.
     */
    flatMap<KM, VM>(
    mapper: (value: V, key: K, iter: this) => Iterable<[KM, VM]>,
    context?: any)
    : Seq.Keyed<KM, VM>;

    /**
     * Returns a new Seq with only the entries for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends V>(
    predicate: (value: V, key: K, iter: this) => value is F,
    context?: any)
    : Seq.Keyed<K, F>;
    filter(
    predicate: (value: V, key: K, iter: this) => any,
    context?: any)
    : this;

    /**
     * @see Collection.Keyed.flip
     */
    flip(): Seq.Keyed<V, K>;
  }


  /**
   * `Seq` which represents an ordered indexed list of values.
   */
  module Indexed {

    /**
     * Provides an Seq.Indexed of the values provided.
     */
    function of<T>(...values: Array<T>): Seq.Indexed<T>;
  }

  /**
   * Always returns Seq.Indexed, discarding associated keys and
   * supplying incrementing indices.
   *
   * Note: `Seq.Indexed` is a conversion function and not a class, and does
   * not use the `new` keyword during construction.
   */
  function Indexed(): Seq.Indexed<any>;
  function Indexed<T>(): Seq.Indexed<T>;
  function Indexed<T>(collection: Iterable<T>): Seq.Indexed<T>;

  interface Indexed<T> extends Seq<number, T>, Collection.Indexed<T> {
    /**
     * Deeply converts this Indexed Seq to equivalent native JavaScript Array.
     */
    toJS(): Array<any>;

    /**
     * Shallowly converts this Indexed Seq to equivalent native JavaScript Array.
     */
    toJSON(): Array<T>;

    /**
     * Shallowly converts this collection to an Array.
     */
    toArray(): Array<T>;

    /**
     * Returns itself
     */
    toSeq(): this;

    /**
     * Returns a new Seq with other collections concatenated to this one.
     */
    concat<C>(...valuesOrCollections: Array<Iterable<C> | C>): Seq.Indexed<T | C>;

    /**
     * Returns a new Seq.Indexed with values passed through a
     * `mapper` function.
     *
     * ```js
     * const { Seq } = require('immutable')
     * Seq.Indexed([ 1, 2 ]).map(x => 10 * x)
     * // Seq [ 10, 20 ]
     * ```
     *
     * Note: `map()` always returns a new instance, even if it produced the
     * same value at every step.
     */
    map<M>(
    mapper: (value: T, key: number, iter: this) => M,
    context?: any)
    : Seq.Indexed<M>;

    /**
     * Flat-maps the Seq, returning a a Seq of the same type.
     *
     * Similar to `seq.map(...).flatten(true)`.
     */
    flatMap<M>(
    mapper: (value: T, key: number, iter: this) => Iterable<M>,
    context?: any)
    : Seq.Indexed<M>;

    /**
     * Returns a new Seq with only the values for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends T>(
    predicate: (value: T, index: number, iter: this) => value is F,
    context?: any)
    : Seq.Indexed<F>;
    filter(
    predicate: (value: T, index: number, iter: this) => any,
    context?: any)
    : this;

    /**
     * Returns a Seq "zipped" with the provided collections.
     *
     * Like `zipWith`, but using the default `zipper`: creating an `Array`.
     *
     * ```js
     * const a = Seq([ 1, 2, 3 ]);
     * const b = Seq([ 4, 5, 6 ]);
     * const c = a.zip(b); // Seq [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
     * ```
     */
    zip<U>(other: Collection<any, U>): Seq.Indexed<[T, U]>;
    zip<U, V>(other: Collection<any, U>, other2: Collection<any, V>): Seq.Indexed<[T, U, V]>;
    zip(...collections: Array<Collection<any, any>>): Seq.Indexed<any>;

    /**
     * Returns a Seq "zipped" with the provided collections.
     *
     * Unlike `zip`, `zipAll` continues zipping until the longest collection is
     * exhausted. Missing values from shorter collections are filled with `undefined`.
     *
     * ```js
     * const a = Seq([ 1, 2 ]);
     * const b = Seq([ 3, 4, 5 ]);
     * const c = a.zipAll(b); // Seq [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]
     * ```
     */
    zipAll<U>(other: Collection<any, U>): Seq.Indexed<[T, U]>;
    zipAll<U, V>(other: Collection<any, U>, other2: Collection<any, V>): Seq.Indexed<[T, U, V]>;
    zipAll(...collections: Array<Collection<any, any>>): Seq.Indexed<any>;

    /**
     * Returns a Seq "zipped" with the provided collections by using a
     * custom `zipper` function.
     *
     * ```js
     * const a = Seq([ 1, 2, 3 ]);
     * const b = Seq([ 4, 5, 6 ]);
     * const c = a.zipWith((a, b) => a + b, b);
     * // Seq [ 5, 7, 9 ]
     * ```
     */
    zipWith<U, Z>(
    zipper: (value: T, otherValue: U) => Z,
    otherCollection: Collection<any, U>)
    : Seq.Indexed<Z>;
    zipWith<U, V, Z>(
    zipper: (value: T, otherValue: U, thirdValue: V) => Z,
    otherCollection: Collection<any, U>,
    thirdCollection: Collection<any, V>)
    : Seq.Indexed<Z>;
    zipWith<Z>(
    zipper: (...any: Array<any>) => Z,
    ...collections: Array<Collection<any, any>>)
    : Seq.Indexed<Z>;
  }


  /**
   * `Seq` which represents a set of values.
   *
   * Because `Seq` are often lazy, `Seq.Set` does not provide the same guarantee
   * of value uniqueness as the concrete `Set`.
   */
  module Set {

    /**
     * Returns a Seq.Set of the provided values
     */
    function of<T>(...values: Array<T>): Seq.Set<T>;
  }

  /**
   * Always returns a Seq.Set, discarding associated indices or keys.
   *
   * Note: `Seq.Set` is a conversion function and not a class, and does not
   * use the `new` keyword during construction.
   */
  function Set(): Seq.Set<any>;
  function Set<T>(): Seq.Set<T>;
  function Set<T>(collection: Iterable<T>): Seq.Set<T>;

  interface Set<T> extends Seq<T, T>, Collection.Set<T> {
    /**
     * Deeply converts this Set Seq to equivalent native JavaScript Array.
     */
    toJS(): Array<any>;

    /**
     * Shallowly converts this Set Seq to equivalent native JavaScript Array.
     */
    toJSON(): Array<T>;

    /**
     * Shallowly converts this collection to an Array.
     */
    toArray(): Array<T>;

    /**
     * Returns itself
     */
    toSeq(): this;

    /**
     * Returns a new Seq with other collections concatenated to this one.
     *
     * All entries will be present in the resulting Seq, even if they
     * are duplicates.
     */
    concat<U>(...collections: Array<Iterable<U>>): Seq.Set<T | U>;

    /**
     * Returns a new Seq.Set with values passed through a
     * `mapper` function.
     *
     * ```js
     * Seq.Set([ 1, 2 ]).map(x => 10 * x)
     * // Seq { 10, 20 }
     * ```
     *
     * Note: `map()` always returns a new instance, even if it produced the
     * same value at every step.
     */
    map<M>(
    mapper: (value: T, key: T, iter: this) => M,
    context?: any)
    : Seq.Set<M>;

    /**
     * Flat-maps the Seq, returning a Seq of the same type.
     *
     * Similar to `seq.map(...).flatten(true)`.
     */
    flatMap<M>(
    mapper: (value: T, key: T, iter: this) => Iterable<M>,
    context?: any)
    : Seq.Set<M>;

    /**
     * Returns a new Seq with only the values for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends T>(
    predicate: (value: T, key: T, iter: this) => value is F,
    context?: any)
    : Seq.Set<F>;
    filter(
    predicate: (value: T, key: T, iter: this) => any,
    context?: any)
    : this;
  }

}

declare interface Seq<K, V> extends Collection<K, V> {

  /**
   * Some Seqs can describe their size lazily. When this is the case,
   * size will be an integer. Otherwise it will be undefined.
   *
   * For example, Seqs returned from `map()` or `reverse()`
   * preserve the size of the original `Seq` while `filter()` does not.
   *
   * Note: `Range`, `Repeat` and `Seq`s made from `Array`s and `Object`s will
   * always have a size.
   */
  readonly size: number | undefined;


  // Force evaluation

  /**
   * Because Sequences are lazy and designed to be chained together, they do
   * not cache their results. For example, this map function is called a total
   * of 6 times, as each `join` iterates the Seq of three values.
   *
   *     var squares = Seq([ 1, 2, 3 ]).map(x => x * x)
   *     squares.join() + squares.join()
   *
   * If you know a `Seq` will be used multiple times, it may be more
   * efficient to first cache it in memory. Here, the map function is called
   * only 3 times.
   *
   *     var squares = Seq([ 1, 2, 3 ]).map(x => x * x).cacheResult()
   *     squares.join() + squares.join()
   *
   * Use this method judiciously, as it must fully evaluate a Seq which can be
   * a burden on memory and possibly performance.
   *
   * Note: after calling `cacheResult`, a Seq will always have a `size`.
   */
  cacheResult(): this;

  // Sequence algorithms

  /**
   * Returns a new Seq with values passed through a
   * `mapper` function.
   *
   * ```js
   * const { Seq } = require('immutable')
   * Seq([ 1, 2 ]).map(x => 10 * x)
   * // Seq [ 10, 20 ]
   * ```
   *
   * Note: `map()` always returns a new instance, even if it produced the same
   * value at every step.
   */
  map<M>(
  mapper: (value: V, key: K, iter: this) => M,
  context?: any)
  : Seq<K, M>;

  /**
   * Returns a new Seq with values passed through a
   * `mapper` function.
   *
   * ```js
   * const { Seq } = require('immutable')
   * Seq([ 1, 2 ]).map(x => 10 * x)
   * // Seq [ 10, 20 ]
   * ```
   *
   * Note: `map()` always returns a new instance, even if it produced the same
   * value at every step.
   * Note: used only for sets.
   */
  map<M>(
  mapper: (value: V, key: K, iter: this) => M,
  context?: any)
  : Seq<M, M>;

  /**
   * Flat-maps the Seq, returning a Seq of the same type.
   *
   * Similar to `seq.map(...).flatten(true)`.
   */
  flatMap<M>(
  mapper: (value: V, key: K, iter: this) => Iterable<M>,
  context?: any)
  : Seq<K, M>;

  /**
   * Flat-maps the Seq, returning a Seq of the same type.
   *
   * Similar to `seq.map(...).flatten(true)`.
   * Note: Used only for sets.
   */
  flatMap<M>(
  mapper: (value: V, key: K, iter: this) => Iterable<M>,
  context?: any)
  : Seq<M, M>;

  /**
   * Returns a new Seq with only the values for which the `predicate`
   * function returns true.
   *
   * Note: `filter()` always returns a new instance, even if it results in
   * not filtering out any values.
   */
  filter<F extends V>(
  predicate: (value: V, key: K, iter: this) => value is F,
  context?: any)
  : Seq<K, F>;
  filter(
  predicate: (value: V, key: K, iter: this) => any,
  context?: any)
  : this;
}

declare function serializeAnnotation(annotation: InkAnnotation): AnnotationBackendJSON<Serializers.InkAnnotationJSON>;

declare function serializeAnnotation(annotation: LineAnnotation): AnnotationBackendJSON<Serializers.LineAnnotationJSON>;

declare function serializeAnnotation(annotation: RectangleAnnotation): AnnotationBackendJSON<Serializers.RectangleAnnotationJSON>;

declare function serializeAnnotation(annotation: EllipseAnnotation): AnnotationBackendJSON<Serializers.EllipseAnnotationJSON>;

declare function serializeAnnotation(annotation: PolygonAnnotation): AnnotationBackendJSON<Serializers.PolygonAnnotationJSON>;

declare function serializeAnnotation(annotation: PolylineAnnotation): AnnotationBackendJSON<Serializers.PolylineAnnotationJSON>;

declare function serializeAnnotation(annotation: TextAnnotation): AnnotationBackendJSON<Serializers.TextAnnotationJSON>;

declare function serializeAnnotation(annotation: NoteAnnotation): AnnotationBackendJSON<Serializers.NoteAnnotationJSON>;

declare function serializeAnnotation(annotation: StampAnnotation): AnnotationBackendJSON<Serializers.StampAnnotationJSON, 'color'>;

declare function serializeAnnotation(annotation: ImageAnnotation): AnnotationBackendJSON<Serializers.ImageAnnotationJSON>;

declare function serializeAnnotation(annotation: MediaAnnotation): AnnotationBackendJSON<Serializers.MediaAnnotationJSON>;

declare function serializeAnnotation(annotation: LinkAnnotation): AnnotationBackendJSON<Serializers.LinkAnnotationJSON>;

declare function serializeAnnotation(annotation: WidgetAnnotation): AnnotationBackendJSON<Serializers.WidgetAnnotationJSON>;

declare function serializeAnnotation(annotation: TextMarkupAnnotation): AnnotationBackendJSON<Serializers.TextMarkupAnnotationJSON>;

declare function serializeAnnotation(annotation: RedactionAnnotation): AnnotationBackendJSON<Serializers.RedactionAnnotationJSON>;

declare function serializeAnnotation(annotation: CommentMarkerAnnotation): AnnotationBackendJSON<Serializers.CommentMarkerAnnotationJSON>;

declare function serializeAnnotation(annotation: UnknownAnnotation): AnnotationBackendJSON<Serializers.UnknownAnnotationJSON>;

declare function serializeAnnotation(annotation: AnnotationsUnion): AnnotationsBackendJSONUnion;

/** @inline */
declare type SerializedAdditionalActionsType = { [key in
ActionTriggerEventType | FormFieldEventTriggerType | FormFieldInputEventTriggerType | WidgetActionTriggerEventType as string]?: {
  type: string;
  [key: string]: unknown;
} };

declare type SerializedJSON = {
  skippedPdfObjectIds?: number[];
  annotations?: Serializers.AnnotationJSONUnion[];
  formFields?: Serializers.FormFieldJSON[];
  skippedPdfFormFieldIds?: number[];
  formFieldValues?: Record<string, any>[];
  comments?: Record<string, any>[];
  skippedComments?: number[];
  attachments?: Record<string, {
    binary: string;
    contentType: string;
  }>;
  skippedPdfBookmarkIds?: string[];
  bookmarks?: Serializers.BookmarkJSON[];
};

/**
 * Form field serializer. Converts one of the supported {@link NutrientViewer.FormFields} to InstantJSON compliant objects.
 *
 * @returns The serialized form field.
 */
declare function serializeFormField(formField: FormField): Serializers.FormFieldJSON;

/**
 * Annotation preset serializer. Converts a {@link AnnotationPreset} to an object.
 *
 * @param preset - Annotation preset to serialize.
 */
declare function serializePreset(preset: AnnotationPreset): Record<string, any>;

/**
 * This namespace contains types and interfaces for serializing and deserializing
 * PDF annotations, form fields, comments, bookmarks, and related data
 * to and from JSON representations compatible with the Nutrient Web SDK. These serialised objects
 * can be used in {@link InstantJSON}
 *
 * #### Serialising an annotation
 * You can use {@link NutrientViewer.Annotations.toSerializableObject} to create serialised object from an annotation.
 * ```ts
 * const annotation = new NutrientViewer.Annotations.TextAnnotation({
 * pageIndex: 0,
 * text: { format: "plain", value : "Welcome to\nNutrientViewer" },
 * font: "Helvetica",
 * boundingBox: new NutrientViewer.Geometry.Rect({ left: 10, top: 20, width: 30, height: 40 }),
 * });
 *
 * const serialisedAnnotation = NutrientViewer.toSerializableObject(annotation);
 * ```
 *
 * #### Serialising a form field
 * You can use {@link NutrientViewer.FormFields.toSerializableObject} to create serialised object from a form field.
 * ```ts
 * const formField = new NutrientViewer.FormFields.TextFormField({
 * pageIndex: 0,
 * value: "Hello, world!",
 * });
 *
 * const serialisedFormField = NutrientViewer.FormFields.toSerializableObject(formField);
 * ```
 *
 * #### Serialising a bookmark
 * You can use {@link NutrientViewer.Bookmark.toSerializableObject} to create serialised object from a bookmark.
 * ```ts
 * const bookmark = new NutrientViewer.Bookmarks.Bookmark({
 * pageIndex: 0,
 * name: "Bookmark 1",
 * action: new NutrientViewer.Actions.GoToAction({ pageIndex: 0 }),
 * });
 *
 * const serialisedBookmark = NutrientViewer.Bookmark.toSerializableObject(bookmark);
 * ```
 *
 * #### Serialising a comment
 * You can use {@link NutrientViewer.Comment.toSerializableObject} to create a serialised object from a comment.
 * ```ts
 * const comment = new NutrientViewer.Comments.Comment({
 * pageIndex: 0,
 * text: { format: "plain", value : "Welcome to\nNutrientViewer" },
 * });
 *
 * const serialisedComment = NutrientViewer.Comment.toSerializableObject(comment);
 * ```
 *
 * @see {@link NutrientViewer.Annotations.toSerializableObject} | {@link NutrientViewer.Annotations.fromSerializableObject}
 * @see {@link NutrientViewer.FormFields.toSerializableObject} | {@link NutrientViewer.FormFields.fromSerializableObject}
 * @see {@link NutrientViewer.Bookmark.toSerializableObject} | {@link NutrientViewer.Bookmark.fromSerializableObject}
 * @see {@link NutrientViewer.Comment.toSerializableObject} | {@link NutrientViewer.Comment.fromSerializableObject}
 */
export declare namespace Serializers {
  /**
   * @group FormField
   */
  export interface ChoiceFormFieldJSON extends BaseFormFieldJSON {
    type: 'pspdfkit/form-field/listbox' | 'pspdfkit/form-field/combobox';
    options: Array<FormOptionJSON>;
    multiSelect: boolean;
    commitOnChange: boolean;
    defaultValues: Array<string>;
  }
  /**
   * @group FormField
   */
  export interface ListBoxFormFieldJSON extends ChoiceFormFieldJSON {
    type: 'pspdfkit/form-field/listbox';
  }
  /**
   * @group FormField
   */
  export type ComboBoxFormFieldJSON = ChoiceFormFieldJSON & DoNotSpellCheckPropertyPair & {
    type: 'pspdfkit/form-field/combobox';
    edit: boolean;
  };
  /**
   * @group FormField
   */
  export interface CheckBoxFormFieldJSON extends BaseFormFieldJSON {
    type: 'pspdfkit/form-field/checkbox';
    options: Array<FormOptionJSON>;
    defaultValues: Array<string>;
  }
  /**
   * @group FormField
   */
  export interface RadioButtonFormFieldJSON extends BaseFormFieldJSON {
    type: 'pspdfkit/form-field/radio';
    options: Array<FormOptionJSON>;
    noToggleToOff: boolean;
    radiosInUnison: boolean;
    defaultValue: string;
  }
  /**
   * @group FormField
   */
  export type TextFormFieldJSON = BaseFormFieldJSON & {
    type: 'pspdfkit/form-field/text';
    password: boolean;
    maxLength?: number | null;
    doNotScroll: boolean;
    multiLine: boolean;
    defaultValue: string;
    comb: boolean;
  } & DoNotSpellCheckPropertyPair;
  /**
   * @group FormField
   */
  export interface ButtonFormFieldJSON extends BaseFormFieldJSON {
    type: 'pspdfkit/form-field/button';
    buttonLabel: string | null;
  }
  /**
   * @group FormField
   */
  export interface SignatureFormFieldJSON extends BaseFormFieldJSON {
    type: 'pspdfkit/form-field/signature';
  }
  /**
   * @group FormField
   */
  export type FormFieldJSON = ListBoxFormFieldJSON | ComboBoxFormFieldJSON | RadioButtonFormFieldJSON | CheckBoxFormFieldJSON | TextFormFieldJSON | ButtonFormFieldJSON | SignatureFormFieldJSON;
  /**
   * @group FormFieldValue
   */
  export interface FormFieldValueJSON {
    type: 'pspdfkit/form-field-value';
    v: 1;
    name: string;
    value?: string | string[] | null;
    optionIndexes?: Array<number>;
    isFitting?: boolean;
    pdfObjectId?: number;
  }
  /**
   * Used to represent options in ChoiceFormFields.
   *
   * @group FormOption
   */
  export interface FormOptionJSON {
    label: string;
    value: string;
  }
  /**
   * @group Annotation
   */
  export interface ImageAnnotationJSON extends Omit<BaseAnnotationJSON, 'type'> {
    type: 'pspdfkit/image';
    description?: string | null;
    fileName?: string | null;
    contentType: string;
    imageAttachmentId: string;
    rotation: number;
    isSignature?: boolean;
    xfdfAppearanceStream?: string;
    xfdfAppearanceStreamOriginalPageRotation?: number;
  }
  /**
   * @group Annotation
   */
  export interface ShapeAnnotationJSON extends Omit<BaseAnnotationJSON, 'type'> {
    strokeWidth: number;
    strokeColor: string | null;
    fillColor: string | null;
    strokeDashArray?: [number, number] | null;
    measurementPrecision?: IMeasurementPrecision | null;
    measurementScale?: MeasurementScaleJSON | null;
    lineWidth?: number | null;
  }
  /**
   * @group Annotation
   */
  export interface EllipseAnnotationJSON extends ShapeAnnotationJSON {
    type: 'pspdfkit/shape/ellipse';
    cloudyBorderIntensity: number | null;
    cloudyBorderInset: InsetJSON | null;
    measurementBBox: IRectJSON | null;
  }
  /**
   * @group Annotation
   */
  export interface LineAnnotationJSON extends ShapeAnnotationJSON {
    type: 'pspdfkit/shape/line';
    startPoint: [number, number];
    endPoint: [number, number];
    lineCaps?: LineCapsType | null;
    lines?: {
      points: [number, number][][];
      intensities: number[][];
    };
  }
  /**
   * @group Annotation
   */
  export interface PolygonAnnotationJSON extends ShapeAnnotationJSON {
    type: 'pspdfkit/shape/polygon';
    points: [number, number][];
    cloudyBorderIntensity: number | null;
    lines?: {
      points: [number, number][][];
      intensities: number[][];
    };
  }
  /**
   * @group Annotation
   */
  export interface PolylineAnnotationJSON extends ShapeAnnotationJSON {
    type: 'pspdfkit/shape/polyline';
    points: [number, number][];
    lineCaps?: LineCapsType | null;
    lines?: {
      points: [number, number][][];
      intensities: number[][];
    };
  }
  /**
   * @group Annotation
   */
  export interface RectangleAnnotationJSON extends ShapeAnnotationJSON {
    type: 'pspdfkit/shape/rectangle';
    cloudyBorderIntensity: number | null;
    cloudyBorderInset?: InsetJSON | null;
    measurementBBox: IRectJSON | null;
  }
  /**
   * @group Annotation
   */
  export interface InkAnnotationJSON extends BaseAnnotationJSON {
    type: 'pspdfkit/ink';
    lines: {
      points: [number, number][][];
      intensities: number[][];
    };
    lineWidth: number;
    strokeColor: string | null;
    backgroundColor: string | null;
    isDrawnNaturally: boolean;
    isSignature: boolean;
  }
  /**
   * @group Annotation
   */
  export interface LinkAnnotationJSON extends BaseAnnotationJSON {
    type: 'pspdfkit/link';
    borderColor?: string | null;
    borderWidth?: number | null;
    borderStyle?: IBorderStyle | null;
  }
  /**
   * @group Annotation
   */
  export interface NoteAnnotationJSON extends Omit<BaseAnnotationJSON, 'type'> {
    type: 'pspdfkit/note';
    text?: {
      format: 'plain';
      value: string;
    };
    icon?: string;
    color?: string;
  }
  /**
   * @group Annotation
   */
  export interface MediaAnnotationJSON extends Omit<BaseAnnotationJSON, 'type'> {
    type: 'pspdfkit/media';
    description: string | null;
    fileName: string | null;
    contentType: string | null;
    mediaAttachmentId: string | null;
  }
  /**
   * @group Annotation
   */
  export interface TextMarkupAnnotationJSON extends BaseTextMarkupAnnotationJSON {
    type: 'pspdfkit/markup/highlight' | 'pspdfkit/markup/squiggly' | 'pspdfkit/markup/strikeout' | 'pspdfkit/markup/underline' | 'pspdfkit/markup/redaction';
    color: string | null;
  }
  /**
   * @group Annotation
   */
  export interface RedactionAnnotationJSON extends BaseTextMarkupAnnotationJSON {
    type: 'pspdfkit/markup/redaction';
    fillColor?: string | null;
    outlineColor?: string | null;
    overlayText?: string | null;
    repeatOverlayText?: boolean | null;
    rotation?: number;
    color?: string | null;
  }
  /**
   * @group Annotation
   */
  export interface StampAnnotationJSON extends Omit<BaseAnnotationJSON, 'type'> {
    type: 'pspdfkit/stamp';
    stampType: StampKind;
    title: string | null;
    color?: string | null;
    subTitle?: string | null;
    subtitle: string | null;
    rotation: number | null;
    xfdfAppearanceStream?: string;
    xfdfAppearanceStreamOriginalPageRotation?: number;
    /**
     * @deprecated
     */
    kind?: StampKind;
  }
  /**
   * @group Annotation
   */
  export interface TextAnnotationJSON extends Omit<BaseAnnotationJSON, 'type'> {
    type: 'pspdfkit/text';
    text: {
      format: 'xhtml' | 'plain';
      value: string;
    };
    fontColor?: string | null;
    backgroundColor?: string | null;
    font?: string | null;
    rotation?: number | null;
    fontSize?: number | null;
    fontStyle?: string[] | null;
    horizontalAlign?: 'left' | 'center' | 'right';
    verticalAlign?: 'top' | 'center' | 'bottom';
    callout?: {
      start: [number, number];
      knee?: [number, number] | null;
      end: [number, number];
      cap?: ILineCap | null;
      innerRectInset?: InsetJSON | null;
    } | null;
    borderStyle?: IBorderStyle | null;
    borderWidth?: number | null;
    borderColor?: string | null;
    isFitting?: boolean;
    lineHeightFactor?: number | null;
  }
  /**
   * @group Annotation
   */
  export interface UnknownAnnotationJSON extends Omit<BaseAnnotationJSON, 'type'> {
    type: 'pspdfkit/unknown';
  }
  /**
   * @group Annotation
   */
  export interface WidgetAnnotationJSON extends Omit<BaseAnnotationJSON, 'type'> {
    type: 'pspdfkit/widget';
    formFieldName: string;
    borderColor?: string | null;
    borderStyle?: IBorderStyle | null;
    borderDashArray?: number[] | null;
    borderWidth?: number | null;
    font?: string | null;
    fontSize?: 'auto' | number | null;
    fontColor?: string | null;
    backgroundColor?: string | null;
    horizontalAlign?: 'left' | 'center' | 'right' | null;
    verticalAlign?: 'top' | 'center' | 'bottom' | null;
    fontStyle?: string[] | null | undefined;
    rotation?: number;
    additionalActions?: SerializedAdditionalActionsType | null;
    lineHeightFactor?: number | null;
    widgetAttachmentId?: string | null;
    contentType?: string | null;
    buttonIconUpdatedAt?: number | null;
  }
  /**
   * @group Annotation
   */
  export interface CommentMarkerAnnotationJSON extends Omit<BaseAnnotationJSON, 'type'> {
    type: 'pspdfkit/comment-marker';
  }
  /**
   * @group Annotation
   */
  export type AnnotationJSONUnion = TextMarkupAnnotationJSON | TextAnnotationJSON | WidgetAnnotationJSON | RedactionAnnotationJSON | StampAnnotationJSON | NoteAnnotationJSON | LinkAnnotationJSON | InkAnnotationJSON | RectangleAnnotationJSON | PolylineAnnotationJSON | PolygonAnnotationJSON | LineAnnotationJSON | EllipseAnnotationJSON | ImageAnnotationJSON | UnknownAnnotationJSON | MediaAnnotationJSON | CommentMarkerAnnotationJSON;
  /**
   * @group Comment
   */
  export interface CommentJSON extends ICollaboratorPermissionsOptions {
    id?: string | null;
    type: 'pspdfkit/comment';
    v: 2;
    rootId: string | number | null;
    pageIndex: number | null;
    pdfObjectId?: number | null;
    creatorName?: string | null;
    name?: string | null;
    createdAt: string | Date;
    updatedAt: string | Date;
    text: {
      value: string | null;
      format: 'xhtml' | 'plain';
    };
    customData?: {
      [key: string]: unknown;
    } | null;
    isAnonymous?: boolean | null;
  }
  /**
   * @group Bookmark
   */
  export type BookmarkJSON = {
    v: 1;
    type: 'pspdfkit/bookmark';
    id: string;
    name: string | null;
    sortKey: number | null;
    action: CoreActionJSON;
    pdfBookmarkId: string | null;
  };
  /**
   * @group Action
   * */
  export type ActionJSON = CoreActionJSON;
}

declare interface ServerConfiguration extends SharedConfiguration {
  /**
   * ***required, Server only***
   *
   * The `authPayload` is the configuration for the JSON Web Token.
   *
   * Please refer to {@link https://www.nutrient.io/guides/document-engine/viewer/client-authentication/ | this guide article} for information how to create valid JWTs.
   *
   * @example
   * NutrientViewer.load({ authPayload: { jwt: 'xxx.xxx.xxx' }, ... });
   *
   * @server
   */
  authPayload?: {
    jwt: string;
  };
  /**
   * ***Server only***
   *
   * The `session` token used to authenticate Web Viewer session with DWS Viewer API or Document Engine.
   *
   * @example
   * NutrientViewer.load({ session: 'xxx.xxx.xxx' });
   *
   * @server
   */
  session?: string;
  /**
   * ***required, Server only***
   *
   * Nutrient Instant is a real-time collaboration platform that enables your users to annotate documents
   * using NutrientViewer across iOS, Android and their browser simultaneously. Annotations synchronized
   * using Nutrient Instant are pushed in real-time to every connected device.
   *
   * All document editing features, such as text annotations, ink drawing or text highlighting, are instantly saved and propagated across all connected devices.
   *
   * When this flag is set to `true`, different parts of the API will also be enabled, for example:
   * {@link NutrientViewer.Instance#connectedClients}.
   *
   * This value does not have a default. You either need to define `instant: true` or
   * `instant: false` in your NutrientViewer configuration.
   *
   * @example
   * NutrientViewer.load({ instant: true, ... });
   *
   * @server
   * @default false
   */
  instant: Instant[keyof Instant];
  /**
   * ***optional, Server only***
   *
   * A list of users that can be mentioned in comments.
   *
   * @example
   * NutrientViewer.load({ mentionableUsers: [
   *   { id: "1", name: "John Doe", displayName: "John", avatar: "https://example.com/avatar.png", description: "john.doe@gmail.com" },
   *   { id: "2", name: "Jane Doe", displayName: "Jane", avatar: "https://example.com/avatar.png", description: "jane.doe@gmail.com" },
   *   { id: "3", name: "John Smith", displayName: "John", avatar: "https://example.com/avatar.png", description: "john.smith@gmail.com" },
   * ] });
   *
   * @server
   */
  mentionableUsers?: Array<MentionableUser>;
  /**
   * ***optional, Server only***
   *
   * The maximum number of users that will be shown in the suggestion dropdown
   * when mentioning a user in a comment.
   *
   * @example
   * NutrientViewer.load({ maxMentionSuggestions: 5 });
   *
   * @default 5
   * @server
   */
  maxMentionSuggestions?: number;
  /**
   * ***required, Server only***
   *
   * The document ID for the document that should be displayed. You can create a document via the
   * Nutrient Document Engine API.
   *
   * Please refer to the Server API documentation for a guide on how to create valid documents.
   *
   * @example
   * NutrientViewer.load({ documentId: '85203', ... });
   *
   * @server
   */
  documentId?: string;
}

/**
 * Returns a copy of the collection with the value at key set to the provided
 * value.
 *
 * A functional alternative to `collection.set(key, value)` which will also
 * work with plain Objects and Arrays as an alternative for
 * `collectionCopy[key] = value`.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { set } = require('immutable')
 * const originalArray = [ 'dog', 'frog', 'cat' ]
 * set(originalArray, 1, 'cow') // [ 'dog', 'cow', 'cat' ]
 * console.log(originalArray) // [ 'dog', 'frog', 'cat' ]
 * const originalObject = { x: 123, y: 456 }
 * set(originalObject, 'x', 789) // { x: 789, y: 456 }
 * console.log(originalObject) // { x: 123, y: 456 }
 * ```
 */
declare function set<K, V, C extends Collection<K, V>>(collection: C, key: K, value: V): C;

declare function set<TProps extends Object, C extends Record_2<TProps>, K extends keyof TProps>(record: C, key: K, value: TProps[K]): C;

declare function set<V, C extends Array<V>>(collection: C, key: number, value: V): C;

declare function set<C, K extends keyof C>(object: C, key: K, value: C[K]): C;

declare function set<V, C extends {[key: string]: V;}>(collection: C, key: string, value: V): C;

/**
 * Create a new immutable Set containing the values of the provided
 * collection-like.
 *
 * Note: `Set` is a factory function and not a class, and does not use the
 * `new` keyword during construction.
 */
declare function Set_2(): Set_2<any>;

declare function Set_2<T>(): Set_2<T>;

declare function Set_2<T>(collection: Iterable<T>): Set_2<T>;

/**
 * A Collection of unique values with `O(log32 N)` adds and has.
 *
 * When iterating a Set, the entries will be (value, value) pairs. Iteration
 * order of a Set is undefined, however is stable. Multiple iterations of the
 * same Set will iterate in the same order.
 *
 * Set values, like Map keys, may be of any type. Equality is determined using
 * `Immutable.is`, enabling Sets to uniquely include other Immutable
 * collections, custom value types, and NaN.
 */
declare module Set_2 {

  /**
   * True if the provided value is a Set
   */
  function isSet(maybeSet: any): maybeSet is Set_2<any>;

  /**
   * Creates a new Set containing `values`.
   */
  function of<T>(...values: Array<T>): Set_2<T>;

  /**
   * `Set.fromKeys()` creates a new immutable Set containing the keys from
   * this Collection or JavaScript Object.
   */
  function fromKeys<T>(iter: Collection<T, any>): Set_2<T>;
  function fromKeys(obj: {[key: string]: any;}): Set_2<string>;

  /**
   * `Set.intersect()` creates a new immutable Set that is the intersection of
   * a collection of other sets.
   *
   * ```js
   * const { Set } = require('immutable')
   * const intersected = Set.intersect([
   *   Set([ 'a', 'b', 'c' ])
   *   Set([ 'c', 'a', 't' ])
   * ])
   * // Set [ "a", "c"" ]
   * ```
   */
  function intersect<T>(sets: Iterable<Iterable<T>>): Set_2<T>;

  /**
   * `Set.union()` creates a new immutable Set that is the union of a
   * collection of other sets.
   *
   * ```js
   * const { Set } = require('immutable')
   * const unioned = Set.union([
   *   Set([ 'a', 'b', 'c' ])
   *   Set([ 'c', 'a', 't' ])
   * ])
   * // Set [ "a", "b", "c", "t"" ]
   * ```
   */
  function union<T>(sets: Iterable<Iterable<T>>): Set_2<T>;
}

declare interface Set_2<T> extends Collection.Set<T> {

  /**
   * The number of items in this Set.
   */
  readonly size: number;

  // Persistent changes

  /**
   * Returns a new Set which also includes this value.
   *
   * Note: `add` can be used in `withMutations`.
   */
  add(value: T): this;

  /**
   * Returns a new Set which excludes this value.
   *
   * Note: `delete` can be used in `withMutations`.
   *
   * Note: `delete` **cannot** be safely used in IE8, use `remove` if
   * supporting old browsers.
   *
   * @alias remove
   */
  delete(value: T): this;
  remove(value: T): this;

  /**
   * Returns a new Set containing no values.
   *
   * Note: `clear` can be used in `withMutations`.
   */
  clear(): this;

  /**
   * Returns a Set including any value from `collections` that does not already
   * exist in this Set.
   *
   * Note: `union` can be used in `withMutations`.
   * @alias merge
   * @alias concat
   */
  union<C>(...collections: Array<Iterable<C>>): Set_2<T | C>;
  merge<C>(...collections: Array<Iterable<C>>): Set_2<T | C>;
  concat<C>(...collections: Array<Iterable<C>>): Set_2<T | C>;

  /**
   * Returns a Set which has removed any values not also contained
   * within `collections`.
   *
   * Note: `intersect` can be used in `withMutations`.
   */
  intersect(...collections: Array<Iterable<T>>): this;

  /**
   * Returns a Set excluding any values contained within `collections`.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { OrderedSet } = require('immutable')
   * OrderedSet([ 1, 2, 3 ]).subtract([1, 3])
   * // OrderedSet [2]
   * ```
   *
   * Note: `subtract` can be used in `withMutations`.
   */
  subtract(...collections: Array<Iterable<T>>): this;


  // Transient changes

  /**
   * Note: Not all methods can be used on a mutable collection or within
   * `withMutations`! Check the documentation for each method to see if it
   * mentions being safe to use in `withMutations`.
   *
   * @see `Map#withMutations`
   */
  withMutations(mutator: (mutable: this) => any): this;

  /**
   * Note: Not all methods can be used on a mutable collection or within
   * `withMutations`! Check the documentation for each method to see if it
   * mentions being safe to use in `withMutations`.
   *
   * @see `Map#asMutable`
   */
  asMutable(): this;

  /**
   * @see `Map#wasAltered`
   */
  wasAltered(): boolean;

  /**
   * @see `Map#asImmutable`
   */
  asImmutable(): this;

  // Sequence algorithms

  /**
   * Returns a new Set with values passed through a
   * `mapper` function.
   *
   *     Set([1,2]).map(x => 10 * x)
   *     // Set [10,20]
   */
  map<M>(
  mapper: (value: T, key: T, iter: this) => M,
  context?: any)
  : Set_2<M>;

  /**
   * Flat-maps the Set, returning a new Set.
   *
   * Similar to `set.map(...).flatten(true)`.
   */
  flatMap<M>(
  mapper: (value: T, key: T, iter: this) => Iterable<M>,
  context?: any)
  : Set_2<M>;

  /**
   * Returns a new Set with only the values for which the `predicate`
   * function returns true.
   *
   * Note: `filter()` always returns a new instance, even if it results in
   * not filtering out any values.
   */
  filter<F extends T>(
  predicate: (value: T, key: T, iter: this) => value is F,
  context?: any)
  : Set_2<F>;
  filter(
  predicate: (value: T, key: T, iter: this) => any,
  context?: any)
  : this;
}
export { Set_2 as Set };

/**
 * This callback can be used in the {@link NutrientViewer.Instance#setDocumentEditorFooterItems|setDocumentEditorFooterItems()}
 * method to do atomic updates to the document editor footer items.
 *
 * @example
 * Use ES2015 arrow functions and the update callback to reduce boilerplate
 * ```ts
 * instance.setDocumentEditorFooterItems(items => {
 *   const button = instance.contentDocument.createElement('div');
 *   button.innerText = "Custom Save"
 *   items.push({
 *     type: "custom",
 *     node: button,
 *     onPress(){
 *       alert("save");
 *     }
 *   });
 *   return items;
 * });
 * ```
 *
 * @public
 * @param currentState - The current document editor footer items.
 * @returns The new document editor footer items.
 * @inline
 */
declare type SetDocumentEditorFooterFunction = (currentState: DocumentEditorFooterItem[]) => DocumentEditorFooterItem[];

/**
 * This callback can be used in the {@link NutrientViewer.Instance#setDocumentEditorToolbarItems | setDocumentEditorToolbarItems()}
 * method to do atomic updates to the document editor toolbar items.
 *
 * @example
 * Use ES2015 arrow functions and the update callback to reduce boilerplate
 * ```ts
 * instance.setDocumentEditorToolbarItems(items => {
 *   const button = instance.contentDocument.createElement('div');
 *   button.innerText = "Do something"
 *   items.push({
 *     type: "custom",
 *     node: button,
 *     onPress(){
 *       alert("Do Something");
 *     }
 *   });
 *   return items;
 * });
 * ```
 *
 * @public
 * @param currentState - The current document editor toolbar items.
 * @returns The new document editor toolbar items.
 * @inline
 */
export declare type SetDocumentEditorToolbarFunction = (currentState: DocumentEditorToolbarItem[]) => DocumentEditorToolbarItem[];

/**
 * Returns a copy of the collection with the value at the key path set to the
 * provided value.
 *
 * A functional alternative to `collection.setIn(keypath)` which will also
 * work with plain Objects and Arrays.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { setIn } = require('immutable')
 * const original = { x: { y: { z: 123 }}}
 * setIn(original, ['x', 'y', 'z'], 456) // { x: { y: { z: 456 }}}
 * console.log(original) // { x: { y: { z: 123 }}}
 * ```
 */
declare function setIn<C>(collection: C, keyPath: Iterable<any>, value: any): C;

/**
 * Callback function to modify the current stack of document operations to be applied to the open document.
 * This function is invoked with the current stack of document operations as the first argument, and must return the new stack of document operations.
 * The new stack of document operations can be the same as the current one, or a new one.
 *
 * @param callback - Callback that receives the current operations committed and returns a new list of operations.
 * @param clearPagesSelection - Whether to clear the current selection of pages after returning the new operations or not.
 * @returns The new stack of document operations.
 * @inline
 */
declare type SetOperationsCallback = (callback: StagedDocumentOperationsCallback, clearPagesSelection?: boolean) => void | Promise<void>;

/**
 * This callback can be used in the {@link Instance#setSearchState | setSearchState()}
 * method to do atomic updates to the current search state.
 *
 * @example
 * Use ES2015 arrow functions and the update callback to reduce boilerplate
 * ```ts
 * instance.setSearchState(state => state.set("isFocused", true));
 * ```
 *
 * @param currentState - The current search state.
 * @returns The new search state.
 * @inline
 */
declare type SetSearchStateFunction = (currentState: SearchState) => SearchState;

/**
 * This callback can be used in the {@link NutrientViewer.Instance#setStampAnnotationTemplates | setStampAnnotationTemplates()}
 * method to do atomic updates to the current stamp annotation templates.
 *
 * @example
 * Use ES2015 arrow functions and the update callback to reduce boilerplate
 * ```ts
 * instance.setStampAnnotationTemplates(stamps => {
 *   stamps.pop(); // removes the last template of the stamps array
 *   return stamps;
 * });
 * ```
 *
 * @param currentStampAnnotationTemplates - The current stamp and image annotation templates.
 * @returns The new stamp and image annotation templates.
 *
 * @inline
 */
declare type SetStampAnnotationTemplatesFunction = (currentStampAnnotationTemplates: Array<StampAnnotation | ImageAnnotation>) => Array<StampAnnotation | ImageAnnotation>;

/**
 * This callback can be used in the {@link Instance#setToolbarItems | setToolbarItems()}
 * method to do atomic updates to the current toolbar items.
 *
 * @example
 * Use ES2015 arrow functions and the update callback to reduce boilerplate
 * ```ts
 * instance.setToolbarItems(items => {
 *   items.push({
 *     type: "custom",
 *     title: "My Custom Button",
 *     onPress(){
 *       alert("hello");
 *     }
 *   });
 *   return items;
 * });
 * ```
 *
 * @param currentToolbarItems - The current toolbar items.
 * @returns The new toolbar items.
 * @inline
 */
declare type SetToolbarFunction = (currentToolbarItems: ToolbarItem_2[]) => ToolbarItem_2[];

/** @inline */
declare type SetToolbarItemsFunction = (currentState: TextComparisonToolbarItem[]) => TextComparisonToolbarItem[];

/**
 * @class
 * Base annotation type from which all shape annotations inherit. You can not directly instantiate
 * from this type.
 *
 * Shape annotations are used to draw different shapes on a page: lines, rectangles, ellipses,
 * polylines and polygons.
 *
 * Shapes which have start and ending points such as lines and polylines can have optional line
 * start and line ending markers which can be filled with an optional fill color.
 *
 * Shapes which define a closed area such as rectangles, ellipses and polygons, can have an optional
 * fill color for the enclosed area.
 *
 * Shapes lines can be solid or dashed with a dash pattern chosen from a predefined list.
 *
 * Shape annotations without a fill color or with transparent fill color are only selectable
 * around their visible lines or colored areas. This means that you can create a page full of
 * these annotations while annotations behind them are still selectable.
 *
 * Right now, shape annotations are implemented using SVG images. This behavior is subject to change.
 *
 * For interacting with a shape annotation, please look at the subtypes:
 *
 * - {@link NutrientViewer.Annotations.LineAnnotation}
 * - {@link NutrientViewer.Annotations.RectangleAnnotation}
 * - {@link NutrientViewer.Annotations.EllipseAnnotation}
 * - {@link NutrientViewer.Annotations.PolylineAnnotation}
 * - {@link NutrientViewer.Annotations.PolygonAnnotation}
 * @example <caption>Create a shape annotation (line) that displays a line</caption>
 * const annotation = new NutrientViewer.Annotations.LineAnnotation({
 *   pageIndex: 0,
 *   startPoint: new NutrientViewer.Geometry.Point({ x: 95, y: 5 }),
 *   endPoint: new NutrientViewer.Geometry.Point({ x: 5,  y: 95}),
 *   strokeWidth: 4
 * });
 *
 * @summary Base annotation type for all shape annotations.
 */
export declare abstract class ShapeAnnotation<T extends IShapeAnnotation = IShapeAnnotation> extends Annotation<T> {
  /**
   * Optional dash pattern used to draw the shape lines for dashed line style.
   */
  strokeDashArray: null | [number, number];
  /**
   * The width of the line in page size pixels. By default, we use values between 1 and 40 in
   * the UI.
   *
   * The stroke width will scale when you zoom in.
   *
   * @default 5
   */
  strokeWidth: number;
  /**
   * A {@link NutrientViewer.Color} for the shape lines
   *
   * @default Color.BLUE
   */
  strokeColor: null | Color;
  /**
   * A {@link NutrientViewer.Color} to fill the interior of closed shapes (ellipses, rectangles and polygons)
   * or start and / or end line caps of open shapes (lines and polylines).
   *
   * @default null
   */
  fillColor: null | Color;
  /**
   * The {@link NutrientViewer.MeasurementPrecision} used to set the precision for the annotation.
   *
   * @default NutrientViewer.MeasurementPrecision.TWO
   */
  measurementPrecision: null | IMeasurementPrecision;
  /**
   * The {@link NutrientViewer.MeasurementScale} used to set the scale for the annotation.
   */
  measurementScale: null | MeasurementScale;
  static readableName: string;
  static defaultValues: IObject;
  /**
   * A method that tels whether the annotation is a measurement annotation.
   */
  isMeasurement(): boolean;
  /**
   * A method the returns the measurement value and label of the annotation.
   *
   * @example
   * const { value, label } = annotation.getMeasurementDetails();
   *
   * console.log(value, label);
   */
  getMeasurementDetails: () => {
    value: number;
    label: string;
  };
}

declare abstract class ShapeAnnotationSerializer extends AnnotationSerializer {
  annotation: ShapeAnnotationsUnion;
  toJSON(): Serializers.ShapeAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<Serializers.ShapeAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): {
    strokeWidth: number | null;
    strokeColor: Color | null;
    fillColor: Color | null;
    strokeDashArray: [number, number] | null | undefined;
    measurementPrecision: IMeasurementPrecision | null | undefined;
    measurementScale: MeasurementScale | null;
    group?: string | null | undefined;
    canSetGroup?: boolean | undefined;
    isEditable?: boolean | undefined;
    isDeletable?: boolean | undefined;
    blendMode?: IBlendMode | undefined;
    id: string | null;
    name: string | null;
    subject: string | null;
    pdfObjectId: number | null;
    pageIndex: number;
    opacity: number;
    boundingBox: Rect;
    noPrint: boolean;
    noZoom: boolean;
    noRotate: boolean;
    noView: boolean;
    hidden: boolean;
    locked: boolean;
    lockedContents: boolean;
    readOnly: boolean;
    action: Action | null | undefined;
    note: string | null;
    createdAt: Date;
    updatedAt: Date;
    creatorName: string | null;
    customData: Record<string, unknown> | null;
    isCommentThreadRoot: boolean;
    isAnonymous: boolean;
  };
  _pointsToJSON(): Array<[number, number]>;
  static _JSONToPoints(pointsJSON: Array<[number, number]>): List<Point>;
  static _JSONLinesToPoints(linesJSON: {
    points: Array<Array<[number, number]>>;
    intensities: Array<Array<number>>;
  }): List<Point>;
}

export declare type ShapeAnnotationsUnion = PolylineAnnotation | PolygonAnnotation | LineAnnotation | RectangleAnnotation | EllipseAnnotation;

/** @inline */
declare interface Shared extends Omit<ToolItem_2, 'selected' | 'type'> {
  /**
   * Callback to invoke when the item is clicked or tapped (on touch devices). It gets the `event` as
   * first argument, the `id` of the tool item as the second for `custom` items.
   *
   * @param event - The event that is fired on press. `onPress` is also fired when pressing enter.
   * @param id - The toolbar item id.
   */
  onPress?: (event: MouseEvent | KeyboardEvent, id?: string | undefined) => void;
  iconClassName?: string;
  onIconPress?: (event: MouseEvent, id?: string) => void;
}

/**
 * This describes the properties of a {@link NutrientViewer.load} configuration.
 */
declare interface SharedConfiguration {
  /**
   * Selector or element where Nutrient Web SDK will be mounted.
   *
   * The element must have a `width` and `height` that's greater than zero. Nutrient Web SDK adapts to the dimensions
   * of this element. This way, applying responsive rules will work as expected.
   *
   * The element can be styled using relative values as you would expect it to (CSS media queries
   * are encouraged).
   *
   * @example
   * // In your HTML
   * <div class="foo"></div>
   *
   * // In your JavaScript
   * NutrientViewer.load({ container: '.foo', ... });
   * // or
   * const element = document.getElementsByClassName('foo')[0]
   * NutrientViewer.load({ container: element, ... });
   */
  container: string | HTMLElement;
  /**
   * This property allows you to set an initial viewing state for the NutrientViewer instance.
   *
   * This can be used to customize behavior before the application mounts (e.g Scroll to a specific
   * page or use the SINGLE_PAGE mode)
   *
   * It will default to a view state with its default properties (see {@link ViewState}).
   *
   * If the initial view state is invalid (for example, when you define a page index that does not
   * exist), the method will fall back to the default value for the invalid property. This means when
   * you set the initial `currentPageIndex` to 5 but the document only has three pages, NutrientViewer will
   * start on the first page but will still apply other rules defined in this initial view state.
   *
   * @example
   * const initialViewState = new NutrientViewer.ViewState({ currentPageIndex: 2 });
   * NutrientViewer.load({ initialViewState: initialViewState, ... });
   *
   * @default {@link ViewState}
   */
  initialViewState?: ViewState;
  /**
   * This allows you to overwrite the auto-detected URL for all NutrientViewer assets. This setting is
   * necessary when you load Nutrient Web SDK JavaScript from a different URL.
   *
   * If your assets are served from a different origin, you have to include proper CORS headers:
   * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS}
   *
   * @example
   * NutrientViewer.load({ baseUrl: 'https://public-server.pspdfkit.com/' });
   *
   * @default Auto-detected based on the currently executed `&lt;script&gt;` tag.
   *
   * Note: auto-detection behavior is deprecated as of 1.9.0. Not providing baseUrl will currently
   * trigger a warning and in future releases will lead to loading assets from CDN.
   */
  baseUrl?: string;
  /**
   * This property is a temporary flag to explicitly enable loading assets from the CDN when
   * `baseUrl` is not provided. This flag will be removed in future releases once loading
   * from CDN is the default behavior when `baseUrl` is not set.
   *
   * Has no effect when `baseUrl` is provided.
   *
   * @default false
   */
  useCDN?: boolean;
  /**
   * This allows you to overwrite the auto-detected Nutrient Document Engine URL. This setting is necessary
   * when your Nutrient Document Engine is located under a different URL.
   *
   * @example
   * NutrientViewer.load({ serverUrl: 'https://public-server.pspdfkit.com/' })
   *
   * @default Auto-detected based on the currently executed `&lt;script&gt;` tag.
   */
  serverUrl?: string;
  /**
   * This property allows you to change the size of the tiles used to render the document, in pixels. The bigger the tile, the fewer requests is made, but each tile will take longer to render.
   *
   * This is useful for situations where you want to reduce the number of requests made to the server.
   *
   * By default, the tile size is set to 512px in Nutrient Document Engine (server-backed) deployment, and 1536px in Standalone deployment.
   *
   * @example
   * NutrientViewer.load({
   *   tileSize: 1024
   * })
   *
   * @default 512 in Nutrient Document Engine (server-backed), 1536 in Standalone
   */
  tileSize?: number;
  /**
   * This will load your custom CSS as a `<link rel="stylesheet">` inside the NutrientViewer component. This
   * is necessary to isolate styling of the viewer from the outside application and avoid external
   * stylesheets overwriting important viewer attributes.
   *
   * An array is allowed to load multiple stylesheets. The order in the array will also be the
   * order in which the stylesheets get loaded.
   *
   * The array will be copied by us on start up time, which means that you can not mutate it
   * after the viewer has started.
   *
   * More information on how to style Nutrient Web SDK can be found in our guides.
   *
   * @example
   * NutrientViewer.load({
   *   styleSheets: [
   *     'https://example.com/my-stylesheet.css',
   *     'https://example.com/other-stylesheet.css'
   *   ]
   * })
   *
   * @default []
   */
  styleSheets?: Array<string>;
  /**
   * This property allows you to set an initial list of toolbar items for the NutrientViewer instance.
   * This can be used to customize the main toolbar before the application mounts.
   *
   * When omitted, it will default to {@link NutrientViewer.defaultToolbarItems}.
   *
   * @example
   * const toolbarItems = NutrientViewer.defaultToolbarItems;
   * toolbarItems.reverse();
   * NutrientViewer.load({ toolbarItems: toolbarItems, ... });
   *
   * @default Default {@link NutrientViewer.defaultToolbarItems}
   */
  toolbarItems?: Array<ToolbarItem>;
  /**
   * This property allows you to change a default list of annotation presets for the NutrientViewer instance.
   * This can be used to customize the main toolbar buttons' behaviour before the application mounts.
   *
   * When omitted, it will default to {@link NutrientViewer.defaultAnnotationPresets}.
   *
   * @example
   * const annotationPresets = NutrientViewer.defaultAnnotationPresets
   * annotationPresets.mypreset = {
   *   strokeWidth: 10,
   * };
   * NutrientViewer.load({ annotationPresets, ... });
   *
   * @default Default {@link NutrientViewer.defaultAnnotationPresets}
   */
  annotationPresets?: Record<AnnotationPresetID, AnnotationPreset>;
  /**
   * This property allows you to set an initial list of stamp and image annotation templates for the NutrientViewer instance.
   * This can be used to customize the list of available stamp and image annotation templates that will be available in the stamps picker UI before the application mounts.
   *
   * When omitted, it will default to {@link NutrientViewer.defaultStampAnnotationTemplates}.
   *
   * @example
   * const stampAnnotationTemplates = NutrientViewer.defaultStampAnnotationTemplates
   * const stampAnnotationTemplates.push(new NutrientViewer.Annotations.StampAnnotation({
   *   stampType: "Custom",
   *   title: "My custom text",
   *   boundingBox: new NutrientViewer.Geometry.Rect({
   *     left: 0,
   *     top: 0,
   *     width: 300,
   *     height: 100
   *   })
   * }));
   * NutrientViewer.load({ stampAnnotationTemplates, ... });
   *
   * @default Default {@link NutrientViewer.defaultStampAnnotationTemplates}
   */
  stampAnnotationTemplates?: Array<StampAnnotation | ImageAnnotation>;
  /**
   * This property allows you to set the auto save mode, which controls when annotations or form field
   * values get saved.
   *
   * When using `instant: true`, the default auto save mode is IMMEDIATE, otherwise it's
   * INTELLIGENT.
   *
   * @example
   * NutrientViewer.load({ autoSaveMode: NutrientViewer.AutoSaveMode.INTELLIGENT })
   */
  autoSaveMode?: IAutoSaveMode;
  /**
   * This property allows you to disable high quality printing, which will print the document in a higher
   * resolution (300dpi) than the default (150dpi). When not explicitly set, high quality printing is disabled
   * for iOS and Android devices on standalone deployments to improve performances.
   *
   * @example
   * NutrientViewer.load({ disableHighQualityPrinting: true })
   *
   * @default false
   */
  disableHighQualityPrinting?: boolean;
  /**
   * This property allows you to set the {@link NutrientViewer.PrintMode} to use.
   *
   * @example
   * NutrientViewer.load({ printMode: NutrientViewer.PrintMode.DOM })
   *
   * @default NutrientViewer.PrintMode.DOM
   * @deprecated
   */
  printMode?: IPrintMode;
  /**
   * Allows to set different printing options like mode and printing quality.
   *
   * @default { mode: NutrientViewer.PrintMode.DOM, quality: NutrientViewer.PrintQuality.HIGH }
   */
  printOptions?: {
    /** {@link NutrientViewer.PrintMode} mode to use for printing. */
    mode?: IPrintMode;
    /** {@link NutrientViewer.PrintQuality} The option to control the quality of the printing. */
    quality?: IPrintQuality;
  };
  /**
   * When this property is set to true, text in the document can not be highlighted.
   *
   * @example
   * NutrientViewer.load({ disableTextSelection: true })
   */
  disableTextSelection?: boolean;
  /**
   * This property is used to force the disabling of form rendering and parsing, even if your license
   * would permit it.
   *
   * @example
   * NutrientViewer.load({ disableForms: true })
   *
   * @default false
   */
  disableForms?: boolean;
  /**
   * Loads Nutrient Web SDK in Headless mode i.e. without a UI.
   * Some UI-specific APIs, like the Toolbars API, are not available in this mode
   * and, when used, will throw an error.
   *
   * @example
   * NutrientViewer.load({
   *   headless: true,
   *   // ...
   * });
   */
  headless?: boolean;
  /**
   * The initial `locale` (language) for the application.
   * All the available locales are defined in {@link NutrientViewer.I18n.locales}.
   * When a locale is not provided Nutrient Web SDK tries to autodetect the locale using `window.navigator.language`.
   * If the detected locale is not supported then the `en` locale is used instead.
   *
   * @example
   * NutrientViewer.load({
   *   locale: 'de',
   *   // ...
   * });
   */
  locale?: string;
  /**
   * Loads Ink Signatures when the UI displays them for the first time.
   *
   * Ink Signatures are special Ink Annotations whose `pageIndex` and `boundingBox` are defined at creation time.
   * They can be converted to serializable objects with {@link NutrientViewer.Annotations.toSerializableObject} and stored as JSON using their InstantJSON format.
   * Serialized JSON annotations can be deserialized with `JSON.parse` and then converted to annotations with {@link NutrientViewer.Annotations.fromSerializableObject}.
   *
   * @example
   * Populate Ink Signatures on demand.
   * ```ts
   * NutrientViewer.load({
   *   populateInkSignatures: () => {
   *    return fetch('/signatures')
   *       .then(r => r.json())
   *       .then(a => (
   *           NutrientViewer.Immutable.List(
   *             a.map(NutrientViewer.Annotations.fromSerializableObject))
   *           )
   *        );
   *   },
   *   // ...
   * });
   * ```
   *
   * @default () => Promise.resolve(NutrientViewer.Immutable.List())
   * @returns A Promise that resolves to a {@link NutrientViewer.Immutable.List} of {@link NutrientViewer.Annotations.InkAnnotation InkAnnotation} that describe signatures.
   * @deprecated
   */
  populateInkSignatures?: () => Promise<List<InkAnnotation | ImageAnnotation>>;
  /**
   * Loads signatures when the UI displays them for the first time.
   *
   * Signatures can be added as special Ink Annotations or Image Annotations whose `pageIndex` and `boundingBox` are defined at creation time.
   * They can be converted to serializable objects with {@link NutrientViewer.Annotations.toSerializableObject} and stored as JSON using their InstantJSON format.
   * Serialized JSON annotations can be deserialized with `JSON.parse` and then converted to annotations with {@link NutrientViewer.Annotations.fromSerializableObject}.
   *
   * @example
   * Populate Signatures on demand.
   * ```ts
   * NutrientViewer.load({
   *   populateStoredSignatures: () => {
   *    return fetch('/signatures')
   *       .then(r => r.json())
   *       .then(a => (
   *           NutrientViewer.Immutable.List(
   *             a.map(NutrientViewer.Annotations.fromSerializableObject))
   *           )
   *        );
   *   },
   *   // ...
   * });
   * ```
   *
   * @default () => Promise.resolve(NutrientViewer.Immutable.List())
   * @returns {Promise.<NutrientViewer.Immutable.List.<NutrientViewer.Annotations.InkAnnotation | NutrientViewer.Annotations.ImageAnnotation>>} A Promise that resolves to a {@link NutrientViewer.Immutable.List} of {@link NutrientViewer.Annotations.InkAnnotation InkAnnotation} or {@link NutrientViewer.Annotations.ImageAnnotation ImageAnnotation} that describe signatures.
   */
  populateStoredSignatures?: () => Promise<List<InkAnnotation | ImageAnnotation>>;
  /**
   * List of signature form fields names that are not allowed to store Ink Signatures.
   *
   * When a signature form field name is on this list, any new ink signature for this field that is created via the UI won't be stored.
   *
   * @example
   * NutrientViewer.load({
   *   formFieldsNotSavingSignatures: ['signatureField1'],
   *   // ...
   * });
   *
   * @default []
   */
  formFieldsNotSavingSignatures?: Array<string>;
  /**
   * If set, it will try to unlock the PDF with the provided password when loading it. PDFs which do
   * not require a password won't open if this property is set.
   *
   * @example
   * NutrientViewer.load({
   *   password: 'secr3t',
   *   // ...
   * });
   */
  password?: string;
  /**
   * By default, Nutrient Web SDK will initialize using [PDF Open Parameters](https://www.adobe.com/content/dam/acom/en/devnet/acrobat/pdfs/PDFOpenParameters.pdf)
   * that are supported by our viewer. This option can be used if you want to opt-out from this
   * behavior.
   *
   * Setting a custom {@link ViewState} will overwrite these defaults. You can use
   * {@link NutrientViewer.viewStateFromOpenParameters} to manually extract those values.
   *
   * Currently, we only support the `page` parameter.
   *
   * @example
   * NutrientViewer.load({
   *   disableOpenParameters: true,
   * });
   */
  disableOpenParameters?: boolean;
  /**
   * Defines how often the password modal is presented after a wrong password has been entered. By
   * default, there won't be a limit for a regular Nutrient Web SDK installation.
   *
   * When running in the headless mode, this option is ignored as we don't have an interface where
   * we could request a password (This is the same as setting `maxPasswordRetries` to `0`).
   *
   * @example
   * NutrientViewer.load({
   *   maxPasswordRetries: 3,
   *   // ...
   * });
   */
  maxPasswordRetries?: number;
  /**
   * When you're using a ServiceWorker, set this flag to `true` to be able to use Nutrient Web SDK
   * offline. Due to a browser bug, loading CSS files would bypass service workers and we therefore
   * load all CSS files via XHR and embed the content. Instead of loading files like SVGs by using
   * `url` in your CSS, please add them as base64, otherwise these requests would bypass the service
   * worker as well.
   *
   * @example
   * NutrientViewer.load({
   *   enableServiceWorkerSupport: true,
   *   // ...
   * });
   */
  enableServiceWorkerSupport?: boolean;
  /**
   * When copying of text is disabled, it's still possible to select text but copying either using the
   * shortcut or a context menu will have no effect.
   *
   * This is implemented internally by listening to the `copy` event and prevent the default
   * implementation.
   *
   * Please note that preventing text copying only provides limited security since the text will still
   * be transmitted to the client.
   *
   * @example
   * NutrientViewer.load({
   *   preventTextCopy: true,
   *   // ...
   * });
   */
  preventTextCopy?: boolean;
  /**
   * This callback is called whenever a page is rendered or printed (only for
   * {@link NutrientViewer.PrintMode}.DOM). You can use it to render watermarks on the page.
   *
   * @example
   * NutrientViewer.load({
   *   renderPageCallback: function(ctx, pageIndex, pageSize) {
   *     ctx.beginPath();
   *     ctx.moveTo(0, 0);
   *     ctx.lineTo(pageSize.width, pageSize.height);
   *     ctx.stroke();
   *
   *     ctx.font = "30px Comic Sans MS";
   *     ctx.fillStyle = "red";
   *     ctx.textAlign = "center";
   *     ctx.fillText(
   *       `This is page ${pageIndex + 1}`,
   *       pageSize.width / 2,
   *       pageSize.height / 2
   *     );
   *   }
   *   // ...
   * });
   */
  renderPageCallback?: RenderPageCallback;
  /**
   * This callback is called whenever an annotation gets selected and can be used to
   * define and return an array of {@link ToolItem} that will be rendered in a tooltip
   * for the given annotation.
   *
   * If the callback returns an empty array then NutrientViewer won't show any tooltip for the selected annotation.
   *
   * @example
   * NutrientViewer.load({
   *   annotationTooltipCallback: function(annotation) {
   *     if (annotation instanceof NutrientViewer.Annotations.TextAnnotation) {
   *       var toolItem = {
   *         type: 'custom',
   *         title: 'tooltip item for text annotations',
   *         id: 'item-text-tooltip-annotation',
   *         className: 'TooltipItem-Text',
   *         onPress: function () {
   *           console.log(annotation)
   *         }
   *       }
   *       return [toolItem]
   *     } else {
   *       return []
   *     }
   *   }
   *   // ...
   * });
   */
  annotationTooltipCallback?: AnnotationTooltipCallback;
  /**
   * This property defines all annotation types that a user is able to modify. If it's not set, the
   * user is allowed to select, create, edit or delete every annotation type. By allowing only certain
   * annotation types for modification, you can be sure that there is no annotation type that gets
   * introduced in the future that your user is then able to modify.
   *
   * @example
   * Allow only the modification of ink annotations
   * ```ts
   * NutrientViewer.load({
   *   editableAnnotationTypes: [NutrientViewer.Annotations.InkAnnotation],
   *   // ...
   * });
   * ```
   */
  editableAnnotationTypes?: Array<Class<AnnotationsUnion>>;
  /**
   * By implementing this callback you have a fine grained control over which annotations are read-only.
   * This callback will receive the Annotation a user wants to modify and by returning `true` or
   * `false` you can define if the annotation should be read-only (`false`) or modifiable (`true`).
   *
   * This API will not disable ToolbarButtons for you, but will not allow the user to create
   * a new Annotation with the UI.
   *
   * @example
   * Only allow the modification of annotations from the same author
   * ```ts
   * NutrientViewer.load({
   *   isEditableAnnotation: function(annotation) {
   *     return annotation.creatorName === myCurrentUser.name;
   *   },
   * });
   * ```
   *
   * @example
   * Do not allow changing the value of a specific form field
   * ```ts
   * NutrientViewer.load({
   *   isEditableAnnotation: function(annotation) {
   *     // Check if the annotation is associated with a specific form field
   *     if (
   *       annotation instanceof NutrientViewer.Annotations.WidgetAnnotation &&
   *       annotation.formFieldName === "MyFormField"
   *     ) {
   *       // If it is, disallow editing it
   *       return false;
   *     }
   *     // Otherwise, allow editing
   *     return true;
   *   },
   * });
   * ```
   */
  isEditableAnnotation?: IsEditableAnnotationCallback;
  /**
   * Allows to modify the default behavior when annotations are resized using the selection corner
   * handles by returning an object. This provides more control over whether annotations should keep their aspect ratio when resized, for example.
   *
   * @example
   * Unlock aspect ratio for the top left resize anchor
   * ```ts
   * NutrientViewer.load({
   *   onAnnotationResizeStart: event => {
   *     return {
   *       maintainAspectRatio: event.resizeAnchor === 'TOP_LEFT',
   *     }
   *   }
   * });
   * ```
   */
  onAnnotationResizeStart?: AnnotationResizeStartCallback;
  /**
   * This object can include functions to be called when specific entities, like annotations,
   * are being rendered in the viewport, and return additional or replacement DOM content for
   * the entity instance.
   *
   * Currently only annotation's rendering can be customized using the `Annotation` key.
   *
   * If the callback returns null, the instance will be rendered normally.
   *
   * @example
   * NutrientViewer.load({
   *   customRenderers: {
   *     Annotation: ({ annotation }) => ({
   *       node: document.createElement('div').appendChild(document.createTextNode('Custom rendered!')),
   *       append: true,
   *     })
   *   }
   *   // ...
   * });
   */
  customRenderers?: CustomRenderers;
  /**
   * Object with callback methods to be called when different elements of the UI are being rendered. Can return DOM content to be appended to them, as well as callback functions to individually process different parts of the element (items) as they're rendered.
   *
   * UI elements currently supported: sidebars.
   *
   * @example
   * //Fully customized sidebar
   *
   * NutrientViewer.load({
   *   customUI: {
   *     [NutrientViewer.UIElement.Sidebar]: {
   *       [NutrientViewer.SidebarMode.CUSTOM]({ containerNode }) {
   *         // React portals can be used as well.
   *         // Or Vue portals, or any other framework API that allows appending components
   *         // to arbitrary DOM nodes.
   *         // Using vanilla JS, you can just append a node to parentNode.
   *         const div = document.createElement("div");
   *         div.append("My custom sidebar");
   *         containerNode.appendChild(div);
   *
   *         return {
   *           // By returning the same node that was provided, we opt-out of having the node
   *           // appended. If we return a different node, it will be appended to the provided node.
   *           node: containerNode,
   *         };
   *       }
   *     }
   *   }
   * });
   *
   * //Partially customized sidebar
   *
   * NutrientViewer.load({
   *   customUI: {
   *     [NutrientViewer.UIElement.Sidebar]: {
   *       [NutrientViewer.SidebarMode.ANNOTATIONS]({ containerNode }) {
   *         containerNode.style.padding = "0.5rem";
   *
   *         if (!containerNode.querySelector(".MyCustomSidebarComponentHeader")) {
   *           const header = document.createElement("div");
   *           header.classList.add("MyCustomSidebarComponentHeader");
   *           containerNode.prepend(header);
   *         }
   *
   *         return {
   *           node: containerNode,
   *           onRenderItem({ itemContainerNode, item: annotation }) {
   *             const footerAuthor = itemContainerNode.querySelector(".PSPDFKit-Sidebar-Annotations-Footer span");
   *             // Change the format of the footer text by prefixing it with "Creator: " and removing the date
   *             footerAuthor.textContent = `Creator: ${annotation.creatorName}`;
   *
   *             // Add aria label to the annotation icon
   *             const annotationIcon = itemContainerNode.querySelector(".PSPDFKit-Icon");
   *             annotationIcon.setAttribute("aria-label", `Icon for an annotation created by ${annotation.creatorName}.`);
   *           }
   *         };
   *       }
   *     }
   *   }
   * });
   */
  customUI?: CustomUI;
  /**
   * This property allows you to set theme to use for the UI. See {@link NutrientViewer.Theme}
   *
   * Note: You can customize the appearance of the UI using our public
   * CSS classes. Please refer to
   * {@link https://www.nutrient.io/guides/web/customizing-the-interface/css-customization/ | this guide article}
   * for information on how to customize the appearance.
   *
   * @example
   * NutrientViewer.load({ theme: NutrientViewer.Theme.DARK })
   *
   * @default NutrientViewer.Theme.LIGHT
   */
  theme?: ITheme | BUITheme;
  /**
   * This property allows you to configure where the toolbar is placed. If nothing
   * is configured, it will default to the top.
   *
   * @example
   * NutrientViewer.load({ toolbarPlacement: NutrientViewer.ToolbarPlacement.TOP })
   *
   * @default NutrientViewer.ToolbarPlacement.TOP
   */
  toolbarPlacement?: IToolbarPlacement;
  /**
   * This property allows you to configure the minimum zoom level. The smallest
   * zoom level at a given time will be calculated based on the page proportions
   * and this option. This is not necessarily a hard limit. For example, in order
   * to zoom out to show the entire page, the actual minimum zoom may be lower.
   *
   * When omitted, the default is 0.5.
   *
   * @example
   * NutrientViewer.load({ minDefaultZoomLevel: 0.1 })
   *
   * @default 0.5
   */
  minDefaultZoomLevel?: number;
  /**
   * This property allows you to configure the maximum zoom level. The largest
   * zoom level at a given time will be calculated based on the page proportions
   * and this option. This is not necessarily a hard limit. For example, in order
   * to satisfy the 'fit to width' and 'fit to page' zoom modes, the actual
   * maximum zoom may be higher.
   *
   * When omitted, the default is 10.
   *
   * @example
   * NutrientViewer.load({ maxDefaultZoomLevel: 20 })
   *
   * @default 10
   */
  maxDefaultZoomLevel?: number;
  /**
   * By implementing this callback you have a fine grained control over which comments are read-only.
   * This callback will receive the Comment a user wants to modify and by returning `true` or
   * `false` you can define if the comment should be read-only (`false`) or modifiable (`true`).
   *
   * To learn more check
   * {@link https://www.nutrient.io/guides/web/comments/introduction-to-instant-comments/#comment-permissions | this guide article}.
   *
   * @example
   * Only allow the modification of comment from the same author.
   * ```ts
   * NutrientViewer.load({
   *   isEditableComment: function(comment) {
   *     return comment.creatorName === myCurrentUser.name;
   *   },
   * });
   * ```
   */
  isEditableComment?: IsEditableCommentCallback;
  /**
   * This property allows you to restrict the movement of annotations to the page boundary. This is set to `true` by default.
   * If you want to disable this, you can set it to `false`.
   *
   * @default true
   */
  restrictAnnotationToPageBounds?: boolean;
  /**
   * Defines specific configuration options related to the electronic signatures feature.
   *
   * The `creationModes` key accepts an array of {@link NutrientViewer.ElectronicSignatureCreationMode} values that
   * define which signature creation modes and in which order will be offered as part of the Electronic Signatures
   * UI. It defaults to {@link NutrientViewer.defaultElectronicSignatureCreationModes}.
   *
   * The `fonts` key accepts an array of {@link Font} instances that specify the name of fonts to be used as part
   * of the 'Type' signing tab. It defaults to {@link NutrientViewer.defaultSigningFonts}.
   *
   * You can specify a subset of our built-in signing fonts or specify entirely custom ones.
   *
   * For using custom fonts, you need to load a custom style sheet (via {@link Configuration#styleSheets})
   * in which you can either specify `@font-face` rules for the custom font or `@import` other style sheets containing the fonts loading rules.
   *
   * As an example of the latter, if we would wish to use the Cookie font from Google Fonts you could use the
   * following style sheet:
   *
   * ```css
   * &#64;import url('https://fonts.googleapis.com/css2?family=Cookie&display=swap');
   * ```
   *
   * And then pass an `new NutrientViewer.Font({ name: 'Cookie' })` as part of the `fonts` array of
   * `Configuration#electronicSignatures`.
   *
   * @example
   * NutrientViewer.load({
   *   electronicSignatures: {
   *     creationModes: [NutrientViewer.ElectronicSignatureCreationMode.IMAGE],
   *     fonts: [new NutrientViewer.Font("Cookie")]
   *   }
   * });
   */
  electronicSignatures?: ElectronicSignaturesConfiguration;
  /**
   * This property allows you to set an initial list of document editor footer items for the NutrientViewer instance.
   *
   * When omitted, it will default to {@link NutrientViewer.defaultDocumentEditorFooterItems}.
   *
   * @example
   * const footerItems = NutrientViewer.defaultDocumentEditorFooterItems;
   * footerItems.reverse();
   * NutrientViewer.load({ documentEditorFooterItems: footerItems, ... });
   *
   * @throws {@link NutrientViewer.Error} will throw an error when the supplied items array is not valid. This will also throw an error if your license does not include the Document Editor feature.
       * @default Default {@link NutrientViewer.defaultDocumentEditorFooterItems}
       */
  documentEditorFooterItems?: DocumentEditorFooterItem[];
  /**
   * This property allows you to set an initial list of document editor toolbar items for the NutrientViewer instance.
   *
   * When omitted, it will default to {@link NutrientViewer.defaultDocumentEditorToolbarItems}.
   *
   * @example
   * const toolbarItems = NutrientViewer.defaultDocumentEditorToolbarItems;
   * toolbarItems.reverse();
   * NutrientViewer.load({ documentEditorToolbarItems: toolbarItems, ... });
   *
   * @throws {NutrientViewer.Error} will throw an error when the supplied items array is not valid. This will also throw an error if your license does not include the Document Editor feature.
   * @default Default {@link NutrientViewer.defaultDocumentEditorToolbarItems}
   */
  documentEditorToolbarItems?: DocumentEditorToolbarItem[];
  /**
   * Enable actions history for annotations. Disabled by default, when enabled it allows to undo and redo annotation actions consecutively
   * by calling {@link NutrientViewer.Instance#history}.undo or {@link NutrientViewer.Instance#history}.redo, or using the undo and redo UI buttons, which can be
   * optionally enabled:
   *
   * Actions history tracking can be enabled and disabled at any moment by calling {@link NutrientViewer.Instance#history}.enable or {@link NutrientViewer.Instance#history}.disable.
   *
   * @example
   * NutrientViewer.load({
   *   enableHistory: true,
   *   toolbarItems: NutrientViewer.defaultToolbarItems.reduce((acc, item) => {
   *     if (item.type === "spacer") {
   *       return acc.concat([item, { type: "undo" }, { type: "redo" }]);
   *     }
   *     return acc.concat([item]);
   *   }, [])
   * });
   *
   * @default false
   */
  enableHistory?: boolean;
  /**
   * By default, all the URLs on which the user clicks explicitly open as expected but the URLs which open due to a result of JavaScript action are not opened due to security reasons.
   * You can override this behaviour using this callback. If this callback returns `true`, the URL will open.
   *
   * @example
   * NutrientViewer.load({
   *   onOpenURI: (url, isUserInitiated) => {
   *     if (url.startsWith('https://abc.com') && isUserInitiated) {
   *       return true
   *     }
   *
   *     return false;
   *   }
   *   // ...
   * });
   *
   * @default undefined
   */
  onOpenURI?: OnOpenUriCallback;
  /**
   * Allows you to customize how to format dates displayed in the UI.
   *
   * When a date is about to be rendered in specific UI elements, this function is called so the date can be formatted as desired instead of
   * using the default date formatter.
   *
   * UI elements with customizable dates currently include the annotations sidebar, and comment threads.
   *
   * This function is called for each date to be formatted, and receives the corresponding `Date` object, the UI element to which it belongs
   * (either the annotations sidebar or a comment thread) and the {@link AnnotationsUnion} or {@link NutrientViewer.Comment} instance
   * to which it is associated.
   *
   * @example
   * NutrientViewer.load({
   *   dateTimeString: ({ dateTime, element }) => {
   *     if(element === NutrientViewer.UIDateTimeElement.ANNOTATIONS_SIDEBAR) {
   *       return new Intl.DateTimeFormat("en-US", {
   *         dateStyle: "short",
   *         timeStyle: "short",
   *       }).format(dateTime);
   *     } else {
   *       return new Intl.DateTimeFormat("en-US", {
   *         dateStyle: "full",
   *         timeStyle: "long",
   *       }).format(dateTime);
   *     }
   *   }
   *   // ...
   * });
   *
   * @default undefined
   */
  dateTimeString?: DateTimeStringCallback;
  /**
   * You can customize the color dropdown of individual annotation properties using this callback.
   * This callback receives the property name associated with the color dropdown and the array of default colors used by NutrientViewer.
   *
   * With this API you can:
   * - render a customised color pallet in each and all color dropdowns
   * - control if the custom color picker UI should be rendered in the color dropdowns
   *
   * @example
   * Customize different color dropdowns.
   * ```ts
   * NutrientViewer.load({
   *  annotationToolbarColorPresets: function ({ propertyName }) {
   *    if (propertyName === "font-color") {
   *      return {
   *        presets: [
   *          {
   *            color: new NutrientViewer.Color({ r: 0, g: 0, b: 0 }),
   *            localization: {
   *              id: "brightRed",
   *              defaultMessage: "Bright Red",
   *            },
   *          },
   *          {
   *            color: new NutrientViewer.Color({ r: 100, g: 100, b: 180 }),
   *            localization: {
   *              id: "deepBlue",
   *              defaultMessage: "deepBlue",
   *            },
   *          },
   *        ],
   *      };
   *    }
   *
   *    if (propertyName === "stroke-color") {
   *      return {
   *        presets: [
   *          {
   *            color: new NutrientViewer.Color({ r: 0, g: 0, b: 0 }),
   *            localization: {
   *              id: "brightRed",
   *              defaultMessage: "Bright Red",
   *            },
   *          },
   *          {
   *            color: new NutrientViewer.Color({ r: 100, g: 100, b: 180 }),
   *            localization: {
   *              id: "deepBlue",
   *              defaultMessage: "deepBlue",
   *            },
   *          },
   *        ],
   *        showColorPicker: false,
   *      };
   *    }
   *  },
   *  //...
   *});
   * ```
   */
  annotationToolbarColorPresets?: AnnotationToolbarColorPresetsCallback;
  /**
   * You can customise the items inside the annotation toolbars by using this callback. The callback will receive the
   * annotation which is being created or selected and based on it, you can have different annotation
   * toolbars for different annotations.
   *
   * You can do the following modifications using this API:
   *
   * - Add new annotation toolbar items
   * - Remove existing annotation toolbar items
   * - Change the order of the existing annotation toolbar items
   * - Modify selected properties of the annotation toolbar items
   *
   * You can also use the `hasDesktopLayout` to determine if the current UI is being rendered on
   * mobile or desktop layout mode, which depends on the current viewport width. Based on that,
   * you can implement different designs for Desktop and Mobile.
   *
   * This callback gets called every time the annotation toolbar is mounted.
   *
   * @example
   * Add a new annotation toolbar item
   * ```ts
   * NutrientViewer.load({
   *   annotationToolbarItems: (annotation, { defaultAnnotationToolbarItems, hasDesktopLayout }) => {
   *     const node = document.createElement('node')
   *     node.innerText = "Custom Item"
   *
   *     const icon = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>`
   *
   *     return [{
   *       id: "custom",
   *       type: "custom",
   *       node: node,
   *       icon: icon,
   *       className: 'Custom-Node',
   *       onPress: () => alert("Custom item pressed!")
   *     }, ...defaultAnnotationToolbarItems];
   *   }
   * });
   * ```
   */
  annotationToolbarItems?: AnnotationToolbarItemsCallback;
  /**
   * Enable actions like cut, copy, paste and duplicate for annotations using keyboard shortcuts `Cmd/Ctrl+X`, `Cmd/Ctrl+C`, `Cmd/Ctrl+V` and `Cmd/Ctrl+D` respectively.
   *
   * @example
   * NutrientViewer.load({
   *   enableClipboardActions: true,
   * });
   *
   * @default false
   */
  enableClipboardActions?: boolean;
  /**
   *
   **optional*
   *
   *You can programmatically modify the properties of the widget annotation and the associated form field just
   *before it is created via the Form Creator UI.
   *
   * @example
   * Set the opacity of all widget annotations.
   * ```ts
   * NutrientViewer.load({
   *   onWidgetAnnotationCreationStart: (annotation, formField) => {
   *     return { annotation: annotation.set('opacity', 0.7) };
   *   }
   *   // ...
   * });
   * ```
   *
   * @default undefined
   */
  onWidgetAnnotationCreationStart?: OnWidgetAnnotationCreationStartCallback;
  /**
   * You can customize the items inside the inline text selection toolbar that is rendered every time some text is selected on the document.
   * The callback will receive the
   * default items of the inline toolbar and the text that is currently selected {@link NutrientViewer.TextSelection}
   *
   * You can do the following modifications using this API:
   *
   * - Add new toolbar items
   * - Remove existing  toolbar items
   * - Change the order of the existing annotation toolbar items
   * - Customise each item eg change the `icon` of the a default toolbar item.
   *
   * You can also use the `hasDesktopLayout` to determine if the current UI is being rendered on
   * mobile or desktop layout mode, which depends on the current viewport width. Based on that,
   * you can implement different designs for Desktop and Mobile.
   *
   * This callback gets called every time the inline text selection toolbar is mounted.
   *
   * @example
   * Add a custom button and a custom node to the toolbar in desktop layout.
   * ```ts
   * NutrientViewer.load({
   * inlineTextSelectionToolbarItems: ({ defaultItems, hasDesktopLayout }, selection) => {
   *  console.log(selection)
   *  if (hasDesktopLayout) {
   *    const node = document.createElement("div");
   *    node.innerText = "Custom Item";
   *      return [
   *        ...defaultItems,
   *        {
   *          type: "custom",
   *          id: "custom-1",
   *          node: node,
   *          className: "Custom-Node",
   *          onPress: () => alert("Custom node pressed!"),
   *        },
   *        {
   *          type: "custom",
   *          id: "custom-2",
   *          title: "custom-button-2",
   *          onPress: () => alert("Custom item pressed!"),
   *        },
   *      ];
   *     }
   *  return defaultItems
   *   },
   * })
   * ```
   */
  inlineTextSelectionToolbarItems?: InlineTextSelectionToolbarItemsCallback;
  /**
   * Allows the user to toggle the snapping behavior while creation of measurement annotations. The snapping points are the points are a combination of endpoints, midpoints and intersections.
   *
   * @example
   * NutrientViewer.load({ measurementSnapping: false });
   *
   * @default false
   */
  measurementSnapping?: boolean;
  /**
   * Set the precision value of all the newly created measurement annotations.
   *
   * @example
   * NutrientViewer.load({ measurementPrecision: NutrientViewer.MeasurementPrecision.THREE });
   *
   * @default NutrientViewer.MeasurementPrecision.TWO
   */
  measurementPrecision?: IMeasurementPrecision;
  /**
   * Set the default value of scale for all newly created measurement annotations.
   *
   * @example
   * NutrientViewer.load(new NutrientViewer.MeasurementScale({
   *   unitFrom: NutrientViewer.MeasurementScaleUnitFrom.CENTIMETERS,
   *   unitTo: NutrientViewer.MeasurementScaleUnitTo.INCHES,
   *   fromValue: 1,
   *   toValue: 2,
   * }));
   *
   * @default 1 inch = 1 inch
   */
  measurementScale?: MeasurementScale;
  measurementValueConfiguration?: MeasurementValueConfigurationCallback;
  /**
   * This call back defines which text annotations should be treated as rich text annotation.
   * By default, all the text annotations are treated as plain text annotations, which means that
   * when you edit them, you will see the plain text editor. You can change this behavior by
   * returning `true` for the text annotations that you want to be treated as rich text annotations.
   *
   * @example
   * NutrientViewer.load({ enableRichText: annotation => true });
   */
  enableRichText?: EnableRichTextCallback;
  /**
   * Disable multi selection for annotations. Disabled by default, when enabled it doesn't allow multiple selection of annotations
   * by calling {@link NutrientViewer.Instance.setSelectedAnnotations}, or using the multiple annotations selection UI button.
   *
   * @example
   * NutrientViewer.load({
   *   disableMultiSelection: true,
   * });
   *
   * @default false
   */
  disableMultiSelection?: boolean;
  /**
   * Threshold in pixels determines when the active anchor should automatically close
   * and snap to the origin anchor, effectively closing the shape.
   *
   * @example
   * NutrientViewer.load({
   *   autoCloseThreshold: 50,
   * });
   *
   * @default 4px
   */
  autoCloseThreshold?: number;
  /** @deprecated */
  useIframe?: boolean;
  /**
   *
   *Allows specifying fonts that you would like to substitute in a document and the fonts you would like to use for that substitution.
   *
   *Patterns are matched using the following rules:
   *- `*` matches multiple characters.
   *- `?` matches a single character.
   *
   ***Ordering matters** - As names could match multiple patterns, it's important to note that the order of the patterns matters.
   *
   ***Case-insensitive** - Both the pattern and the target name are case-insensitive.
   *
   * @example
   * Substitute all Noto fonts found in the document with Awesome font
   * ```ts
   * NutrientViewer.load({
   *   fontSubstitutions: [
   *     {
   *       pattern: "Noto*",
   *       target: "AwesomeFont"
   *     }
   *   ]
   * });
   * ```
   */
  fontSubstitutions?: FontSubstitution[];
  /**
   * You can programmatically modify the properties of the comment just before it is created.
   *
   * @example
   * NutrientViewer.load({ onCommentCreationStart: comment => comment.set('text', { format: 'xhtml', value: '<p>Default text</p>' }) });
   */
  onCommentCreationStart?: OnCommentCreationStartCallback;
  /**
   * In-place UI customization API for the supported components using slots.
   * Refer to {@link https://www.nutrient.io/guides/web/user-interface/ui-customization/introduction/|this guide} to get started.
   *
   * Can be used to:
   * - fully replace the default component UI with a custom one
   * - insert a custom UI at a predefined slot in an existing component
   * - replace an existing slot in a component with your own custom UI
   *
   * See the list of supported slots {@link https://www.nutrient.io/guides/web/user-interface/ui-customization/supported-slots/|here}.
   *
   * @example
   * NutrientViewer.load({
   *   ui: {
   *     commentThread: {
   *       header: (instance, id) => {
   *         const header = document.createElement('div');
   *         header.innerText = 'Custom Comment Thread Header';
   *
   *         return {
   *           render: (params) => header,
   *           onMount: (id) => {
   *             console.log(`Comment thread header mounted`);
   *           },
   *           onUnmount: (id) => {
   *             console.log(`Comment thread header unmounted`);
   *           }
   *         };
   *       }
   *     }
   *   }
   * });
   */
  ui?: UI;
  /**
   * ***Server only***
   *
   * This configuration describes a connection with AI Assistant service which provides AI capabilities directly in the viewer.
   *
   * @example
   * NutrientViewer.load({
   *   aiAssistant: {
   *     sessionId: 'session-id',
   *     jwt: 'xxx.xxx.xxx'
   *     backendUrl: 'https://localhost:4000',
   *   },
   *   // ...
   * });
   *
   * @server
   */
  aiAssistant?: AIAssistantConfiguration;
  /**
   * ***Optional***
   *
   * When `disableWebAssemblyStreaming` is set to `true`, we force disable WebAssembly streaming
   * instantiation. More info about this optimization can be found at:
   * {@link https://www.nutrient.io/blog/2018/optimize-webassembly-startup-performance/#streaming-instantiation-combining-download-and-instantiation-2dc410}
   *
   * @example
   * NutrientViewer.load({
   *   disableWebAssemblyStreaming: true,
   *   // ...
   * });
   *
   * @standalone
   */
  disableWebAssemblyStreaming?: boolean;
  /**
   * Overrides the allocable maximum memory when using Nutrient Web SDK Standalone. Only set this if
   * you know that your users have web browsers with enough memory available.
   *
   * This can improve rendering of documents with large images.
   *
   * @example
   * NutrientViewer.load({
   *   overrideMemoryLimit: 4096, // 4 GB
   *   // ...
   * });
   *
   * @standalone
   */
  overrideMemoryLimit?: number;
  /**
   * This allows you to overwrite the auto-detected URL for the Core worker NutrientViewer assets in Standalone mode.
   * This setting may be necessary when you integrate Nutrient Web SDK in an environment that limits
   * the size of the static assets, like Salesforce.
   *
   * If your Core assets are served from a different origin, you have to include proper CORS headers:
   * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS}
   *
   * This must end with a trailing slash, and the Core assets (`nutrient-viewer-[hash].wasm.js`
   * and `nutrient-[hash].wasm`) must be located in a `nutrient-viewer-lib` subfolder accessible
   * from the `baseCoreUrl`.
   *
   * @example
   * NutrientViewer.load({ baseCoreUrl: 'https://public-server.pspdfkit.com/pspdfkit-core/' });
   *
   * @default Auto-detected it will use the same value as `baseUrl` if set, or the auto-detected value
   * from the currently executed `&lt;script&gt;` tag.
   */
  baseCoreUrl?: string;
  /**
   * Callback function to handle font matching during content editing operations.
   *
   * This callback is invoked when the system detects a font mismatch during content editing
   * and allows you to provide custom font substitution logic. The callback receives the
   * system's proposed font match and metadata about the original font from the PDF.
   *
   * If the callback returns a font reference, it overrides the system's choice. If it returns
   * `undefined`, the system's original match is used.
   *
   * @example
   * NutrientViewer.load({
   *   contentEditingFontMatcher: (match, fontInfo, availableFonts) => {
   *     console.log('System matched:', match);
   *     console.log('Original font:', fontInfo.name, 'at', fontInfo.fontSize + 'px');
   *     console.log('Available fonts:', availableFonts.map(f => f.family));
   *
   *     // For Helvetica fonts, try to find a suitable substitute
   *     if (fontInfo.name?.includes("Helvetica")) {
   *       // Look for Arial first, then any sans-serif font
   *       const preferredFonts = ["Arial", "Roboto", "Open Sans", "Lato"];
   *
   *       for (const preferred of preferredFonts) {
   *         const font = availableFonts.find(f => f.family.includes(preferred));
   *         if (font) {
   *           return { font, size: fontInfo.fontSize };
   *         }
   *       }
   *
   *       // Fallback to first available font
   *       if (availableFonts.length > 0) {
   *         return { font: availableFonts[0], size: fontInfo.fontSize };
   *       }
   *     }
   *     return undefined; // Accept system match
   *   }
   * });
   */
  contentEditingFontMatcher?: ContentEditing.FontMatcher;
}

/**
 * This describes the properties of a {@link NutrientViewer.loadTextComparison} configuration.
 */
declare interface SharedTextComparisonConfiguration {
  /**
   * ***required***
   *
   * Selector or element where Text Comparison UI for Web will be mounted.
   *
   * The element must have a `width` and `height` that's greater than zero. Text Comparison UI for Web adapts to the dimensions
   * of this element. This way, applying responsive rules will work as expected.
   *
   * The element can be styled using relative values as you would expect it to (CSS media queries
   * are encouraged).
   *
   * @example
   * // In your HTML
   * <div class="foo"></div>
   *
   * // In your JavaScript
   * NutrientViewer.loadTextComparison({ container: '.foo', documentA: ..., documentB: ..., ... });
   * // or
   * const element = document.getElementsByClassName('foo')[0]
   * NutrientViewer.loadTextComparison({  container: element, documentA: ..., documentB: ..., ... });
   */
  container: string | HTMLElement;
  /**
   * *optional*
   *
   * This allows you to overwrite the auto-detected URL for all NutrientViewer assets. This setting is
   * necessary when you load Text Comparison UI for Web JavaScript from a different URL.
   *
   * If your assets are served from a different origin, you have to include proper CORS headers:
   * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS}
   *
   * @example
   * NutrientViewer.loadTextComparison({ baseUrl: 'https://public-server.pspdfkit.com/' });
   *
   * @default Auto-detected based on the currently executed `&lt;script&gt;` tag.
   *
   * Note: auto-detection behavior is deprecated as of 1.9.0. Not providing baseUrl will currently
   * trigger a warning and in future releases will lead to loading assets from CDN.
   */
  baseUrl?: string;
  /**
   * This property is a temporary flag to explicitly enable loading assets from the CDN when
   * `baseUrl` is not provided. This flag will be removed in future releases once loading
   * from CDN is the default behavior when `baseUrl` is not set.
   *
   * Has no effect when `baseUrl` is provided.
   *
   * @default false
   */
  useCDN?: boolean;
  /**
   * *optional*
   *
   * This allows you to overwrite the auto-detected URL for the Core worker Text Comparison UI assets in Standalone mode.
   * This setting may be necessary when you integrate TextComparison UI for Web JavaScript in an environment that limits
   * the size of the static assets, like Salesforce.
   *
   * If your Core assets are served from a different origin, you have to include proper CORS headers:
   * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS}
   *
   * and `nutrient-viewer-[hash].wasm`) must be located in a `nutrient-viewer-lib` subfolder accessible
   * from the `baseCoreUrl`.
   *
   * @example
   * NutrientViewer.loadTextComparison({ baseCoreUrl: 'https://public-server.pspdfkit.com/pspdfkit-core/' });
   *
   * @default Auto-detected it will use the same value as `baseUrl` if set, or the auto-detected value
   * from the currently executed `&lt;script&gt;` tag.
   */
  baseCoreUrl?: string;
  /**
   * *optional*
   *
   * This allows you to overwrite the auto-detected Text Comparison UI Document Engine URL. This setting is necessary
   * when your Text Comparison UI Document Engine is located under a different URL.
   *
   * @example
   * NutrientViewer.loadTextComparison({ serverUrl: 'https://public-server.pspdfkit.com/' })
   *
   * @default Auto-detected based on the currently executed `&lt;script&gt;` tag.
   */
  serverUrl?: string;
  /**
   * ***Standalone only***
   *
   * Nutrient Web SDK license key from https://my.nutrient.io/.
   *
   * If not provided, the Text Comparison UI will run in trial mode for a limited time and then request the user to visit
   * {@link https://www.nutrient.io/try/} to request a trial license.
   *
   * @example <caption>Activate with a license key</caption>
   * NutrientViewer.loadTextComparison({ licenseKey: "YOUR_LICENSE_KEY_GOES_HERE", ... });
   *
   * @standalone
   */
  licenseKey?: string;
  /**
   * *optional*
   *
   * This property allows you to set an initial list of main toolbar items for the Text Comparison UI.
   * This can be used to customize the main toolbar before the application mounts.
   *
   * When omitted, it will default to {@link NutrientViewer.defaultTextComparisonToolbarItems}.
   *
   * @example
   * const toolbarItems = NutrientViewer.defaultTextComparisonToolbarItems;
   * toolbarItems.reverse();
   * NutrientViewer.loadTextComparison({ toolbarItems, ... });
   *
   * @default Default {@link NutrientViewer.defaultTextComparisonToolbarItems}
   */
  toolbarItems?: Array<TextComparisonToolbarItem>;
  /**
   * *optional*
   *
   * This will load your custom CSS as a `<link rel="stylesheet">` inside the Text Comparison UI. This
   * is necessary to isolate styling of the primary toolbar, comparison sidebar from the outside application and avoid external
   * stylesheets overwriting important viewer attributes.
   *
   * An array is allowed to load multiple stylesheets. The order in the array will also be the
   * order in which the stylesheets get loaded.
   *
   * The array will be copied by us on start up time, which means that you can not mutate it
   * after the viewer has started.
   *
   * More information on how to style Nutrient Web SDK can be found in our guides.
   *
   * @example
   * NutrientViewer.loadTextComparison({
   *   styleSheets: [
   *     'https://example.com/my-stylesheet.css',
   *     'https://example.com/other-stylesheet.css'
   *   ]
   * })
   *
   * @default []
   */
  styleSheets?: Array<string>;
  /**
   * *optional*
   *
   * This property allows you to set theme to use for the UI. See {@link NutrientViewer.Theme}
   *
   * Note: Themes are not supported in IE and setting this option won't have any effect: IE users
   * will get the default light theme. You can customize the appearance of the UI using our public
   * CSS classes. Please refer to
   * {@link https://www.nutrient.io/guides/web/customizing-the-interface/css-customization/|this guide article}
   * for information on how to customize the appearance.
   *
   * @example
   * NutrientViewer.loadTextComparison({ theme: NutrientViewer.Theme.DARK })
   *
   * @default NutrientViewer.Theme.DARK
   */
  theme?: ITheme;
  /**
   * The initial `locale` (language) for the application.
   * All the available locales are defined in {@link NutrientViewer.I18n.locales}.
   * When a locale is not provided Text Comparison UI for Web tries to autodetect the locale using `window.navigator.language`.
   * If the detected locale is not supported then the `en` locale is used instead.
   *
   * @example
   * NutrientViewer.loadTextComparison({
   *   locale: 'de',
   *   // ...
   * });
   */
  locale?: string;
  /**
   * *optional*
   *
   * This property allows you to set an initial list of inner toolbar items for instanceA (left) and instanceB (right) for the Text Comparison UI.
   * This can be used to customize the inner toolbar before the application mounts.
   *
   * When omitted, it will default to {@link NutrientViewer.defaultTextComparisonInnerToolbarItems}.
   *
   * @example
   * const innerToolbarItems = NutrientViewer.defaultTextComparisonInnerToolbarItems;
   * innerToolbarItems.reverse();
   * NutrientViewer.loadTextComparison({ innerToolbarItems: toolbarItems, ... });
   *
   * @default Default {@link NutrientViewer.defaultTextComparisonInnerToolbarItems}
   */
  innerToolbarItems?: Array<TextComparisonInnerToolbarItem>;
  /**
   * *optional*
   *
   * Configuration for the comparison sidebar, including color customization for highlighting differences
   * and whether the sidebar opens by default.
   *
   * @example
   *
   * NutrientViewer.loadTextComparison({
   *   // ... other configuration
   *   comparisonSidebarConfig: {
   *     diffColors: {
   *       insertionColor: new NutrientViewer.Color({ r: 0, g: 255, b: 0 }),
   *       deletionColor: new NutrientViewer.Color({ r: 255, g: 0, b: 0 })
   *     },
   *     openByDefault: true
   *   }
   * });
   */
  comparisonSidebarConfig?: TextComparisonSidebarConfiguration;
}

/**
 * Controls when the digital signature validation UI should be shown.
 *
 * @enum
 */
declare const ShowSignatureValidationStatusMode: {
  /** Show the digital signature validation UI if digital signatures are found on the current document. */
  readonly IF_SIGNED: "IF_SIGNED";
  /** Only show the digital signature validation UI if digital signatures with problems or invalid ones are found, and also if the document has been modified since the moment it's been signed. */
  readonly HAS_WARNINGS: "HAS_WARNINGS";
  /** Only show the digital signature validation UI if invalid signatures are found. */
  readonly HAS_ERRORS: "HAS_ERRORS";
  /** Never show the digital signature validation UI. */
  readonly NEVER: "NEVER";
};

/**
 * Controls the current sidebar mode in the viewer.
 * It can also be a custom string corresponding to a custom sidebar id.
 *
 * @enum
 */
declare const SidebarMode: {
  /** Annotations sidebar. */
  readonly ANNOTATIONS: "ANNOTATIONS";
  /** Bookmarks. */
  readonly BOOKMARKS: "BOOKMARKS";
  /** Document Outline (table of contents). */
  readonly DOCUMENT_OUTLINE: "DOCUMENT_OUTLINE";
  /** Thumbnails preview. */
  readonly THUMBNAILS: "THUMBNAILS";
  /** List of Signatures. */
  readonly SIGNATURES: "SIGNATURES";
  /** List of OCG layers in the document. */
  readonly LAYERS: "LAYERS";
  /** List of embedded files in the document. */
  readonly ATTACHMENTS: "ATTACHMENTS";
  /** Custom preview. */
  readonly CUSTOM: "CUSTOM";
};

/**
 * This object includes different options that specific to some of the available sidebar modes.
 *
 * The annotations sidebar and the OCGs Sidebar can be customized.
 * For example, in the annotations sidebar one can define the record types
 * to show in the annotation sidebar, as well as expanding it by optionally
 * rendering comments in that sidebar. Meanwhile, In the Ocgs sidebar one
 * can define which ocgs should not have their visibility toggled via the UI.
 */
export declare type SidebarOptions<T> = T extends AnnotationsSidebarOptions ? {
  [SidebarMode.ANNOTATIONS]: AnnotationsSidebarOptions;
} : T extends LayersSidebarOptions ? {
  [SidebarMode.LAYERS]: LayersSidebarOptions;
} : T extends AttachmentsSidebarOptions ? {
  [SidebarMode.ATTACHMENTS]: AttachmentsSidebarOptions;
} : never;

declare type SidebarParams = {
  /**
   * ID for the sidebar.
   */
  id: string;
};

/**
 * Controls the sidebar placement.
 *
 * @enum
 */
declare const SidebarPlacement: {
  /**
   * The sidebar is shown before the content in the reading direction. For any LTR languages this
   * will be the left side, for RTL languages this will be the right side.
   */
  readonly START: "START";
  /**
   * The sidebar is shown after the content in the reading direction. For any LTR languages this
   * will be the right side, for RTL languages this will be the left side.
   */
  readonly END: "END";
};

declare type SidebarUI = Record<string, UIFactory<SidebarParams>>;

/** @inline */
declare type Signature = InkAnnotation | ImageAnnotation;

/**
 * Specifies the signature appearance mode: whether graphics, description, or both are included in it.
 * See https://www.nutrient.io/guides/web/signatures/digital-signatures/signature-lifecycle/configure-digital-signature-appearance/ for a detailed discussion of the signature modes.
 *
 * @enum
 */
declare const SignatureAppearanceMode: {
  /** Only the graphic is included in the signature appearance. */
  readonly signatureOnly: "signatureOnly";
  /** Both the graphic and description are included in the signature appearance. */
  readonly signatureAndDescription: "signatureAndDescription";
  /** Only the description is included in the signature appearance. */
  readonly descriptionOnly: "descriptionOnly";
};

/**
 * Type of the signature container used for document signatures transfer between the client and the signing service.
 *
 * @enum
 */
export declare const SignatureContainerType: {
  /**
   * raw
   */
  raw: string;
  /**
   * pkcs7
   */
  pkcs7: string;
};

/** @inline */
declare type SignatureContainerType_2 = 'raw' | 'pkcs7';

/**
 * @class
 * A field that contains an ink signature.
 *
 * To retrieve a list of all form fields, use {@link NutrientViewer.Instance#getFormFields}.
 * @public
 * @summary A field that contains an ink signature.
 * @see {@link Configuration#formFieldsNotSavingSignatures}
 */
export declare class SignatureFormField extends FormField {}


declare type SignatureInfo = {
  type: 'pspdfkit/signature-info';
  /** Type of the signature: CMS, CAdES or Document Timestamp. */
  signatureType?: SignatureTypeType | null | undefined;
  /** Signer's name. */
  signerName: string | null | undefined;
  /** Date of the signature. */
  creationDate: Date | null | undefined;
  /** Purpose of the signature. */
  signatureReason: string | null | undefined;
  /** Location where the signature has taken place. */
  signatureLocation: string | null | undefined;
  /** The different signature validation states the document can be in. */
  documentIntegrityStatus: DocumentIntegrityStatusType;
  /** The different possible validation states of the certificate chain. */
  certificateChainValidationStatus: CertificateChainValidationStatusType;
  /** The different possible validation states of the signature. */
  signatureValidationStatus: SignatureValidationStatusType;
  /** The signing certificate has been explicitly marked as trusted by the certificate store. */
  isTrusted: boolean;
  /** The signing certificate is self-signed. */
  isSelfSigned: boolean;
  /** The signing certificate is expired. */
  isExpired: boolean;
  /** The document has been modified since this signature has been added to it. Depending on the uncovered changes, the signature may be "valid with modifications", or "invalid". */
  documentModifiedSinceSignature: boolean;
  /** The fully qualified name of the signature form field. */
  signatureFormFQN: string;
  /** The PAdES level of the signature. */
  PAdESSignatureLevel?: PAdESLevelType | null;
  /** The date from which the signature is valid. */
  validFrom: string | null | undefined;
  /** The date until which the signature is valid. */
  validUntil: string | null | undefined;
  /** Information about the timestamp of the signature. */
  timestampInfo: {
    type: 'pspdfkit/timestamp-info';
    signerName: string | null | undefined;
  };
  /** Whether the signature is LTV enabled. */
  ltv: boolean;
  /** Signing certificate chain information. */
  signingCertificateChain?: DigitalSignatures.SigningCertificate[];
};

/**
 * Selects the save mode for ink signatures.
 *
 * @enum
 */
declare const SignatureSaveMode: {
  /** Always store new ink signatures. */
  readonly ALWAYS: "ALWAYS";
  /** Never store new ink signatures. */
  readonly NEVER: "NEVER";
  /** Store new ink signatures if the option is selected in the UI. */
  readonly USING_UI: "USING_UI";
};

declare function SignaturesMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Returns a copy of the available stored signatures.
     * Signatures are ink and image annotations and therefore can be converted to JavaScript objects with {@link NutrientViewer.Annotations.toSerializableObject}.
     *
     * When the application doesn't have signatures in store this method will invoke {@link Configuration#populateStoredSignatures}
     * to retrieve the initial list of annotations.
     *
     * @example
     * Retrieve the signatures and convert them to JSON
     * ```ts
     * instance
     *   .getInkSignatures()
     *   .then(signatures => signatures.map(NutrientViewer.Annotations.toSerializableObject).toJS());
     * ```
     *
     * @deprecated
     * @returns Promise that resolves with an Immutable list of signatures
     */
    getInkSignatures(): Promise<List<InkAnnotation | ImageAnnotation>>;
    /**
     * Returns a copy of the available stored signatures.
     * Signatures are ink and image annotations and therefore can be converted to JavaScript objects with {@link NutrientViewer.Annotations.toSerializableObject}.
     *
     * When the application doesn't have signatures in store this method will invoke {@link Configuration#populateStoredSignatures}
     * to retrieve the initial list of annotations.
     *
     * @example
     * Retrieve the signatures and convert them to JSON
     * ```ts
     * instance
     *   .getStoredSignatures()
     *   .then(signatures => signatures.map(NutrientViewer.Annotations.toSerializableObject).toJS());
     * ```
     *
     * @returns Promise that resolves with an Immutable list of signatures
     */
    getStoredSignatures(): Promise<List<InkAnnotation | ImageAnnotation>>;
    /**
     * This method is used to update the signatures list.
     * It makes it possible to add new signatures and edit or remove existing ones.
     *
     * Ink Signatures are Ink Annotations whose `pageIndex` and `boundingBox` is calculated at creation time.
     * When selected via UI such annotations are used as template to create new {@link NutrientViewer.Annotations.InkAnnotation}s and {@link NutrientViewer.Annotations.ImageAnnotation}s.
     *
     * When you pass in a {@link NutrientViewer.Immutable.List List} of {@link NutrientViewer.Annotations.InkAnnotation} and {@link NutrientViewer.Annotations.ImageAnnotation}, the current list of signatures will be immediately
     * updated. Calling this method is also idempotent.
     *
     * If you pass in a function, it will be invoked with the current {@link NutrientViewer.Immutable.List List} of {@link NutrientViewer.Annotations.InkAnnotation} and {@link NutrientViewer.Annotations.ImageAnnotation} as argument.
     * You can use this to modify the list based on its current value.
     * This type of update is guaranteed to be atomic - the value of `getStoredSignatures()` can't change in between.
     *
     * When the application doesn't have signatures in store this method will invoke {@link Configuration#populateStoredSignatures}
     * to retrieve the initial list of annotations and it will pass it to your function.
     *
     * When the list is invalid, this method will throw an
     * {@link Error} that contains a detailed error message.
     *
     * @example
     * Fetch and set a list of signatures
     * ```ts
     * const signatures = fetch("/signatures")
     *   .then(r => r.json())
     *   .then(a => (
     *       new NutrientViewer.Immutable.List(
     *          a.map(NutrientViewer.Annotations.fromSerializableObject)
     *       )
     *     )
     *   );
     * signatures.then(signatures => { instance.setInkSignatures(signatures) });
     * ```
     *
     * @example
     * Use ES2015 arrow functions and the update callback to reduce boilerplate
     * ```ts
     * instance.setInkSignatures(signatures => signatures.reverse());
     * ```
     *
     * @example
     * Add a Ink Signature to the existing list
     * ```ts
     * const signature = new NutrientViewer.Annotations.InkAnnotation({ lines: ..., boundingBox: ... });
     *
     * instance.setInkSignatures(signatures => signatures.push(signature));
     * ```
     *
     * @example
     * Remove the first Ink Signature from the list
     * ```ts
     * instance.setInkSignatures(signatures => signatures.shift());
     * ```
     *
     * @deprecated
     * @throws {Error} Will throw an error when the supplied items `array` is not valid.
     * @param stateOrFunction - a
     *   new `array` of signatures which would overwrite the existing one, or a callback that will get
     *   invoked with the current toolbar items and is expected to return the new `array` of items.
     */
    setInkSignatures(stateOrFunction: List<ImageAnnotation | InkAnnotation> | ((annotations: List<InkAnnotation | ImageAnnotation>) => List<InkAnnotation | ImageAnnotation>)): Promise<void>;
    /**
     * This method is used to update the stored signatures list.
     * It makes it possible to add new signatures and edit or remove existing ones.
     *
     * Signatures are either ink or image annotations whose `pageIndex` and `boundingBox` is calculated at creation time.
     * When selected via UI such annotations are used as template to create new {@link NutrientViewer.Annotations.InkAnnotation}s and {@link NutrientViewer.Annotations.ImageAnnotation}s.
     *
     * When you pass in a {@link NutrientViewer.Immutable.List List} of {@link NutrientViewer.Annotations.InkAnnotation} and {@link NutrientViewer.Annotations.ImageAnnotation}, the current list
     * of signatures will be immediately updated. Calling this method is also idempotent.
     *
     * If you pass in a function, it will be invoked with the current {@link NutrientViewer.Immutable.List List} of {@link NutrientViewer.Annotations.InkAnnotation} and {@link NutrientViewer.Annotations.ImageAnnotation}
     * as argument.
     *
     * You can use this to modify the list based on its current value.
     * This type of update is guaranteed to be atomic - the value of `getStoredSignatures()` can't change in between.
     *
     * When the application doesn't have signatures in store this method will invoke {@link Configuration#populateStoredSignatures}
     * to retrieve the initial list of annotations and it will pass it to your function.
     *
     * When the list is invalid, this method will throw an
     * {@link NutrientViewer.Error} that contains a detailed error message.
     *
     * @example
     * Fetch and set a list of signatures
     * ```ts
     * const signatures = fetch("/signatures")
     *   .then(r => r.json())
     *   .then(a => (
     *       new NutrientViewer.Immutable.List(
     *          a.map(NutrientViewer.Annotations.fromSerializableObject)
     *       )
     *     )
     *   );
     * signatures.then(signatures => { instance.setStoredSignatures(signatures) });
     * ```
     *
     * @example
     * Use ES2015 arrow functions and the update callback to reduce boilerplate
     * ```ts
     * instance.setStoredSignatures(signatures => signatures.reverse());
     * ```
     *
     * @example
     * Add a Signature to the existing list
     * ```ts
     * const signature = new NutrientViewer.Annotations.InkAnnotation({ lines: ..., boundingBox: ... });
     *
     * instance.setStoredSignatures(signatures => signatures.push(signature));
     * ```
     *
     * @example
     * Remove the first Signature from the list
     * ```ts
     * instance.setStoredSignatures(signatures => signatures.shift());
     * ```
     *
     * @throws {Error} Will throw an error when the supplied items `array` is not valid.
     * @param stateOrFunction - a new `array` of signatures which would overwrite the existing one, or a callback that will get
     *   invoked with the current toolbar items and is expected to return the new `array` of items.
     */
    setStoredSignatures(stateOrFunction: List<ImageAnnotation | InkAnnotation> | ((annotations: List<InkAnnotation | ImageAnnotation>) => List<InkAnnotation | ImageAnnotation>)): Promise<void>;

  };
} & T;

/**
 * The different types of digital signatures.
 *
 * @enum
 */
export declare const SignatureType: {
  /**
   * CMS
   */
  CMS: string;
  /**
   * CAdES
   */
  CAdES: string;
};

/** @inline */
declare type SignatureTypeType = (typeof SignatureType)[keyof typeof SignatureType];

/**
 * The different possible validation states of the signature.
 *
 * @enum
 */
export declare const SignatureValidationStatus: {
  /**
   * The overall status of the signature is valid, that is, it should be shown with a green checkmark
   * or similar in the UI.
   */
  readonly valid: "valid";
  /**
   * The overall status of the signature is valid with concerns, that is, it should be shown with
   * a yellow warning or similar in the UI.
   */
  readonly warning: "warning";
  /**
   * The overall status of the signature is that it is invalid, that is, it should be shown with
   * a red cross of similar in the UI.
   */
  readonly error: "error";
};

/** @inline */
declare type SignatureValidationStatusType = (typeof SignatureValidationStatus)[keyof typeof SignatureValidationStatus];

/**
 * @class
 * A size is a 2D vector that describes the size of an element. It has the values `width` and
 * `height`. Provided values are defined in same units used by the page, point units. Point units are
 * only equal to pixels when zoom value is `1`.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `size.set("width", 20)`.
 * @example
 * Create and update a size.
 * ```ts
 * const size = new NutrientViewer.Geometry.Size({ width: 200, height: 100 });
 * size = size.set("height", 200);
 * size.height; // => 200
 * ```
 *
 * @public
 * @summary A 2D vector that describes the size of an element.
 * @param args - An object used to initialize the size. If `width` or `height` is omitted,
 *        `0` will be used instead.
 * @default { width: 0, height: 0 }
 */
export declare class Size extends Size_base {
  /**
   * Scales the width and height by a given `factor`.
   *
   * @example
   * var size = new NutrientViewer.Geometry.Size({ width: 20, height: 30 });
   * size.scale(2); // => Size {width: 40, height: 60}
   *
   * @param factor - The scale factor.
   * @returns A new `Size`.
   */
  scale(factor: number): Size;
  /**
   * Returns a new size with `width` and `height` rounded to a number which is greater than or equal
   * to the current value.
   *
   * @example
   * var size = new NutrientViewer.Geometry.Size({ width: 20.5, height: 30.1 });
   * size.ceil(); // => Size {width: 21, height: 31}
   *
   * @returns A new `Size`.
   */
  ceil(): Size;
  /**
   * Returns a new size with `width` and `height` rounded to a number which is smaller than or equal
   * to the current value.
   *
   * @example
   * var size = new NutrientViewer.Geometry.Size({ width: 20.5, height: 30.1 });
   * size.floor(); // => Size {width: 20, height: 30}
   *
   * @returns A new `Size`.
   */
  floor(): Size;
  /**
   * Returns a new size with the `width` set to the current `height` value and the `height`
   * set to the current `width` value.
   *
   * @example
   * var size = new NutrientViewer.Geometry.Size({ width: 20.5, height: 30.1 });
   * size.swapDimensions(); // => Size {width: 30.1, height: 20.5}
   *
   * @returns A new `Size`.
   */
  swapDimensions(): Size;
  /**
   * Applies a transformation to the point by scaling to the dimension [width, height]
   */
  apply(matrix: TransformationMatrix): Size;
}

declare const Size_base: Record_2.Factory<{
  /**
   * The `width` of the size.
   *
   * @default 0
   */
  width: number;
  /**
   * The `height` of the size.
   *
   * @default 0
   */
  height: number;
}>;

declare type Slot<Params> = {
  /**
   * The render function is called whenever any `params` change that may affect the UI and expects a DOM element to be returned.
   *
   * This may be called any number of times.
   * You should treat this as a pure function and always return a DOM element based on the current `params`.
   */
  render?: (params: Params) => HTMLElement | null;
  /**
   * Invoked once, when the component is mounted to the DOM.
   * Use it for setup tasks such as attaching event listeners, firing analytics events, etc.
   */
  onMount?: (id: string) => void;
  /**
   * Invoked once, when the component is unmounted from the DOM.
   * Use it for cleanup tasks such as removing event listeners, etc.
   */
  onUnmount?: (id: string) => void;
};

/**
 * @class
 * A squiggle markup annotation. Please refer to {@link NutrientViewer.Annotations.MarkupAnnotation} for
 * more information.
 *
 * <center>
 *   <img title="Example of all markup annotation types" src="img/annotations/markup_annotations.png" width="450" class="shadow">
 * </center>
 * @example <caption>Create a squiggle annotation</caption>
 * const rects = NutrientViewer.Immutable.List([
 *   new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 200, height: 10 }),
 *   new NutrientViewer.Geometry.Rect({ left: 10, top: 25, width: 200, height: 10 })
 * ]);
 * const annotation = new NutrientViewer.Annotations.SquiggleAnnotation({
 *   pageIndex: 0,
 *   rects: rects,
 *   boundingBox: NutrientViewer.Geometry.Rect.union(rects)
 * });
 *
 * @summary Squiggle markup annotation.
 */
export declare class SquiggleAnnotation extends TextMarkupAnnotation<ISquiggleAnnotation> {
  static className: string;
  static readableName: string;
}

/**
 * Create a new immutable Stack containing the values of the provided
 * collection-like.
 *
 * The iteration order of the provided collection is preserved in the
 * resulting `Stack`.
 *
 * Note: `Stack` is a factory function and not a class, and does not use the
 * `new` keyword during construction.
 */
declare function Stack(): Stack<any>;

declare function Stack<T>(): Stack<T>;

declare function Stack<T>(collection: Iterable<T>): Stack<T>;

/**
 * Stacks are indexed collections which support very efficient O(1) addition
 * and removal from the front using `unshift(v)` and `shift()`.
 *
 * For familiarity, Stack also provides `push(v)`, `pop()`, and `peek()`, but
 * be aware that they also operate on the front of the list, unlike List or
 * a JavaScript Array.
 *
 * Note: `reverse()` or any inherent reverse traversal (`reduceRight`,
 * `lastIndexOf`, etc.) is not efficient with a Stack.
 *
 * Stack is implemented with a Single-Linked List.
 */
declare module Stack {

  /**
   * True if the provided value is a Stack
   */
  function isStack(maybeStack: any): maybeStack is Stack<any>;

  /**
   * Creates a new Stack containing `values`.
   */
  function of<T>(...values: Array<T>): Stack<T>;
}

declare interface Stack<T> extends Collection.Indexed<T> {

  /**
   * The number of items in this Stack.
   */
  readonly size: number;

  // Reading values

  /**
   * Alias for `Stack.first()`.
   */
  peek(): T | undefined;


  // Persistent changes

  /**
   * Returns a new Stack with 0 size and no values.
   *
   * Note: `clear` can be used in `withMutations`.
   */
  clear(): Stack<T>;

  /**
   * Returns a new Stack with the provided `values` prepended, shifting other
   * values ahead to higher indices.
   *
   * This is very efficient for Stack.
   *
   * Note: `unshift` can be used in `withMutations`.
   */
  unshift(...values: Array<T>): Stack<T>;

  /**
   * Like `Stack#unshift`, but accepts a collection rather than varargs.
   *
   * Note: `unshiftAll` can be used in `withMutations`.
   */
  unshiftAll(iter: Iterable<T>): Stack<T>;

  /**
   * Returns a new Stack with a size ones less than this Stack, excluding
   * the first item in this Stack, shifting all other values to a lower index.
   *
   * Note: this differs from `Array#shift` because it returns a new
   * Stack rather than the removed value. Use `first()` or `peek()` to get the
   * first value in this Stack.
   *
   * Note: `shift` can be used in `withMutations`.
   */
  shift(): Stack<T>;

  /**
   * Alias for `Stack#unshift` and is not equivalent to `List#push`.
   */
  push(...values: Array<T>): Stack<T>;

  /**
   * Alias for `Stack#unshiftAll`.
   */
  pushAll(iter: Iterable<T>): Stack<T>;

  /**
   * Alias for `Stack#shift` and is not equivalent to `List#pop`.
   */
  pop(): Stack<T>;


  // Transient changes

  /**
   * Note: Not all methods can be used on a mutable collection or within
   * `withMutations`! Check the documentation for each method to see if it
   * mentions being safe to use in `withMutations`.
   *
   * @see `Map#withMutations`
   */
  withMutations(mutator: (mutable: this) => any): this;

  /**
   * Note: Not all methods can be used on a mutable collection or within
   * `withMutations`! Check the documentation for each method to see if it
   * mentions being safe to use in `withMutations`.
   *
   * @see `Map#asMutable`
   */
  asMutable(): this;

  /**
   * @see `Map#wasAltered`
   */
  wasAltered(): boolean;

  /**
   * @see `Map#asImmutable`
   */
  asImmutable(): this;

  // Sequence algorithms

  /**
   * Returns a new Stack with other collections concatenated to this one.
   */
  concat<C>(...valuesOrCollections: Array<Iterable<C> | C>): Stack<T | C>;

  /**
   * Returns a new Stack with values passed through a
   * `mapper` function.
   *
   *     Stack([ 1, 2 ]).map(x => 10 * x)
   *     // Stack [ 10, 20 ]
   *
   * Note: `map()` always returns a new instance, even if it produced the same
   * value at every step.
   */
  map<M>(
  mapper: (value: T, key: number, iter: this) => M,
  context?: any)
  : Stack<M>;

  /**
   * Flat-maps the Stack, returning a new Stack.
   *
   * Similar to `stack.map(...).flatten(true)`.
   */
  flatMap<M>(
  mapper: (value: T, key: number, iter: this) => Iterable<M>,
  context?: any)
  : Stack<M>;

  /**
   * Returns a new Set with only the values for which the `predicate`
   * function returns true.
   *
   * Note: `filter()` always returns a new instance, even if it results in
   * not filtering out any values.
   */
  filter<F extends T>(
  predicate: (value: T, index: number, iter: this) => value is F,
  context?: any)
  : Set_2<F>;
  filter(
  predicate: (value: T, index: number, iter: this) => any,
  context?: any)
  : this;

  /**
   * Returns a Stack "zipped" with the provided collections.
   *
   * Like `zipWith`, but using the default `zipper`: creating an `Array`.
   *
   * ```js
   * const a = Stack([ 1, 2, 3 ]);
   * const b = Stack([ 4, 5, 6 ]);
   * const c = a.zip(b); // Stack [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
   * ```
   */
  zip<U>(other: Collection<any, U>): Stack<[T, U]>;
  zip<U, V>(other: Collection<any, U>, other2: Collection<any, V>): Stack<[T, U, V]>;
  zip(...collections: Array<Collection<any, any>>): Stack<any>;

  /**
   * Returns a Stack "zipped" with the provided collections.
   *
   * Unlike `zip`, `zipAll` continues zipping until the longest collection is
   * exhausted. Missing values from shorter collections are filled with `undefined`.
   *
   * ```js
   * const a = Stack([ 1, 2 ]);
   * const b = Stack([ 3, 4, 5 ]);
   * const c = a.zipAll(b); // Stack [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]
   * ```
   *
   * Note: Since zipAll will return a collection as large as the largest
   * input, some results may contain undefined values. TypeScript cannot
   * account for these without cases (as of v2.5).
   */
  zipAll<U>(other: Collection<any, U>): Stack<[T, U]>;
  zipAll<U, V>(other: Collection<any, U>, other2: Collection<any, V>): Stack<[T, U, V]>;
  zipAll(...collections: Array<Collection<any, any>>): Stack<any>;

  /**
   * Returns a Stack "zipped" with the provided collections by using a
   * custom `zipper` function.
   *
   * ```js
   * const a = Stack([ 1, 2, 3 ]);
   * const b = Stack([ 4, 5, 6 ]);
   * const c = a.zipWith((a, b) => a + b, b);
   * // Stack [ 5, 7, 9 ]
   * ```
   */
  zipWith<U, Z>(
  zipper: (value: T, otherValue: U) => Z,
  otherCollection: Collection<any, U>)
  : Stack<Z>;
  zipWith<U, V, Z>(
  zipper: (value: T, otherValue: U, thirdValue: V) => Z,
  otherCollection: Collection<any, U>,
  thirdCollection: Collection<any, V>)
  : Stack<Z>;
  zipWith<Z>(
  zipper: (...any: Array<any>) => Z,
  ...collections: Array<Collection<any, any>>)
  : Stack<Z>;
}

/**
 * Callback that receives the current operations committed and returns a new list of operations.
 *
 * @param stagedDocumentOperations - The current operations committed.
 * @returns The new list of operations.
 * @inline
 */
declare type StagedDocumentOperationsCallback = (stagedDocumentOperations: List<DocumentOperations.DocumentOperationsUnion | List<DocumentOperations.DocumentOperationsUnion>>) => List<DocumentOperations.DocumentOperationsUnion | List<DocumentOperations.DocumentOperationsUnion>>;

/**
 * @class
 * The Nutrient Web SDK supports stamp annotations and comes with some out-of-the-box stamp annotations
 * available.
 * @example
 * Create a stamp annotation
 * ```ts
 * var annotation = new NutrientViewer.Annotations.StampAnnotation({
 *   pageIndex: 0,
 *   stampType: 'Custom'
 *   title: 'Example Stamp',
 *   subtitle: 'Example Stamp Annotation',
 *   color: new Color({ r: 0, g: 51, b: 79 }),
 *   boundingBox: new NutrientViewer.Geometry.Rect({ left: 10, top: 20, width: 150, height: 40 }),
 * });
 * ```
 *
 * @summary Display a stamp annotation, which represent a predefined or customized stamp in a PDF file.
 * @see {@link Instance#setStampAnnotationTemplates} | {@link defaultStampAnnotationTemplates}
 * @see {@link Configuration#stampAnnotationTemplates}
 */
export declare class StampAnnotation extends Annotation<IStampAnnotation> {
  /**
   * One of the predefined stamp types. Can be any of:
   * - `Approved`
   * - `NotApproved`
   * - `Draft`
   * - `Final`
   * - `Completed`
   * - `Confidential`
   * - `ForPublicRelease`
   * - `NotForPublicRelease`
   * - `ForComment`
   * - `Void`
   * - `PreliminaryResults`
   * - `InformationOnly`
   * - `Rejected`
   * - `Accepted`
   * - `InitialHere`
   * - `SignHere`
   * - `Witness`
   * - `AsIs`
   * - `Departmental`
   * - `Experimental`
   * - `Expired`
   * - `Sold`
   * - `TopSecret`
   * - `Revised`
   * - `RejectedWithText`
   * - `Custom`
   *
   * @default "Custom"
   */
  stampType: StampKind;
  /**
   * The main text of a custom stamp annotation.
   */
  title: null | string;
  /**
   * The sub text of a custom stamp annotation.
   */
  subtitle: null | string;
  /**
   * The color of a stamp annotation.
   */
  color: null | Color;
  xfdfAppearanceStream: null | string;
  xfdfAppearanceStreamOriginalPageRotation: null | number;
  /**
   * When set, the annotation will not scale up in the page when it's zoomed in.
   * The flag doesn't have an effect when the page is zoomed out to a zoom level less than `1`.
   *
   * @default false
   */
  noZoom: boolean;
  /**
   * The counter-clockwise rotation value in degrees relative to the rotated PDF page. Inserting an
   * annotation with a rotation value of `0` will make it appear in the same direction as the UI
   * appears, when no {@link NutrientViewer.ViewState#pagesRotation} is set.
   *
   * Stamp annotations support free rotation using integers between 0° and 359°. Negative values or values
   * above 359 are normalized to this interval. Attempting to use non-integer values will result in
   * an error.
   *
   * @default 0
   */
  rotation: number;
  static readableName: string;
  constructor(options?: Partial<IStampAnnotation>);
}

/**
 * @deprecated Use {@link Serializers.StampAnnotationJSON} instead.
 * @hidden
 */
export declare type StampAnnotationJSON = Serializers.StampAnnotationJSON;

declare class StampAnnotationSerializer extends AnnotationSerializer {
  annotation: StampAnnotation;
  constructor(annotation: StampAnnotation);
  toJSON(): Serializers.StampAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<Serializers.StampAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): StampAnnotation;
}

declare function StampAnnotationTemplatesMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Returns a deep copy of the latest stamp and image annotation templates. This value changes
     * whenever {@link NutrientViewer.Instance#setStampAnnotationTemplates} is called.
     *
     * Mutating this array will have no effect.
     */
    readonly stampAnnotationTemplates: (ImageAnnotation | StampAnnotation)[];
    /**
     * This method is used to update the stamp annotation templates.
     *
     * It makes it possible to add new {@link NutrientViewer.Instance#stampAnnotationTemplates | stamp and image annotation templates}
     * and edit or remove existing ones.
     *
     * When you pass in an `array` with {@link NutrientViewer.Annotations.StampAnnotation | StampAnnotation}, the current
     * templates will be immediately updated. Calling this method is also idempotent.
     *
     * If you pass in a function, it will be immediately invoked and will receive the current
     * Array<NutrientViewer.Annotations.StampAnnotation | NutrientViewer.Annotations.ImageAnnotation> `Array` as argument.
     * You can use this to modify the array based on its current value. This type of update is guaranteed
     * to be atomic - the value of `currentStampAnnotationTemplates` can't change in between.
     *
     * When one of the supplied {@link NutrientViewer.Annotations.StampAnnotation | StampAnnotation} or
     * {@link NutrientViewer.Annotations.ImageAnnotation} is invalid, this method will throw a
     * {@link NutrientViewer.Error} that contains a detailed error message.
     *
     * Since `stampAnnotationTemplates` is a regular JavaScript `Array`, it can be manipulated
     * using standard `Array` methods.
     *
     * @example
     * The new changes will be applied immediately
     * ```ts
     * instance.setStampAnnotationTemplates(newStampAnnotationTemplates);
     * instance.stampAnnotationTemplates === newStampAnnotationTemplates; // => true
     * ```
     *
     * @example
     * Adding a stamp annotation template.
     * ```ts
     * const myStampAnnotationTemplate = new NutrientViewer.Annotations.StampAnnotation({
     *   stampType: "Custom",
     *   title: "My custom template title",
     *   subtitle: "Custom subtitle",
     *   boundingBox: new NutrientViewer.Geometry.Rect({ left: 0, top: 0, width: 192, height: 64 })
     * });
     * instance.setStampAnnotationTemplates(stampAnnotationTemplates => [ ...stampAnnotationTemplates, myStampAnnotationTemplate ]);
     * ```
     *
     * @throws {Error} Will throw an error when the supplied stamp annotation template `array` is not valid.
     * @param stateOrFunction - Either a new StampAnnotationTemplates `Array` which would overwrite the existing one, or a callback that
     * will get invoked with the current stamp and image annotation templates and is expected to return
     * the new stamp annotation stamps `Array`.
     */
    setStampAnnotationTemplates(stateOrFunction: Array<StampAnnotation | ImageAnnotation> | SetStampAnnotationTemplatesFunction): void;

  };
} & T;

/** @inline */
declare type StampKind = 'Approved' | 'NotApproved' | 'Draft' | 'Final' | 'Completed' | 'Confidential' | 'ForPublicRelease' | 'NotForPublicRelease' | 'ForComment' | 'Void' | 'PreliminaryResults' | 'InformationOnly' | 'Rejected' | 'Accepted' | 'InitialHere' | 'SignHere' | 'Witness' | 'AsIs' | 'Departmental' | 'Experimental' | 'Expired' | 'Sold' | 'TopSecret' | 'Revised' | 'RejectedWithText' | 'Custom';

declare interface StandaloneConfiguration extends SharedConfiguration {
  /**
   * ***required, Standalone only***
   *
   * The URL to a supported document or its content as `ArrayBuffer`.
   *
   * NutrientViewer supports the following type of documents:
   *
   * - PDF
   * - Image
   *
   * Note that all the formats except for PDF require a dedicated license.
   * Please contact sales to find out more about this.
   *
   * When providing a URL keep in mind that Cross-Origin Resource Sharing (CORS) apply.
   *
   * @example
   * Load a PDF document from an URI
   * ```ts
   * NutrientViewer.load({ document: 'https://example.com/document.pdf', ... });
   * ```
   *
   * @example
   * Load a document from an ArrayBuffer
   * ```ts
   * NutrientViewer.load({ document: arrayBuffer, ... });
   * ```
   *
   * @standalone
   */
  document: string | ArrayBuffer;
  /**
   * *optional, Standalone only*
   *
   * This allows you to overwrite the auto-detected URL for the processor engine worker NutrientViewer assets in Standalone mode.
   * This setting may be necessary when you integrate Nutrient Web SDK in an environment that limits
   * the size of the static assets, like Salesforce.
   *
   * If these assets are served from a different origin, you have to include proper CORS headers:
   * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS}
   *
   * This must end with a trailing slash, and the assets in the `/nutrient-viewer-lib/gdpicture-[hash]/` folder must be directly located
   * in the folder pointed to by `baseProcessorEngineUrl`.
   *
   * @example
   * NutrientViewer.load({ baseProcessorEngineUrl: 'https://public-cdn.example.com/pspdfkit-processor-engine/' });
   *
   * @default Auto-detected it will use the same value as `baseUrl` if set, or the auto-detected value
   * from the currently executed `&lt;script&gt;` tag.
   * @standalone
   */
  baseProcessorEngineUrl?: string;
  /**
   * ***Standalone only***
   *
   * Nutrient Web SDK license key from https://my.nutrient.io/.
   *
   * If not provided, the instance will run in trial mode for a limited time and then request the user to visit
   * {@link https://www.nutrient.io/try/} to request a trial license.
   *
   * @example
   * Activate with a license key
   * ```ts
   * NutrientViewer.load({ licenseKey: "YOUR_LICENSE_KEY_GOES_HERE", ... });
   * ```
   *
   * @standalone
   */
  licenseKey?: string;
  /**
   * ***Standalone only***
   *
   * [Instant JSON](https://www.nutrient.io/guides/web/importing-exporting/instant-json/) can be
   * used to instantiate a viewer with a diff that is applied to the raw PDF. This format can be used
   * to store annotation changes on your server and conveniently instantiate the viewer with the same
   * content at a later time.
   *
   * Instead of storing the updated PDF, this serialization only contains a diff that is applied
   * on top of the existing PDF and thus allows you to cache the PDF and avoid transferring a
   * potentially large PDF all the time.
   *
   * You can export this format from a standalone instance by using
   * {@link Instance#exportInstantJSON}.
   *
   * `annotations` will follow the [Instant Annotation JSON format specification](https://https://www.nutrient.io/guides/web/json/schema/annotations/).
   *
   * @example
   * NutrientViewer.load({
   *   instantJSON: {
   *     format: 'https://pspdfkit.com/instant-json/v1',
   *     skippedPdfObjectIds: [1],
   *     annotations: [
   *       { id:  1, pdfObjectId: 1, type: 'pspdfkit/text', content: 'Hello World', ...},
   *       { id: -1, type: 'pspdfkit/text', content: 'Hello Universe', ...},
   *     ],
   *   },
   *   // ...
   * });
   *
   * @standalone
   */
  instantJSON?: InstantJSON;
  /**
   * ***Standalone only***
   *
   * [XFDF](https://en.wikipedia.org/wiki/Portable_Document_Format#XML_Forms_Data_Format_(XFDF)) can be
   * used to instantiate a viewer with a diff that is applied to the raw PDF. This format can be used
   * to store annotation and form fields changes on your server and conveniently instantiate the viewer with the same
   * content at a later time.
   *
   * Instead of storing the updated PDF, this serialization only contains a diff that is applied
   * on top of the existing PDF and thus allows you to cache the PDF and avoid transferring a
   * potentially large PDF all the time.
   *
   * You can export this format from a standalone instance by using {@link Instance#exportXFDF}.
   *
   * @example
   * NutrientViewer.load({
   *   XFDF: xfdfString,
   *   // ...
   * });
   *
   * @standalone
   */
  XFDF?: string;
  /**
   * ***Standalone only***
   *
   * Whether the annotations embedded in the PDF document should be kept instead of replaced importing XFDF.
   *
   * The default import behavior will replace all annotations.
   *
   * @example
   * NutrientViewer.load({
   *   XFDF: xfdfString,
   *   XFDFKeepCurrentAnnotations: true,
   *   // ...
   * });
   *
   * @standalone
   * @default false
   */
  XFDFKeepCurrentAnnotations?: boolean;
  /**
   * ***Standalone only***
   *
   * Whether the imported XFDF should ignore the page rotation.
   *
   * The default import behavior will take the page rotation into account.
   *
   * This is useful when you have PDF pages that look the same, but have different underlying page rotations.
   * Use in connection with {@link Instance#exportXFDF} ignorePageRotation parameter.
   *
   * @example
   * NutrientViewer.load({
   *   XFDF: xfdfString,
   *   XFDFIgnorePageRotation: true,
   *   // ...
   * });
   *
   * @standalone
   * @default false
   */
  XFDFIgnorePageRotation?: boolean;
  /**
   * ***Standalone only***
   *
   * Whether the imported XFDF should have rich text annotations or not.
   *
   * The default import behavior will convert rich text annotations to plain text annotations.
   * If set to `true`, rich text annotations will be supported and plain text annotations
   * will be converted to rich text annotations.
   *
   * @example
   * NutrientViewer.load({
   *   XFDF: xfdfString,
   *   XFDFRichTextEnabled: true,
   *   // ...
   * });
   *
   * @standalone
   * @default false
   */
  XFDFRichTextEnabled?: boolean;
  /** @standalone */
  disableIndexedDBCaching?: boolean;
  /**
   * ***Standalone only***
   *
   * By default, only links that are represented as valid link annotations in the PDF will be enabled.
   * When `enableAutomaticLinkExtraction` is set to `true`, the text of the PDF will be scanned and
   * links will automatically be created.
   *
   * To enable automatic link extraction on a Nutrient Document Engine (server-backed) deployment, check out:
   * {@link https://www.nutrient.io/guides/web/pspdfkit-server/configuration/overview/}
   *
   * @example
   * NutrientViewer.load({
   *   enableAutomaticLinkExtraction: true,
   *   // ...
   * });
   *
   * @standalone
   */
  enableAutomaticLinkExtraction?: boolean;
  /**
   * ***Standalone only***
   *
   * Nutrient Web SDK uses an object pool to keep disposed instances in memory for fast reuse.
   * Since this process can be memory inefficient, by default we only keep one instance in memory.
   *
   * With this configuration option you can tune in the number of instances to keep in memory,
   * or disable object pooling by setting this parameter to 0.
   *
   * More about this feature: https://www.nutrient.io/blog/2018/optimize-webassembly-startup-performance/#object-pooling-caching-instances-d548cb
   *
   * @example
   * NutrientViewer.load({
   *   standaloneInstancesPoolSize: 2,
   *   // ...
   * });
   *
   * @standalone
   * @default 1
   */
  standaloneInstancesPoolSize?: number;
  /**
   * ***required, Standalone only***
   *
   * By implementing this callback you have a fine grained control over which
   * certificates are going to be used for digital signatures validation.
   *
   * The callback must return an `Array` of `ArrayBuffer` (DER) or `string` (PEM)
   * containing X.509 certificates.
   *
   * See
   * {@link https://www.nutrient.io/guides/web/digital-signatures/create-custom-certificate-sets/#standalone-deployment | this guide article}
   * to learn more.
   *
   * @example
   * Fetch and use custom set of certificates (Standalone)
   * ```ts
   * NutrientViewer.load({
   *   trustedCAsCallback: function() {
   *     return new Promise((resolve, reject) => {
   *        fetch("/your-certificate.cer")
   *         .then(res => res.arrayBuffer())
   *         .then(cert => resolve([cert]))
   *         .catch(reject)
   *     });
   *   },
   *   // ...
   * })
   * ```
   *
   * @standalone
   */
  trustedCAsCallback?: DigitalSignatures.TrustedCAsCallback;
  /**
   * ***optional, Standalone only***
   *
   * This property allows you to provide custom fonts you want to use when loading a Standalone
   * instance.
   *
   * From the `callback` defined on each {@link NutrientViewer.Font} instance you can return a promise
   * that resolves to a `Blob` of the font you want to use. You are free to fetch it in whatever
   * way you want, and optimize its loading by retrieving it from a cache using the
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/Cache | Cache API}, get it
   * from {@link https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API | IndexedDB}, etc.
   *
   *
   * See
   * {@link https://www.nutrient.io/guides/web/features/custom-fonts/ | this guide article}
   * to learn more.
   *
   * @example
   * Fetch and use a custom set of fonts (Standalone)
   * ```ts
   * const fetcher = name =>
   *   fetch(`https://example.com/${name}`).then(r => {
   *     if (r.status === 200) {
   *       return r.blob();
   *     } else {
   *       throw new Error();
   *     }
   *   });
   *
   * const customFonts = ["arial.ttf", "helvetica.ttf", "tahoma.ttf"]
   *    .map(font => new NutrientViewer.Font({ name: font, callback: fetcher }));
   *
   * NutrientViewer.load({
   *   customFonts,
   *   // ...
   * });
   * ```
   *
   * @standalone
   * @deprecated
   */
  customFonts?: Array<Font>;
  /**
   * When integrating NutrientViewer for Electron with context isolation enabled, this
   * property needs to be set for the SDK to work. It will be ignored in any other case.
   *
   * The value of this property needs to match the provided license key's bundle ID.
   *
   * @example
   * NutrientViewer.load({ electronAppName: "my-electron-app" })
   *
   * @deprecated Use {@link Configuration#appName | `Configuration.appName`} and {@link Configuration#productId | `Configuration.productId`} instead.
   * @standalone
   */
  electronAppName?: string;
  /**
   * When integrating NutrientViewer for Electron with context isolation enabled, this
   * property needs to be set for the SDK to work. It will be ignored in any other case.
   *
   * The value of this property needs to match the provided license key's bundle ID.
   *
   * @example
   * NutrientViewer.load({ appName: "my-electron-app" })
   *
   * @standalone
   */
  appName?: string;
  /**
   * ***optional, Standalone only***
   *
   * Allows specifying the environment in which the SDK is running.
   *
   * @example
   * NutrientViewer.load({ productId: NutrientViewer.ProductId.SharePoint });
   *
   * @standalone
   */
  productId?: IProductId;
  /**
   * ***optional, Standalone only***
   *
   * Document processing can be a time-consuming task, especially when working with large documents. In order to improve the user experience
   * it is possible to choose between two different processor engines with different optimizations applied: either one with a
   * smaller bundle size (the default), but slower overall performance, or one with a larger bundle size, but faster processing time.
   *
   * Either case it's recommended to enable asset compression on your Server to improve loading time.
   *
   * @example
   * NutrientViewer.load({ processorEngine: NutrientViewer.ProcessorEngine.fasterProcessing });
   *
   * @default NutrientViewer.ProcessorEngine.fasterProcessing
   * @standalone
   */
  processorEngine?: IProcessorEngine;
  /**
   * ***optional, Standalone only***
   *
   * This property allows you to provide a URL to JSON file with fonts available for downloading, associated
   * with specific ranges of characters and font variations.
   *
   * The downloadable font files need to be in the same scope as the JSON file.
   *
   * The JSON file needs to be in the following format:
   *
   * ```js
   * type FontName = {
   * // The full name of the font.
   * fullName: string;
   * // The next four properties are from the `name` table in the font.
   * // See https://learn.microsoft.com/en-us/typography/opentype/spec/name#name-ids
   * // Name ID 1: Font Family name
   * family?: string;
   * // Name ID 2: Font Subfamily name
   * subfamily?: string;
   * // Name ID 16: Typographic Family name
   * typographicFamily?: string;
   * // Name ID 17: Typographic Subfamily name
   * typographicSubfamily?: staring;
   * }
   *
   * // Represents a font that can be downloaded.
   * // filePath + faceIndex should be unique.
   * type Font = {
   * name: FontName;
   * // Path to the font file.
   * filePath: string;
   * // If the font file is a collection, this specifies the face index.
   * faceIndex?: int;
   * // A list of all code points supported by the font.
   * // This can either be a range ([number, number]) or a single codepoint.
   * codePoints: [[number, number] | number];
   * // The unicode ranges from the OS/2 table: https://learn.microsoft.com/en-us/typography/opentype/spec/os2#ur
   * unicodeRanges?: [4 numbers];
   * // A sha1 of the font file. For collections, this is a SHA of the whole file, not a single font.
   * sha1: string;
   * // Specifies true if the font is allowed to be embedded, false otherwise.
   * // Should only be used to make a decision to download the font, proper licensing handling should be done with the downloaded font.
   * allowedToEmbed: boolean;
   * // The boldness of the font. See https://learn.microsoft.com/en-us/typography/opentype/spec/os2#wtc
   * weight?: number;
   * }
   *
   * type DynamicFonts = {
   * availableFonts: [Font];
   * v: 1;
   * }
   * ```
   *
   * @example
   * Provide a list of downloadable font files (Standalone)
   * ```ts
   * NutrientViewer.load({
   *   dynamicFonts: "https://example.com/assets/fonts.json",
   *   // ...
   * });
   * ```
   *
   * @standalone
   */
  dynamicFonts?: string;
  /**
   * ***Standalone only***
   *
   * By default, we load the required Web Workers inline. That means that the Web Workers are loaded as a
   * blob URL, which allows us to load a Worker from other domains. However, this might interfere with strict CSP policies like `worker-src: 'self'`.
   * In that case, you can disable the inline loading of the Web Workers by setting this option to `false`.
   *
   * **Note**: This option is currently not supported in Salesforce environment.
   *
   * @example
   * NutrientViewer.load({
   *   inlineWorkers: false,
   *   // ...
   * });
   * ```
   *
   * @standalone
   * @default true
   */
  inlineWorkers?: boolean;
  /**
   * ***Standalone only***
   *
   * Allows configuring some behavior around forms in the viewer.
   *
   * @example
   * NutrientViewer.load({
   *   formsConfiguration: { ... },
   * });
   * ```
   *
   * @standalone
   * @default undefined
   */
  formsConfiguration?: FormsConfiguration;
  /**
   * ***Standalone only***
   *
   * Custom HTTP headers to include when fetching the document from a URL.
   * This property is only used when `document` is a string URL (not an ArrayBuffer).
   *
   * The headers will be applied to both the initial document fetch and any subsequent
   * range requests when using linearized loading.
   *
   * @example
   * NutrientViewer.load({
   *   document: 'https://example.com/document.pdf',
   *   httpHeaders: {
   *     'Authorization': 'Bearer token123',
   *     'X-Custom-Header': 'custom-value'
   *   }
   * });
   *
   * @standalone
   * @default undefined
   */
  httpHeaders?: Record<string, string>;
  /**
   * ***Standalone only***
   *
   * Enables or disables loading of linearized PDFs.
   * When enabled, the SDK takes advantage of linearized (also known as "fast web view") PDFs,
   * allowing portions of the document to be displayed while it's still being downloaded.
   * If enabled, the PDF viewer will render the document progressively, starting with the first pages,
   * while the rest of the file is downloaded in the background. The user interface will be in read-only
   * mode during the download.
   *
   * A indicator is displayed in the toolbar showing that the document is being downloaded.
   *
   * **Note**: Linearized loading requires the server to support byte-range requests and the PDF document to be linearized.
   *
   * @example
   * NutrientViewer.load({
   *   allowLinearizedLoading: true,
   *   // ...
   * });
   *
   * @standalone
   * @default false
   */
  allowLinearizedLoading?: boolean;
}

/**
 * @class
 * A strike out markup annotation. Please refer to {@link NutrientViewer.Annotations.MarkupAnnotation} for
 * more information.
 *
 * <center>
 *   <img title="Example of all markup annotation types" src="img/annotations/markup_annotations.png" width="450" class="shadow">
 * </center>
 * @example <caption>Create a strike out annotation</caption>
 * const rects = NutrientViewer.Immutable.List([
 *   new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 200, height: 10 }),
 *   new NutrientViewer.Geometry.Rect({ left: 10, top: 25, width: 200, height: 10 })
 * ]);
 * const annotation = new NutrientViewer.Annotations.StrikeOutAnnotation({
 *   pageIndex: 0,
 *   rects: rects,
 *   boundingBox: NutrientViewer.Geometry.Rect.union(rects)
 * });
 *
 * @summary Strike out markup annotation.
 */
export declare class StrikeOutAnnotation extends TextMarkupAnnotation<IStrikeOutAnnotation> {
  static className: string;
  static readableName: string;
}

/**
 * @class
 * PDF action to submit form fields in the current document.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record | Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `action.set("uri", "www.nutrient.io");`.
 *
 * A SubmitFormAction defines which form fields should be submitted, when clicked on it. The form
 * field names and their values will get submitted to the provided URI defined by the `uri`
 * field. By default all form fields will be submitted. The `includeExclude` field defines if the
 * fields specified by `fields`, which are a {@link NutrientViewer.Immutable.List} of form field names,
 * should submit all form fields excluding the defined fields or just the defined fields. When
 * `includeExclude` is set to `true`, all form fields except the fields defined in `fields` will be
 * submitted. If `includeExclude` is set to false, which is the default value for this field, only
 * the form fields defined in `fields` will be submitted.
 * @example
 * Create a new SubmitFormAction
 * ```ts
 * const action = new NutrientViewer.Actions.SubmitFormAction({
 *   uri: "www.nutrient.io"
 * });
 * ```
 *
 * @summary Submit form field names and values of the current document.
 */
export declare class SubmitFormAction extends Action {
  /**
   * The uniform resource identifier (web link) defining where the form should be submitted to, when
   * this action got triggered.
   */
  uri: string;
  /**
   * A List identifying which fields to submit or which to exclude from submitting, depending on the
   * setting of the includeExclude flag. Each element of the array shall be a text string
   * representing the fully qualified name of a field. If this entry is omitted, the includeExclude
   * flag shall be ignored; all fields in the document’s interactive form are submitted.
   *
   * @default null
   */
  fields: List<string> | null | undefined;
  /**
   * If false, the fields list specifies which fields to submit.
   * If true, the fields list indicates which fields to exclude from submitting. That is, all fields
   * in the document’s interactive form shall be submitted except those listed in the fields list.
   *
   * @default false
   */
  includeExclude: boolean;
  /**
   * This option is not supported yet.
   * If true, all fields designated by the Fields array and the IncludeExclude flag shall be
   * submitted, regardless of whether they have a value. For fields without a value, only the field
   * name shall be transmitted. If false, fields without a value shall not be submitted.
   *
   * @default true
   */
  includeNoValueFields: boolean;
  /**
   * Meaningful only if the `submitPDF` and `xfdf` flags are false. If set, field names and values shall
   * be submitted in HTML Form format. If false, they shall be submitted in Forms Data Format (FDF)
   *
   * @default true
   */
  exportFormat: boolean;
  /**
   * If true, field names and values shall be submitted using an HTTP GET request. If false, they
   * shall be submitted using a POST request. This flag is meaningful only when the exportFormat
   * flag is set. If exportFormat is false, this flag shall also be false.
   *
   * @default false
   */
  getMethod: boolean;
  /**
   * This option is not supported yet.
   * If true, the coordinates of the mouse click that caused the submit-form action shall be
   * transmitted as part of the form data. The coordinate values are relative to the upper-left
   * corner of the field’s widget annotation rectangle. They shall be represented in the data in the
   * format name.x=xval&name.y=yval where name is the field’s name.
   *
   * @default false
   */
  submitCoordinated: boolean;
  /**
   * This option is not supported yet.
   * Shall be used only if the SubmitPDF flags are false. If true, field names and values shall be
   * submitted as XFDF.
   *
   * @default false
   */
  xfdf: boolean;
  /**
   * This option is not supported yet.
   * Shall be used only when the form is being submitted in Forms Data Format (that is, when both
   * the XFDF and ExportFormat flags are false). If true, the submitted FDF file shall include the
   * contents of all incremental updates to the underlying PDF document, as contained in the
   * Differences entry in the FDF dictionary. If false, the incremental updates shall not be
   * included.
   *
   * @default false
   */
  includeAppendSaves: boolean;
  /**
   * This option is not supported yet.
   * shall be used only when the form is being submitted in Forms Data Format (that is, when both
   * the XFDF and ExportFormat flags are false). If set, the submitted FDF file shall include
   * all markup annotations in the underlying PDF document. If false, markup annotations
   * shall not be included.
   *
   * @default false
   */
  includeAnnotations: boolean;
  /**
   * If true, the document shall be submitted as PDF, using the MIME content type application/pdf.
   *
   * @default false
   */
  submitPDF: boolean;
  /**
   * This option is not supported yet.
   * If true, any submitted field values representing dates shall be converted to the standard
   * format.
   *
   * @default false
   */
  canonicalFormat: boolean;
  /**
   * This option is not supported yet.
   * shall be used only when the form is being submitted in Forms Data Format (that is, when both
   * the XFDF and ExportFormat flags are false) and the IncludeAnnotations flag is true. If true, it
   * shall include only those markup annotations those T entry matches the name of the current user,
   * as determined by the remote server to which the form is being submitted.
   *
   * @default false
   */
  excludeNonUserAnnotations: boolean;
  /**
   * This option is not supported yet.
   * Shall be used only when the form is being submitted in Forms Data Format (that is, when both
   * the XFDF and ExportFormat flags are false). If true, the submitted FDF shall exclude the F
   * entry.
   *
   * @default false
   */
  excludeFKey: boolean;
  /**
   * This option is not supported yet.
   * shall be used only when the form is being submitted in Forms Data Format (that is, when both
   * the XFDF and ExportFormat flags are false). If true, the F entry of the submitted FDF shall be a
   * file specification containing an embedded file stream representing the PDF file from which the
   * FDF is being submitted.
   *
   * @default false
   */
  embedForm: boolean;
  constructor(options?: ISubmitFormAction);
}

/**
 * Describes the data format used to populate a document template.
 */
export declare type TemplateDataToPopulateDocument = {
  /** The configuration used to populate the document template. */
  config: DelimiterConfig;
  /** The data used to populate the document template. */
  model: Array<Record<string, unknown>>;
};

/**
 * @class
 * A free form text that will be rendered inside the bounding box. It has no open or closed state -
 * instead of being displayed in a pop-up window, the text is always visible.
 *
 * Fonts are client specific and determined during runtime. If a font is not found, we will
 * automatically fall back to a sans serif font.
 *
 * <center>
 *   <img title="Example of a text annotation" src="img/annotations/text_annotation.png" width="350" class="shadow">
 * </center>
 * @example <caption>Create a text annotation</caption>
 * const annotation = new NutrientViewer.Annotations.TextAnnotation({
 *   pageIndex: 0,
 *   text: { format: "plain", value : "Welcome to\nNutrientViewer" },
 *   font: "Helvetica",
 *   isBold: true,
 *   horizontalAlign: "center",
 *   boundingBox: new NutrientViewer.Geometry.Rect({ left: 10, top: 20, width: 30, height: 40 }),
 *   fontColor: NutrientViewer.Color.RED
 * });
 *
 * @summary Free form text that will be rendered inside the bounding box.
 * @see {@link Instance#calculateFittingTextAnnotationBoundingBox} | {@link Instance#setEditingAnnotation}
 */
export declare class TextAnnotation extends Annotation<ITextAnnotation> {
  /**
   * The visible contents in plain text/xhtml formats.
   *
   * We use a simple newline delimiter `\n` for multi
   * line texts in case of plain text. A trailing newline (e.g. `foobar\n`) will result in an additional line.
   *
   * In case of XHTML, we support the following tags:
   * - `<b>`: Bold
   * - `<i>`: Italic
   * - `<span>`: Font color, background color and underline using the `style` attribute (e.g. `<span style="color: red; background-color: blue; text-decoration: underline">Hello</span>`)
   * - `p`: Paragraph. You can use this to add a newline between paragraphs.
   *
   * @example <caption>Get the text value of a text annotation</caption>
   * const { value, format } = annotation.text;
   *
   * @default { format: "plain", value: "" }
   */
  text: {
    format: 'plain' | 'xhtml';
    value: string;
  };
  /**
   * A {@link NutrientViewer.Color} for the visible glyphs, or `null` for transparent color.
   *
   * @default Color.BLACK
   */
  fontColor: null | Color;
  /**
   * Optional background color that will fill the complete bounding box.
   *
   * @default null
   */
  backgroundColor: null | Color;
  /**
   * The name of the font family that should be used.
   *
   * Fonts are client specific and determined during runtime. If a font is not found, we will
   * automatically fall back to 'sans-serif'.
   *
   * We test the following list at runtime. The first available font will be used as the default
   * for all new text annotations: Helvetica, Arial, Calibri, Century Gothic, Consolas, Courier,
   * Dejavu Sans, Dejavu Serif, Georgia, Gill Sans, Impact, Lucida Sans, Myriad Pro, Open Sans,
   * Palatino, Tahoma, Times New Roman, Trebuchet, Verdana, Zapfino, Comic Sans.
   *
   * @default "Helvetica"
   */
  font: string;
  /**
   * The font size in page size pixels. Per default, we use values between 10 and 192 inclusive
   * in the UI.
   *
   * The text will scale when you zoom in.
   *
   * @default 18
   */
  fontSize: number;
  /**
   * If `true`, the font will be **bold** if the font family supports this.
   *
   * @default false
   */
  isBold: boolean;
  /**
   * If `true`, the font will be _italic_ if the font family supports this.
   *
   * @default false
   */
  isItalic: boolean;
  isUnderline: boolean;
  /**
   * When set, the annotation will not scale up in the page when it's zoomed in.
   * The flag doesn't have an effect when the page is zoomed out to a zoom level less than `1`.
   * The flag is not currently supported when the `callout` property is set.
   *
   * @default false
   */
  noZoom: boolean;
  /**
   * The counter-clockwise rotation value in degrees relative to the rotated PDF page. Inserting an
   * annotation with a rotation value of `0` will make it appear in the same direction as the UI
   * appears, when no {@link NutrientViewer.ViewState#pagesRotation} is set.
   *
   * Text annotations support free rotation using integers between 0° and 359°. Negative values or values
   * above 359 are normalized to this interval. Attempting to use non-integer values will result in
   * an error.
   *
   * @default 0
   */
  rotation: number;
  /**
   * The horizontal alignment of the text inside the bounding box. Can be either one of:
   *
   * - `left`
   * - `center`
   * - `right`
   *
   * This is equal to the CSS `text-align` property.
   *
   * @default "left"
   */
  horizontalAlign: 'left' | 'center' | 'right';
  /**
   * The vertical alignment of the text inside the bounding box. Can be either one of:
   *
   * - `top`
   * - `center`
   * - `bottom`
   *
   * @default "top"
   */
  verticalAlign: 'top' | 'center' | 'bottom';
  /**
   * When the annotation is modified through Nutrient Web SDK, we will set this flag whenever the
   * whole text fits the bounds of the annotation without overflowing.
   *
   * @default false
   * {@link NutrientViewer.Instance#calculateFittingTextAnnotationBoundingBox}
   */
  isFitting: boolean;
  /**
   * The callout that is attached to the annotation.
   *
   * @default null
   */
  callout: null | Callout;
  borderStyle: null | IBorderStyle;
  borderWidth: null | number;
  /**
   * Optional border color that will be used for the text border and the line for text annotations
   * of type callout. It will be not be rendered if the `callout` property is not set.
   *
   * @default null
   */
  borderColor: Color | null;
  static readonly isEditable = true;
  static readonly readableName = "Text";
  static readonly fontSizePresets: readonly number[];
}

/**
 * @deprecated Use {@link Serializers.TextAnnotationJSON} instead.
 * @hidden
 */
export declare type TextAnnotationJSON = Serializers.TextAnnotationJSON;

declare class TextAnnotationSerializer extends AnnotationSerializer {
  annotation: TextAnnotation;
  constructor(annotation: TextAnnotation);
  toJSON(): Serializers.TextAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<Serializers.TextAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): TextAnnotation;
  _calloutToJSON(): {
    start: [number, number];
    knee: [number, number] | null;
    end: [number, number];
    cap: ILineCap | null;
    innerRectInset: InsetJSON | null;
  } | null;
  static _JSONToCallout(calloutJSON: Serializers.TextAnnotationJSON['callout']): Callout | null | undefined;
}

declare type TextComparisonAction = ReturnType<ActionCreators[keyof ActionCreators]>;

declare const textComparisonActionCreators: {
  setInstances: (payload: {
    instanceA: Instance;
    instanceB: Instance;
    aiComparisonData?: AIComparisonData | null;
  }) => {
    type: "SET_INSTANCES";
    payload: {
      instanceA: Instance;
      instanceB: Instance;
      aiComparisonData?: AIComparisonData | null | undefined;
    };
  };
  setToolbarItems: (payload: List<ToolbarItem_2>) => {
    type: "SET_TOOLBAR_ITEMS";
    payload: List<ToolbarItem>;
  };
  setInnerToolbarItems: (payload: List<TextComparisonInnerToolbarItem>) => {
    type: "SET_INNER_TOOLBAR_ITEMS";
    payload: List<TextComparisonInnerToolbarItem>;
  };
  setComparisonSidebarConfig: (payload: TextComparisonSidebarConfiguration) => {
    type: "SET_COMPARISON_SIDEBAR_CONFIG";
    payload: TextComparisonSidebarConfiguration;
  };
  setScrollLock: (payload: boolean) => {
    type: "SET_SCROLL_LOCK";
    payload: boolean;
  };
  setComparisonVisibility: (payload: boolean) => {
    type: "SET_COMPARISON_VISIBILITY";
    payload: boolean;
  };
  setTextComparisonChanges: (payload: List<TextComparisonChange>) => {
    type: "SET_TEXT_COMPARISON_CHANGES";
    payload: List<TextComparisonChange>;
  };
  setCurrentChangeIndex: (payload: number) => {
    type: "SET_CURRENT_CHANGE_INDEX";
    payload: number;
  };
  setAIComparisonData: (payload: AIComparisonData | null) => {
    type: "SET_AI_COMPARISON_DATA";
    payload: AIComparisonData | null;
  };
  updateAIComparisonPhase: (phase: IAIComparisonPhase) => {
    type: "UPDATE_AI_COMPARISON_PHASE";
    payload: AIComparisonPhase;
  };
  setAIComparisonError: (error: AIComparisonError | null) => {
    type: "SET_AI_COMPARISON_ERROR";
    payload: AIComparisonError | null;
  };
  toggleSummaryPanel: (payload: boolean) => {
    type: "TOGGLE_SUMMARY_PANEL";
    payload: boolean;
  };
  setActiveFilters: (payload: Set<string>) => {
    type: "SET_ACTIVE_FILTERS";
    payload: Set<string>;
  };
  setFilteredChanges: (payload: AIADocumentChangeTaggingItem[] | null) => {
    type: "SET_FILTERED_CHANGES";
    payload: AIADocumentChangeTaggingItem[] | null;
  };
  setDisplayChanges: (payload: List<TextComparisonChange>) => {
    type: "SET_DISPLAY_CHANGES";
    payload: List<TextComparisonChange>;
  };
  setHasActiveFilters: (payload: boolean) => {
    type: "SET_HAS_ACTIVE_FILTERS";
    payload: boolean;
  };
};

/** @inline */
declare interface TextComparisonChange {
  insertionAnnotations: List<HighlightAnnotation>;
  deletionAnnotations: List<HighlightAnnotation>;
  pages: Set_2<number>;
  insertedText: string;
  deletedText: string;
  insertionCount: number;
  deletionCount: number;
  operationType: TextComparisonOperationTypes;
}

export declare interface TextComparisonConfiguration extends SharedTextComparisonConfiguration {
  /**
   * ***required, Standalone only***
   *
   * The URL for the base document or its content as `ArrayBuffer` used for comparison.
   *
   * When providing a URL keep in mind that Cross-Origin Resource Sharing (CORS) apply.
   *
   * @example
   * Load a PDF document from an URI
   * ```ts
   * NutrientViewer.loadTextComparison({ documentA: 'https://example.com/document.pdf', ... });
   * ```
   *
   * @example
   * Load a document from an ArrayBuffer
   * ```ts
   * NutrientViewer.loadTextComparison({ documentA: arrayBuffer, ... });
   * ```
   *
   * @standalone
   */
  documentA: string | ArrayBuffer;
  /**
   * ***required, Standalone only***
   *
   * The URL for the second document or its content as `ArrayBuffer` used for comparison.
   *
   * When providing a URL keep in mind that Cross-Origin Resource Sharing (CORS) apply.
   *
   * @example <caption>Load a PDF document from an URI</caption>
   * NutrientViewer.loadTextComparison({ documentB: 'https://example.com/document.pdf', ... });
   *
   * @example <caption>Load a document from an ArrayBuffer</caption>
   * NutrientViewer.loadTextComparison({ documentB: arrayBuffer, ... });
   *
   * @standalone
   */
  documentB: string | ArrayBuffer;
  ai?: boolean;
  wordLevel?: boolean;
}

/**
 * Configuration for customizing the colors used to highlight differences in text comparison.
 *
 * @example
 * const diffColors = {
 *   insertionColor: new NutrientViewer.Color({ r: 0, g: 128, b: 0 }),
 *   insertionBackgroundColor: new NutrientViewer.Color({ r: 200, g: 255, b: 200 }),
 *   deletionColor: new NutrientViewer.Color({ r: 255, g: 0, b: 0 }),
 *   deletionBackgroundColor: new NutrientViewer.Color({ r: 255, g: 200, b: 200 }),
 *   disabledColor: new NutrientViewer.Color({ r: 150, g: 150, b: 150 }),
 *   disabledBackgroundColor: new NutrientViewer.Color({ r: 240, g: 240, b: 240 })
 * };
 */
export declare interface TextComparisonDiffColors {
  /** Text color for insertions */
  insertionColor?: Color;
  /** Background color for insertions */
  insertionBackgroundColor?: Color;
  /** Text color for deletions */
  deletionColor?: Color;
  /** Background color for deletions */
  deletionBackgroundColor?: Color;
  /** Text color for disabled annotations */
  disabledColor?: Color;
  /** Background color for disabled annotations */
  disabledBackgroundColor?: Color;
}

declare interface TextComparisonEventsMap {
  'textComparison.scrollLock': (scrollLockFlag: boolean) => void;
  'textComparison.comparisonSidebarVisibilityChange': (scrollLockFlag: boolean) => void;
  'textComparison.selectionChange': (newSelectedIndex: number) => void;
}

export declare interface TextComparisonInnerToolbarItem extends Omit<ToolItem_2, 'type' | 'onPress'> {
  /**
   * ***required***
   *
   * The type of a text comparison instance toolbar item.
   *
   * It can either be `custom` for user defined items or one from the {@link NutrientViewer.defaultTextComparisonInnerToolbarItems}.
   *
   * Note: It is ***not*** possible to override this option for built-in toolbar items.
   *
   * @example
   * // In your JavaScript
   * const innerToolbarItems = NutrientViewer.defaultTextComparisonInnerToolbarItems
   * innerToolbarItems.push({ type: 'custom', ... })
   * NutrientViewer.loadTextComparison({
   *  ...otherOptions,
   *  innerToolbarItems,
   * });
   */
  type: TextComparisonInnerToolbarItemType;
  /**
   * Unique identifier for the item.
   *
   * This is useful to identify items whose `type` is `custom`.
   *
   * @example
   * // In your JavaScript
   * const innerToolbarItems = NutrientViewer.defaultTextComparisonInnerToolbarItems
   * innerToolbarItems.push({ type: 'custom', id: 'my-button', ... })
   * NutrientViewer.loadTextComparison({
   *  ...otherOptions,
   *  innerToolbarItems,
   * });
   *
   * Note: It is ***not*** possible to override this option for built-in text comparison toolbar items.
   */
  id?: string;
  /**
   * Useful to set a custom CSS class name on the item.
   *
   * For {@link NutrientViewer.defaultTextComparisonInnerToolbarItems | default text comparison instance toolbar items} the `className` is appended to the default
   * item ones.
   */
  className?: string;
  /**
   * Whether a custom item is selected or not.
   *
   * The selected status of {@link NutrientViewer.defaultTextComparisonInnerToolbarItems | default items} cannot be altered.
   *
   * Note: It is ***not*** possible to override this option for built-in text comparison instance toolbar items.
   */
  selected?: boolean;
  /**
   * Icon for the item.
   *
   * The icon should either be an URL, a base64 encoded image or the HTML for an inline SVG.
   * This property can override the {@link NutrientViewer.defaultTextComparisonInnerToolbarItems | default items}' ones.
   */
  icon?: string;
  /**
   * Whether the item is disabled or not.
   *
   * The property can be used to force a {@link NutrientViewer.defaultTextComparisonInnerToolbarItems | default item} to be
   * disabled by setting it to `true`.
   */
  disabled?: boolean;
  /**
   * Callback to invoke when the item is clicked or tapped (on touch devices). It gets the `event` as
   * first argument, a document editor UI handler object as the second, and the `id` of the tool item as the third.
   *
   * @param event - The event that is fired on press. `onPress` is also fired when pressing enter.
   * @param documentEditorUIHandler - An instance object to set and retrieve different state properties of the document editor UI.
   * @param id - The tool item id.
   */
  onPress?: (event: MouseEvent | KeyboardEvent, documentEditorUIHandler: DocumentEditorUIHandler, id: string) => void;
  mediaQueries?: string[];
  responsiveGroup?: string;
  dropdownGroup?: string;
}

/** @inline */
declare type TextComparisonInnerToolbarItemType = ToolItemType | (typeof allowedTextComparisonInnerToolbarItem)[number];

/**
 * @class
 * A mounted text comparison instance.
 *
 * You can generate an instance for text comparison by using {@link NutrientViewer.loadTextComparison}.
 * @hideconstructor
 * @public
 * @summary A mounted text comparison instance.
 */
export declare class TextComparisonInstance {
  getScrollLock: () => boolean;
  getComparisonVisibility: () => boolean;
  getCurrentChangeIndex: () => number;
  getToolbarItems: () => TextComparisonToolbarItem[];
  getInnerToolbarItems: () => TextComparisonInnerToolbarItem[];
  getChanges: () => TextComparisonChange[];
  addEventListener: <K extends keyof TextComparisonEventsMap>(action: K, listener: TextComparisonEventsMap[K]) => void;
  removeEventListener: <K extends keyof TextComparisonEventsMap>(action: K, listener: TextComparisonEventsMap[K]) => void;
  unload: () => void;
  setComparisonSidebarConfig: (comparisonSidebarConfig: TextComparisonSidebarConfiguration) => Promise<void>;
  setScrollLock: (flag: boolean) => void;
  setComparisonVisibility: (flag: boolean) => void;
  setCurrentChangeIndex: (changeIndex: number) => void;
  setToolbarItems: (toolbarItemsCallback: TextComparisonToolbarItem[] | SetToolbarItemsFunction) => void;
  setInnerToolbarItems: (toolbarItemsCallback: TextComparisonInnerToolbarItem[] | SetToolbarItemsFunction) => void;
  jumpToChange: (changeIndex: number) => number;
  goToPreviousChange: () => number;
  goToNextChange: () => number;
  constructor(params: TextComparisonInstanceConstructor);
}

declare interface TextComparisonInstanceConstructor extends TextComparisonSharedProps {
  instanceA: Instance;
  instanceB: Instance;
  unmount: () => void;
}

/** @inline */
declare enum TextComparisonOperationTypes {
  inserted = "Inserted",
  deleted = "Deleted",
  replaced = "Replaced",
}

declare type TextComparisonSharedProps = {
  dispatch: Dispatch<TextComparisonAction>;
  stateRef: MutableRefObject<TextComparisonState>;
};

/**
 * Configuration options for the text comparison sidebar.
 *
 * @example
 * const sidebarConfig = {
 *   diffColors: {
 *     insertionColor: new NutrientViewer.Color({ r: 0, g: 255, b: 0 }),
 *     deletionColor: new NutrientViewer.Color({ r: 255, g: 0, b: 0 })
 *   },
 *   openByDefault: true
 * };
 *
 * NutrientViewer.loadTextComparison({
 *   // ... other configuration
 *   comparisonSidebarConfig: sidebarConfig
 * });
 * ```
 */
declare interface TextComparisonSidebarConfiguration {
  /** Color configuration for highlighting differences */
  diffColors?: TextComparisonDiffColors;
  /**
   * Whether the comparison sidebar opens automatically when the comparison loads
   *
   * @default true
   * */
  openByDefault?: boolean;
}

declare interface TextComparisonState {
  instanceA: Instance | null;
  instanceB: Instance | null;
  textComparisonChanges: List<TextComparisonChange>;
  isScrollLockEnabled: boolean;
  isComparisonVisible: boolean;
  eventEmitter: EventEmitter;
  frameWindow: Window;
  instancesLoaded: boolean;
  currentChangeIndex: number;
  lastSelectedChangeIndex: number;
  ui: any;
  toolbarItems: List<TextComparisonToolbarItem>;
  innerToolbarItems: List<TextComparisonInnerToolbarItem>;
  comparisonSidebarConfig: TextComparisonSidebarConfiguration | null;
  mainShadowRoot: ShadowRoot | Document;
  container: HTMLElement;
  rootElement: HTMLElement;
  aiComparisonData?: AIComparisonData | null;
  isSummaryPanelOpen: boolean;
  activeFilters: Set<string>;
  filteredChanges: AIADocumentChangeTaggingItem[] | null;
  displayChanges: List<TextComparisonChange>;
  hasActiveFilters: boolean;
}

export declare interface TextComparisonToolbarItem extends Omit<ToolItem_2, 'type' | 'onPress'> {
  /**
   * The type of a text comparison toolbar item.
   *
   * It can either be `custom` for user defined items or one from the {@link NutrientViewer.defaultTextComparisonToolbarItems}.
   *
   * Note: It is ***not*** possible to override this option for built-in toolbar items.
   *
   * @example
   * // In your JavaScript
   * const toolbarItems = NutrientViewer.defaultTextComparisonToolbarItems
   * toolbarItems.push({ type: 'custom', ... })
   * NutrientViewer.loadTextComparison({
   *  ...otherOptions,
   *  toolbarItems
   * });
   */
  type: TextComparisonToolbarItemType;
  /**
   * Unique identifier for the item.
   *
   * This is useful to identify items whose `type` is `custom`.
   *
   * @example
   * // In your JavaScript
   * const toolbarItems = NutrientViewer.defaultTextComparisonToolbarItems
   * toolbarItems.push({ type: 'custom', id: 'my-button', ... })
   * NutrientViewer.loadTextComparison({
   *  ...otherOptions,
   *  toolbarItems
   * });
   *
   * Note: It is ***not*** possible to override this option for built-in text comparison toolbar items.
   */
  id?: string;
  /**
   * Useful to set a custom CSS class name on the item.
   *
   * For {@link NutrientViewer.defaultTextComparisonToolbarItems | default text comparison toolbar items} the `className` is appended to the default
   * item ones.
   */
  className?: string;
  /**
   * Whether the item is disabled or not.
   *
   * The property can be used to force a {@link NutrientViewer.defaultTextComparisonToolbarItems | default item} to be
   * disabled by setting it to `true`.
   */
  disabled?: boolean;
  /**
   * Icon for the item.
   *
   * The icon should either be an URL, a base64 encoded image or the HTML for an inline SVG.
   * This property can override the {@link NutrientViewer.defaultTextComparisonToolbarItems | default items}' ones.
   */
  icon?: string;
  /**
   * Whether a custom item is selected or not.
   *
   * The selected status of {@link NutrientViewer.defaultTextComparisonToolbarItems | default items} cannot be altered.
   *
   * Note: It is ***not*** possible to override this option for built-in text comparison toolbar items.
   */
  selected?: boolean;
  /**
   * Callback to invoke when the item is clicked or tapped (on touch devices). It gets the `event` as
   * first argument, a document editor UI handler object as the second, and the `id` of the tool item as the third.
   *
   * @param event - The event that is fired on press. `onPress` is also fired when pressing enter.
   * @param documentEditorUIHandler - An instance object to set and retrieve different state properties of the document editor UI.
   * @param id - The tool item id.
   */
  onPress?: (event: MouseEvent | KeyboardEvent, documentEditorUIHandler: DocumentEditorUIHandler, id: string) => void;
  mediaQueries?: string[];
  responsiveGroup?: string;
  dropdownGroup?: string;
}

declare type TextComparisonToolbarItemType = ToolItemType | (typeof allowedTextComparisonToolbarItem)[number];

/**
 * @class
 *
 * A text input element, that can either span a single or multiple lines.
 *
 * To retrieve a list of all form fields, use {@link NutrientViewer.Instance#getFormFields}.
 * @public
 * @summary A text input element, that can either span a single or multiple lines.
 */
export declare class TextFormField extends FormField {
  /**
   * The current value of the form field. In order to modify it, {@link NutrientViewer.Instance.setFormFieldValues | instance.setFormFieldValues()} should be used.
   */
  readonly value: string;
  /**
   * Similar to the `value` property. The default values are only used when a form needs to be reset.
   */
  defaultValue: string;
  /**
   * If true, the field is intended for entering a secure password that should not be echoed visibly
   * to the screen. Characters typed from the keyboard should instead be echoed in some unreadable
   * form, such as asterisks or bullet characters.
   *
   * This is currently only support for single line text inputs.
   *
   * @default false
   */
  password: boolean;
  /**
   * The maximum length of the field’s text, in characters. If none is set, the size is not limited.
   *
   * @default null
   */
  maxLength?: number | null;
  /**
   * If true, text entered in the field is not spell-checked.
   *
   * @default false
   */
  doNotSpellCheck: boolean;
  /**
   * If true, the field does not scroll (horizontally for single-line fields, vertically for
   * multiple-line fields) to accommodate more text than fits within its annotation’s rectangle. Once
   * the field is full, no further text is accepted.
   *
   * @default false
   */
  doNotScroll: boolean;
  /**
   * If true, the field can contain multiple lines of text. Otherwise, the field’s text is restricted
   * to a single line.
   *
   * @default false
   */
  multiLine: boolean;
  /**
   * If true, every character will have an input element on their own which is evenly distributed
   * inside the bounding box of the widget annotation. When this is set, the form field must have a
   * maxLength.
   *
   * @default false
   */
  comb: boolean;
  additionalActions: FormFieldInputAdditionalActionsType | null | undefined;
  static defaultValues: IObject;
}

/**
 * @class
 * A line of text displayed at a specific bounding box in the PDF file.
 *
 * You can retrieve text lines using {@link NutrientViewer.Instance#textLinesForPageIndex}.
 * @public
 * @summary A line of text in the PDF file.
 * @hideconstructor
 */
export declare class TextLine extends TextLine_base {}

declare const TextLine_base: Record_2.Factory<ITextLine>;

/**
 * @class
 * Base annotation type from which all markup annotations inherit. You can not directly instantiate
 * from this type.
 *
 * A markup annotation in the UI will be created from the positions of the currently selected text
 * but will be persisted with a list of rectangles as per PDF spec.
 *
 * The `boundingBox` should be set to the {@link NutrientViewer.Geometry.Rect.union union} of all `rects`.
 *
 * <center>
 *   <img title="Example of all markup annotation types" src="img/annotations/markup_annotations.png" width="450" class="shadow">
 * </center>
 *
 * For interacting with a markup annotation, please look at the subtypes:
 *
 * - {@link NutrientViewer.Annotations.HighlightAnnotation}
 * - {@link NutrientViewer.Annotations.SquiggleAnnotation}
 * - {@link NutrientViewer.Annotations.StrikeOutAnnotation}
 * - {@link NutrientViewer.Annotations.UnderlineAnnotation}
 * @summary Base annotation type for all markup annotations.
 * @see {@link Instance#getMarkupAnnotationText} | {@link Configuration#disableTextSelection}
 */
export declare class TextMarkupAnnotation<T extends ITextMarkupAnnotation = ITextMarkupAnnotation> extends Annotation<T> {
  /**
   * A list of rects where the annotation is drawn. This is necessary to display a markup annotation
   * on multiple lines.
   *
   * The `boundingBox` should be set to the {@link NutrientViewer.Geometry.Rect.union union} of this list.
   *
   * @default NutrientViewer.Immutable.List() Empty list
   */
  rects: List<Rect>;
  /**
   * A {@link NutrientViewer.Color} for the markup.
   *
   * @default Color.BLACK
   */
  color: Color;
  /**
   * The blend mode defines how the color of the annotation will be applied to its background.
   *
   * @default "normal"
   */
  blendMode: IBlendMode;
  static readableName: string;
}

/**
 * @deprecated Use {@link Serializers.TextMarkupAnnotationJSON} instead.
 * @hidden
 */
export declare type TextMarkupAnnotationJSON = Serializers.TextMarkupAnnotationJSON;

declare class TextMarkupAnnotationSerializer extends BaseTextMarkupSerializer {
  annotation: TextMarkupAnnotationsUnion;
  constructor(annotation: TextMarkupAnnotationsUnion);
  toJSON(): Serializers.TextMarkupAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<Serializers.TextMarkupAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): TextMarkupAnnotationsUnion;
  typeForAnnotation(): "pspdfkit/markup/highlight" | "pspdfkit/markup/squiggly" | "pspdfkit/markup/strikeout" | "pspdfkit/markup/underline" | "pspdfkit/markup/redaction";
}

export declare type TextMarkupAnnotationsUnion = HighlightAnnotation | UnderlineAnnotation | StrikeOutAnnotation | SquiggleAnnotation | RedactionAnnotation;

declare class TextRange extends TextRange_base {
  startNode: Text;
  startOffset: number;
  endNode: Text;
  endOffset: number;
  /**
   * Extracts the start and end text line IDs. This requires the `startNode` and `endNode` to have
   * our custom selectable class and their parents must have the `data-textline-id` field.
   *
   * If the selection DOM nodes have been removed from the DOM tree, this method will return null.
   */
  startAndEndIds(): {
    startTextLineId: number;
    endTextLineId: number;
    startNestedContentBlockId: string;
    endNestedContentBlockId: string;
    startPageIndex: number;
    endPageIndex: number;
  } | null;
}

declare const TextRange_base: Record_2.Factory<ITextRange>;

/**
 * @class
 * Information about the currently selected text in the PDF. You can listen for changes using the
 * {@link NutrientViewer.EventName.TEXT_SELECTION_CHANGE}.
 *
 * <h5>Example</h5>
 * <p class="code-caption">Read the currently selected text of an Instance</p>
 *
 * <pre class="prettyprint">
 * const textSelection = instance.getTextSelection();
 * textSelection.getText().then(text => console.log(text));
 * </pre>
 *
 * <p class="code-caption">Register a TextSelectionChangeEvent</p>
 *
 * <pre class="prettyprint">
 * instance.addEventListener("textSelection.change", (textSelection) => {
 *   if (textSelection) {
 *     console.log("text is selected");
 *   } else {
 *     console.log("no text is selected");
 *   }
 * });
 * </pre>
 * @public
 * @summary The current text selection.
 * @hideconstructor
 */
export declare class TextSelection extends PublicTextSelection_base {
  /**
   * The {@link NutrientViewer.TextLine#id} of the first text line of this text selection.
   */
  startTextLineId: number;
  /**
   * The {@link NutrientViewer.TextLine#id} of the first text line of this text selection.
   */
  startNestedContentBlockId: string;
  /**
   * The page index where the text selection starts.
   */
  startPageIndex: number;
  /**
   * The HTML `Text` node at the start of this text selection.
   */
  startNode: Text;
  /**
   * The HTML `Text` node offset of at the start of this text selection.
   */
  startOffset: number;
  /**
   * The {@link NutrientViewer.TextLine#id} of the last text line of this text selection.
   */
  endTextLineId: number;
  /**
   * The {@link NutrientViewer.TextLine#id} of the last text line of this text selection.
   */
  endNestedContentBlockId: string;
  /**
   * The page index where the text selection ends.
   */
  endPageIndex: number;
  /**
   * The HTML `Text` node at the end of this text selection.
   */
  endNode: Text;
  /**
   * The HTML `Text` node offset of at the end of this text selection.
   */
  endOffset: number;
  /**
   * Returns the text of this text selection. Text blocks will be joined by a new line character
   * (`\n`).
   *
   * @example
   * const textSelection = instance.getTextSelection();
   * textSelection.getText().then(text => console.log(text));
   *
   * @returns A promise that resolves to the text.
   */
  getText: () => Promise<string>;
  /**
   * Returns an immutable list of all {@link NutrientViewer.TextLine}s of this text selection.
   *
   * @example
   * const textSelection = instance.getTextSelection();
   * textSelection.getSelectedTextLines().then(lines => console.log(lines));
   *
   * @returns A promise that resolves to a list of all text lines.
   */
  getSelectedTextLines: () => Promise<List<TextLine>>;
  /**
   * Returns the bounding box in client coordinates of the current text selection, or `null` if the
   * selection has been programmatically collapsed.
   *
   * @example
   * const textSelection = instance.getTextSelection();
   * textSelection.getBoundingClientRect().then(rect => console.log(rect));
   *
   * @returns A promise that resolves to the client rect.
   */
  getBoundingClientRect: () => Promise<Rect | null>;
  /**
   * Returns the individually selected text rectangles in the PDF page space for each page. This can
   * be used to create e.g. {@link NutrientViewer.Annotations.MarkupAnnotation}s at the current
   * selection.
   *
   * @example
   * const textSelection = instance.getTextSelection();
   * textSelection.getSelectedRectsPerPage().then(rectsPerPage => {
   *   rectsPerPage.map(({ pageIndex, rects }) => {
   *     // We need to create one annotation per page.
   *     const annotation = new NutrientViewer.Annotations.HighlightAnnotation({
   *       pageIndex,
   *       boundingBox: NutrientViewer.Geometry.Rect.union(rects),
   *       rects,
   *     });
   *     instance.create(annotation);
   *   });
   * });
   *
   * @returns A promise that resolves to a list of rects per page.
   */
  getSelectedRectsPerPage: () => Promise<List<{
    pageIndex: number;
    rects: List<Rect>;
  }>>;
}

declare class TextSelection_2 extends TextSelection_base {}


declare const TextSelection_base: Record_2.Factory<ITextSelection_2>;

declare function TextSelectionMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Gets the current text selection in the document, if any.
     *
     * @example
     * Get the text selection as a string
     * ```ts
     * const currentSelection = instance.getTextSelection();
     * if (currentSelection != null) {
     *   const text = await currentSelection.getText();
     *   alert(`Selection: '${text}'`);
     * }
     * ```
     *
     * @returns A promise that resolves to the current text selection, or `null` if no text is selected.
     */
    getTextSelection(): TextSelection | null;

  };
} & T;

/**
 * Describes theme to use.
 *
 * Note: You can customize the appearance of the UI using our public
 * CSS classes. Please refer to
 * {@link https://www.nutrient.io/guides/web/customizing-the-interface/css-customization/|this guide article}
 * for information on how to customize the appearance.
 *
 * @enum
 */
export declare const Theme: {
  /** Light mode. This is the default theme. */
  readonly LIGHT: "LIGHT";
  /** Dark mode. */
  readonly DARK: "DARK";
  /** Uses {@link NutrientViewer.Theme.LIGHT} or {@link NutrientViewer.Theme.DARK} based on the user preferences or `prefers-color-scheme` media query. */
  readonly AUTO: "AUTO";
  /** High contrast light mode which is AAA compliant. */
  readonly HIGH_CONTRAST_LIGHT: "HIGH_CONTRAST_LIGHT";
  /** High contrast dark mode which is AAA compliant. */
  readonly HIGH_CONTRAST_DARK: "HIGH_CONTRAST_DARK";
};

declare const themeContract: {
  elevation: {
    low: string;
    medium: string;
  };
  opacity: {
    none: string;
    low: string;
    medium: string;
    high: string;
  };
  rounded: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
    full: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    "4xl": string;
    "5xl": string;
    "6xl": string;
    "7xl": string;
    "8xl": string;
    "9xl": string;
  };
  color: {
    support: {
      error: {
        subtler: string;
        subtle: string;
        medium: string;
        strong: string;
      };
      success: {
        subtler: string;
        subtle: string;
        medium: string;
        strong: string;
      };
      warning: {
        subtler: string;
        subtle: string;
        medium: string;
        strong: string;
      };
      info: {
        subtler: string;
        subtle: string;
        medium: string;
        strong: string;
      };
    };
    focused: {
      default: string;
      inset: string;
    };
    background: {
      primary: {
        subtle: string;
        medium: string;
        strong: string;
      };
      interactive: {
        enabled: string;
        hovered: string;
        active: string;
        visited: string;
        disabled: string;
      };
      inverse: {
        subtle: string;
        medium: string;
        strong: string;
      };
      secondary: {
        subtle: string;
        medium: string;
        strong: string;
      };
      overlay: {
        subtle: string;
        medium: string;
        interactive: string;
      };
      positive: {
        subtle: string;
        medium: string;
        strong: string;
        interactive: {
          enabled: string;
        };
      };
    };
    text: {
      primary: string;
      secondary: string;
      helper: string;
      placeholder: string;
      inverse: string;
      oninteractive: string;
      interactive: {
        enabled: string;
        hovered: string;
        active: string;
        visited: string;
        disabled: string;
      };
    };
    icon: {
      primary: string;
      secondary: string;
      inverse: string;
      oninteractive: string;
      interactive: {
        enabled: string;
        hovered: string;
        active: string;
        visited: string;
        disabled: string;
      };
    };
    border: {
      subtle: string;
      medium: string;
      strong: string;
      inverse: string;
      interactive: {
        enabled: string;
        hovered: string;
        active: string;
        visited: string;
        disabled: string;
      };
      positive: {
        interactive: {
          enabled: string;
        };
        subtle: string;
        medium: string;
        strong: string;
      };
    };
  };
  typography: {
    heading: {
      h6: {
        regular: {
          font: string;
          letterSpacing: string;
        };
        medium: {
          font: string;
          letterSpacing: string;
        };
        semibold: {
          font: string;
          letterSpacing: string;
        };
      };
      h5: {
        regular: {
          font: string;
          letterSpacing: string;
        };
        medium: {
          font: string;
          letterSpacing: string;
        };
        semibold: {
          font: string;
          letterSpacing: string;
        };
      };
      h4: {
        regular: {
          font: string;
          letterSpacing: string;
        };
        medium: {
          font: string;
          letterSpacing: string;
        };
        semibold: {
          font: string;
          letterSpacing: string;
        };
      };
      h3: {
        regular: {
          font: string;
          letterSpacing: string;
        };
        medium: {
          font: string;
          letterSpacing: string;
        };
        semibold: {
          font: string;
          letterSpacing: string;
        };
      };
      h2: {
        regular: {
          font: string;
          letterSpacing: string;
        };
        medium: {
          font: string;
          letterSpacing: string;
        };
        semibold: {
          font: string;
          letterSpacing: string;
        };
      };
      h1: {
        regular: {
          font: string;
          letterSpacing: string;
        };
        medium: {
          font: string;
          letterSpacing: string;
        };
        semibold: {
          font: string;
          letterSpacing: string;
        };
      };
    };
    label: {
      sm: {
        regular: {
          font: string;
          letterSpacing: string;
        };
        medium: {
          font: string;
          letterSpacing: string;
        };
        semibold: {
          font: string;
          letterSpacing: string;
        };
      };
      md: {
        regular: {
          font: string;
          letterSpacing: string;
        };
        medium: {
          font: string;
          letterSpacing: string;
        };
        semibold: {
          font: string;
          letterSpacing: string;
        };
      };
      lg: {
        regular: {
          font: string;
          letterSpacing: string;
        };
        medium: {
          font: string;
          letterSpacing: string;
        };
        semibold: {
          font: string;
          letterSpacing: string;
        };
      };
    };
    body: {
      sm: {
        regular: {
          font: string;
          letterSpacing: string;
        };
        medium: {
          font: string;
          letterSpacing: string;
        };
        semibold: {
          font: string;
          letterSpacing: string;
        };
      };
      md: {
        regular: {
          font: string;
          letterSpacing: string;
        };
        medium: {
          font: string;
          letterSpacing: string;
        };
        semibold: {
          font: string;
          letterSpacing: string;
        };
      };
      lg: {
        regular: {
          font: string;
          letterSpacing: string;
        };
        medium: {
          font: string;
          letterSpacing: string;
        };
        semibold: {
          font: string;
          letterSpacing: string;
        };
      };
    };
  };
};

/** @inline */
declare type TimestampType = {
  url: string;
  username?: string;
  password?: string;
};

declare function toJSON(bookmark: Bookmark): Serializers.BookmarkJSON;

/**
 * Describes the properties of a Toolbar Item.
 *
 * Check out [our guides](https://www.nutrient.io/guides/web/current/customizing-the-interface/configure-the-toolbar/)
 * for more examples.
 *
 * @see {@link NutrientViewer.Instance#setToolbarItems}
 * @see {@link Configuration#toolbarItems}
 * @see {@link Configuration#toolbarPlacement}
 * @interface
 * */
export declare type ToolbarItem = Omit<ToolItem_2, 'type'> & {
  /**
   * The type of a toolbar item.
   *
   * It can either be `custom` for user defined items, `responsive-group` to combine items on smaller
   * screens, or one from the {@link NutrientViewer.defaultToolbarItems}.
   *
   * **Special types:**
   *
   * - `responsive-group` (and `annotate` as a predefined responsive group): These types can be
   * referenced by other toolbar items via the {@link ToolbarItem#responsiveGroup}
   * property. When the media query of the group matches, all referenced toolbar items will be
   * hidden and the group's icon will be shown instead. When it is clicked, it will expand into
   * the referenced toolbar items.
   *
   * **Note:** It is **not** possible to override this option for built-in toolbar items.
   *
   * @example
   * // In your JavaScript
   * const toolbarItems = NutrientViewer.defaultToolbarItems
   * toolbarItems.push({ type: 'custom', ... })
   * NutrientViewer.load({
   *   ...otherOptions,
   *   toolbarItems
   * });
   */
  type: ToolbarItemType;
  /**
   * An array of valid [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)
   * which are used to determine the visibility of an item.
   *
   * Internally media queries are managed using the [Window.matchMedia() API](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia).
   *
   * As per the [W3C Spec](https://www.w3.org/TR/css3-mediaqueries/#syntax) in many cases media
   * queries require parenthesis for example `min-width: 480px` won't work whereas
   * `(min-width: 480px)` will.
   *
   * @example
   * Overwrite the default media query for the zoom-in default button.
   * ```ts
   * const toolbarItems = NutrientViewer.defaultToolbarItems;
   * const index = toolbarItems.findIndex(item => item.type === "zoom-in");
   * toolbarItems[index]["mediaQueries"] = ["(min-width: 1000px)"];
   * instance.setToolbarItems(toolbarItems);
   * ```
   */
  mediaQueries?: string[];
  /**
   * Can be used to link multiple toolbar items to the same
   * {@link NutrientViewer.ToolbarItem#type | responsive-group}. Those items will be hidden when the
   * responsive group icon is displayed and can be seen when we click (i.e. open) the group.
   *
   * Whenever a toolbar item is active and it's responsive group is shown, the responsive group is
   * open so the active state can be seen.
   *
   * Note: It is **not** possible to override this option for built-in toolbar items.
   *
   * @example
   * const toolbarItems = [
   *   {
   *     type: "responsive-group",
   *     id: "my-group",
   *     mediaQueries: ["max-width..."],
   *     icon: "https://example.com/icon.png",
   *   },
   *   {
   *     type: "custom",
   *     id: "my-button-one",
   *     responsiveGroup: "my-group",
   *   },
   *   {
   *     type: "custom",
   *     id: "my-button-two",
   *     responsiveGroup: "my-group",
   *   },
   * ];
   */
  responsiveGroup?: string;
  /**
   * Can be used to group multiple toolbar buttons in the same
   * {@link ToolbarItem#dropdownGroup}. Only one of the buttons will be visible,
   * with a dropdown arrow to hint the user about the dropdown group.
   * When the user clicks on the arrow, the rest of the buttons will be shown vertically piled.
   *
   * The toolbar buttons that belong to a dropdown group will preserve all the properties
   * of individual toolbar buttons.
   *
   * In order to decide which toolbar item is visible, the following criteria is used:
   * - If a button is globally selected, it's rendered on top.
   * - Otherwise, the last globally selected button of the list is rendered on top.
   * - If none of those has been selected before, the first button on the dropdown group is rendered on top.
   *
   * Note: It is **not** possible to override this option for built-in toolbar items.
   *
   * @example
   * const toolbarItems = [
   *   {
   *     type: "responsive-group",
   *     id: "my-group",
   *     mediaQueries: ["(min-width: 980px)"],
   *     icon: "https://example.com/icon.png",
   *   },
   *   {
   *     type: "custom",
   *     id: "my-button-one",
   *     responsiveGroup: "my-group",
   *     dropdownGroup: "my-dropdown-group",
   *   },
   *   {
   *     type: "custom",
   *     id: "my-button-two",
   *     dropdownGroup: "my-dropdown-group",
   *   },
   * ];
   */
  dropdownGroup?: string;
  /**
   * Annotation preset for annotations. It will be passed to the `onPress` event handler in the third argument.
   */
  preset?: AnnotationPresetID;
  onKeyPress?: (...args: Args) => void;
};

declare type ToolbarItem_2 = ToolbarItem;

declare function ToolbarItemsMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Returns a deep copy of the latest toolbar items. This value changes whenever the user
     * interacts with NutrientViewer or whenever {@link Instance#setToolbarItems} is called.
     *
     * Mutating this array will have no effect.
     */
    readonly toolbarItems: any[];
    /**
     * This method is used to update the main toolbar items of the PDF editor.
     * It makes it possible to add new {@link ToolbarItem | items} and edit or remove existing ones.
     *
     * When you pass in an `array` of {@link ToolbarItem}, the current items will be immediately
     * updated. Calling this method is also idempotent.
     *
     * If you pass in a function, it will be immediately invoked and will receive the current
     * `array` of {@link ToolbarItem} as argument. You can use this to modify the list based on its
     * current value. This type of update is guaranteed to be atomic - the value of `currentToolbarItems`
     * can't change in between.
     *
     * When one of the supplied {@link ToolbarItem} is invalid, this method will throw an {@link Error} that contains a detailed error message.
     *
     * Since `items` is a regular JavaScript `Array` of object literals it can be manipulated using
     * standard array methods like `forEach`, `map`, `reduce`, `splice` and so on.
     * Additionally you can use any 3rd party library for array manipulation like {@link https://lodash.com|lodash}
     * or {@link http://anguscroll.com/just|just}.
     *
     * @example
     * Reverse the order of the toolbar items
     * ```ts
     * const items = instance.toolbarItems;
     * items.reverse();
     * instance.setToolbarItems(newState);
     * ```
     *
     * @example
     * Use ES2015 arrow functions and the update callback to reduce boilerplate
     * ```ts
     * instance.setToolbarItems(items => items.reverse());
     * ```
     *
     * @example
     * The new changes will be applied immediately
     * ```ts
     * instance.setToolbarItems(newItems);
     * instance.toolbarItems === newItems; // => true
     * ```
     *
     * @example
     * Adding a button that's always visible on the right hand side of the `zoom-in` button.
     * ```ts
     * const myButton = {
     *   type: "custom",
     *   id: "my-button",
     *   title: "Test Button",
     *   icon: "https://example.com/icon.jpg",
     *   onPress() {
     *     alert("test");
     *   }
     *   // mediaQueries is not defined so it will always be shown
     * };
     * instance.setToolbarItems(items => {
     *   items.forEach((item, index) => {
     *     if (item.name === "spacer") {
     *       items.splice(index + 1, 0,  myButton);
     *     }
     *   });
     *   return items;
     * });
     * ```
     *
     * @example
     * Changing a property of a custom button
     * ```ts
     * const myButton = {
     *   type: "custom",
     *   id: "my-button",
     *   title: "Test Button",
     *   icon: "https://example.com/icon.jpg",
     *   disabled: true,
     *   onPress() {
     *     alert("test");
     *   },
     * };
     *
     * NutrientViewer.load({
     *   toolbarItems: [...NutrientViewer.defaultToolbarItems, myButton],
     *   // ...
     * }).then(instance => {
     *   instance.setToolbarItems(items =>
     *     items.map(item => {
     *       if (item.id === "my-button") {
     *         item.disabled = false;
     *       }
     *       return item;
     *     })
     *   );
     * });
     * ```
     *
     * @throws {Error} Will throw an error when the supplied items `array` is not valid.
     * @param toolbarItemsOrFunction - a new `array` of ToolbarItems which would overwrite the existing one, or a callback that will get
     *   invoked with the current toolbar items and is expected to return the new `array` of items.
     */
    setToolbarItems(toolbarItemsOrFunction: ToolbarItem_2[] | SetToolbarFunction): void;
    /**
     * You can use this callback to set/modify the toolbar items present in the annotation toolbar
     * after the document has loaded.
     *
     * The callback will receive the
     * annotation which is being created or selected and based on it, you can have different annotation
     * toolbars for different annotations.
     *
     * You can do the following modifications using this API:
     *
     * - Add new annotation toolbar items
     * - Remove existing annotation toolbar items
     * - Change the order of the existing annotation toolbar items
     * - Modify selected properties of the annotation toolbar items
     *
     * You can also use the `hasDesktopLayout` to determine if the current UI is being rendered on
     * mobile or desktop. Based on that, you can implement different designs for Desktop and Mobile.
     *
     * This callback gets called every time the annotation toolbar is mounted.
     *
     * @example
     * Add a new annotation toolbar item
     * ```ts
     * instance.setAnnotationToolbarItems((annotation, { defaultAnnotationToolbarItems, hasDesktopLayout }) => {
     *     const node = document.createElement('node')
     *     node.innerText = "Custom Item"
     *
     *     const icon = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>`
     *
     *     return [{
     *       id: "custom",
     *       type: "custom",
     *       node: node,
     *       icon: icon,
     *       className: 'Custom-Node',
     *       onPress: () => alert("Custom item pressed!")
     *     }, ...defaultAnnotationToolbarItems];
     *   });
     * ```
     */
    setAnnotationToolbarItems(annotationToolbarItemsCallback: AnnotationToolbarItemsCallback): void;

  };
} & T;

declare type ToolbarItemType = ToolItemType | (typeof allowedToolbarTypes)[number];

/**
 * Configure where the toolbar is placed.
 *
 * @enum
 */
declare const ToolbarPlacement: {
  /** The default value. The toolbar will be placed at the top of the viewport. */
  readonly TOP: "TOP";
  /** The toolbar will be placed at the bottom of the viewport. */
  readonly BOTTOM: "BOTTOM";
};

export declare type ToolItem = ToolItem_2;

/**
 * Describes the properties of a Tool Item.
 *
 * Tool items are standalone tools that can be used in different part of NutrientViewer's UI
 * such as annotation tooltips.
 *
 * @see {@link Configuration#annotationTooltipCallback}
 * @inline
 */
declare type ToolItem_2 = {
  /**
   * ***required***
   *
   * The type of a tool item.
   *
   * At the moment the only supported type is `custom`.
   *
   * @example
   * // In your JavaScript
   * const item = { type: 'custom', ... }
   */
  type: ToolItemType;
  /**
   * Optionally `custom` tool items can define a DOM node.
   * NutrientViewer renders this node instead of a standard tool button.
   *
   * In this case the tool item is rendered inside of a container
   * which gets the `title` and `className` attributes set.
   *
   * The `icon` property is ignored.
   * The `selected` and `disabled` are used just to toggle the
   * PSPDFKit-Tool-Node-active and PSPDFKit-Tool-Node-disabled
   * class names but making the node effectively selected or disabled is up to
   * the implementation of the item.
   *
   * The `onPress` event is registered and fires any time the item is either clicked
   * or selected with keyboard (if part of a `dropdownGroup`).
   */
  node?: Node;
  /**
   * Unique identifier for the item.
   *
   * This is useful to identify items whose `type` is `custom`.
   * Note: It is ***not*** possible to override this option for built-in toolbar items.
   *
   * @example
   * // In your JavaScript
   * const item = { type: 'custom', id: 'my-button', ... }
   */
  id?: string;
  /**
   * Title for the tool items.
   *
   * It is shown on hover or when the item doesn't have an icon.
   */
  title?: string;
  /**
   * Useful to set a custom CSS class name on the parent. The class is applied based on the following logic:
   *
   * - For built-in toolbar items, the`className` is appended to the default item ones.
   * - For custom items, it is applied to the parent of the `node` you passed.
   * - For custom items, the icon's parent gets the same classname with an `-Icon` suffix.
   *
   * For eg: If you have passed a custom item with an icon, the icon's parent will get the classname `my-custom-item-Icon` if you passed
   * the classname as `my-custom-item`.
   *
   * For {@link NutrientViewer.defaultToolbarItems | default items} the`className` is appended to the default
   * item ones.
   */
  className?: string;
  /**
   * Icon for the item.
   *
   * The icon should either be an URL, a base64 encoded image or the HTML for an inline SVG.
   */
  icon?: string;
  /**
   * Callback to invoke when the item is clicked or tapped (on touch devices). It gets the `event` as
   * first argument, the `id` of the tool item as the second.
   */
  onPress?: IFunction;
  /**
   * Whether a custom item is selected or not.
   */
  selected?: boolean;
  /**
   * Whether the item is disabled or not.
   *
   * The property can be used to force a built in toolbar item to be
   * disabled by setting it to `true`.
   */
  disabled?: boolean;
};

/** @inline */
declare type ToolItemType = 'custom';

/**
 * Matrix for affine 2D transformations.
 *
 * Layout:
 *
 *             // The values represent:
 *   | a c e | // - (a,b) the x base vector
 *   | b d f | // - (c,d) the y base vector
 *   | 0 0 1 | // - (e,f) the origin
 *             // of the resulting coordinate system.
 *
 * The third row is always [0 0 1], thus we don't store the values.
 */
export declare class TransformationMatrix extends TransformationMatrix_base {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
  static defaultValues: IObject;
  static IDENTITY: TransformationMatrix;
  /**
   * Applies a translation to the matrix
   *
   *          | 1 0 tx |
   * M' = M * | 0 1 ty |
   *          | 0 0  1 |
   */
  translate({ x: tx, y: ty


  }: {x: number;y: number;}): TransformationMatrix;
  translateX(tx: number): TransformationMatrix;
  translateY(ty: number): TransformationMatrix;
  /**
   * Applies a scaling to the matrix. If only sx is set and sy is undefined,
   * we will scale x and y by sx.
   *
   * A scale of `1` does not modify a dimension.
   *
   *          | sx  0  0 |
   * M' = M * |  0 sy  0 |
   *          |  0  0  1 |
   */
  scale(sx: number, sy?: number): TransformationMatrix;
  /**
   * Multiplies current matrix values with a new transformation matrix.
   *
   * The transformation will be applied on the left side of the multiplication,
   * so that they are applied in the order `transform()` is called.
   *
   * | a' c' e' |   | a2 c2 e2 |   | a c e |
   * | b' d' f' | = | b2 d2 f2 | * | b d f |
   * | 0  0  1  |   | 0  0  1  |   | 0 0 1 |
   */
  transform(a2: number, b2: number, c2: number, d2: number, e2: number, f2: number): TransformationMatrix;
  /**
   * Rotates the matrix by `deg` degrees in the xy-plane clockwise about the origin of the
   * Cartesian coordinate system.
   */
  rotate(degCW: number): TransformationMatrix;
  /**
   * Rotates the matrix by `rad` radian in the xy-plane clockwise about the origin of the
   * Cartesian coordinate system.
   */
  rotateRad(a: number): TransformationMatrix;
  /**
   * Calculates the inverse matrix. This requires the determinant to be != 0, which is
   * always granted since the matrix can only hold affine transformations (all affine
   * transformations are easily invertible).
   *
   * We exploit the fact that the matrix is affine to speed things up.
   */
  inverse(): TransformationMatrix;
  /**
   * Returns the matrix's values as a CSS transform string.
   */
  toCssValue(): string;
  /**
   * Multiplies the point with the matrix to apply the transformation.
   * Transforming a "point" means also applying any translation from the matrix.
   *
   * | x'|   | a c e |   | x |
   * | y'| = | b d f | * | y |
   * | 1 |   | 0 0 1 |   | 1 |
   */
  applyToPoint([x, y]: [number, number]): [number, number];
  /**
   * Multiplies the vector with the matrix to apply the transformation.
   * Transforming a "vector" does ignore the translation of the matrix.
   *
   * | x'|   | a c e |   | x |
   * | y'| = | b d f | * | y |
   * | 0 |   | 0 0 1 |   | 0 |
   */
  applyToVector([x, y]: [number, number]): [number, number];
}

declare const TransformationMatrix_base: Record_2.Factory<{
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}>;

declare interface UI {
  /**
   * Replace the entire comment thread component UI with a custom implementation by passing a function.
   * Or customize it partly by passing an object configuration.
   *
   * The UI customization function is invoked when the SDK is ready to render a comment thread.
   */
  commentThread?: CommentThreadUIConfig;
  /**
   * UI Customization for custom sidebars.
   * Use this to render a custom sidebar by passing a function.
   */
  sidebar?: SidebarUI;
}

declare const UI_2: Record<string, any>;

/**
 * Indicates which UI element certain JavaScript `Date` instance will be rendered in.
 * Used as part of {@link Configuration#dateTimeString}.
 *
 * @enum
 */
declare const UIDateTimeElement: {
  /** Comment thread. */
  readonly COMMENT_THREAD: "COMMENT_THREAD";
  /** Annotations sidebar. */
  readonly ANNOTATIONS_SIDEBAR: "ANNOTATIONS_SIDEBAR";
};

/**
 * Customizable user interface element.
 *
 * @enum
 */
declare const UIElement: {
  /** Sidebar element. */
  readonly Sidebar: "Sidebar";
};

/**
 * A factory function that creates a UI customization slot.
 * It can receive instance and an id, returning a slot object with lifecycle methods.
 */
declare type UIFactory<Params> = (instance: Instance | null, id: string) => Slot<Params>;

declare type UIRendererConfiguration = {
  node: Node;
  onRenderItem?: ItemCustomRenderer;
};

/**
 * @class
 * An underline markup annotation. Please refer to {@link NutrientViewer.Annotations.MarkupAnnotation} for
 * more information.
 *
 * <center>
 *   <img title="Example of all markup annotation types" src="img/annotations/markup_annotations.png" width="450" class="shadow">
 * </center>
 * @example <caption>Create a underline annotation</caption>
 * const rects = NutrientViewer.Immutable.List([
 *   new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 200, height: 10 }),
 *   new NutrientViewer.Geometry.Rect({ left: 10, top: 25, width: 200, height: 10 })
 * ]);
 * const annotation = new NutrientViewer.Annotations.UnderlineAnnotation({
 *   pageIndex: 0,
 *   rects: rects,
 *   boundingBox: NutrientViewer.Geometry.Rect.union(rects)
 * });
 *
 * @summary Underline markup annotation.
 */
export declare class UnderlineAnnotation<T extends IUnderlineAnnotation = IUnderlineAnnotation> extends TextMarkupAnnotation<T> {
  static className: string;
  static readableName: string;
}

/**
 * @class
 * Unknown or unsupported annotation. This can happen when we extract annotations from a PDF
 * document that are not supported on Nutrient Web SDK yet.
 *
 * Previously unsupported annotations can change to a new annotation type in a future release. More
 * detail in the appropriate change log entry.
 *
 * Nutrient Web SDK will attempt to render these annotations, but they cannot be modified, only deleted.
 * @public
 * @summary Unknown or unsupported annotation type.
 */
export declare class UnknownAnnotation extends Annotation {}


/**
 * @deprecated Use {@link Serializers.UnknownAnnotationJSON} instead.
 * @hidden
 */
export declare type UnknownAnnotationJSON = Serializers.UnknownAnnotationJSON;

/**
 * Unknown annotations are used when we discover an annotation type during deserializing that we
 * don't know. It may have its type set to "pspdfkit/unknown" when provided by Core.
 */
declare class UnknownAnnotationSerializer extends AnnotationSerializer {
  annotation: UnknownAnnotation;
  constructor(annotation: UnknownAnnotation);
  toJSON(): Serializers.UnknownAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<Serializers.UnknownAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): UnknownAnnotation;
}

/**
 * Unloads an existing NutrientViewer instance.
 *
 * It requires an `target` parameter that is a CSS selector, an HTMLElement or
 * the reference to a {@link NutrientViewer.Instance} returned by {@link NutrientViewer.load}.
 *
 * @example <caption>Unload Nutrient Web SDK using an instance</caption>
 * let instance = null;
 * NutrientViewer.load({
 *   document: "/sales-report.pdf",
 *   container: ".foo",
 * }).then((i) => {
 *   instance = i
 * })
 * .then(() => {
 *   // Unload the given instance
 *   NutrientViewer.unload(instance)
 * }).catch((error) => {
 *   console.error(error.message);
 * })
 *
 * @example <caption>Unload Nutrient Web SDK using a CSS selector</caption>
 * NutrientViewer.load({
 *   document: "/sales-report.pdf",
 *   container: ".foo",
 * })
 * .then(() => {
 *   // Unload the given instance
 *   NutrientViewer.unload(".foo")
 * })
 *
 * @example <caption>Unload Nutrient Web SDK using an HTMLElement</caption>
 * NutrientViewer.load({
 *   document: "/sales-report.pdf",
 *   container: ".foo",
 * })
 * .then(() => {
 *   // Unload the given instance
 *   NutrientViewer.unload(document.querySelector(".foo"))
 * })
 *
 * @public
 * @param target - A target to unload
 * @returns When true, an instance of Nutrient Web SDK was unmounted.
 * @throws {NutrientViewer.Error} Will throw an error when the `target` is invalid but
 *   will work when it does not have a mounted Nutrient Web SDK instance.
 */
declare function unload(target: string | HTMLElement | Instance | null): boolean;

/**
 * Annotation preset deserializer. Converts an annotation preset object to a {@link AnnotationPreset}.
 *
 * @param presetJSON - Serialized annotation preset to rebuild.
 */
declare function unserializePreset(presetJSON: Record<string, any>): AnnotationPreset;

/**
 * Returns a copy of the collection with the value at key set to the result of
 * providing the existing value to the updating function.
 *
 * A functional alternative to `collection.update(key, fn)` which will also
 * work with plain Objects and Arrays as an alternative for
 * `collectionCopy[key] = fn(collection[key])`.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { update } = require('immutable')
 * const originalArray = [ 'dog', 'frog', 'cat' ]
 * update(originalArray, 1, val => val.toUpperCase()) // [ 'dog', 'FROG', 'cat' ]
 * console.log(originalArray) // [ 'dog', 'frog', 'cat' ]
 * const originalObject = { x: 123, y: 456 }
 * update(originalObject, 'x', val => val * 6) // { x: 738, y: 456 }
 * console.log(originalObject) // { x: 123, y: 456 }
 * ```
 */
declare function update<K, V, C extends Collection<K, V>>(collection: C, key: K, updater: (value: V) => V): C;

declare function update<K, V, C extends Collection<K, V>, NSV>(collection: C, key: K, notSetValue: NSV, updater: (value: V | NSV) => V): C;

declare function update<TProps extends Object, C extends Record_2<TProps>, K extends keyof TProps>(record: C, key: K, updater: (value: TProps[K]) => TProps[K]): C;

declare function update<TProps extends Object, C extends Record_2<TProps>, K extends keyof TProps, NSV>(record: C, key: K, notSetValue: NSV, updater: (value: TProps[K] | NSV) => TProps[K]): C;

declare function update<V>(collection: Array<V>, key: number, updater: (value: V) => V): Array<V>;

declare function update<V, NSV>(collection: Array<V>, key: number, notSetValue: NSV, updater: (value: V | NSV) => V): Array<V>;

declare function update<C, K extends keyof C>(object: C, key: K, updater: (value: C[K]) => C[K]): C;

declare function update<C, K extends keyof C, NSV>(object: C, key: K, notSetValue: NSV, updater: (value: C[K] | NSV) => C[K]): C;

declare function update<V, C extends {[key: string]: V;}, K extends keyof C>(collection: C, key: K, updater: (value: V) => V): {[key: string]: V;};

declare function update<V, C extends {[key: string]: V;}, K extends keyof C, NSV>(collection: C, key: K, notSetValue: NSV, updater: (value: V | NSV) => V): {[key: string]: V;};

/**
 * Returns a copy of the collection with the value at key path set to the
 * result of providing the existing value to the updating function.
 *
 * A functional alternative to `collection.updateIn(keypath)` which will also
 * work with plain Objects and Arrays.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { updateIn } = require('immutable')
 * const original = { x: { y: { z: 123 }}}
 * updateIn(original, ['x', 'y', 'z'], val => val * 6) // { x: { y: { z: 738 }}}
 * console.log(original) // { x: { y: { z: 123 }}}
 * ```
 */
declare function updateIn<C>(collection: C, keyPath: Iterable<any>, updater: (value: any) => any): C;

declare function updateIn<C>(collection: C, keyPath: Iterable<any>, notSetValue: any, updater: (value: any) => any): C;

/**
 * @class
 * PDF action resolve a uniform resource identifier (web link).
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record | Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `action.set("uri", "https://www.nutrient.io");`.
 *
 * A URI action contains an URI. When executing this annotation, we use `window.open` to create a
 * new browser tab. We also clear the opener as a security measurement to avoid the target page to
 * have access to your PDF state.
 *
 * ```js
 * const newWindow = window.open(action.uri, "_blank");
 * newWindow.opener = null;
 * ```
 *
 * Learn more about the security problems when using `_blank` in [this article from JitBit](https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/).
 *
 * Please refer to the individual browser documentations for a lists of supported URI protocols. The
 * most used protocols (`http`, `https` and `mailto`) are supported in all [supported browsers](https://www.nutrient.io/guides/web/current/pspdfkit-for-web/browser-support/).
 * @example
 * Create a new URIAction
 * ```ts
 * const action = new NutrientViewer.Actions.URIAction({ uri: "https://www.nutrient.io" });
 * ```
 *
 * @summary Resolve a uniform resource identifier (web link).
 */
export declare class URIAction extends Action {
  /**
   * The uniform resource identifier (web link) that should be resolved when triggering this action.
   */
  uri: string;
  constructor(args?: IURIAction);
}

/**
 * The interface to fulfill to qualify as a Value Object.
 */
declare interface ValueObject {
  /**
   * True if this and the other Collection have value equality, as defined
   * by `Immutable.is()`.
   *
   * Note: This is equivalent to `Immutable.is(this, other)`, but provided to
   * allow for chained expressions.
   */
  equals(other: any): boolean;

  /**
   * Computes and returns the hashed identity for this Collection.
   *
   * The `hashCode` of a Collection is used to determine potential equality,
   * and is used when adding this to a `Set` or as a key in a `Map`, enabling
   * lookup via a different instance.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List, Set } = require('immutable');
   * const a = List([ 1, 2, 3 ]);
   * const b = List([ 1, 2, 3 ]);
   * assert.notStrictEqual(a, b); // different instances
   * const set = Set([ a ]);
   * assert.equal(set.has(b), true);
   * ```
   *
   * Note: hashCode() MUST return a Uint32 number. The easiest way to
   * guarantee this is to return `myHash | 0` from a custom implementation.
   *
   * If two values have the same `hashCode`, they are [not guaranteed
   * to be equal][Hash Collision]. If two values have different `hashCode`s,
   * they must not be equal.
   *
   * Note: `hashCode()` is not guaranteed to always be called before
   * `equals()`. Most but not all Immutable.js collections use hash codes to
   * organize their internal data structures, while all Immutable.js
   * collections use equality during lookups.
   *
   * [Hash Collision]: http://en.wikipedia.org/wiki/Collision_(computer_science)
   */
  hashCode(): number;
}

/**
 * Returns the framework version (e.g. "2019.4.0").
 */
declare const version: string;

/** @inline */
declare class ViewportPadding extends ViewportPadding_base {}


declare const ViewportPadding_base: Record_2.Factory<ViewportPaddingProps>;

/**
 * The ViewportPadding object represents the padding
 * that should be applied to the viewport with
 * {@link NutrientViewer.ViewState#viewportPadding}.
 *
 * Horizontal and Vertical padding defaults to zero.
 *
 * @inline
 */
declare interface ViewportPaddingProps {
  /** The horizontal padding for left and right in pixel. */
  horizontal: number;
  /** The vertical padding for top and bottom in pixel. */
  vertical: number;
}

/**
 * The `ViewState` holds information about the current UI representation of a specific document.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record | Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `viewState.set("showToolbar", false)`.
 *
 * An initial `ViewState` can be set in {@link Configuration}.
 *
 * Because the `ViewState` is an immutable data type, you must use {@link Instance#setViewState}
 * on the {@link Instance} to update it.
 *
 * To be notified when NutrientViewer updates the `ViewState`, you can use the dedicated
 * {@link NutrientViewer.EventName.VIEW_STATE_CHANGE | "viewState.change"}.
 *
 * The following examples show you how to update the `ViewState` and how to get notified about
 * `ViewState` changes:
 *
 * @example
 * Adding a listener for the {@link NutrientViewer.EventName.VIEW_STATE_CHANGE | "viewState.change"} event
 * ```ts
 * instance.addEventListener("viewState.change", (viewState) => {
 *   console.log(viewState.toJS());
 * });
 * ```
 *
 * @example
 * Update values for the immutable state object using {@link NutrientViewer.Instance#setViewState}
 * ```ts
 * const state = instance.viewState;
 * const newState = state.set("currentPageIndex", 2);
 * instance.setViewState(newState);
 * ```
 *
 * @summary The current UI state of a document instance.
 * @see {@link Configuration#initialViewState}
 * @see {@link NutrientViewer.Instance#setViewState}
 * @see {@link NutrientViewer.EventName.VIEW_STATE_CHANGE}
 * @see {@link NutrientViewer.EventName.VIEW_STATE_CURRENT_PAGE_INDEX_CHANGE}
 * @see {@link NutrientViewer.EventName.VIEW_STATE_ZOOM_CHANGE}
 */
export declare class ViewState extends ViewState_base {
  /**
   * Creates a new {@link ViewState} with a specific zoom level that is 25% greater than
   * the current zoom level.
   *
   * If a {@link ZoomMode} is set, it will overwrite it with a number value (which will no
   * longer adopt when you resize the window).
   *
   * This method cannot be called on an instance of {@link ViewState} without an
   * {@link Instance} assigned. You can use this method on all view states returned by
   * {@link Instance#viewState} and {@link Instance#setViewState}.
   *
   * When the new zoom level would exceed the maximum zoom level, it will be capped at the maximum
   * value.
   *
   * @example
   *   instance.setViewState(viewState => viewState.zoomIn())
   *
   * @returns New {@link ViewState} with an updated `zoom` property.
   * @throws {NutrientViewer.Error} When this method is called on a self-constructed instance of
   *   {@link ViewState}.
   */
  zoomIn(): ViewState;
  /**
   * Creates a new {@link ViewState} with a specific zoom level that is 25% lower than
   * the current zoom level.
   *
   * If a {@link ZoomMode} is set, it will overwrite it with a number value (which will no
   * longer adopt when you resize the window).
   *
   * This method cannot be called on an instance of {@link ViewState} without an
   * {@link Instance} assigned. You can use this method on all view states returned by
   * {@link Instance#viewState} and {@link Instance#setViewState}.
   *
   * When the new zoom level would undercut the minimum zoom level, it will be capped at the minimum
   * value.
   *
   * @example
   *   instance.setViewState(viewState => viewState.zoomOut())
   *
   * @returns New {@link ViewState} with an updated `zoom` property.
   * @throws {Error} When this method is called on a self-constructed instance of
   *   {@link ViewState}.
   */
  zoomOut(): ViewState;
  /**
   * Creates a new {@link ViewState} where all pages are rotated by 90° counterclockwise.
   *
   * @example
   *   instance.setViewState(viewState => viewState.rotateLeft())
   *
   * @returns New {@link ViewState} with an updated `pagesRotation` property.
   */
  rotateLeft(): ViewState;
  /**
   * Creates a new {@link ViewState} where all pages are rotated by 90° clockwise.
   *
   * @example
   *   instance.setViewState(viewState => viewState.rotateRight())
   *
   * @returns New {@link ViewState} with an updated `pagesRotation` property.
   */
  rotateRight(): ViewState;
  /**
   * Creates a new {@link ViewState} with a `currentPageIndex` increased by one.
   *
   * This method cannot be called on an instance of {@link ViewState} without an
   * {@link Instance} assigned. You can use this method on all view states returned by
   * {@link Instance#viewState} and {@link Instance#setViewState}.
   *
   * When you hit `{@link Instance#totalPageCount} - 1`, it will not update the state.
   *
   * @example
   *   instance.setViewState(viewState => viewState.goToNextPage());
   *
   * @returns New {@link ViewState} with an updated `zoom` property.
   * @throws {Error} When this method is called on a self-constructed instance of
   *   {@link ViewState}.
   */
  goToNextPage(): ViewState;
  /**
   *
   *Creates a new {@link ViewState} with a `currentPageIndex` decreased by one.
   *
   *When you hit `0`, it will not update the state.
   *
   * @example
   *   instance.setViewState(viewState => viewState.goToPreviousPage());
   *
   * @returns New {@link ViewState} with an updated `zoom` property.
   * @throws {Error} When this method is called on a self-constructed instance of
   *   {@link ViewState}.
   */
  goToPreviousPage(): ViewState;
  /** @inline */
  constructor(props?: Partial<IViewState>);
}

declare const ViewState_base: Record_2.Factory<IViewState>;

/**
 *
 * Merges the properties extracted from the location.hash into the {@link NutrientViewer.ViewState}.
 *
 * Properties will be extracted following the [PDF Open Parameters spec](https://www.adobe.com/content/dam/acom/en/devnet/acrobat/pdfs/PDFOpenParameters.pdf).
 *
 * Currently, we only support the `page` parameter.
 */
declare function viewStateFromOpenParameters(viewState: ViewState, hash?: string | null | undefined): ViewState;

declare function ViewStateMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {

    /**
     * Returns the latest view state. This value changes whenever the user interacts with
     * NutrientViewer or whenever {@link Instance#setViewState} is called.
     *
     * When you want to keep a reference to the latest view state, you should always listen on the
     * {@link NutrientViewer.EventName.VIEW_STATE_CHANGE | "viewState.change"} to update your reference.
     */
    readonly viewState: ViewState;
    /**
     * This method is used to update the UI state of the PDF editor.
     *
     * When you pass in a {@link ViewState}, the current state will be immediately
     * overwritten. Calling this method is also idempotent.
     *
     * If you pass in a function, it will be immediately invoked and will receive the current
     * {@link ViewState} as a property. You can use this to change state based on the
     * current value. This type of update is guaranteed to be atomic - the value of `currentState`
     * can't change in between.
     *
     * Be aware that this behavior is different from a React component's `setState`, because
     * it will not be deferred but initially applied. If you want to, you can always add deferring
     * behavior yourself. The approach we choose (immediate applying) makes it possible to control
     * exactly when the changes are flushed, which will allow fine control to work with other
     * frameworks (e.g. runloop-based frameworks like Ember).
     *
     * Whenever this method is called (and actually changes the view state), the instance
     * will trigger an {@link NutrientViewer.EventName.VIEW_STATE_CHANGE | "viewState.change"}. However, if you use this
     * method to change properties of the view state at once (e.g. zooming and currentPageIndex at
     * the same time), the {@link NutrientViewer.EventName.VIEW_STATE_CHANGE | "viewState.change"} will only be triggered
     * once. The {@link NutrientViewer.EventName.VIEW_STATE_CHANGE | "viewState.change"} will be triggered synchronously,
     * that means that the code will be called before this function exits. This is true for both
     * passing in the state directly and passing in an update function.
     *
     * When the supplied {@link ViewState} is invalid, this method will throw an
     * {@link Error} that contains a detailed error message.
     *
     * @example
     * Update values for the immutable state object
     * ```ts
     * const state = instance.viewState;
     * const newState = state.set("currentPageIndex", 2);
     * instance.setViewState(newState);
     * ```
     *
     * @example
     * Use ES2015 arrow functions and the update callback to reduce boilerplate
     * ```ts
     * instance.setViewState(state => state.set("currentPageIndex", 2));
     * ```
     *
     * @example
     * The state will be applied immediately
     * ```ts
     * instance.setViewState(newState);
     * instance.viewState === newState; // => true
     * ```
     *
     * @example
     * When the state is invalid, it will throw a {@link NutrientViewer.Error}
     * ```ts
     * try {
     *   // Non existing page index
     *   instance.setViewState(state => state.set("currentPageIndex", 2000));
     * } catch (error) {
     *   error.message; // => "The currentPageIndex set on the new ViewState is out of bounds.
     *                  //     The index is expected to be in the range from 0 to 5 (inclusive)"
     * }
     * ```
     *
     * @throws {Error} Will throw an error when the supplied state is not valid.
     * @param stateOrFunction - Either a
     *   new ViewState which would overwrite the existing one, or a callback that will get
     *   invoked with the current view state and is expected to return the new state.
     */
    setViewState(stateOrFunction: ViewState | ((currentState: ViewState) => ViewState)): void;

  };
} & T;

/**
 * A specific zoom configuration that will always be applied whenever the viewport is resized.
 *
 * @enum
 */
declare const WheelZoomMode: {
  /**
   * Default behavior: Zoom when Ctrl + scroll wheel
   */
  readonly WITH_CTRL: "WITH_CTRL";
  /**
   * Always zoom on scroll wheel, no Ctrl key press needed
   */
  readonly ALWAYS: "ALWAYS";
  /**
   * Zooming via scroll wheel is disabled completely,
   * irregardless of which key is pressed
   */
  readonly DISABLED: "DISABLED";
};

declare type WidgetActionTriggerEventType = Omit<ActionTriggerEventType, 'onPageOpen'> | 'onFocus' | 'onBlur';

/**
 * @class
 * Widget annotations are part of PDF forms and used to position form elements,
 * linked to {@link NutrientViewer.FormFields.FormField}s, on a page. To know how a
 * widget is rendered also depends on the linked form field. Widget annotations
 * may only be created or modified if the Form Creator component is present in
 * the license.
 * @summary Draw form elements, linked to {@link NutrientViewer.FormFields.FormField}s, on a page.
 */
export declare class WidgetAnnotation extends Annotation<IWidgetAnnotation> {
  /**
   * The {@link NutrientViewer.FormFields.FormField#name} of the linked form field.
   * Based on the type of the field, a different element will be rendered
   */
  formFieldName: string;
  /**
   * Optional border color that will be drawn at the border of the bounding box.
   *
   * @default null
   */
  borderColor: null | Color;
  /**
   * Optional border style used for the border of the bounding box. Valid options
   * are:
   *
   * - `solid`
   * - `dashed`
   * - `beveled`
   * - `inset`
   * - `underline`
   *
   * @default null
   */
  borderStyle: null | IBorderStyle;
  /**
   * Optional dash pattern used to draw the border for dashed border style.
   */
  borderDashArray: null | number[];
  /**
   * Optional border width in PDF pixels, that will be used for the border of the
   * bounding box.
   *
   * @default null
   */
  borderWidth: null | number;
  /**
   * Optional background color that will fill the bounding box.
   *
   * @default null
   */
  backgroundColor: null | Color;
  /**
   * Optional font size in page size pixels.
   *
   * @default null
   */
  fontSize: null | FontSize;
  /**
   * The name of the font family that should be used.
   *
   * Fonts are client specific and determined during runtime. If a font is not found, we will
   * automatically fall back to 'sans-serif'.
   *
   * We test the following list at runtime. The first available font will be used as the default
   * for all new widget annotations: Helvetica, Arial, Calibri, Century Gothic, Consolas, Courier,
   * Dejavu Sans, Dejavu Serif, Georgia, Gill Sans, Impact, Lucida Sans, Myriad Pro, Open Sans,
   * Palatino, Tahoma, Times New Roman, Trebuchet, Verdana, Zapfino, Comic Sans.
   *
   * If the browser does not natively support the font, it's still possible to support it by
   * providing the required font data using {@link Configuration#styleSheets | a custom stylesheet}.
   *
   * @default null
   */
  font: null | string;
  /**
   * Optional font color.
   *
   * @default null
   */
  fontColor: null | Color;
  /**
   * If `true`, the font will be **bold** if the font family supports this.
   *
   * @default false
   */
  isBold: boolean;
  /**
   * If `true`, the font will be _italic_ if the font family supports this.
   *
   * @default false
   */
  isItalic: boolean;
  /**
   * Optional horizontal text alignment.
   *
   * @default left
   */
  horizontalAlign: 'left' | 'center' | 'right' | null;
  /**
   * Optional vertical text alignment.
   *
   * @default null
   */
  verticalAlign: 'top' | 'center' | 'bottom' | null;
  /**
   * Optional actions to execute when an event is triggered.
   *
   * @example <caption>Adding an {@link NutrientViewer.Actions.JavaScriptAction} when the annotation is focused:</caption>
   * const widget = new NutrientViewer.Annotations.WidgetAnnotation({
   *   id: NutrientViewer.generateInstantId(),
   *   pageIndex: 0,
   *   formFieldName: "MyFormField",
   *   boundingBox: new NutrientViewer.Geometry.Rect({
   *     left: 100,
   *     top: 75,
   *     width: 200,
   *     height: 80
   *   }),
   *   additionalActions: {
   *     onFocus: new NutrientViewer.Actions.JavaScriptAction({
   *       script: "alert('onFocus')"
   *     })
   *   }
   * });
   *
   * const form = new NutrientViewer.FormFields.TextFormField({
   *     name: "MyFormField",
   *     annotationIds: new NutrientViewer.Immutable.List([annotation.id]),
   *     value: "Text shown in the form field"
   * });
   *
   * instance.create([widget, form])
   *
   * @default null
   */
  additionalActions: null | WidgetAnnotationAdditionalActionsType;
  /**
   * The counter-clockwise rotation value in degree relative to the rotated PDF page. Inserting an
   * annotation with a rotation value of `0` will make it appear in the same direction as the UI
   * appears, when no {@link NutrientViewer.ViewState#pagesRotation} is set.
   *
   * Can either be 0°, 90°, 180°, or 270°. Multiple or negative values are normalized to this
   * interval.
   *
   * Note: Due to browser constraints, the rotation property is currently reset once the edit mode
   * is enabled via the user interface.
   *
   * @default 0
   */
  rotation: number;
  action: null | Action;
  /**
   * This property is used to define the permission scope for this widget annotation.
   * If you want to change the `group`, you should update the `group` property of the corresponding form field.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   */
  group: string;
  static readableName: string;
}

/** @inline */
declare type WidgetAnnotationAdditionalActionsType = {
  /**
   * Execute an action when the widget is focused.
   *
   * The name of this event in the PDF spec is `Fo`.
   */
  onFocus?: JavaScriptAction;
  /**
   * Execute an action when the widget loses focus.
   *
   * The name of this event in the PDF spec is `Bl`.
   */
  onBlur?: JavaScriptAction;
  /**
   * Action to be performed when the user changes the value of the field.
   *
   * The name of this event in the PDF spec is `V`.
   */
  onChange?: JavaScriptAction;
  /**
   * Action to be performed before the field is formatted to display its current value.
   *
   * The name of this event in the PDF spec is `F`.
   */
  onFormat?: JavaScriptAction;
  /**
   * Action to be performed when the user types a key-stroke into a text field or combo box
   * or modifies the selection in a scrollable list box.
   *
   * The name of this event in the PDF spec is `K`.
   */
  onInput?: JavaScriptAction;
  /**
   * Action to be performed when the pointer is pressed.
   */
  onPointerDown?: Action;
  /**
   * Action to be performed when the pointer is released.
   */
  onPointerUp?: Action;
  /**
   * Action to be performed when the pointer enters the field area.
   */
  onPointerEnter?: Action;
  /**
   * Action to be performed when the pointer hovers the field.
   */
  onPointerLeave?: Action;
};

/**
 * @deprecated Use {@link Serializers.WidgetAnnotationJSON} instead.
 * @hidden
 */
export declare type WidgetAnnotationJSON = Serializers.WidgetAnnotationJSON;

declare class WidgetAnnotationSerializer extends AnnotationSerializer {
  annotation: WidgetAnnotation;
  constructor(annotation: WidgetAnnotation);
  toJSON(): Serializers.WidgetAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<Serializers.WidgetAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): WidgetAnnotation;
}

/** @inline */
declare type Without<T, U> = { [P in
Exclude<keyof T, keyof U>]?: never };


declare type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

/**
 * This object contains configuration options for zooming. It allows granular control over the viewer zooming behavior.
 *
 * @public
 * @summary Object containing setup for zooming.
 * @default
 * NutrientViewer.load({
 *   zoom: {
 *     zoomMode: NutrientViewer.ZoomMode.AUTO,
 *     wheelZoomMode: NutrientViewer.WheelZoomMode.WITH_CTRL,
 *     options: {
 *       enableKeyboardZoom: true,
 *       enableGestureZoom: true,
 *     },
 *   },
 * });
 * @example
 * The following example sets the zoom mode to FIT_TO_WIDTH, the scroll zoom mode to DISABLED, and disables the keyboard zooming.
 * ```ts
 * NutrientViewer.load({
 *   zoom: {
 *     zoomMode: NutrientViewer.ZoomMode.FIT_TO_WIDTH,
 *     wheelZoomMode: NutrientViewer.WheelZoomMode.DISABLED,
 *     options: {
 *       enableKeyboardZoom: false,
 *     },
 *   },
 * });
 * ```
 */
export declare type ZoomConfiguration = {
  /** Defines the zoom mode to use. */
  zoomMode?: IZoomMode | number;
  /** Defines the scroll zoom mode to use. */
  wheelZoomMode?: IWheelZoomMode;
  /** The zoom options to use. */
  options?: IZoomOptions;
};

/**
 * A specific zoom mode that will always be applied whenever the viewport is resized.
 *
 * @enum
 */
declare const ZoomMode: {
  /**
   * Generates a zoomLevel that will automatically align the page for the best viewing experience.
   */
  readonly AUTO: "AUTO";
  /**
   * Uses a zoomLevel that will fit the width of the broadest page into the viewport. The height might overflow.
   */
  readonly FIT_TO_WIDTH: "FIT_TO_WIDTH";
  /**
   * Uses a zoomLevel that will fit the current page into the viewport completely.
   */
  readonly FIT_TO_VIEWPORT: "FIT_TO_VIEWPORT";

  readonly CUSTOM: "CUSTOM";
};

export {};