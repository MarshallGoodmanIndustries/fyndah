import { businesslogo } from "../assets/images";

const landingPageNavMenu = [
    {
        title: "Home",
        url: "/",
    },
    {
        title: "Login",
        url: "/login",
    },
];

const searchQueryCategories = [
    "Professional Services",
    "Healthcare",
    "Education and Training",
    "Home and Personal Services",
    "Technology and IT Services",
    "Hospitality and Travel",
    "Financial Services",
    "Retail and E-commerce(High-End)",
    "Health and Wellness",
    "B2B Services",
    "Automotive",
    "Others",
];

const searchQueryRatings = ["1 star","2 stars","3 stars","4 stars","5 stars"];

const searchQueryBusinessProfiles = [
    {
        businessProfileImg: businesslogo,
        businessName: "Tech Innovations Inc.",
        businessTitle: "Software Development Company",
        businessLocation: "New York, NY",
        businessRating: 4.5,
        businessCategory: "Technology and IT Services",
        businessTime: "8am-5pm"
      },
      {
        businessProfileImg: businesslogo,
        businessName: "Green Planet Gardening",
        businessTitle: "Landscape Design Firm",
        businessLocation: "Los Angeles, CA",
        businessRating: 4.7,
        businessCategory: "Home and Personal Services",
        businessTime: "8am-5pm"
      },
      {
        businessProfileImg: businesslogo,
        businessName: "Healthy Hearts Clinic",
        businessTitle: "Cardiology Specialist",
        businessLocation: "Chicago, IL",
        businessRating: 4.9,
        businessCategory: "Healthcare",
        businessTime: "8am-5pm"
      },
      {
        businessProfileImg: businesslogo,
        businessName: "Eco-Friendly Solutions",
        businessTitle: "Environmental Consulting Firm",
        businessLocation: "San Francisco, CA",
        businessRating: 4.3,
        businessCategory: "Professional Services",
        businessTime: "8am-5pm"
      },
      {
        businessProfileImg: businesslogo,
        businessName: "Luxury Living Estates",
        businessTitle: "Real Estate Agency",
        businessLocation: "Miami, FL",
        businessRating: 4.8,
        businessCategory: "Real Estate Agencies",
        businessTime: "8am-5pm"
      }
]


const landingPageFooterMenu = [
    {
        title:"Home",
        anchor:"/"
    },
    {
        title:"About Us",
        anchor:"#about"
    },
    {
        title:"Services",
        anchor:"#services"
    },
    {
        title:"Portfolio",
        anchor:"#portfolio"
    },
    {
        title:"Contact Us",
        anchor:"#contact"
    },
]

const featuredPostsLoadingDummy = [1,2,3,4,5,6,7,8,9];



export {landingPageNavMenu, landingPageFooterMenu,  searchQueryCategories, searchQueryRatings, searchQueryBusinessProfiles, featuredPostsLoadingDummy};