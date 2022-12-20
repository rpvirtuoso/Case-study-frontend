import { AppBar, Button, IconButton,Hidden, Stack, Toolbar, Typography } from "@mui/material";
import StoreIcon from '@mui/icons-material/Store';
import {Menu,MenuItem,Box} from "@mui/material";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import SearchAppBar from "./SearchBar";
import { useState ,useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import axios from "axios";
import MoreVertIcon from '@mui/icons-material/MoreVert';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    gridItem: {
        '&:hover': {
          backgroundColor: '#eee',
        },
      },
    productCard: {
      padding: theme.spacing(2),
    },
    productImage: {
      width:128,
      height:128,
      
    },
    productName: {
      marginTop: theme.spacing(1),
    },
    productPrice: {
      marginTop: theme.spacing(1),
      fontWeight: 'bold',
    },
  }));


const Muinavbar = () => {
    const cat1='Books and Education';
    const cat2='Electronics';
    const cat3='Fashion and Beauty';
    const cat4='Gaming';
    const cat5='Home,Furniture and Appliances';
    const cat6='Office and Personal';
    const cat7='Sports,Outdoors and Travel';
    const all='all'

    const navigate = useNavigate();
    const [categoriesdropdown, setCategoriesDropdown] = useState(null);
    const [profiledropdown, setProfileDropdown] = useState(null);
    const [mobilecategoriesdropdown, setMobileCategoriesDropdown] = useState(null);
    const [mobileprofiledropdown, setMobileProfileDropdown] = useState(null);
    const [isAdmin,setIsAdmin]=useState(false);

    const [products, setProducts] = useState([]);
    const [filteredproducts,setFilteredProducts]=useState([]);
    const classes = useStyles();
    const [IsLoggedIn,setIsLoggedIn]=useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [apiResponse, setApiResponse] = useState(null);
    const [menuButtonAnchor, setMenuButtonAnchor] = useState(null);

    const handleMenuButtonClick = (event) => {
        setMenuButtonAnchor(event.currentTarget);
        };
    const handleMenuButtonClose = () => {
        setMenuButtonAnchor(null);
        };
    
  useEffect(() => {
    // Fetch the data from the API
    fetch('http://127.0.0.1:8000/api/products/')
      .then(response => response.json())
      .then(data => {
        setFilteredProducts(data);
        setProducts(data);
      });
      if (typeof localStorage.getItem('token') !="undefined"){
        setIsLoggedIn(true);
        console.log(setIsLoggedIn);
    }
    console.log('First useEffect is called')

  }, []);
  useEffect(() => {
    const token=localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Token ${token}` }
    };
    axios.get(`http://127.0.0.1:8000/api/account/checkAdmin`,config).then(response=>{
        console.log(response);
        if (response.status===200)
        {
            setIsAdmin(true);
        }
        // if
    })
    
}, [])
  useEffect(()=>{

        if (selectedCategory!='all'){
            const filteredProducts = products.filter(product => product.category === selectedCategory);
            setFilteredProducts(filteredProducts);
        }
        else{
            setFilteredProducts(products);
        }
       
      }
  ,[selectedCategory])


  function handleResponse(response) {
        console.log(response);
        setApiResponse(response);
        console.log(apiResponse);
}
    useEffect(()=>{
        console.log('third useEffect called')
        console.log(apiResponse);

        if(apiResponse===null){
            //  setFilteredProducts(apiResponse)

        }
        else if(apiResponse.status===200)
        {
                         setFilteredProducts(apiResponse.data)

        }
    },[apiResponse])

    // useEffect(() => {
    //     const handleResize = () => {
    //       if (window.innerWidth < 600) {
    //         setDropdownVisible(true);
    //       } else {
    //         setDropdownVisible(false);
    //       }
    //     };
    //     window.addEventListener('resize', handleResize);
    //     return () => {
    //       window.removeEventListener('resize', handleResize);
    //     };
    //   }, []);
    
    // const toggleDropdown = () => {
    //     setDropdownVisible(!dropdownVisible);
    //   };

    const handleLogout=()=>{

        const id=localStorage.getItem('user_id');
        console.log('clicked logout');
        const bodyParameters = {
            id: id,
         };
         const token=localStorage.getItem('token')
         const config = {
                 headers: { Authorization: `Token ${token}` }
             };
        axios.post("http://127.0.0.1:8000/api/account/logout",bodyParameters,config);
        setIsLoggedIn(false);
        console.log(IsLoggedIn);
        localStorage.clear();

    };
    const handleProfileClick=(event)=>{
        console.log('Clicked Profile')
        setProfileDropdown(event.currentTarget);

    };
   
    const handleProfileClose = () => {
        setProfileDropdown(null);
    };
    const handleMobileProfileClick=(event)=>{
        console.log('Clicked Profile')
        setProfileDropdown(event.currentTarget);

    };
   
    const handleMobileProfileClose = () => {
        setProfileDropdown(null);
    };
    const handleCategoriesClick = (event) => {
        console.log('Clicked Categories')
        setCategoriesDropdown(event.currentTarget);
    };
  
    const handleCategoriesClose = () => {
        setCategoriesDropdown(null);
    };
    const handleMobileCategoriesClick = (event) => {
        setCategoriesDropdown(event.currentTarget);
    };
  
    const handleMobileCategoriesClose = () => {
        setCategoriesDropdown(null);
    };
    
  return (
            <Box>
                <AppBar position='static'>
                    <Toolbar>
                    <IconButton onClick={() => {  navigate("/"); }} size='large' edge='start' color="inherit" aria-label="logo">
                        <StoreIcon/>
                    </IconButton>
                    <Typography  variant="h6" component='div' sx={{flexGrow:1}}>
                        <Button sx={{textTransform: "none"}} color="inherit" onClick={() => {  navigate("/"); }} >Shopping Cart</Button>
                    </Typography>
                    <SearchAppBar products={products} filteredproducts={filteredproducts} setFilteredProducts={setFilteredProducts} onApiResponse={handleResponse}/>
                        
                        <Stack direction='row' spacing={2}>
                        <Hidden smDown>
                        <Button
                            aria-controls="categories-menu"
                            aria-haspopup="true"
                            onClick={handleCategoriesClick}
                            color="inherit"
                            sx={{textTransform: "none"}}
                            >Categories</Button>
                    <Menu
                        id="categories-menu"
                        anchorEl={categoriesdropdown}
                        keepMounted
                        open={Boolean(categoriesdropdown)}
                        onClose={handleCategoriesClose}
                        >
                        <MenuItem onClick={() => setSelectedCategory(cat1)}>Books and Education</MenuItem>
                        <MenuItem onClick={() => setSelectedCategory(cat2)}>Electronics</MenuItem>
                        <MenuItem onClick={() => setSelectedCategory(cat3)}>Fashion and Beauty</MenuItem>
                        <MenuItem onClick={() => setSelectedCategory(cat4)}>Gaming</MenuItem>
                        <MenuItem onClick={() => setSelectedCategory(cat5)}>Home,Furniture and Appliances</MenuItem>
                        <MenuItem onClick={() => setSelectedCategory(cat6)}>Office and Personal</MenuItem>
                        <MenuItem onClick={() => setSelectedCategory(cat7)}>Sports,Outdoors and Travel</MenuItem>
                        <MenuItem onClick={() => setSelectedCategory(all)}>All</MenuItem>
                    </Menu>
                        {IsLoggedIn ? (
                                    <Button onClick={handleLogout} color="inherit" sx={{textTransform: "none"}}>Logout</Button>) 
                                :  (<Button onClick={() => {  navigate("/login"); }} color="inherit" sx={{textTransform: "none"}}>Login</Button>
                                        )}
                        <Button
                            aria-controls="profile-menu"
                            aria-haspopup="true"
                            onClick={handleProfileClick}
                            color="inherit"
                            sx={{textTransform: "none"}}
                            >Profile</Button>
                    <Menu
                         id="profile-menu"
                        anchorEl={profiledropdown}
                        keepMounted
                        open={Boolean(profiledropdown)}
                        onClose={handleProfileClose}                        
                        >
                        <MenuItem onClick={() => {navigate('/profile')}}>Your Profile</MenuItem>
                        <MenuItem onClick={() => {navigate('/orderhistory')}}>Order History</MenuItem>
                        {isAdmin ? (
                            <MenuItem onClick={() => {navigate('/admin')}}>Admin</MenuItem>) 
                                :  ( null
                                        )}
                    </Menu>
                    <IconButton onClick={() => {  navigate("/cart"); }}size="large" aria-label="show cart items" color="inherit">
                        <Badge badgeContent={0} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                        </Hidden>
                        <Hidden smUp>
                            <IconButton color="inherit" onClick={handleMenuButtonClick}>
                                <MoreVertIcon />
                            </IconButton>
                        <Menu
                                    anchorEl={menuButtonAnchor}
                                    keepMounted
                                    open={Boolean(menuButtonAnchor)}
                                    onClose={handleMenuButtonClose}
                            > 
                            <MenuItem onClick={handleCategoriesClick}>Categories</MenuItem>
                            <Menu
                                id="categories-menu"
                                anchorEl={categoriesdropdown}
                                keepMounted
                                open={Boolean(categoriesdropdown)}
                                onClose={handleCategoriesClose}>
                                <MenuItem onClick={() => setSelectedCategory(cat1)}>Books and Education</MenuItem>
                                <MenuItem onClick={() => setSelectedCategory(cat2)}>Electronics</MenuItem>
                                <MenuItem onClick={() => setSelectedCategory(cat3)}>Fashion and Beauty</MenuItem>
                                <MenuItem onClick={() => setSelectedCategory(cat4)}>Gaming</MenuItem>
                                <MenuItem onClick={() => setSelectedCategory(cat5)}>Home,Furniture and Appliances</MenuItem>
                                <MenuItem onClick={() => setSelectedCategory(cat6)}>Office and Personal</MenuItem>
                                <MenuItem onClick={() => setSelectedCategory(cat7)}>Sports,Outdoors and Travel</MenuItem>
                                <MenuItem onClick={() => setSelectedCategory(all)}>All</MenuItem>
                            </Menu>
                            {IsLoggedIn ? (
                                    <MenuItem onClick={handleLogout} color="inherit" sx={{textTransform: "none"}}>Logout</MenuItem>) 
                                :  (<MenuItem onClick={() => {  navigate("/login"); }} color="inherit" sx={{textTransform: "none"}}>Login</MenuItem>
                                        )}
                            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                                <Menu
                                    id="profile-menu"
                                    anchorEl={profiledropdown}
                                    keepMounted
                                    open={Boolean(profiledropdown)}
                                    onClose={handleProfileClose}>
                                    <MenuItem onClick={() => {navigate('/profile')}}>Your Profile</MenuItem>
                                    <MenuItem onClick={() => {navigate('/orderhistory')}}>Order History</MenuItem>
                {isAdmin ? (
                                    <MenuItem onClick={() => {navigate('/admin')}}>Admin</MenuItem>) 
                                :  ( null
                                        )}
                    </Menu>
                            <MenuItem onClick={handleMenuButtonClose}>
                                <IconButton onClick={() => {  navigate("/cart"); }}size="large" aria-label="show cart items" color="inherit">
                                    <Badge badgeContent={0} color="secondary">
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                            </MenuItem>
                        </Menu>
                        </Hidden>
                        {/* <Button
                            aria-controls="categories-menu"
                            aria-haspopup="true"
                            onClick={handleCategoriesClick}
                            color="inherit"
                            sx={{textTransform: "none"}}
                            >Categories</Button>
                    <Menu
                        id="categories-menu"
                        anchorEl={categoriesdropdown}
                        keepMounted
                        open={Boolean(categoriesdropdown)}
                        onClose={handleCategoriesClose}
                        >
                        <MenuItem onClick={() => setSelectedCategory(cat1)}>Books and Education</MenuItem>
                        <MenuItem onClick={() => setSelectedCategory(cat2)}>Electronics</MenuItem>
                        <MenuItem onClick={() => setSelectedCategory(cat3)}>Fashion and Beauty</MenuItem>
                        <MenuItem onClick={() => setSelectedCategory(cat4)}>Gaming</MenuItem>
                        <MenuItem onClick={() => setSelectedCategory(cat5)}>Home,Furniture and Appliances</MenuItem>
                        <MenuItem onClick={() => setSelectedCategory(cat6)}>Office and Personal</MenuItem>
                        <MenuItem onClick={() => setSelectedCategory(cat7)}>Sports,Outdoors and Travel</MenuItem>
                        <MenuItem onClick={() => setSelectedCategory(all)}>All</MenuItem>
                    </Menu>
                        {IsLoggedIn ? (
                                    <Button onClick={handleLogout} color="inherit" sx={{textTransform: "none"}}>Logout</Button>) 
                                :  (<Button onClick={() => {  navigate("/login"); }} color="inherit" sx={{textTransform: "none"}}>Login</Button>
                                        )}
                        <Button
                            aria-controls="profile-menu"
                            aria-haspopup="true"
                            onClick={handleProfileClick}
                            color="inherit"
                            sx={{textTransform: "none"}}
                            >Profile</Button>
                    <Menu
                         id="profile-menu"
                        anchorEl={profiledropdown}
                        keepMounted
                        open={Boolean(profiledropdown)}
                        onClose={handleProfileClose}                        
                        >
                        <MenuItem onClick={() => {navigate('/profile')}}>Your Profile</MenuItem>
                        <MenuItem onClick={() => {navigate('/orderhistory')}}>Order History</MenuItem>
                        {isAdmin ? (
                            <MenuItem onClick={() => {navigate('/admin')}}>Admin</MenuItem>) 
                                :  ( null
                                        )}
                    </Menu>
                    <IconButton onClick={() => {  navigate("/cart"); }}size="large" aria-label="show cart items" color="inherit">
                        <Badge badgeContent={0} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton> */}
                        </Stack>
                    </Toolbar>
                </AppBar>
                <div className={classes.root}>
                { <Grid container spacing={2}>
                {filteredproducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id} className={classes.gridItem}>
                        <div className={classes.productCard}>
                             <img onClick={()=>navigate(`/products/${product.id}`)} src={'http://127.0.0.1:8000'+product.image} alt={product.name} className={classes.productImage} />
                            <Typography variant="body1" className={classes.productName}>
                            {product.name}
                            </Typography>
                            <Typography variant="body2" className={classes.productPrice}>
                            {'₹'+product.price}
                            </Typography>
                        </div>
                    </Grid>
                    ))}
                </Grid> 
                }
    </div>
    </Box>
    
  )
}

export default Muinavbar
