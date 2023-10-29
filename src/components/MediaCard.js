import { Card, CardContent, Typography } from '@mui/material';
import Image from 'next/image';

export default function MediaCard({ heading, text }) {
  return (
    <Card>
      <Image
        alt="In Working Progress"
        src="https://sensiba.com/wp-content/uploads/2023/04/Work-in-Progress.jpg"
        width={640}
        height={480}
        style={{
          maxWidth: '100%',
          height: '200px',
          objectFit: 'contain',
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {heading}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}
