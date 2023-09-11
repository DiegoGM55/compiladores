import styled from "styled-components";

export const Gutter = styled.div`
  background: #11101f;
  color: grey;

  display: flex;
  flex-flow: column wrap;
  padding: 1rem;

  span {
    padding: 0.2rem;
    color: #62a9b9;
    border: 1px solid white;
  }
`;

export const Editor = styled.div`
    margin-top: 2rem;
	display: flex;
	flex-flow: row wrap;
	min-width: 60vw;
	min-height: 500px;
	max-height: 700px;
	background: grey
	box-shadow: 0px 5px 10px rgba(0,0,0,0.5);

  textarea {
    background: lighten(#11101f, 5);
		flex: 1;
	
		border: 0;
		color: white;
	
		padding: 1rem;
		line-height: 2.2;
		overflow: hidden;
		&:focus
			outline: none;
  }
`;

