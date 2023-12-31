import { useDispatch } from 'react-redux';
import { Formik, Form, ErrorMessage } from 'formik';
import { toast } from 'react-hot-toast';
import { IoMdPersonAdd } from 'react-icons/io';
import { useContacts } from 'hooks/useContacts';
import { addContact } from 'redux/contacts/operations';
import { contactSchema, isIncludesContact } from 'helpers/helpers';
import {
  Error,
  Label,
  NameInputIcon,
  NumberInputIcon,
  StyledInput,
  SubmitButton,
  WrapperInput,
} from './Form.styled';

export const AddContactForm = () => {
  const contacts = useContacts();
  const dispatch = useDispatch();

  const onSubmit = ({ name, number }, { resetForm }) => {
    if (isIncludesContact(contacts, name, number)) {
      return;
    }

    dispatch(addContact({ name, number }))
      .unwrap()
      .then(resp => {
        toast.remove();
        toast.success(`${name} added to contacts`);
      })
      .catch(error => {
        toast.remove();
        toast.error('Oops, something went wrong. Try again.');
      });

    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      onSubmit={onSubmit}
      validationSchema={contactSchema}
    >
      <Form>
        <Label>
          Name
          <WrapperInput>
            <StyledInput
              type="text"
              name="name"
              placeholder="First name Last name"
            />
            <NameInputIcon size={18} />
          </WrapperInput>
          <ErrorMessage name="name" component={Error} />
        </Label>

        <Label>
          Number
          <WrapperInput>
            <StyledInput type="tel" name="number" placeholder="000-00-00" />
            <NumberInputIcon />
          </WrapperInput>
          <ErrorMessage name="number" component={Error} />
        </Label>

        <SubmitButton type="submit">
          <IoMdPersonAdd size={20} />
          Add contact
        </SubmitButton>
      </Form>
    </Formik>
  );
};
