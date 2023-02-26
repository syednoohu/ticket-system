// /// Main component///
// const { handleSubmit, reset, formState: { errors }, control } = useForm({
//   defaultValues: {
//     contractCode: 'sss',
//     stores: [],
//   },
//   resolver: yupResolver(schema)
// });

// return (
//   .......
//   <Box  m="1rem 0.7rem"
//     <FormInputText errors={errors} control={control} name='contractCode'  label='Contract Code' />
//     <FormMultipleSelectChip errors={errors} control={control} name='stores' required label='Stores' stores ={storeNames} />
//     </Box>
//     .......
// );

// const names = [
//   'Oliver Hansen',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];


// /// Below is my Child component to re-use
// export default function MultipleSelectChip({ label, inputProps, control, name, errors,stores }) {
//   const [personName, setPersonName] = React.useState([]);
//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setPersonName(
//   };

//   return (
//     <div>
//       <FormControl >
//         <Typography> Locations </Typography>
//         <Controller
//           name={name}
//           control={control}
//           render={({ field : { onChange, value, ...rest} }) => (
//             <Select 
//             {...rest}
//             multiple
//             value={personName}
//             onChange={handleChange}
//             renderValue={(selected) => (
//               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                 {selected.map((value) => (
//                   <Chip key={value} label={value} />
//                 ))}
//               </Box>
//             )}
//             MenuProps={MenuProps}
//           >
//             {stores.map((name) => (
//               <MenuItem key={name} value={name} >
//                 {name}
//               </MenuItem>
//             ))}
//           </Select>
//           )}
//         />
//       </FormControl>
//     </div>
//   );
// }

//   this is from parent component 

//   <FormMultipleSelectWithChip errors={errors} control={control} name='location'  locationList ={["NY", "UK", "USA"....]} />
//   <FormMultipleSelectWithChip errors={errors} control={control} name='fruits'  locationList ={["apple", "banana", .....]} />
  
//   you have to write the reusabale child component <FormMultipleSelectWithChip/> 


// In Application.js 
// import  {FormInputDate}  from "./components/V1/FormInputDate";

//  <FormInputDate errors={errors} control={control} name='leaveFrom' required label='Leave From' />
//  <FormInputDate errors={errors} control={control} name='leaveTo' required label='Leave To' />


//  In FormInputDate.js You have write the code as given in the reference

//  import  {FormInputDate}  from "./components/V1/FormInputDate";
 