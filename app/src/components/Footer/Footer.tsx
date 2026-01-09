import { Box, Text, Link } from '@chakra-ui/react';
import './Footer.css';
import { FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <Box as="footer" className="footer">
      <div className="footer-items">
        <Text>© {new Date().getFullYear()} Made By: Strangulate</Text>
        <Link
          as="a"
          href="https://github.com/bennettsf/osrs-bank-tags"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size="20px" />
        </Link>
      </div>
    </Box>
  );
}

export default Footer;
