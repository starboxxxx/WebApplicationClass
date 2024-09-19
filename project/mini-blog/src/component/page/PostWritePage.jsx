import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";

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

function PostWritePage(props) {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = () => {
        if (!title || !content) {
            setError("제목과 내용을 모두 입력하세요.");
            return;
        }

        const newPost = {
            id: Date.now(), // 고유 ID 생성
            title: title,
            content: content,
            comments: [] // 댓글은 빈 배열로 초기화
        };

        // 로컬 스토리지에서 현재 게시글 목록 가져오기
        const savedPosts = localStorage.getItem("posts");
        const posts = savedPosts ? JSON.parse(savedPosts) : [];

        // 새 게시글 추가
        posts.push(newPost);

        // 로컬 스토리지에 게시글 목록 저장
        localStorage.setItem("posts", JSON.stringify(posts));

        // 콘솔 로그 찍기
        console.log("새로운 글이 작성되었습니다:", newPost);

        // 작성 완료 후 메인 페이지로 이동
        navigate("/");
    };

    return (
        <Wrapper>
            <Container>
                <TextInput
                    height={20}
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                    placeholder="제목을 입력하세요"
                />

                <TextInput
                    height={480}
                    value={content}
                    onChange={(event) => {
                        setContent(event.target.value);
                    }}
                    placeholder="내용을 입력하세요"
                />

                {error && <p style={{ color: "red" }}>{error}</p>}

                <Button
                    title="글 작성하기"
                    onClick={handleSubmit}
                />
            </Container>
        </Wrapper>
    );
}

export default PostWritePage;