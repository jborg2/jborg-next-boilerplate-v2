import { FC } from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
    children: React.ReactNode;
}

const FadeIn: FC<FadeInProps> = (props) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {props.children}
        </motion.div>
    );
};

export default FadeIn;