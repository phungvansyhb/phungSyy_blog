import dynamic from 'next/dynamic';
import { uploadImageAndReturnUrl } from 'services/fireBase.service';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});
function handleImage() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
        const file = input.files[0];
        const range = this.quill.getSelection(true);
        this.quill.insertEmbed(
            range.index,
            'image',
            `${window.location.origin}/images/loaders/placeholder.gif`
        );
        this.quill.setSelection(range.index + 1);
        const res = await uploadImageAndReturnUrl(file); 
        this.quill.deleteText(range.index, 1);
        this.quill.insertEmbed(range.index, 'image', res);
    };
}
const modules = {
    toolbar: {
        container: [
            [{ header: '2' }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { list: 'check' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
            ['link', 'image', 'video'],
            [{ script: 'sub' }, { script: 'super' }],
            ['clean'],
        ],
        handlers: {
            image: handleImage,
        },
    },
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};

const formats = [
    'script',
    'header',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'list',
    'bullet',
    'check',
    'indent',
    'link',
    'image',
    'video',
    'align',
    'clean',
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
