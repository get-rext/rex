import React from 'react';
import { Progress, Header, Container, Image } from 'semantic-ui-react';

const MusicDetail = (props) => {
  const {
    id, name, artist, album, popularity, preview, url, uri,
  } = props.result;
  return (
    <div>
      <Container>
        <Header as="a" size="huge" href={url}>
          {name}
        </Header>
        <Progress value={popularity} total="100" indicating/>
        <Header size="small">{artist[0].name}</Header>
        <iframe src={`https://open.spotify.com/embed?uri=${uri}`} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </Container>
    </div>
  );
};

export default MusicDetail;
