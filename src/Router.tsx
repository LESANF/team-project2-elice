import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './Pages/Test';
import Menu from './Pages/Menu/Page';
import Spinner from './Pages/Home/Components/Spinner';
import Intro from './Pages/Home/Page';
import Join from './Pages/Join/Page';
import Edit from './Pages/Edit/Page';
import MyPage from './Pages/MyPage/Page';
import LoginDialog from './Pages/Join/Components/LoginDialog';
import ErrorPage from './Components/Commons/ErrorPage';
import PostWrite from './Pages/Post/Page';
import PhotoPost from './Pages/PhotoPost/Page';

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
      <Route path="/menu/maps" element={<Menu menuType="map" />} />
      <Route path="/menu/photolists" element={<Menu menuType="photo" />} />
      <Route path="/postwrite" element={<PostWrite />} />
      <Route path="/:postId" element={<PhotoPost />} />
      <Route path="/join" element={<Join />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/test" element={<Test />} />
      <Route path="/logindialog" element={<LoginDialog />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
