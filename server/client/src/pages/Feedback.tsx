import React, { useState } from 'react';
import {
	Formik,
	FormikHelpers,
	FormikProps,
	Form,
	Field,
	FieldProps,
} from 'formik';
import {
	FormSuccess,
	SubmitButton,
	Label,
	Button,
	TextAreaInput,
	TextInput,
} from '../components/index';
import * as yup from "yup"

interface FeedbackProps {}

const feedbackSchema = yup.object({
	firstName: yup.string(),
	lastName: yup.string(),
	email: yup.string().email(),
	content: yup.string()
})

type feedbackType = yup.InferType<typeof feedbackSchema>

export const Feedback: React.FC<FeedbackProps> = () => {
	const [step, setStep] = useState(1);
	const handleSubmit = () => setStep(step + 1);

	const initialValues: feedbackType = {
		firstName: '',
		lastName: '',
		email: '',
		content: '',
	};

	return (
		<div className='container flex flex-col items-center '>
			<div className='text-left text-2xl p-5'>
				<h1> send your feedback</h1>
			</div>
			<Formik
				enableReinitialize
				initialValues={initialValues}
				onSubmit={(values, actions) => {
					handleSubmit();
					console.log(values);
				}}
				validate={feedbackSchema}>
				<Form className="w-11/12 lg:w-4/5 lg:w-1/2 xl:w-1/3 items-center ">
					<div className='flex-auto flex flex-col py-4'>
						{step === 1 && (
							<>
								<Label name='firstname'>First Name</Label>
								<Field
									id='firstName'
									name='firstName'
									placeholder='First Name'
									as={TextInput}
								/>
								<Label name='lastName'>Last Name</Label>
								<Field
									id='lastName'
									name='lastName'
									placeholder='Last Name'
									as={TextInput}
								/>
								<Label name='email'>Email</Label>

								<Field
									id='email'
									name='email'
									placeholder='email'
									as={TextInput}
								/>
							</>
						)}
						{step === 2 && (
							<>
								<Label name='lastName'>Your Feedback</Label>
								<Field
									id='contente'
									name='contente'
									placeholder='your feedback'
									as={TextAreaInput}
								/>
							</>
						)}
						{step === 3 && (
							<>
								<FormSuccess></FormSuccess>
							</>
						)}
					</div>
					<div className="flex space-x-3">
						{step === 1 && <SubmitButton>next</SubmitButton>}
						{step === 2 && (
							<>
								<Button handleClick={() => setStep(step - 1)}> back</Button>
								<SubmitButton>Send</SubmitButton>
							</>
						)}
						{step === 3 && (
							<Button handleClick={() => setStep(step - 1)}>
								Send Another one
							</Button>
						)}
					</div>
				</Form>
			</Formik>
		</div>
	);
};
