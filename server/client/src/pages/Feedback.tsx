import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
	FormSuccess,
	SubmitButton,
	Label,
	Button,
	TextAreaInput,
	TextInput,
} from '../components/index';
import * as yup from 'yup';
import { sendFeedack } from '../utils/api';

interface FeedbackProps {}

// define 2 steps validation schema with yup
const InfoSchema = yup.object({
	firstName: yup.string(),
	lastName: yup.string(),
	email: yup.string().email('invalid email').required('required'),
});

const MessageSchema = yup.object({
	content: yup.string().required('required'),
});

// infer type from the 2 steps validation schemas
type InfoType = yup.InferType<typeof InfoSchema>;
type MessageType = yup.InferType<typeof MessageSchema>;
export interface FeedbackType extends InfoType, MessageType {}

// define intitial values of feedback form
const initialValues: FeedbackType = {
	firstName: '',
	lastName: '',
	email: '',
	content: '',
};

export const Feedback: React.FC<FeedbackProps> = () => {
	const [step, setStep] = useState(1);
	const handleSubmit = () => setStep(step + 1);

	return (
		<div className='container flex flex-col items-center '>
			<div className='text-left text-2xl p-5'>
				<h1> send your feedback</h1>
			</div>
			<Formik
				enableReinitialize
				initialValues={initialValues}
				// dynamically set validation schema
				validationSchema={
					step === 1 ? InfoSchema : step === 2 ? MessageSchema : null
				}
				onSubmit={(values, errors) => {
					if (step === 1)  handleSubmit();
					if (step === 2) sendFeedack({...values}).then(res => handleSubmit());
					console.log(values, errors);
				}}>
				{({ errors, touched }) => (
					<Form className='w-11/12 lg:w-4/5 lg:w-1/2 xl:w-1/3 items-center '>
						<div className='flex-auto flex flex-col py-4'>
							{step === 1 && (
								<>
									<Label name='firstname'>
										First Name{' '}
										{errors.firstName && touched.firstName && errors.firstName}
									</Label>
									<Field
										id='firstName'
										name='firstName'
										placeholder='First Name'
										as={TextInput}
									/>
									<Label name='lastName'>
										Last Name{' '}
										{errors.lastName && touched.lastName && errors.lastName}
									</Label>
									<Field
										id='lastName'
										name='lastName'
										placeholder='Last Name'
										as={TextInput}
									/>
									<Label name='email'>
										Email {errors.email && touched.email && errors.email}
									</Label>
									<Field
										id='email'
										name='email'
										placeholder='Email'
										as={TextInput}
									/>
								</>
							)}
							{step === 2 && (
								<>
									<Label name='content'>
										Your Feedback{' '}
										{errors.content && touched.content && errors.content}
									</Label>
									<Field
										id='content'
										name='content'
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
						<div className='flex space-x-3'>
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
				)}
			</Formik>
		</div>
	);
};
