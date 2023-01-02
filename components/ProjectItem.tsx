import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

type Props = {
    image: { src: StaticImageData; alt: string };
    description: string;
    projectLink?: string;
    projectRepo?: string;
    techStacks: string[];
    index: number;
};

export default function ProjectItem({
    image,
    description,
    projectLink,
    projectRepo,
    techStacks,
    index,
}: Props) {
    return (
        <motion.div
            className={`flex tablet:flex-col mobile:flex-col items-center justify-center 
            ${index % 2 === 1 && "flex-row-reverse"} 
            gap-12 tablet:gap-4 mobile:gap-2 
            min-h-[calc(100vh_-_150px)]`}
            initial={{ opacity: 0, x: index % 2 === 0 ? "70%" : "-70%" }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 1 }}
        >
            <Image
                src={image.src}
                alt={image.alt}
                className="rounded-lg shadow-lg w-1/2 tablet:w-full object-contain h-max border p-2 dark:p-0"
            />
            <div className="flex flex-col gap-4 items-center justify-center leading-8 dark:text-white w-1/2             tablet:w-full">
                <article className="indent-8 first-letter:uppercase first-letter:font-bold first-letter:text-[32px] first-letter:font-sans">
                    {description}
                </article>
                <div className="flex gap-2 ">
                    {techStacks.map((technology, index) => (
                        <span key={index} className="rounded-2xl py-0 px-2 bg-yellow-300 dark:bg-slate-500 font-medium w-max">
                            {technology}
                        </span>
                    ))}
                </div>
                <div className="flex gap-4 mt-6">
                    {projectLink && (
                        <button className="btn btn-primary">
                            <a href={projectLink} target="_blank" rel="noreferrer">
                                Take a look
                            </a>
                        </button>
                    )}
                    {projectRepo && (
                        <button className="btn ">
                            <a href={projectRepo} target="_blank" rel="noreferrer">
                                Source code
                            </a>
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
