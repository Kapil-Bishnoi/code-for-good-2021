
const i1Stage = {
	questions: [
		{
			qId: 0,
			qText: "What is the problem you / team identified ?",
			qAns: "",
			maxMarks: 10,
		},
		{
			qId: 1,
			qText: "Explain why you identified this problem",
			qAns: "",
			maxMarks: 5,
		},
	],
	images: [
		{
			imageId: 0,
			imageText: "you have a picture of identified problem? Share it here!",
			imageURL: "",
			maxMarks: 10,
		},
	],
	videos: [
		{
			videoId: 0,
			videoText: "you have a video of identified problem? Share its link here!",
			videoURL: "",
			maxMarks: 10,
		},
	],
};

const i2Stage = {
	questions: [
		{
			qId: 0,
			qText:
				"Number of citizens you spoke in order to understand your issue better?",
			qAns: "",
			maxMarks: 10,
		},
	],
	images: [
		{
			imageId: 0,
			imageText:
				"Have you captured a photo of your interaction? Share it here!",
			imageURL: "",
			maxMarks: 10,
		},
		{
			imageId: 1,
			imageText: "show us how your sample questionnaire looks like?",
			imageURL: "",
			maxMarks: 10,
		},
	],
	videos: [
		{
			videoId: 0,
			videoText:
				"Have you captured a video of your interaction? Share its link here!",
			videoURL: "",
			maxMarks: 10,
		},
	],
};

const i3Stage = {
	questions: [
		{
			qId: 0,
			qText:
				"Why did you decide to choose the above solution to solve the problem?",
			qAns: "",
			maxMarks: 10,
		},
		{
			qId: 1,
			qText: "How long do you think soluton will last?",
			qAns: "",
			maxMarks: 10,
		},
	],
	images: [
		{
			imageId: 0,
			imageText: "Have you captured a photo of your solution? Share it here!",
			imageURL: "",
			maxMarks: 10,
		},
	],
	videos: [],
};

const i4Stage = {
	questions: [
		{
			qId: 0,
			qText:
				"Did you approach (either through WhatsAppSMS/Letter/Email/Meeting) your local government for your solution? (Councillor/MLA/Electricity/Water/Other Agencies)",
			qAns: "",
			maxMarks: 10,
		},
		{
			qId: 1,
			qText:
				"In case of water conservation, climate change and waste management, please fill up the amount of waste saved, water saved, carbon footprint after you have undertaken the project",
			qAns: "",
			maxMarks: 10,
		},
	],
	images: [
		{
			imageId: 0,
			imageText: "Share the photos of your implemented solution",
			imageURL: "",
			maxMarks: 10,
		},
		{
			imageId: 1,
			imageText: "Share photos of jingle, awareness campaigns etc? (optional)",
			imageURL: "",
			maxMarks: 10,
		},
	],
	videos: [
		{
			videoId: 0,
			videoText: "Share the videos of your implemented solution",
			videoURL: "",
			maxMarks: 10,
		},
	],
};

const i5Stage = {
	questions: [
		{
			qId: 0,
			qText: "Who was the mentor of this project?",
			qAns: "",
			maxMarks: 10,
		},
		{
			qId: 1,
			qText: "Share their contact number and email id",
			qAns: "",
			maxMarks: 10,
		},
		{
			qId: 2,
			qText: "How long did you work on this project?",
			qAns: "",
			maxMarks: 10,
		},
	],
	images: [],
	videos: [],
};

module.exports = { i1Stage, i2Stage, i3Stage, i4Stage, i5Stage };
