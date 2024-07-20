import { Appbar } from "../components/ui/Appbar";
import { BlogCard } from "../components/ui/BlogCard";

export const Home = () => {
  return (
    <section>
        <Appbar />
    <div className="flex justify-center">
      <div className="flex justify-center flex-col max-w-4xl">
        <BlogCard
          authorname="Ronit khajuria"
          title="5 Breakfast ideas"
          content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur perspiciatis doloribus ad? Iure reprehenderit, assumenda, sunt excepturi ratione veritatis qui vero necessitatibus reiciendis dolorem aspernatur culpa impedit magnam minus cumque corrupti nesciunt doloribus consequuntur nisi expedita voluptates. Dolor repellendus aut voluptate libero saepe atque quos ut aspernatur cupiditate optio voluptatum, rem magni nulla neque et quae non. Impedit quisquam eveniet sint necessitatibus recusandae corporis doloremque id sapiente nemo nisi deleniti labore voluptatibus distinctio beatae ut, similique ipsum omnis, molestias aliquam fugit, hic voluptas natus esse. Aperiam ipsum, maiores at officiis velit ducimus tempore, tenetur, ipsam debitis consequatur soluta quod accusantium perspiciatis repellat praesentium sequi distinctio atque numquam architecto. Impedit, repudiandae!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur perspiciatis doloribus ad? Iure reprehenderit, assumenda, sunt excepturi ratione veritatis qui vero necessitatibus reiciendis dolorem aspernatur culpa impedit magnam minus cumque corrupti nesciunt doloribus consequuntur nisi expedita voluptates. Dolor repellendus aut voluptate libero saepe atque quos ut aspernatur cupiditate optio voluptatum, rem magni nulla neque et quae non. Impedit quisquam eveniet sint necessitatibus recusandae corporis doloremque id sapiente nemo nisi deleniti labore voluptatibus distinctio beatae ut, similique ipsum omnis, molestias aliquam fugit, hic voluptas natus esse. Aperiam ipsum, maiores at officiis velit ducimus tempore, tenetur, ipsam debitis consequatur soluta quod accusantium perspiciatis repellat praesentium sequi distinctio atque numquam architecto. Impedit, repudiandae!"
          publishedDate={"12 July 2024"}
        />
      </div>
    </div>
    </section>
  );
};
