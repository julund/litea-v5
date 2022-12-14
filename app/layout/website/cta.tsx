import { Link } from "~/components/link";
import Container from "../shared/container";

const CTA = () => {

    return (
        <section id="cta" className="bg-primary-100/50 text-primary-800 p-8 backdrop-saturate-4">
            <Container>
                <div className="flex gap-2">
                    <span className="grow">
                        <p className="text-xl">Choose the best website analytics alternative</p>
                        <p className="text-lg text-primary-600">
                            Start a 30-day free trial of Litea Analytics today
                        </p>
                    </span>
                    <span className="shrink flex gap-2 flex-nowrap">
                            <Link to="/demo" className="button button-primary-ghost">Live demo</Link>
                            <Link to="/register" className="button button-primary">Get started for free</Link>
                    </span>
                </div>

            </Container>
        </section>
    );
};
export default CTA;