import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import PostList from "../list/PostList";
import Button from "../ui/Button";
import data from '../../data.json';

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;

    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

function MainPage(props) {
    const navigate = useNavigate();
    const location = useLocation();
    
    // 초기 게시글 데이터를 로컬 스토리지에서 불러오거나 없으면 기본 데이터 사용
    const [posts, setPosts] = useState(() => {
        const savedPosts = localStorage.getItem('posts');
        return savedPosts ? JSON.parse(savedPosts) : data;
    });

    // location.state에 있는 newPost가 있을 경우에만 추가
    useEffect(() => {
        if (location.state?.newPost) {
            const updatedPosts = [location.state.newPost, ...posts];
            setPosts(updatedPosts);

            // 로컬 스토리지에 업데이트된 게시글 저장
            localStorage.setItem('posts', JSON.stringify(updatedPosts));

            // 상태를 초기화하여 무한으로 게시글이 추가되지 않도록 설정
            navigate("/", { replace: true, state: {} });
        }
    }, [location.state?.newPost]); // posts를 dependency에서 제거

    return (
        <Wrapper>
            <Container>
                <Button
                    title="글 작성하기"
                    onClick={() => {
                        navigate("/post-write");
                    }}
                />

                <PostList
                    posts={posts}
                    onClickItem={(item) => {
                        navigate(`/post/${item.id}`);
                    }}
                />
            </Container>
        </Wrapper>
    );
}

export default MainPage;