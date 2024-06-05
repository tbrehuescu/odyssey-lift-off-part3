import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import Layout from "../components/layout";
import QueryResult from "../components/query-result";
import TrackDetail from "../components/track-detail";

const GET_TRACK = gql`
  query ExampleQuery($trackId: ID!) {
    track(id: $trackId) {
      id
      modulesCount
      numberOfViews
      thumbnail
      title
      length
      author {
        id
        name
        photo
      }
      description
      modules {
        id
        title
        length
      }
    }
  }
`;

const Track = () => {
  const { trackId } = useParams();
  const { loading, error, data } = useQuery(GET_TRACK, {
    variables: {
      trackId,
    },
  });

  return (
    <Layout>
      <QueryResult error={error} loading={loading} data={data}>
        <TrackDetail track={data?.track} />
      </QueryResult>
    </Layout>
  );
};

export default Track;
