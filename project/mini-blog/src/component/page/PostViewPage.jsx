import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../list/CommentList";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import data from "../../data.json"; // 기본 data.json 파일

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

const PostContainer = styled.div`
    padding: 8px 16px;
    border: 1px solid grey;
    border-radius: 8px;
`;

const TitleText = styled.p`
    font-size: 28px;
    font-weight: 500;
`;

const ContentText = styled.p`
    font-size: 20px;
    line-height: 32px;
    white-space: pre-wrap;
`;

const CommentLabel = styled.p`
    font-size: 16px;
    font-weight: 500;
`;

function PostViewPage() {
    const navigate = useNavigate();
    const { postId } = useParams(); // URL에서 postId를 가져옴
    const [post, setPost] = useState(null); // 현재 보여질 게시글을 저장할 상태
    const [comment, setComment] = useState("");

    // 로컬 스토리지에서 게시글을 불러오기
    useEffect(() => {
        const savedPosts = localStorage.getItem('posts');
        const posts = savedPosts ? JSON.parse(savedPosts) : data; // 로컬 스토리지에 저장된 글이나 기본 데이터

        const foundPost = posts.find((item) => item.id == postId); // 해당 postId에 맞는 게시글 찾기
        if (foundPost) {
            setPost(foundPost);
        }
    }, [postId]);

    if (!post) {
        return <p>게시글을 찾을 수 없습니다.</p>; // 해당 게시글을 찾지 못했을 때
    }

    return (
        <Wrapper>
            <Container>
                <Button
                    title="뒤로 가기"
                    onClick={() => {
                        navigate("/");
                    }}
                />
                <PostContainer>
                    <TitleText>{post.title}</TitleText>
                    <ContentText>{post.content}</ContentText>
                </PostContainer>

                <CommentLabel>댓글</CommentLabel>
                <CommentList comments={post.comments} />

                <TextInput
                    height={40}
                    value={comment}
                    onChange={(event) => {
                        setComment(event.target.value);
                    }}
                />
                <Button
                    title="댓글 작성하기"
                    onClick={() => {
                        // 나중에 댓글 작성 로직 추가 가능
                        setComment("");
                    }}
                />
            </Container>
        </Wrapper>
    );
}

export default PostViewPage;