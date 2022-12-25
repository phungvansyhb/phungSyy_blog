import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";''
import React from "react";

const Editor = ({ defaultValue, onChange }) => {
    return (
        <CKEditor
            editor={ClassicEditor}
            data={defaultValue}
            onChange={(_event, editor) => {
                onChange(editor.getData());
            }}
            
        />
    );
};

export default Editor;
