import dynamic from "next/dynamic";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});
const modules = {
    toolbar: [
        [{ header: "2" }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { list: "check" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        [{ align: "" }, { align: "center" }, { align: "right" }, { align: "justify" }],
        ["link", "image", "video"],
        [{ script: "sub" }, { script: "super" }],
        ["clean"],
    ],

    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};

const formats = [
    "script",
    "header",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "check",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "clean",
];

const Editor = ({ onChange, defaultValue }) => {
    return (
        <QuillNoSSRWrapper
            modules={modules}
            formats={formats}
            value={defaultValue}
            // defaultValue={defaultValue}
            // id='quill-editor'
            theme="snow"
            placeholder="Write something awesome !!! "
            onChange={(content) => onChange(content)}
        />
    );
};

export default Editor;
