import { useEffect } from "react";
import ReactGA from "react-ga4";

function Analytics(): JSX.Element {
	useEffect(() => {
		setTimeout(() => {
			ReactGA.initialize("G-H0PC8ZZ7BN");
			ReactGA.send("pageview");
		}, 1000);
	}, []);

	return <></>;
}

export default Analytics;
