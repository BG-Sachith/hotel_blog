'use client';
import React, { useEffect, useRef } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
/////@ts-ignore
// import { Editor } from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Editor } from 'ckeditor5-custom-build/build/ckeditor';
// import Editor from '@ckeditor/ckeditor5-build-classic';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// import Editor from 'ckeditor5-custom-build';

// interface CKeditorProps {
//   onChange: (data: string) => void;
//   editorLoaded: boolean;
//   name: string;
//   initialdata: string;
// }

const conf = {
  // CKconfig,
  // TextTransformation: false,
  toolbar: {
    shouldNotGroupWhenFull: true,
    // baseFloatZIndex: 100001,
  },
  // FloatingPanelsZIndex: 100000,
  // baseFloatZIndex: 12000,
  // disableEnforceFocus: true,
  // fullPage: true,
  // removePlugins: [
  //   // 'Image',
  //   // 'ImageCaption',
  //   // 'ImageStyle',
  //   // 'ImageToolbar',
  //   // 'MediaEmbed',
  //   'SourceEditing',
  //   'TextPartLanguage',
  // ],
  removePlugins: ['MediaEmbedToolbar', 'Title'],
  placeholder: 'Type or paste your content here',
  mediaEmbed: {
    previewsInData: true,
    providers: [
      {
        name: 'allow-all',
        url: /^.+/,
        html: (match) => {
          var url = match[0].replace('watch?v=', 'embed/');
          console.log(url);
          return (
            '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
            `<iframe src="${url}"` +
            'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;"' +
            'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
            '</iframe>' +
            '</div>'
            // '<div class="iframely-embed">' +
            // '<div class="iframely-responsive" style="text-align: center;">' +
            // `<iframe src="${url}" ` +
            // 'frameborder="0" encrypted-media" allowfullscreen style="position:relative; width:auto; height:auto;min-width:320px;min-height:250px">' +
            // '</iframe>' +
            // '</div>' +
            // '</div>'
            // https://www.youtube.com/watch?v=NWudXBBlpxY
          );
        },
      },
    ],
  },
  disableAutoInline: true,
  image: {
    // Configure the available styles.
    styles: ['alignLeft', 'alignCenter', 'alignRight'],
    // Configure the available image resize options.
    resizeOptions: [
      {
        name: 'imageResize:original',
        label: 'Original',
        value: null,
      },
      {
        name: 'imageResize:50',
        label: '50%',
        value: '50',
      },
      {
        name: 'imageResize:75',
        label: '75%',
        value: '75',
      },
    ],
    toolbar: [
      'imageStyle:alignLeft',
      'imageStyle:alignCenter',
      'imageStyle:alignRight',
      // 'imageStyle:full',
      // 'imageStyle:side',
      '|',
      'imageResize',
      // 'imageResize:original',
      // 'imageResize:50',
      // 'imageResize:75',
      '|',
      'imageTextAlternative',
      '|',
      'linkImage',
      '|',
      'undo',
      'redo',
    ],
  },
};

export default function MyCKeditor({ onChange, editorLoaded, initialdata }) {
  // console.log(editorLoaded);
  return (
    <>
      {editorLoaded ? (
        <CKEditor
          editor={Editor}
          data={initialdata}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            // console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            if (editor) {
              onChange(editor.getData());
            }
          }}
          onBlur={(event, editor) => {
            // console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            // console.log('Focus.', editor);
          }}
          config={{ ...conf }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </>
  );
}

let config = {
  toolbar: {
    items: [
      'heading',
      '|',
      'undo',
      'redo',
      '|',
      'bold',
      'italic',
      'underline',
      'horizontalLine',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      'alignment',
      'todoList',
      '|',
      'code',
      'codeBlock',
      '|',
      'fontBackgroundColor',
      'fontColor',
      'fontFamily',
      'fontSize',
      'highlight',
      'removeFormat',
      '|',
      'imageUpload',
      'imageInsert',
      'mediaEmbed',
      '|',
      'insertTable',
      'pageBreak',
      'blockQuote',
      '|',
      'strikethrough',
      'specialCharacters',
      '|',
      'textPartLanguage',
      '|',
      'htmlEmbed',
      'restrictedEditingException',
    ],
    shouldNotGroupWhenFull: true,
    baseFloatZIndex: 100001,
  },
  language: 'en',
  image: {
    toolbar: [
      'imageTextAlternative',
      'toggleImageCaption',
      'imageStyle:inline',
      'imageStyle:block',
      'imageStyle:side',
      'linkImage',
    ],
    upload: {
      types: ['jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff'],
    },
    resizeUnit: '%',
    resizeOptions: [
      {
        name: 'resizeImage:original',
        value: null,
        icon: 'original',
      },
      {
        name: 'resizeImage:25',
        value: '25',
        icon: 'small',
      },
      {
        name: 'resizeImage:50',
        value: '50',
        icon: 'medium',
      },
      {
        name: 'resizeImage:75',
        value: '75',
        icon: 'large',
      },
    ],
    styles: {
      options: [
        'inline',
        'alignLeft',
        'alignRight',
        'alignCenter',
        'alignBlockLeft',
        'alignBlockRight',
        'block',
        'side',
      ],
    },
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableCellProperties',
      'tableProperties',
    ],
    tableCellProperties: {
      borderColors: [
        {
          color: 'hsl(0, 0%, 0%)',
          label: 'Black',
        },
        {
          color: 'hsl(0, 0%, 30%)',
          label: 'Dim grey',
        },
        {
          color: 'hsl(0, 0%, 60%)',
          label: 'Grey',
        },
        {
          color: 'hsl(0, 0%, 90%)',
          label: 'Light grey',
        },
        {
          color: 'hsl(0, 0%, 100%)',
          label: 'White',
          hasBorder: true,
        },
        {
          color: 'hsl(0, 75%, 60%)',
          label: 'Red',
        },
        {
          color: 'hsl(30, 75%, 60%)',
          label: 'Orange',
        },
        {
          color: 'hsl(60, 75%, 60%)',
          label: 'Yellow',
        },
        {
          color: 'hsl(90, 75%, 60%)',
          label: 'Light green',
        },
        {
          color: 'hsl(120, 75%, 60%)',
          label: 'Green',
        },
        {
          color: 'hsl(150, 75%, 60%)',
          label: 'Aquamarine',
        },
        {
          color: 'hsl(180, 75%, 60%)',
          label: 'Turquoise',
        },
        {
          color: 'hsl(210, 75%, 60%)',
          label: 'Light blue',
        },
        {
          color: 'hsl(240, 75%, 60%)',
          label: 'Blue',
        },
        {
          color: 'hsl(270, 75%, 60%)',
          label: 'Purple',
        },
      ],
      backgroundColors: [
        {
          color: 'hsl(0, 0%, 0%)',
          label: 'Black',
        },
        {
          color: 'hsl(0, 0%, 30%)',
          label: 'Dim grey',
        },
        {
          color: 'hsl(0, 0%, 60%)',
          label: 'Grey',
        },
        {
          color: 'hsl(0, 0%, 90%)',
          label: 'Light grey',
        },
        {
          color: 'hsl(0, 0%, 100%)',
          label: 'White',
          hasBorder: true,
        },
        {
          color: 'hsl(0, 75%, 60%)',
          label: 'Red',
        },
        {
          color: 'hsl(30, 75%, 60%)',
          label: 'Orange',
        },
        {
          color: 'hsl(60, 75%, 60%)',
          label: 'Yellow',
        },
        {
          color: 'hsl(90, 75%, 60%)',
          label: 'Light green',
        },
        {
          color: 'hsl(120, 75%, 60%)',
          label: 'Green',
        },
        {
          color: 'hsl(150, 75%, 60%)',
          label: 'Aquamarine',
        },
        {
          color: 'hsl(180, 75%, 60%)',
          label: 'Turquoise',
        },
        {
          color: 'hsl(210, 75%, 60%)',
          label: 'Light blue',
        },
        {
          color: 'hsl(240, 75%, 60%)',
          label: 'Blue',
        },
        {
          color: 'hsl(270, 75%, 60%)',
          label: 'Purple',
        },
      ],
      defaultProperties: {},
    },
    tableProperties: {
      borderColors: [
        {
          color: 'hsl(0, 0%, 0%)',
          label: 'Black',
        },
        {
          color: 'hsl(0, 0%, 30%)',
          label: 'Dim grey',
        },
        {
          color: 'hsl(0, 0%, 60%)',
          label: 'Grey',
        },
        {
          color: 'hsl(0, 0%, 90%)',
          label: 'Light grey',
        },
        {
          color: 'hsl(0, 0%, 100%)',
          label: 'White',
          hasBorder: true,
        },
        {
          color: 'hsl(0, 75%, 60%)',
          label: 'Red',
        },
        {
          color: 'hsl(30, 75%, 60%)',
          label: 'Orange',
        },
        {
          color: 'hsl(60, 75%, 60%)',
          label: 'Yellow',
        },
        {
          color: 'hsl(90, 75%, 60%)',
          label: 'Light green',
        },
        {
          color: 'hsl(120, 75%, 60%)',
          label: 'Green',
        },
        {
          color: 'hsl(150, 75%, 60%)',
          label: 'Aquamarine',
        },
        {
          color: 'hsl(180, 75%, 60%)',
          label: 'Turquoise',
        },
        {
          color: 'hsl(210, 75%, 60%)',
          label: 'Light blue',
        },
        {
          color: 'hsl(240, 75%, 60%)',
          label: 'Blue',
        },
        {
          color: 'hsl(270, 75%, 60%)',
          label: 'Purple',
        },
      ],
      backgroundColors: [
        {
          color: 'hsl(0, 0%, 0%)',
          label: 'Black',
        },
        {
          color: 'hsl(0, 0%, 30%)',
          label: 'Dim grey',
        },
        {
          color: 'hsl(0, 0%, 60%)',
          label: 'Grey',
        },
        {
          color: 'hsl(0, 0%, 90%)',
          label: 'Light grey',
        },
        {
          color: 'hsl(0, 0%, 100%)',
          label: 'White',
          hasBorder: true,
        },
        {
          color: 'hsl(0, 75%, 60%)',
          label: 'Red',
        },
        {
          color: 'hsl(30, 75%, 60%)',
          label: 'Orange',
        },
        {
          color: 'hsl(60, 75%, 60%)',
          label: 'Yellow',
        },
        {
          color: 'hsl(90, 75%, 60%)',
          label: 'Light green',
        },
        {
          color: 'hsl(120, 75%, 60%)',
          label: 'Green',
        },
        {
          color: 'hsl(150, 75%, 60%)',
          label: 'Aquamarine',
        },
        {
          color: 'hsl(180, 75%, 60%)',
          label: 'Turquoise',
        },
        {
          color: 'hsl(210, 75%, 60%)',
          label: 'Light blue',
        },
        {
          color: 'hsl(240, 75%, 60%)',
          label: 'Blue',
        },
        {
          color: 'hsl(270, 75%, 60%)',
          label: 'Purple',
        },
      ],
      defaultProperties: {},
    },
    defaultHeadings: {
      rows: 0,
      columns: 0,
    },
  },
  TextTransformation: false,
  fullPage: true,
  removePlugins: ['SourceEditing', 'TextPartLanguage'],
  initialData: '<p>Hello from CKEditor 5!</p>',
  // "plugins": [
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null
  // ],
  alignment: {
    options: [
      {
        name: 'left',
      },
      {
        name: 'right',
      },
      {
        name: 'center',
      },
      {
        name: 'justify',
      },
    ],
  },
  codeBlock: {
    languages: [
      {
        language: 'plaintext',
        label: 'Plain text',
      },
      {
        language: 'c',
        label: 'C',
      },
      {
        language: 'cs',
        label: 'C#',
      },
      {
        language: 'cpp',
        label: 'C++',
      },
      {
        language: 'css',
        label: 'CSS',
      },
      {
        language: 'diff',
        label: 'Diff',
      },
      {
        language: 'html',
        label: 'HTML',
      },
      {
        language: 'java',
        label: 'Java',
      },
      {
        language: 'javascript',
        label: 'JavaScript',
      },
      {
        language: 'php',
        label: 'PHP',
      },
      {
        language: 'python',
        label: 'Python',
      },
      {
        language: 'ruby',
        label: 'Ruby',
      },
      {
        language: 'typescript',
        label: 'TypeScript',
      },
      {
        language: 'xml',
        label: 'XML',
      },
    ],
    indentSequence: '\t',
  },
  fontBackgroundColor: {
    colors: [
      {
        color: 'hsl(0, 0%, 0%)',
        label: 'Black',
      },
      {
        color: 'hsl(0, 0%, 30%)',
        label: 'Dim grey',
      },
      {
        color: 'hsl(0, 0%, 60%)',
        label: 'Grey',
      },
      {
        color: 'hsl(0, 0%, 90%)',
        label: 'Light grey',
      },
      {
        color: 'hsl(0, 0%, 100%)',
        label: 'White',
        hasBorder: true,
      },
      {
        color: 'hsl(0, 75%, 60%)',
        label: 'Red',
      },
      {
        color: 'hsl(30, 75%, 60%)',
        label: 'Orange',
      },
      {
        color: 'hsl(60, 75%, 60%)',
        label: 'Yellow',
      },
      {
        color: 'hsl(90, 75%, 60%)',
        label: 'Light green',
      },
      {
        color: 'hsl(120, 75%, 60%)',
        label: 'Green',
      },
      {
        color: 'hsl(150, 75%, 60%)',
        label: 'Aquamarine',
      },
      {
        color: 'hsl(180, 75%, 60%)',
        label: 'Turquoise',
      },
      {
        color: 'hsl(210, 75%, 60%)',
        label: 'Light blue',
      },
      {
        color: 'hsl(240, 75%, 60%)',
        label: 'Blue',
      },
      {
        color: 'hsl(270, 75%, 60%)',
        label: 'Purple',
      },
    ],
    columns: 5,
  },
  fontColor: {
    colors: [
      {
        color: 'hsl(0, 0%, 0%)',
        label: 'Black',
      },
      {
        color: 'hsl(0, 0%, 30%)',
        label: 'Dim grey',
      },
      {
        color: 'hsl(0, 0%, 60%)',
        label: 'Grey',
      },
      {
        color: 'hsl(0, 0%, 90%)',
        label: 'Light grey',
      },
      {
        color: 'hsl(0, 0%, 100%)',
        label: 'White',
        hasBorder: true,
      },
      {
        color: 'hsl(0, 75%, 60%)',
        label: 'Red',
      },
      {
        color: 'hsl(30, 75%, 60%)',
        label: 'Orange',
      },
      {
        color: 'hsl(60, 75%, 60%)',
        label: 'Yellow',
      },
      {
        color: 'hsl(90, 75%, 60%)',
        label: 'Light green',
      },
      {
        color: 'hsl(120, 75%, 60%)',
        label: 'Green',
      },
      {
        color: 'hsl(150, 75%, 60%)',
        label: 'Aquamarine',
      },
      {
        color: 'hsl(180, 75%, 60%)',
        label: 'Turquoise',
      },
      {
        color: 'hsl(210, 75%, 60%)',
        label: 'Light blue',
      },
      {
        color: 'hsl(240, 75%, 60%)',
        label: 'Blue',
      },
      {
        color: 'hsl(270, 75%, 60%)',
        label: 'Purple',
      },
    ],
    columns: 5,
  },
  fontFamily: {
    options: [
      'default',
      'Arial, Helvetica, sans-serif',
      'Courier New, Courier, monospace',
      'Georgia, serif',
      'Lucida Sans Unicode, Lucida Grande, sans-serif',
      'Tahoma, Geneva, sans-serif',
      'Times New Roman, Times, serif',
      'Trebuchet MS, Helvetica, sans-serif',
      'Verdana, Geneva, sans-serif',
    ],
    supportAllValues: false,
  },
  fontSize: {
    options: ['tiny', 'small', 'default', 'big', 'huge'],
    supportAllValues: false,
  },
  heading: {
    options: [
      {
        model: 'paragraph',
        title: 'Paragraph',
        class: 'ck-heading_paragraph',
      },
      {
        model: 'heading1',
        view: 'h2',
        title: 'Heading 1',
        class: 'ck-heading_heading1',
      },
      {
        model: 'heading2',
        view: 'h3',
        title: 'Heading 2',
        class: 'ck-heading_heading2',
      },
      {
        model: 'heading3',
        view: 'h4',
        title: 'Heading 3',
        class: 'ck-heading_heading3',
      },
    ],
  },
  highlight: {
    options: [
      {
        model: 'yellowMarker',
        class: 'marker-yellow',
        title: 'Yellow marker',
        color: 'var(--ck-highlight-marker-yellow)',
        type: 'marker',
      },
      {
        model: 'greenMarker',
        class: 'marker-green',
        title: 'Green marker',
        color: 'var(--ck-highlight-marker-green)',
        type: 'marker',
      },
      {
        model: 'pinkMarker',
        class: 'marker-pink',
        title: 'Pink marker',
        color: 'var(--ck-highlight-marker-pink)',
        type: 'marker',
      },
      {
        model: 'blueMarker',
        class: 'marker-blue',
        title: 'Blue marker',
        color: 'var(--ck-highlight-marker-blue)',
        type: 'marker',
      },
      {
        model: 'redPen',
        class: 'pen-red',
        title: 'Red pen',
        color: 'var(--ck-highlight-pen-red)',
        type: 'pen',
      },
      {
        model: 'greenPen',
        class: 'pen-green',
        title: 'Green pen',
        color: 'var(--ck-highlight-pen-green)',
        type: 'pen',
      },
    ],
  },
  htmlEmbed: {
    showPreviews: false,
  },
  indentBlock: {
    offset: 40,
    unit: 'px',
  },
  link: {
    addTargetToExternalLinks: false,
  },
  list: {
    properties: {
      styles: true,
      startIndex: false,
      reversed: false,
    },
  },
  mediaEmbed: {
    elementName: 'oembed',
    providers: [
      {
        name: 'dailymotion',
        url: {},
      },
      {
        name: 'spotify',
        url: [{}, {}, {}],
      },
      {
        name: 'youtube',
        url: [{}, {}, {}, {}],
      },
      {
        name: 'vimeo',
        url: [{}, {}, {}, {}, {}, {}, {}],
      },
      {
        name: 'instagram',
        url: {},
      },
      {
        name: 'twitter',
        url: {},
      },
      {
        name: 'googleMaps',
        url: [{}, {}, {}, {}],
      },
      {
        name: 'flickr',
        url: {},
      },
      {
        name: 'facebook',
        url: {},
      },
    ],
  },
  typing: {
    transformations: {
      include: ['symbols', 'mathematical', 'typography', 'quotes'],
    },
  },
};

// @media (max-width: 425px) {
//   body .ck.ck-toolbar-dropdown .ck.ck-toolbar .ck.ck-toolbar__items
//   {
//     flex-wrap: wrap;
//     min-width: 70vw;
//   }
// }

const fontC = [
  // {
  //   color: 'hsl(0, 0%, 0%)',
  //   label: 'Black'
  // },
  // {
  //   color: 'hsl(0, 0%, 30%)',
  //   label: 'Dim grey'
  // },
  // {
  //   color: 'hsl(0, 0%, 60%)',
  //   label: 'Grey'
  // },
  // {
  //   color: 'hsl(0, 0%, 90%)',
  //   label: 'Light grey'
  // },
  // {
  //   color: 'hsl(0, 0%, 100%)',
  //   label: 'White',
  //   hasBorder: true
  // },
  {
    color: 'hsl(0, 75%, 60%)',
    label: 'Red',
  },
  {
    color: 'hsl(30, 75%, 60%)',
    label: 'Orange',
  },
  {
    color: 'hsl(60, 75%, 60%)',
    label: 'Yellow',
  },
  {
    color: 'hsl(90, 75%, 60%)',
    label: 'Light green',
  },
  {
    color: 'hsl(120, 75%, 60%)',
    label: 'Green',
  },
  {
    color: 'hsl(150, 75%, 60%)',
    label: 'Aquamarine',
  },
  {
    color: 'hsl(180, 75%, 60%)',
    label: 'Turquoise',
  },
  {
    color: 'hsl(210, 75%, 60%)',
    label: 'Light blue',
  },
  {
    color: 'hsl(240, 75%, 60%)',
    label: 'Blue',
  },
  {
    color: 'hsl(270, 75%, 60%)',
    label: 'Purple',
  },
];
const fontBC = [
  // {
  //   color: 'hsl(0, 0%, 0%)',
  //   label: 'Black'
  // },
  // {
  //   color: 'hsl(0, 0%, 30%)',
  //   label: 'Dim grey'
  // },
  // {
  //   color: 'hsl(0, 0%, 60%)',
  //   label: 'Grey'
  // },
  // {
  //   color: 'hsl(0, 0%, 90%)',
  //   label: 'Light grey'
  // },
  // {
  //   color: 'hsl(0, 0%, 100%)',
  //   label: 'White',
  //   hasBorder: true
  // },
  {
    color: 'hsl(0, 75%, 60%)',
    label: 'Red',
  },
  {
    color: 'hsl(30, 75%, 60%)',
    label: 'Orange',
  },
  {
    color: 'hsl(60, 75%, 60%)',
    label: 'Yellow',
  },
  {
    color: 'hsl(90, 75%, 60%)',
    label: 'Light green',
  },
  {
    color: 'hsl(120, 75%, 60%)',
    label: 'Green',
  },
  {
    color: 'hsl(150, 75%, 60%)',
    label: 'Aquamarine',
  },
  {
    color: 'hsl(180, 75%, 60%)',
    label: 'Turquoise',
  },
  {
    color: 'hsl(210, 75%, 60%)',
    label: 'Light blue',
  },
  {
    color: 'hsl(240, 75%, 60%)',
    label: 'Blue',
  },
  {
    color: 'hsl(270, 75%, 60%)',
    label: 'Purple',
  },
];
const mediaEmbd = [
  {
    name: 'allow-all',
    url: /^.+/,
    html: (match) => {
      var url = match[0].replace('watch?v=', 'embed/');
      console.log(url);
      return (
        '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
        `<iframe src="${url}"` +
        'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;"' +
        'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
        '</iframe>' +
        '</div>'
        // '<div class="iframely-embed">' +
        // '<div class="iframely-responsive" style="text-align: center;">' +
        // `<iframe src="${url}" ` +
        // 'frameborder="0" encrypted-media" allowfullscreen style="position:relative; width:auto; height:auto;min-width:320px;min-height:250px">' +
        // '</iframe>' +
        // '</div>' +
        // '</div>'
        // https://www.youtube.com/watch?v=NWudXBBlpxY
      );
    },
  },
];

const contentToolbar = [
  'tableColumn',
  'tableRow',
  'mergeTableCells',
  'tableCellProperties',
  'tableProperties',
];
const image = {
  // Configure the available styles.
  styles: ['alignLeft', 'alignCenter', 'alignRight'],
  // Configure the available image resize options.
  resizeOptions: [
    {
      name: 'imageResize:original',
      label: 'Original',
      value: null,
    },
    {
      name: 'imageResize:50',
      label: '50%',
      value: '50',
    },
    {
      name: 'imageResize:75',
      label: '75%',
      value: '75',
    },
  ],
  toolbar: [
    'imageStyle:alignLeft',
    'imageStyle:alignCenter',
    'imageStyle:alignRight',
    // 'imageStyle:full',
    // 'imageStyle:side',
    '|',
    'imageResize',
    // 'imageResize:original',
    // 'imageResize:50',
    // 'imageResize:75',
    '|',
    'imageTextAlternative',
    '|',
    'linkImage',
    '|',
    'undo',
    'redo',
  ],
};

const toolbarItm2 = [
  'textPartLanguage',
  'heading',
  '|',
  'undo',
  'redo',
  '|',
  'bold',
  'italic',
  'link',
  'bulletedList',
  'numberedList',
  'todoList',
  'fontFamily',
  'fontSize',
  'removeFormat',
  '|',
  'outdent',
  'alignment',
  'indent',
  '|',
  'insertTable',
  'blockQuote',
  'pageBreak',
  'horizontalLine',
  '|',
  'fontBackgroundColor',
  'fontColor',
  'highlight',
  '|',
  'imageInsert',
  'imageUpload',
  'mediaEmbed',
  '|',
  'specialCharacters',
  'strikethrough',
  'underline',
];

const CKconfig = {
  fontColor: {
    colors: fontC,
  },
  fontBackgroundColor: {
    colors: fontBC,
  },
  toolbar: {
    items: toolbarItm2,
    shouldNotGroupWhenFull: true,
  },
  language: 'en',
  table: {
    contentToolbar: contentToolbar,
  },
  image: image,
  mediaEmbed: {
    providers: mediaEmbd,
  },
};
