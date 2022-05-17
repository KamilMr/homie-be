import yup from 'yup';

const validateSchema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  price: yup.number().required(),
  start: yup.number().required(),
  end: yup.number(),
  week_day: yup.number().required(),
  hour: yup.number().required(),
});

export {validateSchema};
