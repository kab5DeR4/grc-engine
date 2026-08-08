export const initialInfrastructure = {
  summary: {
    aws: {
      status: 'Connected',
      resources: 142,
      accounts: 12,
      regions: 3
    },
    github: {
      status: 'Connected',
      repositories: 24,
      branches: 384
    },
    kubernetes: {
      status: 'Connected',
      clusters: 6,
      workloads: 87
    }
  },
  awsDetails: {
    account: "Production",
    vpcs: 12,
    subnets: 48,
    ec2Instances: 84,
    s3Buckets: 37,
    iamRoles: 42,
    iamUsers: 16,
    rdsDatabases: 9,
    securityGroups: 18,
    cloudTrail: 7,
    loadBalancers: 3
  }
};
