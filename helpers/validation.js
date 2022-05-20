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

const validateSessionSchema = yup.object().shape({
  id: yup.string().required(),
  ts: yup.number(),
  hour: yup.number().required(),
  paid: yup.bool(),
  notes: yup.string(),
});

export {validClient, validSession};
