import Layout from "../components/Layout";
import { NextPageWithLayout } from "./_app";
import Image from "next/image";
import Myavatar from "assets/aboutme/avatar_blog.png";
import { motion } from "framer-motion";

const Page: NextPageWithLayout = () => {
    return (
        <section className="px-6 mobile:px-4 py-12 mobile:py-8 h-main-content dark:bgc-dark">
            <motion.div
                initial={{ x: 50 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", bounce: 0.8, duration: 1 }}
                className="w-full flex flex-col items-center justify-center"
            >
                <Image
                    alt="Phung Sy"
                    src={Myavatar}
                    width={200}
                    height={200}
                    className="rounded-full shadow-xl border"
                />
                <h1 className="text-header dark:text-white mt-4 font-bold">Phùng Văn Sỹ</h1>
            </motion.div>
            <motion.blockquote
                className="dark:text-white text-center text-xl mobile:text-lg mt-8 italic opacity-60 font-bold font-mono"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                &#34; Vì thấy mình nhạt nhẽo nên mình viết blog :)) &#34;
            </motion.blockquote>
            <motion.article
                className="dark:text-white page-container mt-10 text-base leading-8"
                initial={{ y: 40, opacity: 0 }}
                // onViewportEnter
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <section>
                    <h2 className="text-xl first-letter:text-2xl first-letter:font-serif">
                        1, Những điều mình thấy là tốt ở bản thân mình
                    </h2>
                    <ul className="my-4 ml-6 flex flex-col gap-4">
                        <li>
                            <b>Sống có mục tiêu 😎</b> -Mình thấy bản thân mình cũng không phải dạng tài năng xuất chúng thế cho nên mình luôn đặt mục tiêu cho bản thân đỡ chơi vơi 😌
                        </li>
                        <li>
                            <b>Cầu tiến 🤝</b> - Mình thích sự công bằng và sòng phằng, công bằng
                            để cạnh tranh, công bằng mà thể hiện. Mấy đứa mà ỷ vào bố mẹ tao giàu,
                            hay nhà tao hoàn cảnh thế này thế kia là mình chê 👊. Công bằng cũng tạo nên kẻ mạnh người yếu. Mình muốn mạnh 😑 nên mình luôn luôn cầu tiến!!!   
                        </li>
                        <li>
                            <b>Healthy 💪</b> - Mình cũng vào viện đôi lần rồi nên mình rất quan tâm đến sức khỏe bản thân 😇, ngoài những lúc ngồi code hoa mắt thì mình cũng thể dục thể thao. Hằng tuần mình vẫn đá bóng nhờ zậy mà mình có một thân hình khỏe mạnh    
                        </li>
                    </ul>
                </section>
                <section>
                    <h2 className="text-xl first-letter:text-2xl first-letter:font-serif">
                        2, Những điều mình thấy là chưa tốt ở bản thân mình
                    </h2>

                    <ul className="mt-4 ml-6 flex flex-col gap-4">
                        <li>
                            <b>Khả năng giao tiếp tồi tệ 💁‍♂️</b> - À thì cũng không đến mức cạy cả
                            ngày không nói được một câu, nhưng mà do ngồi máy tính nhiều nên lúc nói
                            chuyện với mọi người cảm giác cứ bị nhạt 😞 đặc biệt là mấy bạn nữ 😛 áp
                            lực luôn!!!
                        </li>
                        <li>
                            <b>Không có tài lẻ 🐮</b> - Yeah, nhìn đi nhìn lại thì bản thân mình
                            chẳng có gì gọi là tài cả. Giá mà biết tí đàn ca sao nhị thì mình đã
                            phải có rất nhiều người yêu 😂
                        </li>
                        <li>
                            <b>Dễ xúc động 😓</b> - Tuy là thân trai sức dài vai rộng nhưng không hiểu sao mình rất mau nước mắt 🙂, lúc đang nói mà xúc động là sẽ vừa mếu vừa nói. Mình nghĩ là mình vẫn còn chưa trường thành về mặt cảm xúc! 
                        </li>
                    </ul>
                </section>
            </motion.article>
        </section>
    );
};
Page.getLayout = function (page: React.ReactElement) {
    return (
        <Layout metaObject={{ title: "About me", description: "mình kể về mình" }}>{page}</Layout>
    );
};
export default Page;
