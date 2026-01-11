// 'use client';

// import {Card, CardContent, CardHeader} from '@/components/card/scenes/card';
// import {Input} from '@/components/inputs/scenes/input';
// import * as React from 'react';
// import { BiSearch } from 'react-icons/bi';

// import {IoClose} from 'react-icons/io5';
// const menu = () => {
//   const [isOpen, setIsOpen] = React.useState(true);
//   return (
//     <Card className='grid h-full border-none shadow-none'>
//       <div>
//         <CardHeader className='mx-3 mb-0 mt-3 flex h-max items-center gap-2'>
//           <img
//             src='https://raw.githubusercontent.com/creativetimofficial/public-assets/master/ct-assets/logo.png'
//             alt='brand'
//             className='h-7 w-7 rounded-full'
//           />

//           <p className='font-semibold'>Material Tailwind</p>
//         </CardHeader>

//         <CardContent className='p-3'>
//           <Input type='search' placeholder='Search here...'>
//             {/* <Input.Icon> */}
//               <BiSearch className='h-full w-full' />
//             {/* </Input.Icon> */}
//           </Input>

//           <List className='mt-3'>
//             {/* {Links.map(({title, href, badge}) => (
//               <List.Item key={title}>
//                 <List.ItemStart></List.ItemStart>

//                 {title}

//                 {badge && (
//                   <List.ItemEnd>
//                     <Chip size='sm' variant='ghost'>
//                       <Chip.Label>{badge}</Chip.Label>
//                     </Chip>
//                   </List.ItemEnd>
//                 )}
//               </List.Item>
//             ))} */}

//             <hr className='-mx-3 my-3 border-secondary' />

//             <List.Item onClick={() => setIsOpen(cur => !cur)}>
//               <List.ItemStart>
//                 {/* <MoreHorizCircle className='h-[18px] w-[18px]' /> */}
//               </List.ItemStart>
//               More
//               <List.ItemEnd>
//                 {/* <NavArrowRight className={`h-4 w-4 ${isOpen ? 'rotate-90' : ''}`} /> */}
//               </List.ItemEnd>
//             </List.Item>

//             <Collapse open={isOpen}>
//               <List>
//                 <List.Item>
//                   <List.ItemStart>{/* <Folder className='h-[18px] w-[18px]' /> */}</List.ItemStart>
//                   Spam
//                 </List.Item>

//                 <List.Item>
//                   <List.ItemStart>
//                     {/* <UserXmark className='h-[18px] w-[18px]' /> */}
//                   </List.ItemStart>
//                   Blocked
//                 </List.Item>

//                 <List.Item>
//                   <List.ItemStart>{/* <Folder className='h-[18px] w-[18px]' /> */}</List.ItemStart>
//                   Important
//                 </List.Item>
//               </List>
//             </Collapse>

//             <hr className='-mx-3 my-3 border-secondary' />

//             <List.Item className='text-error hover:bg-error/10 hover:text-error focus:bg-error/10 focus:text-error'>
//               <List.ItemStart>{/* <LogOut className='h-[18px] w-[18px]' /> */}</List.ItemStart>
//               Logout
//             </List.Item>
//           </List>
//         </CardContent>
//       </div>

//       <Card.Footer className='mt-8 grid'>
//         <Card color='primary' className='mt-auto shadow-none'>
//           <Card.Header className='m-3'>
//             {/* <SelectFace3d className='h-10 w-10 text-primary-foreground' /> */}
//           </Card.Header>

//           <Card.Body>
//             <Typography type='h6' className='mb-1 text-white'>
//               Upgrade to PRO
//             </Typography>

//             <Typography type='small' className='text-white/80'>
//               Upgrade to Material Tailwind PRO and get even more components, plugins, advanced
//               features and premium.
//             </Typography>
//           </Card.Body>

//           <Card.Footer>
//             <Button
//               size='sm'
//               as='a'
//               href='#'
//               className='border-white bg-white text-black hover:border-white hover:bg-white hover:text-black'
//             >
//               Upgrade Now
//             </Button>
//           </Card.Footer>
//         </Card>
//       </Card.Footer>
//     </Card>
//   );
// };

// export default menu;
