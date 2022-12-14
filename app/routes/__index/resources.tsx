import { Outlet } from "@remix-run/react";
import Container from "~/layout/shared/container";

export default function ResourcesPage() {
    return (
        <Container>
            <h1>Resources</h1>
            <p className="text-base-600">Autem esse quia quis et quia. Qui est facilis consequuntur dolorem.</p>
            <p>Velit libero accusantium aspernatur nobis. Repudiandae ut consequuntur vel rerum ab illo dignissimos. Dolorem quo neque itaque quo temporibus. Et rerum quasi officia. Quod quis ut repellat delectus ipsam sint.</p>
            <p>Distinctio totam eveniet quia omnis. Itaque ea ab et quod doloremque sequi rerum cupiditate. Ab cumque est et molestias sunt. Pariatur deleniti ratione quo sint non laboriosam dolorem dolore.</p>
            <Outlet/>
        </Container>
    );
};