import { Link, useLocation } from 'react-router-dom'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

import { breadcrumbItems } from './breadcrumbItems'

export const CustomBreadcrumb = (): JSX.Element => {
  const location = useLocation()

  return (
    <Breadcrumb
      p={'1rem 0'}
      spacing="8px"
      separator={<ChevronRightIcon color="blue.500" />}
      colorScheme="blue"
    >
      {Object.entries(breadcrumbItems).map(([key, value]) => {
        const isCurrentPage = key === location.pathname
        return (
          <BreadcrumbItem key={key}>
            <BreadcrumbLink
              as={Link}
              to={key}
              isCurrentPage={isCurrentPage}
              color={isCurrentPage ? 'black.700' : 'gray.400'}
            >
              {value}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}
