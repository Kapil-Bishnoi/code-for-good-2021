import axios from "axios";
import React, { useEffect, useState } from "react";
import {
	makeStyles,
	Grid,
	Container,
	Button,
	CssBaseline,
	TextField,
	Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
	},

	stageItem: {
		marginTop: theme.spacing(1),
		display: "flex",
		flexDirection: "column",
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
	},
	qItem: {
		padding: theme.spacing(2),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export const FiveI = ({ projId }) => {
	const classes = useStyles();

	const [fiveI, setFiveI] = useState({
		identify: null,
		investigation: null,
		ideation: null,
		implementation: null,
		inform: null,
	});
	console.log(fiveI);

	// const [identify, setIdentify] = useState(fiveI.identify);
	// const [investigation, setInvestigation] = useState(fiveI.investigation);
	// const [ideation, setIdeation] = useState(fiveI.ideation);
	// const [implementation, setImplementation] = useState(fiveI.implementation);
	// const [inform, setInform] = useState(fiveI.inform);

	const { identify, investigation, ideation, implementation, inform } = {
		...fiveI,
	};

	useEffect(() => {
		axios
			.get(`https://cfg2021.herokuapp.com/fivei/${projId}`)
			.then((res) => {
				console.log(res);
				const dataObj = res.data.data;
				setFiveI(dataObj[0]);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleQuestionChange = ({
		event: e,
		stageNumber: stageNumber,
		questionNumber: questionNumber,
	}) => {
		console.log(e.target.value, stageNumber, questionNumber);
		switch (stageNumber) {
			case 1:
				const i1 = {
					...fiveI.identify,
					questions: fiveI.identify.questions.map((q) => {
						if (q.qId === questionNumber) {
							return {
								...q,
								qAns: e.target.value,
							};
						}
						return q;
					}),
				};
				setFiveI({
					...fiveI,
					identify: i1,
				});
			case 2:
				const i2 = {
					...fiveI.investigation,
					questions: fiveI.investigation.questions.map((q) => {
						if (q.qId === questionNumber) {
							return {
								...q,
								qAns: e.target.value,
							};
						}
						return q;
					}),
				};
				setFiveI({
					...fiveI,
					investigation: i2,
				});
			case 3:
				const i3 = {
					...fiveI.ideation,
					questions: fiveI.ideation.questions.map((q) => {
						if (q.qId === questionNumber) {
							return {
								...q,
								qAns: e.target.value,
							};
						}
						return q;
					}),
				};
				setFiveI({
					...fiveI,
					ideation: i3,
				});
			case 4:
				const i4 = {
					...fiveI.implementation,
					questions: fiveI.implementation.questions.map((q) => {
						if (q.qId === questionNumber) {
							return {
								...q,
								qAns: e.target.value,
							};
						}
						return q;
					}),
				};
				setFiveI({
					...fiveI,
					implementation: i4,
				});
			case 5:
				const i5 = {
					...fiveI.inform,
					questions: fiveI.inform.questions.map((q) => {
						if (q.qId === questionNumber) {
							return {
								...q,
								qAns: e.target.value,
							};
						}
						return q;
					}),
				};
				setFiveI({
					...fiveI,
					inform: i5,
				});
			default: return;
		}
	};

	return (
		<Container component="main" className={classes.root}>
			<CssBaseline />
			<div className={classes.stageItem}>
				<StageItem
					label="1) Identify"
					stage={identify}
					cnt={1}
					handleQuestionChange={handleQuestionChange}
				/>
			</div>
			<div className={classes.stageItem}>
				<StageItem
					label="2) investigation"
					stage={investigation}
					cnt={2}
					handleQuestionChange={handleQuestionChange}
				/>
			</div>
			<div className={classes.stageItem}>
				<StageItem
					label="3) Ideation"
					stage={ideation}
					cnt={3}
					handleQuestionChange={handleQuestionChange}
				/>
			</div>
			<div className={classes.stageItem}>
				<StageItem
					label="4) Implementation"
					stage={implementation}
					cnt={4}
					handleQuestionChange={handleQuestionChange}
				/>
			</div>
			<div className={classes.stageItem}>
				<StageItem
					label="5) Inform"
					stage={inform}
					cnt={5}
					handleQuestionChange={handleQuestionChange}
				/>
			</div>
		</Container>
	);
};

function StageItem({ stage, label, cnt, handleQuestionChange }) {
	const classes = useStyles();
	return (
		<>
			<Grid item xs={12} className={classes.title}>
				<Typography component="h1" variant="h4">
					{label}
				</Typography>
			</Grid>
			<Container className={classes.formContainer}>
				<form className={classes.form} noValidate>
					{stage?.questions.map((q) => {
						return (
							<Grid
								item
								xs={12}
								className={classes.qItem}
								key={`i${cnt}q${q.qId}`}
							>
								<TextField
									onChange={(e) =>
										handleQuestionChange({
											event: e,
											stageNumber: cnt,
											questionNumber: q.qId,
										})
									}
									value={q.qAns}
									autoComplete="off"
									name={`i${cnt}q${q.qId}`}
									variant="outlined"
									required
									fullWidth
									id={`i${cnt}q${q.qId}`}
									label={q.qText + ` [max marks: ${q.maxMarks}]`}
									multiline
									rows={5}
								/>
							</Grid>
						);
					})}
					{stage?.images.map((q) => {
						return (
							<Grid
								item
								xs={12}
								className={classes.qItem}
								key={`i${cnt}i${q.imageId}`}
							>
								<TextField
									autoComplete="off"
									name={`i${cnt}i${q.qId}`}
									variant="outlined"
									required
									fullWidth
									id={`i${cnt}i${q.qId}`}
									label={q.imageText + ` [max marks: ${q.maxMarks}]`}
									multiline
									rows={5}
								/>
							</Grid>
						);
					})}
					{stage?.videos.map((q) => {
						return (
							<Grid
								item
								xs={12}
								className={classes.qItem}
								key={`i${cnt}v${q.videoId}`}
							>
								<TextField
									autoComplete="off"
									name={`i${cnt}v${q.qId}`}
									variant="outlined"
									required
									fullWidth
									id={`i${cnt}v${q.qId}`}
									label={q.videoText + ` [max marks: ${q.maxMarks}]`}
									multiline
									rows={5}
								/>
							</Grid>
						);
					})}
				</form>
			</Container>
		</>
	);
}
