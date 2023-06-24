import {useForm} from 'react-hook-form';
import {
    InputAdornment,
    IconButton,
    Button,
    Paper,
    Box,
    Container,
    Typography,
} from '@mui/material';
import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Styles from './AddNewItemtoSubProcurementPlan.module.css';
import TextField from '@mui/material/TextField';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Link as RouterLink} from 'react-router-dom';
import DonePopup from '../../components/Popups/DonePopup/DonePopup';
import {useState, useEffect} from 'react';
import SelectDropDown from '../../components/SelectDropDown/SelectDropDown';
import {getCategoryList} from '../../services/DivisionHOD/deivisionHODServices';
import {addNewItemDb} from '../../services/DivisionHOD/deivisionHODServices';

function AddNewItemtoSubProcurementPlan() {
    const {
        getValues,
        register,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm({mode: 'onChange'});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCategoryList();
                console.log(data);
                setCategoryList(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategoryName, setSelectedCategoryName] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const handleCategoryIdChange = (event) => {
        setSelectedCategoryName(event.target.value);
        console.log(event.target.value);
        
    };

    const onSubmit = async () => {
        const data = getValues();
        handleSearch();
        console.log(categoryId);
        addNewItemDb(data.itemName,data.itemSpecification,categoryId)
        console.log(data);
    };

    const handleSearch = () => {
        const category = categoryList.find(
          (category) => category.categoryName === selectedCategoryName
        );
    
        if (category) {
          setCategoryId(category.categoryId);
        } else {
          console.log('Category not found.');
        }
      };

    return (
        <div style={{display: 'flex', overflow: 'hidden'}}>
            <Container
                sx={{ml: {xs: '20px', sm: '20px', md: '20px', lg: '21px', xl: '22px'},}}>
                <div>
                    <div className={Styles.headTitle}>
                        <RouterLink to={-1}>
                            <IconButton
                                sx={{pl: '15px', height: '34px', width: '34px', mt: 3.7}}
                            >
                                <ArrowBackIosIcon sx={{color: '#ffffff'}}/>
                            </IconButton>
                        </RouterLink>
                        <h1 className={Styles.headTitleName}> Add New Item</h1>
                    </div>
                </div>
                <div>
                    <Paper elevation={6} sx={{
                        pl: 5,
                        pr: {lg: 5, md: 5},
                        ml: {lg: 2.5, md: 1},
                        mr: 2,
                        borderRadius: 10,
                    }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={Styles.entireBody}>
                                <div className={Styles.bodyContainer}>
                                    <Typography>Category</Typography>
                                    <SelectDropDown
                                        list={categoryList.map((category) => category.categoryName)}
                                        value={selectedCategoryName}
                                        onChange={handleCategoryIdChange}
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="itemName"
                                        label="Item Name"
                                        name="itemName"
                                        autoFocus
                                        {...register('itemName', {required: {value: true, message: "Cant be Empty"}})}
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        rows={5}
                                        multiline
                                        id="itemSpecification"
                                        label="Specification"
                                        {...register('itemSpecification', {required: true})}
                                    />
                                    <div className={Styles.addButton}>
                                        <Button type="submit" disabled={!isValid}>
                                            <DonePopup
                                                text={'Successfully Added New Item to System'}
                                                title={'Add'}
                                                styles={{
                                                    marginTop: '5px',
                                                    borderRadius: 5,
                                                    height: 60,
                                                    width: 300,
                                                }}
                                            />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Paper>
                </div>
            </Container>
        </div>
    );
}

export default AddNewItemtoSubProcurementPlan;
