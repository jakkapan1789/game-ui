// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";

// import { Stack, Container } from "@mui/material";
// import Transition from "../Transition";
// import Aos from "aos";
// import UserProfile from "./UserProfile";
// import BackdropLoading from "../BackdropLoading";

// import { useRouter } from "next/router";

// const menuItems = [
//   { text: "Dashboard", href: "/dashboard" },
//   { text: "My Work", href: "/tasks" },
//   { text: "Management Tools", href: "#mgmt" },
// ];

// export default function Layout({ username, users, children }) {
//   React.useEffect(() => {
//     Aos.init();
//   }, []);
//   const router = useRouter();

//   const handleNavigation = (url) => {
//     router.push(url);
//   };
//   return (
//     <React.Fragment>
//       <BackdropLoading />
//       <CssBaseline />
//       <AppBar
//         component="nav"
//         sx={{ backgroundImage: "linear-gradient(to right, #1e3a8a, #3b82f6)" }}
//       >
//         <Toolbar
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Stack direction={"row"} spacing={2}>
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: "bold",
//                 color: "white",
//               }}
//             >
//               Focus V2
//             </Typography>
//             <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, ml: 1 }}>
//               {menuItems.map((item) => (
//                 <Typography
//                   key={item.text}
//                   sx={{
//                     color: "white",
//                     textDecoration: "none",
//                     "&:hover": {
//                       color: "white",
//                       backgroundColor: "#161D6F",
//                       transition: "background-color 0.3s, transform 0.3s",
//                     },
//                     transition: "color 0.3s",
//                     cursor: "pointer",
//                     padding: "3px 15px",
//                     borderRadius: 5,
//                   }}
//                   onClick={() => handleNavigation(item.href)}
//                 >
//                   {item.text}
//                 </Typography>
//               ))}
//             </Box>
//           </Stack>

//           <Box>
//             <UserProfile />
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <Box component="main">
//         <Toolbar />

//         <Container
//           maxWidth="xl"
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             pt: { xs: 2, sm: 2 },
//             pb: { xs: 8, sm: 8 },
//           }}
//         >
//           <Stack
//             spacing={2}
//             useFlexGap
//             sx={{
//               width: {
//                 xs: "100%",
//                 sm: "100%",
//                 md: "100%",
//                 lg: "100%",
//                 xl: "100%",
//               },
//             }}
//           >
//             <Transition>{children}</Transition>
//           </Stack>
//         </Container>
//       </Box>
//     </React.Fragment>
//   );
// }

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Stack, Container } from "@mui/material";
import Transition from "../Transition";
import Aos from "aos";
import UserProfile from "./UserProfile";
import BackdropLoading from "../BackdropLoading";
import { useRouter } from "next/router";

const menuItems = [
  { text: "Dashboard", href: "/dashboard" },
  { text: "My Work", href: "/tasks" },
  { text: "Management Tools", href: "#mgmt" },
];

export default function Layout({ username, users, children }) {
  const router = useRouter();

  React.useEffect(() => {
    Aos.init();
  }, []);

  const handleNavigation = (url) => {
    router.push(url);
  };

  return (
    <React.Fragment>
      <BackdropLoading />
      <CssBaseline />

      <AppBar
        component="nav"
        sx={{ backgroundImage: "linear-gradient(to right, #1e3a8a, #3b82f6)" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction="row" spacing={2}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              Focus V2
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, ml: 1 }}>
              {menuItems.map(({ text, href }) => (
                <Typography
                  key={text}
                  sx={{
                    cursor: "pointer",
                    color: "white",
                    textDecoration: "none",
                    cursor: "pointer",
                    padding: "3px 15px",
                    borderRadius: 5,
                    transition:
                      "background-color 0.3s, color 0.3s, transform 0.3s",
                    "&:hover": {
                      backgroundColor: "#161D6F",
                      transform: "scale(1.05)",
                    },
                  }}
                  onClick={() => handleNavigation(href)}
                >
                  {text}
                </Typography>
              ))}
            </Box>
          </Stack>

          <UserProfile />
        </Toolbar>
      </AppBar>

      <Box component="main">
        <Toolbar />
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: 2,
            pb: 8,
          }}
        >
          <Stack
            spacing={2}
            sx={{
              width: "100%",
            }}
          >
            <Transition>{children}</Transition>
          </Stack>
        </Container>
      </Box>
    </React.Fragment>
  );
}
