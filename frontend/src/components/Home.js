import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Container,
	Grid,
	Typography,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
} from "@material-ui/core";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import Carousel from "react-material-ui-carousel";
import { carouselImages, fiveSteps } from "../Shared/shared";

const useStyles = makeStyles((theme) => ({
	home_page: {
		display: "flex",
		flexDirection: "column",
		marginTop: theme.spacing(6),
	},
	homepage_top: {
		display: "flex",
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column-reverse",
			alignItems: "center",
		},
		[theme.breakpoints.up("md")]: {
			flexDirection: "row",
			alignItems: "center",
		},
	},
	carousel_side: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	carousel_image: {
		height: "450px",
		width: "650px",
	},
	about_fivei: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexWrap: "wrap",
		marginBottom: theme.spacing(6),
		padding: theme.spacing(2),
		backgroundColor: "#eee3e8",
	},
	fivei_card: {
		margin: theme.spacing(2),
		width: "280px",
		height: "320px",
	},
	card_media: {
		height: "110px",
	},
	fivei_heading: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		marginTop: theme.spacing(6),
	},
}));

export const Home = () => {
	const classes = useStyles();

	return (
		<Container disableGutters className={classes.home_page}>
			<Container className={classes.homepage_top}>
				<Grid xs={12} md={5} item className={classes.about_side}>
					<Typography component="h1" variant="h3" style={{ color: "#5c68d6" }}>
						About The Competiton
					</Typography>
					<Typography
						component="h3"
						variant="h4"
						style={{
							color: "#d0007b",
							fontWeight: "bold",
							fontFamily: "Comic Sans MS",
						}}
					>
						Ready Set Go!
					</Typography>
					<Typography
						component="h6"
						variant="h6"
						style={{
							color: "#000000",
							fontFamily: "Comic Sans MS",
							fontWeight: "bold",
							marginTop: "25px",
						}}
					>
						Our City, Our Challenge is inviting youth to demonstrate how your
						act of Active Citizenship can potentially influence quality of life.
					</Typography>
					<Typography
						component="h6"
						variant="h6"
						style={{
							color: "#434343",
							marginTop: "25px",
						}}
					>
						Active Citizenship actions by you, will go a long way in improving
						our local communities, our cities and therefore, our country. The
						Challenge enables 21st century skills in you! Share your innovative
						ideas and actions with us!
					</Typography>
				</Grid>
				<Grid xs={12} md={7} item className={classes.carousel_side}>
					<Carousel
						NextIcon={<KeyboardArrowRightIcon />}
						PrevIcon={<KeyboardArrowLeftIcon />}
					>
						{carouselImages.map((cimg) => (
							<img
								key={cimg.id}
								src={cimg.image}
								className={classes.carousel_image}
							/>
						))}
					</Carousel>
				</Grid>
			</Container>
			<Grid item className={classes.fivei_heading}>
				<Typography
					component="h3"
					variant="h4"
					style={{
						color: "#f186c0",
						fontWeight: "bold",
						fontFamily: "Comic Sans MS",
					}}
				>
					5 Steps of the Challenge
				</Typography>
			</Grid>
			<Container className={classes.about_fivei}>
				{fiveSteps.map((step) => {
					return <AboutCard key={step.id} step={step} />;
				})}
			</Container>
		</Container>
	);
};

export const AboutCard = ({ step }) => {
	const classes = useStyles();
	return (
		<Card raised className={classes.fivei_card}>
			<CardActionArea>
				<CardMedia
					className={classes.card_media}
					image={step.image}
					title={step.label}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{step.label}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{step.info}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};
