import ProjectItem from "components/ProjectItem";
import Layout from "../components/Layout";
import { NextPageWithLayout } from "./_app";
import MyBlog from "assets/projectImgs/myBlog.png";
import FormBuilder from "assets/projectImgs/formBuilder.png";
import AirSense from "assets/projectImgs/airsense.png";
import PageBuilder from "assets/projectImgs/pageBuilder.png";
import PetProject from "assets/projectImgs/petProject.png";

const Page: NextPageWithLayout = () => {
    return (
        <section className="px-6 mobile:px-4 py-12 mobile:py-8 h-main-content dark:bgc-dark ">
            <div className="flex flex-col gap-20 tablet:gap-18 mobile:gap-16 page-container overflow-hidden">
                <ProjectItem
                    description={
                        "Mình nhớ có ai đó nói rằng :`Một hành động tốt lặp đi lặp lại liên tục 21 lần sẽ trở thành một thói quen tốt !`. Vậy nên mình làm ra blog này và đặt mục tiêu mỗi tuần sẽ viết một bài, về gì cũng được, để chia sẻ, để marketing bản thân, để đánh dấu những gì mình đã tìm hiểu cũng như đã làm 😎😎😎  "
                    }
                    image={{ src: MyBlog, alt: "My blog" }}
                    index={0}
                    techStacks={["nextjs", "typescript", "react-query", "tailwind", "react-quill"]}
                    projectLink="https://syvietblog.vercel.app/"
                    projectRepo="https://github.com/phungvansyhb/phungSyy_blog"
                />
                <ProjectItem
                    description={
                        "Mỗi khi tìm hiểu một vấn đề kỹ thuật gì đó mới mình luôn cố gắng hiện thực hóa nó bằng cái gì đó cho đỡ quên nên mới sinh ra cái đống này nè 🙆‍♂️🙆‍♂️ "
                    }
                    image={{ src: PetProject, alt: "Multip pet project" }}
                    index={1}
                    techStacks={["vite", "typescript", "redux-toolkit", "tailwind"]}
                    projectLink="https://multip-pet-project-sypv.vercel.app/"
                    projectRepo="https://gitlab.com/Phungsy236/todoapp_withvite_ts"
                />
                <ProjectItem
                    description={
                        "Hệ thống quản lý không khí Airsense - Đồ án tốt nghiệp của mình. Chắc mọi người nghe đến nhiều quá rùi nhỉ 😅. Source code dự án mình làm được khóa sau kế thừa để phát triển tiếp nên hổng share được :)) "
                    }
                    image={{ src: AirSense, alt: "Airsense system" }}
                    techStacks={["react", "antd", "mqtt"]}
                    index={2}
                    // projectLink="https://airsense.vercel.app/"
                    // projectRepo="https://gitlab.com/Phungsy236/airsense-fe"
                />
                <ProjectItem
                    description={
                        "Mon men tìm hiểu mấy thứ cầm nắm kéo thả cũng từ đây mình bén duyên với việc dây dựng những ứng dụng custom động như này 🤸‍♂️ 🤸‍♂️"
                    }
                    image={{ src: FormBuilder, alt: "Form builder" }}
                    index={3}
                    techStacks={["react", "react-hook-form", "drag-drop"]}
                    projectLink="https://form-builder-sypv.vercel.app/"
                    projectRepo="https://github.com/phungvansyhb/form_builder"
                />
                <ProjectItem
                    description={
                        "Dự án to đùng ở công ty cũ của mình, module custom giao diện này mình được phân công phụ trách, mình cũng đã làm ra được một công cụ rất gì và này nọ 😙  "
                    }
                    image={{ src: PageBuilder, alt: "Page builder" }}
                    techStacks={["react", "tailwind", "craftjs"]}
                    index={4}
                    // projectLink="thpp"
                    // projectRepo="qweqwe"
                />
            </div>
        </section>
    );
};
Page.getLayout = function (page: React.ReactElement) {
    return (
        <Layout metaObject={{ title: "My project", description: "Các dự án mà Sỹ đã làm" }}>
            {page}
        </Layout>
    );
};
export default Page;
