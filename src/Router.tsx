import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Test from './Pages/Test';
import Menu from './Pages/Menu';
import Spinner from './Pages/Spinner';
import Intro from './Pages/Intro';
import Maps from './Pages/Maps';
import Join from './Pages/Join/Page';
import Edit from './Pages/Edit/Page';
import MyPage from './Pages/MyPage';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Spinner />}>
            <Intro />
          </Suspense>
        }
      />
      <Route path="/menu" element={<Menu />} />
      <Route path="/maps" element={<Maps />} />
      <Route path="/join" element={<Join />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
