import {F} from './catalog.mjs';
export default [
F('Workload credentials','1.1','roles,ec2role,ecsrole,lambdarole,identity',[
'Use an EC2 instance profile with a least-privilege IAM role.~EC2 obtains temporary role credentials without embedding access keys.',
'Use a Lambda execution role with scoped permissions.~Lambda assumes its execution role when running the function.',
'Use an ECS task role scoped to application API calls.~A task role gives the container application its own temporary AWS credentials.',
'Federate the workforce through IAM Identity Center permission sets.~Workforce federation centralizes human access across accounts.'
],[
'An image-processing daemon runs on EC2 and reads a single S3 prefix. Instances are replaced daily; no long-lived AWS keys may be stored. Which credential design has the least maintenance?|0',
'A scheduled Lambda function copies reports between two buckets. The code must call S3 directly without reading static AWS credentials. Which identity should authorize the API calls?|1',
'Several ECS services share a host, but only the billing container may read a DynamoDB table. The host role must not grant application data access. Which identity isolates the application permissions?|2',
'Engineers need temporary console access to ten AWS accounts using the existing corporate directory. Central onboarding and revocation are required. Which approach fits human access?|3',
'An EC2 fleet scales from two to fifty nodes. Each node writes CloudWatch logs and the team wants AWS to supply renewable credentials through instance metadata. Which design meets this requirement?|0',
'An S3 event invokes a Lambda function that publishes to one SNS topic. Authorization must follow the function even when its runtime instances change. Which role should have Publish permission?|1',
'Fargate containers need read-only access to Secrets Manager. Credentials must be delivered to each task without giving every ECS application the same data permissions. Which design meets this constraint?|2',
'A merger adds staff who already authenticate to an external identity provider. Administrators need centrally assigned console permissions rather than one IAM user per person per account. Which design fits?|3',
'A legacy EC2 application supports the AWS SDK default credential chain. The security team bans credential files and wants no application rewrite. Which option supplies credentials with the lowest overhead?|0',
'Two ECS tasks need different S3 prefixes even when scheduled on the same EC2 instance. The application role must be independent of the role used to pull images and publish task logs. Which identity should be used?|2'
]),
F('Cross-account authorization','1.1','roles,policies',[
'Create a role in the resource account with a trust policy for the caller and scoped resource permissions; allow the caller to assume it.~Cross-account role access requires both trust and authorization to assume the role.',
'Grant the external role access through a scoped S3 bucket policy and the caller identity policy.~S3 supports cross-account resource policies for direct access without role switching.',
'Use an external ID condition in a vendor role trust policy, with vendor-specific scoped permissions.~External IDs help prevent a confused deputy when a third party serves multiple customers.',
'Use a same-account application role restricted to its required resources.~A same-account role supplies scoped credentials but does not itself establish external trust.'
],[
'An auditor in account A must inspect EC2 configuration in account B using temporary credentials issued in B. No existing trust exists. Which complete design establishes access?|0',
'A data partner must read one S3 prefix directly using its existing role, without assuming a role in the bucket account. Both accounts can update policies. Which design authorizes the reads?|1',
'A monitoring vendor assumes roles for thousands of customers. A customer wants its role usable only for that customer association, even if another customer knows the role ARN. Which design mitigates this risk?|2',
'A web service and its S3 bucket are in one account. The service needs renewable credentials but no external party should assume its identity. Which simplest authorization design fits?|3',
'A central deployment pipeline must call CloudFormation in workload accounts. The target account must control the deployment permissions and issue session credentials. Which design meets these boundaries?|0',
'An analytics account reads unencrypted S3 objects in a finance account. The application cannot change its active identity. What allows direct cross-account access to the permitted prefix?|1',
'A backup SaaS uses one principal to access customer accounts. Role trust already identifies that principal, but customers could ask the SaaS to target another customer role. Which additional design closes this trust gap?|2',
'A same-account EC2 importer only needs PutObject to one bucket. There is no cross-account use case and public access is prohibited. Which identity model minimizes permissions and complexity?|3',
'A security analyst needs console role switching into a production account while retaining a separate identity in the security account. What establishes the necessary temporary access path?|0',
'A partner requires S3 GET access using its own role ARN, and a policy review forbids role sessions in the owning account. Which design satisfies the stated access method?|1'
]),
F('Permission guardrails','1.1','policies,scp',[
'Apply an SCP denying the prohibited actions to the relevant member-account OU.~SCPs constrain permissions in member accounts; they do not grant permissions.',
'Attach a permissions boundary to delegated IAM roles and grant allowed actions with identity policies.~Boundaries cap the permissions identity policies can grant to an IAM entity.',
'Attach a scoped identity policy granting the required resource actions.~Identity policies grant permissions, subject to other applicable controls.',
'Remove or narrow the applicable explicit deny while retaining the necessary allow.~An explicit deny overrides an allow; adding another allow cannot bypass it.'
],[
'An organization must prevent member-account administrators from disabling CloudTrail. The restriction must survive changes to their administrator policies. Which control belongs at the organization level?|0',
'Developers may create IAM roles, but each role must have a fixed maximum permission set. The deployment process enforces boundary attachment. Which control limits permissions granted by later role policies?|1',
'An application has no S3 permission, no resource-policy grant, and no explicit deny. It only needs to read its reports prefix. What authorizes access with least privilege?|2',
'A role has an S3 allow, but its applicable bucket policy explicitly denies the request. The denial is unintended. Which change can restore access without broadening unrelated permissions?|3',
'All accounts in a testing OU must be prevented from launching resources in prohibited Regions. IAM administrators inside those member accounts must not override this restriction. Which guardrail fits?|0',
'A platform team delegates policy maintenance for one application role. Its identity policy must never grant more than the platform-approved set. Which limit should be attached to that role?|1',
'A Lambda role lacks SendMessage permission on its application queue. Organization policies allow this action and no deny applies. Which smallest authorization change is appropriate?|2',
'A deployment fails because an inherited SCP denies the action. The action is now approved for this member account. A new administrator policy did not help. Which type of change is required?|3',
'A compliance team needs an account-wide ceiling that applies to IAM users and roles in member accounts. Application teams retain responsibility for granting their actual permissions. Which design meets this separation?|0',
'An identity policy permits an operation, but a permissions boundary omits it. The operation is approved within the new maximum set. Which approach resolves the restriction rather than adding redundant allows?|3'
]),
F('Encryption authorization','1.3','kms,crosskey',[
'Authorize the caller through the KMS key policy and applicable IAM permissions.~KMS authorization depends on the key policy; an IAM allow alone may not suffice.',
'Separate key administration from cryptographic use with distinct scoped principals.~Key administrators need not be authorized to decrypt protected application data.',
'Use a customer managed KMS key with a key policy permitting the approved external role and its IAM authorization.~Cross-account use needs key-side authorization and caller-side permissions.',
'Use distinct customer managed keys for tenants requiring independently revocable cryptographic access.~Separate keys support separate policy and lifecycle boundaries.'
],[
'An application has kms:Decrypt in its identity policy, but the key policy neither grants access nor enables IAM delegation. No deny applies. What change establishes the missing authorization?|0',
'Compliance staff must rotate and manage a key but must not read encrypted payroll. The application alone should decrypt. Which policy design separates duties?|1',
'A role in another account must decrypt objects encrypted with a customer managed key. S3 access is already allowed, but no KMS sharing is configured. Which design is required?|2',
'A hosted service must revoke one tenant key without impacting other tenants. Contractual controls require a separate key ownership boundary. Which design meets this isolation?|3',
'A new Lambda role cannot use a key even though its IAM policy permits Encrypt. The key policy was intentionally created without account delegation. Which access control must also be configured?|0',
'A storage team maintains KMS policy and rotation settings; auditors prohibit that team from decrypting customer records. Which design grants maintenance access without granting data access?|1',
'A central archive account encrypts shared datasets. Approved analytics roles in separate accounts need decrypt access through their own identities. Which key configuration supports this?|2',
'Two business units need independent key disablement during an incident. Data from the unaffected unit must remain readable. Which key allocation meets this recovery boundary?|3',
'An engineer assumes that being the key creator grants ongoing decrypt permission. The custom key policy does not allow that engineer. Which design explicitly authorizes the approved decrypt operation?|0',
'A key operations role needs scheduling and rotation administration; a runtime role needs only permitted cryptographic use. Neither should inherit the other permissions. Which design is appropriate?|1'
]),
F('Secrets lifecycle','1.2','secrets,roles,secretget',[
'Store the credential in Secrets Manager and configure supported automatic rotation with application retrieval.~Secrets Manager can update stored credentials and the target service through rotation.',
'Use IAM role credentials for AWS API calls instead of storing an AWS access key as a secret.~Role credentials avoid maintaining long-lived AWS keys for supported workloads.',
'Retrieve the secret at runtime with a scoped role and keep it out of code and images.~Runtime retrieval avoids embedding a sensitive value in application artifacts.',
'Update both the target credential and its stored secret through an appropriate rotation workflow.~Changing the stored value alone does not change the target system password.'
],[
'An RDS application password must change regularly without manual deployment. The application can retrieve updated values and the supported rotation workflow has database connectivity. Which design minimizes upkeep?|0',
'An EC2 uploader currently stores an IAM user key in a vault. The SDK supports instance profiles, and the goal is eliminating long-lived AWS credentials entirely. What should replace that key?|1',
'A container image includes a database password and is shared with contractors. Rotation is handled separately, but future images must contain no secret values. Which deployment design fits?|2',
'A custom database rotation job changes only the Secrets Manager value. The database still expects the old password. Which correction is necessary for a usable credential?|3',
'A supported database needs automated password renewal, auditability, and centrally controlled application access. Applications already fetch credentials at startup and on authentication failure. Which design fits?|0',
'A Lambda function stores an AWS access key merely to call DynamoDB. It runs entirely in AWS and can use the default SDK credential provider. Which approach removes unnecessary credential maintenance?|1',
'Developers must deploy the same application image into test and production without seeing production credentials. Which pattern supplies the environment-specific password securely?|2',
'A third-party API token is periodically regenerated by a provider API. The team needs the active token stored after renewal. Which workflow avoids storing an unusable token?|3',
'A private application must obtain a database password without placing it in an AMI. Networking and access authorization are already configured. Which pattern prevents the artifact from leaking the secret?|2',
'A rotation Lambda is planned for a self-managed database password. Success requires applications and the database to agree on the new value. Which complete renewal design should be used?|3'
]),
F('Private AWS service access','1.2','endpoints,gateway,nat',[
'Use an S3 or DynamoDB gateway endpoint, as appropriate, with suitable route tables and endpoint policy.~Gateway endpoints provide VPC routes to S3 and DynamoDB without a NAT gateway.',
'Use an interface VPC endpoint with private DNS and appropriate security groups for the supported service.~Interface endpoints expose supported services through private network interfaces.',
'Use a public NAT gateway in a public subnet with a route to an internet gateway.~NAT permits outbound internet access from private IPv4 subnets.',
'Use a PrivateLink endpoint service and approved consumer interface endpoints.~An endpoint service exposes a specific private service to consumers without general VPC connectivity.'
],[
'Private EC2 instances only upload to same-Region S3. They must not have an internet route. Which endpoint architecture meets this constraint with minimal gateway infrastructure?|0',
'A private Lambda function retrieves Secrets Manager values. Internet egress is forbidden and DNS must continue using the normal service hostname. Which connectivity design fits?|1',
'Private EC2 hosts need HTTPS access to a public package repository outside AWS. Inbound internet connections are forbidden. Which egress design meets these requirements?|2',
'A vendor exposes one application behind a supported load balancer. Customers require private service access without routes to the rest of the vendor VPC. Which design should be used?|3',
'An S3 ingestion fleet in a VPC currently uses NAT for every object upload. The security team requires a service-specific route and endpoint policy. Which replacement meets the S3 access requirement?|0',
'A batch worker must call the SQS API from an isolated subnet. The service supports an interface endpoint and no internet egress is approved. Which design should supply access?|1',
'An application in private IPv4 subnets must send requests to public partner APIs. The partner offers no private endpoint. Which managed egress design permits responses without publishing the instances?|2',
'Two organizations have overlapping VPC CIDRs. One consumes only the other application endpoint, not general network connectivity. Which service-sharing design avoids peering the networks?|3',
'A VPC needs private same-Region DynamoDB API connectivity through route tables. No on-premises consumer needs to use this endpoint. Which endpoint architecture supplies this route-based access without internet egress?|0',
'EC2 needs the normal regional KMS API hostname to resolve to private addresses. The organization bans internet routes. Which supported endpoint type meets this DNS and connectivity requirement?|1'
]),
F('Security group boundaries','1.2','sg,nacl',[
'Allow application traffic from the load balancer security group to the target security group.~Security group references scope permitted traffic to associated source interfaces.',
'Allow database traffic from the application security group to the database security group.~Tier-specific rules admit application connections without exposing the database broadly.',
'Use a network ACL deny rule for the specified source CIDR at the subnet boundary.~Network ACLs support ordered allow and deny rules for subnet traffic.',
'Use stateful security group rules for initiating traffic without separate return-path rules.~Security groups track allowed connections and permit their response traffic.'
],[
'An internet-facing ALB serves private EC2 targets. Clients must not connect directly to targets, even if they share the VPC. Which target ingress rule scopes access to the ALB?|0',
'A database should accept PostgreSQL connections only from a scaling application fleet. Instance IP addresses change and the database must remain private. Which ingress rule maintains the tier boundary?|1',
'An incident response policy requires blocking one malicious IP range for every resource in a subnet. Existing security group allows must remain for other clients. Which control supports explicit subnet-level denial?|2',
'A private instance initiates allowed HTTPS connections. The team wants response packets accepted without enumerating ephemeral ingress ports at the instance firewall. Which control supplies this behavior?|3',
'A target group contains frequently replaced servers. Only ALB-originated HTTP requests should reach the target port, rather than all sources in the load balancer subnet. Which ingress design fits?|0',
'Several application nodes share one security group. A managed relational database must permit only those nodes on its listener port. Which rule survives Auto Scaling replacements?|1',
'A compliance rule requires a subnet-wide deny list evaluated before a broad allowed CIDR. Which VPC firewall layer supports this rule ordering?|2',
'A bastion initiates approved SSH connections to private instances. Response traffic must be accepted automatically by the instance-level network control. Which design provides stateful tracking?|3',
'A VPC CIDR includes unrelated development servers. Production RDS must allow only the production application group, not the entire CIDR. Which boundary is more precise?|1',
'Operations must reject inbound traffic from a specific IPv4 block across a whole subnet. Security groups only contain positive allow rules. Which additional control is appropriate?|2'
]),
F('Network ACL return traffic','1.2','nacl,sg',[
'Allow the application port inbound and the client return ephemeral-port range outbound in the subnet ACL.~Stateless ACLs require explicit rules for both request and response directions.',
'Allow the destination service port outbound and the corresponding client ephemeral-port range inbound in the subnet ACL.~Outbound clients also need stateless return traffic rules.',
'Place the narrow deny rule before the broader allow rule using a lower rule number.~ACL rules are evaluated in numerical order until a match is found.',
'Use a security group reference to enforce application-tier identity at the instance boundary.~Security groups can reference other groups; ACLs use network attributes rather than group identity.'
],[
'A subnet ACL allows inbound HTTPS to web servers but rejects all outbound traffic. Security groups are correct. Clients can start connections but receive no response. Which ACL design restores communication?|0',
'Private workers initiate HTTPS to an allowed endpoint. The ACL allows outbound 443 and denies inbound response traffic. Which ACL change completes the stateless connection path?|1',
'An ACL has an early broad allow and a later deny for an attacker range. The attacker still reaches the subnet. Which rule design implements the intended block?|2',
'A team tries to put an application security group ID into an ACL rule to restrict database access. Scaling changes IP addresses. Which control should enforce this group-based restriction?|3',
'A public subnet serves a TCP application on port 8443. Its ACL permits requests but not response destinations on clients. Which two-direction rule pattern is required?|0',
'A batch instance calls a partner HTTPS server from an ephemeral source port. Inbound ACL rules permit only port 443. Which return traffic design fits the connection direction?|1',
'A subnet policy should block one CIDR while permitting the encompassing private range. Which ordering ensures the specific denial is evaluated before the broad permission?|2',
'Production database access must follow EC2 group membership as instances scale. The subnet ACL should remain a coarse boundary. Which rule belongs at the resource layer?|3',
'An internal TCP load balancer reaches targets, but target response packets are dropped by the target subnet ACL. Requests enter on the listener port and responses target ephemeral ports. Which rule pattern fixes this?|0',
'An instance successfully sends an outbound request but never receives the reply after ACL hardening. Security groups are stateful and correctly permit initiation. Which ACL direction needs the response-port allowance?|1'
]),
F('S3 data protection','1.3','lock,s3version,s3security',[
'Enable S3 Versioning and retain older versions under a suitable lifecycle policy.~Versioning preserves prior object versions for recovery from overwrites or deletion markers.',
'Use S3 Object Lock compliance mode with the required retention period.~Compliance retention prevents protected version deletion even by the account root user during retention.',
'Enable S3 Block Public Access and scoped private access policies.~Block Public Access prevents supported public ACL and bucket-policy exposure paths.',
'Require TLS using a bucket policy that denies insecure transport.~A transport condition enforces encrypted requests independently of encryption at rest.'
],[
'Analysts occasionally overwrite the same S3 key with a faulty report. They need an earlier copy recoverable without restoring an entire bucket. Immutable retention is unnecessary; choose the simplest version-recovery design.|0',
'Regulated records must remain undeletable for a fixed period, including by privileged administrators. A versioned bucket is available. Which retention control satisfies this requirement?|1',
'A private evidence bucket must never become publicly readable through a later ACL or public policy. Existing authorized roles still need access. Which control provides the public-access guardrail?|2',
'A bucket already encrypts objects at rest, but clients can submit HTTP requests. Compliance requires refusing unencrypted transport. Which bucket control meets this separate requirement?|3',
'An automation bug deletes current object versions by creating deletion markers. Operations needs to recover prior contents and must remain able to permanently delete old versions when approved. Which simplest feature supports recovery without immutable retention?|0',
'A legal archive has a non-negotiable seven-year retention rule. No administrator may shorten retention for protected versions. Which mode should be selected?|1',
'An organization discovers a deployment template that can attach a public S3 policy. It wants a preventive guardrail while permitting specified internal roles. Which bucket setting should be enabled?|2',
'An external importer has valid S3 permissions, but security mandates TLS on every upload. Client-side encryption does not meet the transport requirement alone. Which control enforces the connection requirement?|3',
'A document system updates keys frequently and needs restoration of individual prior documents after operator mistakes. Immutable retention is unnecessary. Which storage feature is the simplest fit?|0',
'A company requires its historical audit versions to resist deliberate deletion by root until their retention dates. Which protection provides this stronger retention guarantee?|1'
]),
F('Web perimeter security','1.2','waf,wafrate,sg,cognito,tls',[
'Attach AWS WAF web ACL rules to the supported web entry point.~WAF inspects HTTP requests and can filter malicious patterns or request rates.',
'Use application authentication through a Cognito user pool and validate issued tokens.~User pools authenticate application users rather than filtering general network attacks.',
'Restrict target ingress to the load balancer security group.~Security groups prevent direct network access to the application targets.',
'Require HTTPS with certificate-based TLS at the application entry point.~TLS protects transport confidentiality but is not an application request filter.'
],[
'A public ALB application receives SQL injection patterns. The team wants managed HTTP request inspection without modifying application code. Which control is most directly suited?|0',
'A mobile application needs managed sign-up, sign-in, and tokens for protected API calls. The problem is identifying users, not filtering request payloads. Which design fits?|1',
'A public ALB protects EC2 targets, but users can reach the target ports through other VPC paths. The team must enforce ingress only through the ALB. Which control closes that bypass?|2',
'A portal accepts credentials over plaintext HTTP. It already has request filtering and user authentication. Which design protects those credentials in transit?|3',
'One client floods a supported web endpoint with repeated HTTP requests. The application team wants a rate-based edge rule. Which control addresses this request-layer abuse?|0',
'An API must reject unauthenticated customer requests and use a managed customer identity directory. Existing network controls already block direct access. Which architecture meets this identity requirement?|1',
'A security team wants web instances to accept application traffic only from their load balancer, with no broad VPC CIDR permission. Which network control should be implemented?|2',
'A browser displays sensitive information from an application that has valid authentication but no secure listener. Which entry-point improvement protects transport?|3',
'A CloudFront application needs rules matching dangerous URI and header patterns before requests reach its origin. Which managed request inspection service fits?|0',
'A website requires registration and password recovery for external consumers. IAM workforce account permissions are unrelated to this requirement. Which managed application identity approach fits?|1'
]),
F('Audit and compliance evidence','1.2','cloudtrail,config,cloudwatch',[
'Use CloudTrail to record the relevant AWS API activity, enabling needed data events explicitly.~CloudTrail records account activity; selected data events require configuration.',
'Use AWS Config recording and rules for resource configuration history and compliance evaluation.~Config tracks configurations and evaluates resource compliance.',
'Use CloudWatch metrics, logs, and alarms for operational threshold monitoring.~CloudWatch supports runtime telemetry and alarms rather than replacing API auditing.',
'Use both CloudTrail and AWS Config, correlating actor activity with configuration changes.~The services provide complementary activity and configuration evidence.'
],[
'An investigation must identify which IAM principal modified a security group and when. The requirement is API actor attribution. Which service should capture this evidence?|0',
'Auditors need historical security group configurations and evaluation against an approved rule. They do not only need the name of the API caller. Which service fits?|1',
'Operations must page when application error rates exceed a sustained threshold. The application publishes its metrics. Which telemetry design provides this operational alert?|2',
'A compliance report needs both the resource state change and the identity responsible for the API operation. Which evidence architecture supplies both views?|3',
'Security must audit GetObject calls on one sensitive S3 bucket. The team will explicitly configure the required object-level event coverage. Which service records the caller activity?|0',
'A rule must identify storage resources whose current settings violate the encryption policy and preserve setting history. Which service supplies configuration-focused compliance evidence?|1',
'A workload needs alarms on EC2 CPU saturation and application log error counts. Configuration history does not reveal these runtime signals. Which service addresses the requirement?|2',
'An incident team must compare a past public access configuration with who called the update API. Which combination avoids treating configuration and activity evidence as interchangeable?|3',
'A regulator asks for management API calls affecting IAM policies. Runtime CPU metrics are irrelevant to that audit. Which service should be used?|0',
'A governance team needs to evaluate deployed resource settings against centrally defined configuration rules. Which capability most directly fits this evaluation?|1'
]),
F('Customer and workforce identity','1.1','cognito,identity,roles',[
'Use Cognito user pools for application user authentication and issued tokens.~User pools are application user directories and authentication providers.',
'Use Cognito identity pools with appropriately scoped IAM roles for temporary AWS credentials.~Identity pools exchange supported identities for AWS credentials.',
'Use IAM Identity Center to centrally assign workforce access across AWS accounts.~Identity Center supports centrally managed workforce access.',
'Use an IAM role with trust for the approved SAML identity provider.~SAML federation can issue temporary AWS role credentials to external identities.'
],[
'A public consumer app needs managed registration and authentication, with tokens validated by its backend. It does not need AWS credentials in the browser. Which identity component fits?|0',
'Authenticated mobile users need temporary credentials to upload directly to their authorized S3 paths. A supported user identity provider already exists. Which component supplies AWS credentials?|1',
'Employees use a corporate directory and need centrally managed account console assignments. The organization has many AWS accounts. Which workforce design minimizes administration?|2',
'A single AWS account must directly trust an existing SAML provider for temporary role access. The approved design forbids introducing an identity brokerage service or separate managed directory. Which direct federation pattern fits?|3',
'A customer portal needs sign-in tokens and password recovery. Direct client AWS API access is prohibited. Which authentication service should serve as its user directory?|0',
'A web application already has valid provider tokens. It needs limited temporary AWS credentials for direct access to approved resources. Which identity exchange mechanism should be added?|1',
'A platform team must grant new employees a defined set of account permissions centrally and revoke assignments when they leave. Which service meets this workforce requirement?|2',
'A legacy enterprise provider supports SAML and the account requires a direct role trust relationship to that provider. A new identity brokerage service is prohibited. Which architecture avoids long-lived IAM passwords?|3',
'External customers must authenticate independently of the employee directory. Their backend authorizes business actions from issued tokens. Which user identity model fits?|0',
'A photo app wants users to upload to S3 without embedding a shared AWS access key. Users are already authenticated through a supported provider. Which mechanism issues scoped temporary AWS credentials?|1'
]),
F('Private CloudFront origins','1.2','oac,cloudfront,s3security,signed',[
'Use a private S3 REST origin with CloudFront origin access control and a bucket policy scoped to the distribution.~OAC signs origin requests and permits restricting S3 access to the distribution.',
'Use CloudFront signed URLs or signed cookies to restrict viewer access, alongside private origin access.~Viewer authorization and origin authorization are separate controls.',
'Use an HTTPS-capable custom origin with appropriate transport configuration.~A custom HTTPS origin provides origin transport encryption for compatible application endpoints.',
'Require HTTPS viewer connections in the CloudFront distribution.~Viewer protocol policy protects the browser-to-edge transport path.'
],[
'A static content bucket must be readable only through one CloudFront distribution. Direct S3 access must be denied and the REST endpoint is used. Which origin access design meets the requirement?|0',
'A private training video distribution already uses OAC. Paid viewers need short-lived authorized access to selected videos. Which extra viewer control fits?|1',
'CloudFront fronts an application server whose origin supports TLS. Security requires encrypting the edge-to-origin connection. Which origin transport design fits?|2',
'A distribution has a secure origin but still permits HTTP from browsers. The new requirement is encryption on the viewer path. Which distribution setting should be used?|3',
'Public bucket access has been removed from a document site. CloudFront must fetch objects while users cannot use S3 URLs directly. Which design establishes controlled origin authorization?|0',
'Subscribers require temporary access to many private files under one path. Origin access is already locked to CloudFront. Which class of viewer authorization meets this requirement?|1',
'A dynamic API origin is an HTTPS endpoint rather than an S3 bucket. The origin hop must use TLS and certificate validation. Which architecture supports this transport requirement?|2',
'A CDN delivers confidential forms; origin encryption is already configured. The team must refuse or redirect plaintext viewer connections. Which policy addresses this path?|3',
'A team uses an S3 website endpoint and now needs OAC. It can move to the S3 REST origin without needing website redirect behavior. Which replacement permits private bucket authorization?|0',
'A content owner must let one purchaser download one private object until a set expiry. A private CloudFront origin already works. Which viewer authorization pattern fits?|1'
]),
F('TLS trust boundaries','1.3','tls,targets,kms',[
'Configure an ALB HTTPS listener with an appropriate certificate.~An HTTPS listener protects the client-to-load-balancer connection.',
'Use HTTPS for the target group as well as HTTPS for the listener.~Both hops need TLS when encryption must extend from clients through the load balancer to targets.',
'Encrypt stored application data using a suitable KMS-backed service encryption configuration.~At-rest encryption protects stored data and does not replace transport TLS.',
'Use independent scoped permissions for certificate administration and application data decryption.~Separating administration and data use keeps distinct security duties.'
],[
'An internal portal handles passwords. Backend traffic is already on an approved private path, and the immediate requirement is TLS between browser and ALB. Which entry-point design meets it?|0',
'A regulator requires encryption on both the client-to-ALB and ALB-to-EC2 paths. The targets support TLS. Which load balancing transport design meets the complete requirement?|1',
'An API already uses TLS end to end, but its stored records remain unencrypted. The requirement specifically concerns data on disk. Which additional control is needed?|2',
'The certificate operations team must not gain permission to decrypt database records merely because it maintains TLS. Which access design respects this separation?|3',
'A website is migrating from an HTTP listener. Clients must authenticate the server through its certificate while receiving content through the ALB. Which listener configuration should replace HTTP?|0',
'An ALB terminates TLS but forwards plaintext to private targets. Policy forbids plaintext application traffic even within the VPC. Which configuration resolves the remaining transport gap?|1',
'A storage review finds encrypted network connections but no encryption for persistent object contents. What security layer directly addresses this separate concern?|2',
'A team renewing front-end certificates should have no access to application KMS decrypt operations. Which permission arrangement should the architect recommend?|3',
'Browser-to-load-balancer traffic is unencrypted. At-rest storage encryption is already enabled. Which listener feature addresses the actual exposure?|0',
'An application can install and maintain target certificates. The security standard requires both load balancer hops to be encrypted, rather than only public traffic. Which design fits?|1'
]),
F('Governance control placement','1.1','scp,config,cloudtrail',[
'Use an SCP preventive deny scoped to relevant member accounts.~An SCP restricts allowed actions for affected member-account principals.',
'Use AWS Config rules to detect noncompliant resource settings.~Config evaluates configuration compliance; detection is distinct from preventing the original API call.',
'Use CloudTrail to audit who performed management API actions.~CloudTrail provides action and identity evidence.',
'Use a scoped IAM role policy to grant approved application actions.~Application permissions still require an authorization grant within the permitted guardrails.'
],[
'A company must prevent member-account users from deleting approved audit infrastructure through specified APIs. Account administrators must be unable to override it. Which control placement fits?|0',
'A compliance team wants reports listing resources with settings outside the approved standard, and accepts detection after deployment. Which control evaluates resource state?|1',
'After an unexpected IAM policy change, investigators need the caller identity and request time. Which evidence source is designed for this question?|2',
'An application has no permission to publish to its SNS topic, although organization controls allow publishing. Which control grants the required action?|3',
'A central security team forbids disabling security services in member accounts. The requirement is API prevention rather than a later compliance report. Which organization control fits?|0',
'An estate contains legacy resources and the team wants continuous evaluations of their current configurations against managed rules. Which service supports the stated detective approach?|1',
'An auditor must trace account management operations to specific sessions. Resource state alone cannot identify the caller. Which service provides that trace?|2',
'A new workload role must read one DynamoDB table without gaining access to other tables. Organization guardrails are already suitable. What grants the minimal runtime permissions?|3',
'The organization has many workload accounts and needs a consistent action ceiling despite local administrator changes. Which policy type belongs above the account identity layer?|0',
'The board wants historical configuration changes and compliance status rather than blocking all modification calls. Which governance approach supplies this evidence?|1'
]),
F('Data access least privilege','1.3','s3security,policies,kms',[
'Restrict the role to the required S3 prefix and actions, with applicable bucket and key authorization.~Least privilege scopes data access to the business requirement.',
'Use a scoped cross-account bucket policy and caller permissions, plus KMS permission when applicable.~Direct shared data access must satisfy both object and encryption authorization.',
'Deny insecure transport in the bucket policy while retaining authorized encrypted requests.~TLS enforcement is separate from granting object access.',
'Use separate roles and keys for independently governed data access boundaries.~Separate identities and key policies support independent control of access.'
],[
'An importer needs only to upload new objects beneath incoming/ in one bucket. It must not read archives or delete data. Which access design matches that restricted job?|0',
'A partner role must directly read a shared S3 dataset encrypted by a customer managed key. Neither bucket nor key currently permits it. Which complete authorization design fits?|1',
'Authorized users can already retrieve records, but policy now mandates that every S3 request use TLS. Which change enforces this transport requirement?|2',
'Finance and research require independently revocable application identities and cryptographic controls. Access changes for one must not affect the other. Which design fits?|3',
'A reporting role only needs GetObject for monthly reports. It does not need PutObject, DeleteObject, or access to raw-data prefixes. Which policy arrangement keeps permissions aligned?|0',
'A receiving account is authorized by a bucket policy but cannot decrypt the objects. It uses its own role, not a role in the bucket account. Which access model includes the missing encryption permission?|1',
'A legacy client sends HTTP even though objects have server-side encryption. Requests must be rejected unless encrypted in transit. Which bucket control should be added?|2',
'Two customers need separately administered encrypted datasets and the contract prohibits sharing a decryption identity. Which access architecture meets this separation?|3',
'An analytics task must read one sensitive prefix but should have no access to unrelated datasets in the same bucket. Which design uses the resource scope rather than broad account access?|0',
'An external role has identity allows for S3 and KMS, but the resource account has not permitted either resource. Which complete direct-access design is needed?|1'
]),
F('Layered private workload security','1.2','sg,endpoints,nat',[
'Place application targets in private subnets without public IP addresses.~Private placement avoids direct public addressing of the target instances.',
'Allow target ingress only from the ALB security group on the application port.~A group-based rule enforces the load balancer as the traffic source.',
'Allow database ingress only from the application security group on the database port.~This isolates database access to the application tier.',
'Allow database ingress from the entire VPC CIDR on the database port.~A VPC-wide rule also admits unrelated VPC workloads and does not enforce the application-group boundary.',
'Allow target ingress from the ALB subnet CIDRs instead of its security group.~Subnet membership does not uniquely identify ALB interfaces; other permitted sources in those subnets can match.',
'Enable ALB sticky sessions while retaining the current subnet placement and ingress rules.~Session affinity does not remove public addressing or restrict network-tier ingress.'
],[
'A public ALB serves EC2 application nodes. The nodes must have no direct internet addressing and accept application requests only from the ALB. Which TWO controls implement the target boundary?|0,1',
'Application placement is already private. The remaining requirement is restricting web ingress to ALB sources and database ingress to application sources. Which TWO tier rules fit?|1,2',
'An existing ALB-only target rule is correct. New infrastructure must keep targets privately addressed and admit database connections only from the application tier. Which TWO controls fit?|0,2',
'A new web tier is reachable only through an ALB. The design must remove public addresses from its servers and avoid broad CIDR-based target ingress. Which TWO changes meet that boundary?|0,1',
'A three-tier app already has private subnets. Auditors find broad ingress at both the app and data tiers. Which TWO controls scope requests to the previous tier?|1,2',
'A fleet has a correctly restricted ALB ingress rule. The database now needs tier-specific authorization and target instances must avoid public addressing. Which TWO choices meet the remaining requirements?|0,2',
'An internet-facing load balancer is the only permitted entry to the application. The architect must prevent direct addressing and restrict the allowed traffic source. Which TWO controls should be used?|0,1',
'Private EC2 and RDS resources exist, but their security groups accept all VPC sources. Only ALB-to-app and app-to-database communication is approved. Which TWO rules implement this?|1,2',
'The target security group already references the ALB. Servers still have public addresses and the database rule is overly broad. Which TWO controls fix those remaining findings?|0,2',
'An application tier must hide instance addresses from internet clients and receive only load-balancer-sourced requests. Database rules are reviewed separately. Which TWO controls directly meet the app requirement?|0,1'
],true),
F('Cross-account encrypted S3 controls','1.3','s3security,kms,crosskey,policies',[
'Permit the external role in a scoped bucket policy and authorize its S3 actions in the caller account.~Direct cross-account object access needs resource-side and caller-side authorization.',
'Permit the external role to use the customer managed KMS key through key policy and caller IAM permission.~Decrypting shared SSE-KMS objects requires encryption-key authorization.',
'Enforce TLS using an explicit bucket policy denial for insecure transport.~Transport encryption must be enforced separately from at-rest encryption.',
'Add an S3 allow to the caller identity policy without changing the resource account policies.~An identity allow alone does not establish missing cross-account bucket authorization.',
'Grant only kms:DescribeKey and no decrypt permissions.~Key metadata access does not authorize decrypting object contents.',
'Add an inbound HTTPS security group rule to the consumer instance.~Instance network rules do not grant S3 or KMS authorization or enforce a bucket TLS condition.'
],[
'A partner uses its own role to read SSE-KMS objects directly. Neither the bucket nor key permits the partner, and TLS enforcement is already correct. Which TWO authorization changes are required?|0,1',
'A shared bucket already permits an approved partner role, but the KMS key does not. Security also requires rejecting HTTP requests. Which TWO controls address the remaining gaps?|1,2',
'Key permissions already allow the approved external role. The bucket has no cross-account grant and does not enforce transport encryption. Which TWO changes are needed?|0,2',
'An analytics role has no resource-side access to either a central S3 bucket or its customer managed encryption key. Connections already use enforced TLS. Which TWO authorization layers must be configured?|0,1',
'Cross-account S3 authorization is complete. Consumers still cannot decrypt, and audit policy requires transport enforcement rather than trusting clients. Which TWO changes fit?|1,2',
'The consumer can already use the central KMS key through approved policies. Direct object reads and mandatory TLS remain unconfigured. Which TWO bucket controls are required?|0,2',
'A producer wants external consumers to read encrypted objects without switching identities. Key sharing and bucket sharing are both missing; transport controls exist. Which TWO designs establish access?|0,1',
'The archive bucket policy grants partner reads. The encrypted objects need key use approval and the bucket must reject insecure requests. Which TWO controls satisfy both remaining requirements?|1,2',
'KMS access is configured for an external reporting role. The role still needs permitted direct S3 reads over enforced TLS. Which TWO resource-side designs fit?|0,2',
'A customer managed key protects exported datasets. The external consumer has no S3 or KMS grants, but an existing bucket transport policy requires HTTPS. Which TWO access designs are needed?|0,1'
],true),
F('Security design review','1.2','roles,secrets,secretget,waf,nacl',[
'Use temporary IAM role credentials for supported AWS API calls.~Roles avoid embedding long-lived AWS keys.',
'Retrieve database credentials from Secrets Manager at runtime with scoped access.~Runtime retrieval avoids baking passwords into artifacts.',
'Inspect supported web requests using AWS WAF rules.~WAF addresses HTTP request filtering at supported entry points.',
'Inject a rotated long-lived IAM user access key at deployment time instead of embedding it in the image.~Deployment injection removes an image copy but retains a long-lived AWS key rather than using temporary role credentials.',
'Bake an encrypted database password file into the application image and decrypt it at startup.~Encrypting an image-embedded credential does not remove the credential artifact from the image.',
'Use network ACL rules for known source CIDRs as the web payload inspection control.~A subnet ACL evaluates network attributes rather than inspecting HTTP injection patterns.'
],[
'An EC2 workload stores AWS user keys and database passwords in its image. Policy bans long-lived AWS keys and any credential files in images, including encrypted files. Request filtering is already configured. Which TWO designs meet the credential requirements?|0,1',
'A web app already uses IAM roles. Policy bans any database credential file in images, even if encrypted, and requires managed HTTP payload inspection for injection patterns. Which TWO designs address those requirements?|1,2',
'Database credentials are already retrieved securely. A web service must eliminate long-lived AWS keys and inspect HTTP payloads at its supported entry point. CIDR restrictions alone cannot meet the inspection rule. Which TWO designs fit?|0,2',
'An EC2 uploader retrieves database credentials for transactional writes. Its current AMI contains AWS user keys and an encrypted database credential file. Policy prohibits both long-lived AWS keys and image-embedded credential files. Which TWO patterns fit?|0,1',
'An application already has temporary AWS credentials. A leaked image contains a database credential file; storing an encrypted replacement there is also prohibited. Injection payloads must be inspected at its ALB. Which TWO designs fit?|1,2',
'A secure vault supplies database passwords. Audit requires replacing AWS user keys with temporary credentials and adding HTTP pattern inspection, not just network CIDR filtering. Which TWO improvements fit?|0,2',
'Contractors receive deployment images. Policy prohibits long-lived AWS credentials at runtime and forbids even encrypted password files in those images. A web ACL exists. Which TWO identity and secret patterns fit?|0,1',
'A role-based API calls AWS securely. Its policy forbids reusable SQL credential artifacts in images and requires filtering malicious HTTP payloads regardless of client IP range. Which TWO controls fit?|1,2',
'Secret retrieval is already implemented. The application must use temporary AWS identity credentials and managed HTTP payload filtering. Rotating IAM user keys and filtering only subnet CIDRs do not meet policy. Which TWO designs fit?|0,2',
'A new service must avoid long-lived AWS keys and may not embed database credential files in its deployable images, whether plaintext or encrypted. Its perimeter controls are already approved. Which TWO patterns meet the credential requirement?|0,1'
],true)
];
