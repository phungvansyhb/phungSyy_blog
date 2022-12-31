import dynamic from "next/dynamic";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});
const modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote","code-block"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
        ["link", "image", "video"],
        ["clean"],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};

const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "clean"
];

const Editor = ({onChange , defaultValue}) => {
    return (
        <QuillNoSSRWrapper
            modules={modules}
            formats={formats}
            value={defaultValue}
            // defaultValue={defaultValue}
            // id='quill-editor'
            theme="snow"
            placeholder="Write something awesome !!! "
            onChange={(content)=>onChange(content)}
        />
    );
};

export default Editor;
