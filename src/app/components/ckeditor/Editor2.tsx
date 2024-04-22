import React, { useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
//@ts-ignore
import { Editor } from 'ckeditor5-custom-build/build/ckeditor';
// import Editor from '@ckeditor/ckeditor5-build-classic';

interface CKeditorProps {
  onChange: (data: string) => void;
  editorLoaded: boolean;
  name: string;
  value: string;
}

export default function MyCKeditor({
  onChange,
  editorLoaded,
  name,
  value,
}: CKeditorProps) {
  // const editorRef = useRef<{
  //   CKEditor: typeof CKEditor;
  //   InlineEditor: typeof Editor;
  // }>();
  // useEffect(() => {
  //   editorRef.current = {
  //     CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
  //     InlineEditor: require('ckeditor5-custom-build/build/ckeditor'),
  //   };
  // }, []);

  return (
    <>
      {editorLoaded ? (
        <CKEditor
          editor={Editor}
          data="<p>Hello from CKEditor 5!</p>"
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor: any) => {
            if (editor) {
              const data = editor.getData();
              let sourceElement = data.sourceElement;
              console.log(event);
              console.log(editor);
              console.log(sourceElement);
              onChange(data);
            }
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
          config={{
            TextTransformation: false,
            toolbar: {
              shouldNotGroupWhenFull: true,
              baseFloatZIndex: 100001,
            },
            fullPage: true,
            removePlugins: [
              // 'Image',
              // 'ImageCaption',
              // 'ImageStyle',
              // 'ImageToolbar',
              // 'MediaEmbed',
              'SourceEditing',
              'TextPartLanguage',
            ],
            mediaEmbed: {
              providers: mediaEmbd,
            },
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </>
  );
}

// @media (max-width: 425px) {
//   body .ck.ck-toolbar-dropdown .ck.ck-toolbar .ck.ck-toolbar__items
//   {
//     flex-wrap: wrap;
//     min-width: 70vw;
//   }
// }
const mediaEmbd = [
  {
    name: 'allow-all',
    url: /^.+/,
    html: (match: any) => {
      var url = match[0].replace('watch?v=', 'embed/');
      // console.log(url)
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
