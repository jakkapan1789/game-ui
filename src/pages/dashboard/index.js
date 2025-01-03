import * as React from "react";
import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import withAuth from "@/components/withAuth";
import HomeScreen from "@/components/HomeScreen/HomeScreen";
import DashboardScreen from "@/components/DashboardScreen/DashboardScreen";

function App() {
  const [socket, setSocket] = React.useState(null);
  const [username, setUsername] = React.useState("Jakakapn Pakeerat");
  const [users, setUsers] = React.useState([]);

  const [gameOnline, setGameOnline] = React.useState(0);

  return (
    <React.Fragment>
      <Head>
        <title>Dashboard - Focus V2</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout username={username} users={users}>
        <DashboardScreen />
      </Layout>
    </React.Fragment>
  );
}

export default withAuth(App);
