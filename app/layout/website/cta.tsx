import { Link } from "~/components/link";
import Container from "../shared/container";

const CTA = () => {

    return (
        <section id="cta" className="bg-primary-100/50 text-primary-800 p-8 backdrop-saturate-4">
            <Container>
                <div className="flex flex-col items-center text-center md:text-left md:items-start md:flex-row gap-4">
                    <p className="text-lg">
                        Choose the best website analytics alternative - <br />Start your 30-day free trial of Litea Analytics today
                    </p>
                    <Link to="/demo" className="button button-primary-ghost">Live demo</Link>
                    <Link to="/register" className="button button-primary">Get started for free</Link>
                </div>

            </Container>
        </section>
    );
};
export default CTA;