import React from 'react';
import Container from '../Base/Container';
import AdminHeader from '../AdminHeader';
import AdminStatsCards from '../AdminStatsCards';

const AdminPanel = () => {
  return (
    <Container>
      <AdminHeader  pageName="Dashboard" />
      <AdminStatsCards />
    </Container >
  );
};

export default AdminPanel;
