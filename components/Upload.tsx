import { DeleteIcon } from 'assets/icons';
import UploadIcon from 'assets/icons/UploadIcon';
import React, { useEffect, useState } from 'react';
import ImageUploading, { ImageListType, ImageType } from 'react-images-uploading';

export default function Upload({
    defaultImage,
    getImageCallback,
}: {
    // defaultImage?: ImageType;
    defaultImage?: string;
    getImageCallback: React.Dispatch<React.SetStateAction<ImageType[]>>;
}) {
    const [hasDefaultImage, setHaveDefaultImage] = useState(false);
    useEffect(() => {
        if (defaultImage) setHaveDefaultImage(true);
    }, [defaultImage]);
    const [images, setImages] = React.useState([]);
    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList as never[]);
        getImageCallback(imageList);
    };

    /* cause lib don't support default value in string  */
    if (defaultImage && hasDefaultImage) {
        return (
            <div>
                <div className="relative">
                    <img
                        src={defaultImage}
                        alt="avatar"
                        // min-height="200"
                        style={{ minHeight: 200, width: 400 }}
                        className="rounded outline outline-slate-200"
                    />
                    <button
                        onClick={() => setHaveDefaultImage(false)}
                        className="absolute top-2 right-2"
                        title="Delete"
                    >
                        <DeleteIcon className="w-4 h-4 text-orange-300" />
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="App">
            <ImageUploading multiple={false} value={images} onChange={onChange} maxNumber={1}>
                {({ imageList, onImageUpload, onImageRemove }) => (
                    // write your building UI
                    <div>
                        {images.length === 0 && (
                            <button type="button" onClick={onImageUpload}>
                                <UploadIcon />
                            </button>
                        )}
                        {imageList.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={image.dataURL}
                                    alt="avatar"
                                    width="200"
                                    className="rounded outline outline-slate-200"
                                />
                                <button
                                    onClick={() => onImageRemove(index)}
                                    className="absolute top-2 right-2"
                                    title="Delete"
                                >
                                    <DeleteIcon className="w-4 h-4 text-orange-300" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}
