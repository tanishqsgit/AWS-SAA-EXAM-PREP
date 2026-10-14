import {F} from './catalog.mjs';
export default [
F('S3 storage economics','4.1','s3classes,lifecycle',[
'Use S3 Standard for frequent access requiring the general-purpose multi-AZ object tier.~Frequent access favors avoiding colder-tier retrieval and minimum-duration trade-offs.',
'Use S3 Standard-IA for suitable infrequent access requiring millisecond retrieval and multi-AZ storage.~Standard-IA trades lower storage cost for retrieval charges and minimum storage considerations.',
'Use S3 Intelligent-Tiering for eligible objects with uncertain access patterns, accounting for monitoring charges.~Intelligent-Tiering moves eligible objects between access tiers based on observed access.',
'Use an appropriate Glacier archival class and lifecycle policy when delayed retrieval is acceptable.~Archive classes trade retrieval time and cost conditions for lower storage prices.'
],[
'A site serves frequently requested objects throughout their lifetime. Multi-AZ storage is required and a pricing comparison rejects retrieval-charged cold tiers. Which storage class fits?|0',
'Large retained objects are seldom read, need millisecond retrieval, and must span AZs. Their lifetime satisfies minimum-duration terms and retrieval cost is modeled. Which class fits?|1',
'Object access changes unpredictably and manual classification performs poorly. Eligible object sizes and monitoring cost are accounted for. Which automated tiering design fits?|2',
'Long-retained records are rarely retrieved and the business accepts an archival restoration delay. Minimum retention and retrieval costs are modeled. Which storage strategy fits?|3',
'Small application assets are requested frequently and must be served immediately. The team wants the general-purpose object class without archive restoration. Which design fits?|0',
'A recovery dataset is retained for months and accessed infrequently, but must be readable immediately. Multi-AZ protection is required and economics favor the IA tier. Which class fits?|1',
'A library has large eligible objects with changing popularity and no dependable transition age. The monitoring overhead is acceptable. Which class adapts to this access uncertainty?|2',
'A legal dataset will be kept for years and can wait for supported restore operations when needed. Which broad storage family fits these archival requirements?|3',
'A high-request object set is a poor candidate for retrieval-charged storage under the measured cost model. Which general-purpose tier fits?|0',
'A long-lived large-object set is rarely accessed but cannot tolerate archival restore delays or single-AZ loss. The modeled IA economics are favorable. Which class fits?|1'
]),
F('Lifecycle policy design','4.1','lifecycle,s3version,s3classes',[
'Use age-based lifecycle transitions for a known change in object access pattern.~Lifecycle rules automate class transitions when object age or rule filters identify the intended set.',
'Configure noncurrent-version lifecycle rules consistent with required recovery retention.~Versioned buckets can retain chargeable older versions unless managed explicitly.',
'Configure lifecycle expiration only after the approved data retention period.~Expiration removes data and must respect retention requirements.',
'Use automated tiering when eligible access patterns are uncertain rather than imposing an unsupported fixed age.~Access-driven tiering can suit unpredictable use when its cost model is appropriate.'
],[
'Logs are frequently read for one month, then rarely accessed for a long approved retention. The age pattern is predictable. Which automation fits?|0',
'A versioned bucket has ballooning costs from old versions. Current objects must remain, and old versions need only the approved recovery window. Which policy fits?|1',
'Temporary exports must be removed automatically after their approved retention period. No further recovery is required. Which lifecycle action fits?|2',
'Object popularity is unpredictable and age does not identify cold data. Eligible objects and monitoring costs favor automated tiering. Which policy approach fits?|3',
'Daily report objects have a known hot period followed by long cold retention. The team wants to avoid manual moves. Which storage management design fits?|0',
'Deleting current keys leaves numerous older versions that incur cost. The backup policy permits removing noncurrent data after its recovery window. Which rule type fits?|1',
'A regulatory policy permits destruction only after a documented date-based retention. Storage should not retain temporary data indefinitely. Which lifecycle strategy fits?|2',
'A media library has bursts of popularity unrelated to object creation age. A fixed transition schedule repeatedly moves active data. Which tiering design fits?|3',
'A bucket contains a filtered set of long-lived logs with a predictable post-ingestion access decline. Which automated class-transition mechanism fits?|0',
'Older object versions must be retained for a limited recovery period and then removed independently of current data. Which lifecycle target should be configured?|1'
]),
F('Compute purchasing','4.2','spot,savings',[
'Use Spot capacity with checkpointing and a resilient fallback or retry strategy.~Spot can reduce compute cost for interruption-tolerant work.',
'Use an appropriate Savings Plans commitment for the measured stable eligible usage baseline.~Commitment discounts trade spending commitment for lower eligible compute rates.',
'Use On-Demand capacity for short unpredictable noninterruptible needs without a usage commitment.~On-Demand avoids a long-term commitment and Spot interruption risk.',
'Reduce or schedule idle nonproduction capacity where downtime is permitted.~Removing unnecessary running capacity saves cost rather than only discounting it.'
],[
'A batch renderer can checkpoint and retry interrupted work, has a flexible completion window, and can use fallback capacity if needed. Which purchasing model fits?|0',
'A company measures steady eligible compute spend that will continue throughout the chosen commitment term. It wants discounts on that baseline. Which purchasing model fits?|1',
'A short project needs unpredictable noninterruptible compute and cannot justify a long-term commitment. Which purchasing model fits?|2',
'Development instances sit unused overnight and their owners approve downtime. Which cost action addresses the unnecessary running hours directly?|3',
'Stateless batch tasks can restart safely and tolerate interruptions. The team prioritizes lower compute expense and plans adequate retries. Which capacity source fits?|0',
'An organization has a validated minimum eligible compute usage and accepts a spending commitment over the approved term. Which discount model fits?|1',
'A temporary production event requires reliable capacity without interruptible execution or a term commitment. Availability is separately engineered. Which purchasing option fits?|2',
'Test servers run weekends despite no users and can stop safely with persistent data protected. Which cost design removes waste?|3',
'An analytics workload checkpoints intermediate results and has enough scheduling flexibility to recover interrupted tasks. Which purchase type is suitable?|0',
'A continuously used eligible baseline is predictable, while variable excess can remain separately billed. Which commitment approach is cost-aligned?|1'
]),
F('Rightsizing and utilization','4.2','cloudwatch,scaling,asg',[
'Rightsize using observed representative utilization and workload constraints, then verify performance.~Measurements prevent blindly changing capacity based only on instance price.',
'Use demand-driven Auto Scaling with an appropriate minimum and metric.~Elastic capacity can follow variable demand rather than remain at peak size.',
'Schedule approved nonproduction shutdown and restart windows.~Permitted downtime removes idle running hours.',
'Keep required baseline capacity when its availability or performance obligation justifies it.~Lowest price alone does not meet business service requirements.'
],[
'A fleet is consistently underutilized during representative business cycles. The team can test smaller instances while preserving response targets. Which cost optimization fits?|0',
'Traffic varies widely and stateless nodes need peak capacity only briefly. An availability minimum is known. Which capacity architecture fits?|1',
'A test environment is unnecessary outside office hours and can safely resume next morning. Which operation directly cuts idle cost?|2',
'A standby service appears idle but is required to meet a tested recovery time. Removing it would violate the objective. Which cost decision respects the constraint?|3',
'An EC2 instance has far more memory than its measured peak workload needs. Performance can be verified on a suitable smaller size. Which change is evidence-based?|0',
'A seasonal API runs a fixed peak-sized fleet all year. The application is stateless and scales horizontally with a validated demand metric. Which architecture reduces excess capacity?|1',
'A training lab has no overnight usage and downtime is explicitly approved. Persistent state is protected. Which schedule reduces unnecessary instance hours?|2',
'A small multi-AZ minimum is required during low traffic to tolerate an AZ outage. Which economic choice preserves the approved availability floor?|3',
'An overprovisioned workload has reliable utilization history and a documented service-level target. Which process selects a less expensive instance without guessing?|0',
'A queue-based fleet has intermittent demand and can scale to the approved minimum between bursts. Which managed capacity strategy fits?|1'
]),
F('DynamoDB capacity economics','4.3','ddbcapacity,ttl,partition',[
'Use DynamoDB on-demand capacity for an appropriate unpredictable request profile.~On-demand capacity reduces throughput planning for variable request demand, subject to service behavior and costs.',
'Use provisioned capacity with an appropriate scaling policy for a measured predictable workload.~Provisioned capacity can be economical when the workload and scaling behavior support it.',
'Enable TTL for expired items when asynchronous deletion is acceptable.~TTL removes expired items asynchronously; it is not an exact-time authorization mechanism.',
'Redesign a hot-key access pattern rather than only increasing total table capacity.~Skew can remain a bottleneck despite more aggregate capacity.'
],[
'A new table has unpredictable activity and the team prioritizes avoiding throughput planning. Its cost comparison supports on-demand. Which capacity mode fits?|0',
'A table has a stable measured request profile and the comparison favors provisioned throughput with appropriate scaling. Which capacity model fits?|1',
'Temporary records become unnecessary after expiry, and delayed background removal is acceptable. Which managed cleanup design avoids maintaining deletion workers?|2',
'Most requests hit one logical key while total table capacity is ample. Increasing overall provisioned units has not solved throttling. Which design action fits?|3',
'An event-driven application sees infrequent unpredictable bursts and accepts the evaluated on-demand pricing. Which model minimizes manual capacity scheduling?|0',
'A service has known steady traffic and tested provisioned scaling boundaries. Its capacity analysis favors that model over per-request billing. Which mode fits?|1',
'A session ledger can keep expired records briefly because authorization separately checks expiration. Which managed storage cleanup fits?|2',
'A date-only key concentrates writes, while overall provisioned use is low. Which improvement addresses the distribution issue rather than unused table capacity?|3',
'A project cannot forecast request rates and explicitly values avoiding allocated-throughput management. The modeled economics are suitable. Which capacity choice fits?|0',
'A mature application has reliable demand history and approved provisioned capacity settings. Which mode matches that planned-capacity design?|1'
]),
F('Relational cost decisions','4.3','replicas,rds,cache',[
'Offload eligible stale-tolerant read work to a suitable replica when the measured economics justify it.~Replica capacity addresses reads and adds its own ongoing database cost.',
'Cache appropriate repeated reads with a tested freshness policy when it reduces total backend cost.~Caching may lower repeated query demand but adds a cache service and correctness responsibilities.',
'Rightsize the relational instance based on representative resource and performance evidence.~A smaller instance is appropriate only if it still meets requirements.',
'Retain required HA resources where reducing redundancy would violate availability requirements.~A cheaper single-AZ topology is not equivalent to required managed failover.'
],[
'A writer is dominated by varied reporting queries. Reports tolerate lag, cannot use a small cache effectively, and replica economics are favorable. Which design fits?|0',
'The same approved-stale catalog lookup accounts for most database reads. A small cache with defined invalidation reduces modeled total cost. Which design fits?|1',
'A relational database is oversized across measured peak cycles and can meet targets on a tested smaller class. Which optimization fits?|2',
'A business considers removing the Multi-AZ standby solely because it handles no reporting queries. Automatic failover is required. Which decision respects the availability constraint?|3',
'Many distinct SELECT reports constrain the writer and can move to an asynchronous copy. The cost model favors a replica over writer expansion. Which design fits?|0',
'Repeated product reads create avoidable database work and brief staleness is permitted. Cache cost and invalidation are accounted for. Which design fits?|1',
'Memory and CPU measurements show excess database capacity even at peaks. The team will verify a smaller size meets latency targets. Which action is justified?|2',
'An idle database standby is essential to the contracted outage target. The cost review must preserve that requirement. Which choice fits?|3',
'A reporting endpoint can use a replica and needs varied SQL rather than stable cache keys. The design meets cost and lag requirements. Which architecture fits?|0',
'A shared cache can absorb frequent identical queries and the application accepts controlled staleness. The model predicts lower total expense. Which architecture fits?|1'
]),
F('NAT and endpoint costs','4.4','gateway,nat,endpoints',[
'Use an S3 gateway endpoint for eligible VPC-to-S3 traffic and route it appropriately.~Gateway endpoints avoid sending eligible S3 traffic through NAT and have no additional endpoint charge.',
'Use same-AZ egress routes with suitable zonal NAT gateways when required for AZ isolation.~Zonal egress can avoid cross-AZ paths and isolate gateway failures, while adding gateway cost.',
'Use an appropriate interface endpoint only when its private-access requirement and total cost model justify it.~Interface endpoints have their own pricing; they are not automatically free or cheapest.',
'Retain the approved public egress design for general external destinations after modeling its cost.~Service endpoints do not provide arbitrary internet connectivity.'
],[
'Most NAT traffic is same-Region S3 uploads from EC2. The team wants to eliminate unnecessary NAT processing for that eligible service traffic. Which design fits?|0',
'Private subnets use a zonal NAT gateway in another AZ. Availability isolation and avoiding cross-AZ paths are required despite extra gateway expense. Which topology fits?|1',
'A sensitive service supports private interface endpoints. Internet egress is forbidden and its endpoint cost has been approved. Which design fits?|2',
'A private app must access public partner websites that have no private service endpoint. It needs managed outbound connectivity. Which egress decision fits?|3',
'An S3-heavy workload can use service-specific gateway routes. General partner traffic remains on NAT. Which design removes the eligible S3 NAT path?|0',
'A production VPC requires each AZ to preserve its own outbound path if another AZ fails. The architecture uses zonal public NAT gateways. Which routing design fits?|1',
'A private API consumer needs a supported service over private IPs and the cost comparison includes endpoint-hours and data processing. Which connectivity option fits?|2',
'A workload requires public external download hosts. An S3 endpoint cannot route these destinations. Which connectivity class must remain?|3',
'A fleet accesses S3 through NAT despite an eligible gateway endpoint pattern. Reducing this processing expense is the sole networking change. Which design fits?|0',
'A zonal NAT design routes both AZs through one gateway. The team prioritizes AZ independence and accepts additional gateway-hours. Which architecture fits?|1'
]),
F('Network cost topology','4.4','peering,tgw,cloudfront',[
'Use simple direct connectivity for a small nontransitive VPC pair after modeling its transfer cost.~A small direct topology can avoid unnecessary transit infrastructure.',
'Use Transit Gateway when centralized multi-network connectivity and administration justify its cost.~Transit Gateway trades managed transit and topology simplification for its applicable charges.',
'Use CloudFront caching for eligible repeated global content when its total cost and latency model are favorable.~Edge delivery can reduce repeated origin retrieval but must be priced as a whole.',
'Co-locate tightly coupled traffic where allowed while retaining the required failure separation.~Placement can reduce unnecessary transfer paths without abandoning availability constraints.'
],[
'Only two nonoverlapping VPCs need direct communication and no transit exists. A cost comparison favors direct connectivity over a transit hub. Which topology fits?|0',
'A large estate needs centrally managed transit and segmentation across many networks. The administration savings justify transit charges. Which topology fits?|1',
'Users worldwide repeatedly retrieve cacheable public assets. A modeled edge design improves latency and total delivery cost. Which architecture fits?|2',
'Two tightly coupled processing components transfer large volumes unnecessarily across placements. Approved placement changes preserve required resilience. Which cost action fits?|3',
'A tool and application VPC need only a simple pairwise connection. Centralized transit is not required and the direct model is cheaper. Which design fits?|0',
'Many VPCs and hybrid networks require an administered hub instead of a complex mesh. The team accepts the measured network service cost. Which choice fits?|1',
'A static download service serves repeated identical content to distant users. The cache hit and transfer pricing model is favorable. Which delivery design fits?|2',
'A workflow makes high-volume intercomponent calls across an avoidable network boundary. Policy permits closer placement while HA remains intact. Which optimization fits?|3',
'A minimal two-VPC design has no routing-through-a-third-network requirement. The cost review does not justify a transit service. Which topology fits?|0',
'The primary cost constraint includes engineering time to manage numerous network attachments and routes. A managed hub is approved. Which design fits?|1'
]),
F('Cost visibility and budgets','4.2','cost,budgets,cloudwatch',[
'Use Cost Explorer with appropriate tags and filters to analyze historical spend.~Cost Explorer supports cost and usage analysis rather than enforcing every spending limit.',
'Use AWS Budgets with configured thresholds and notifications or supported actions.~Budgets can notify about cost or usage conditions but are not a guaranteed immediate universal spending cap.',
'Use CloudWatch operational metrics to diagnose utilization before rightsizing.~Resource telemetry informs capacity decisions rather than attributing invoices by itself.',
'Define and apply cost allocation tags consistently across the relevant resources.~Consistent tagging supports attributing spend to organizational owners.'
],[
'Finance needs to analyze monthly AWS cost trends by service and project using available cost allocation data. Which tool fits this analysis?|0',
'A team wants notifications when its forecast or actual spend crosses approved thresholds. It understands alerts are not an absolute instantaneous cap. Which tool fits?|1',
'An instance seems expensive, but the team needs CPU and memory evidence before downsizing. Which telemetry source supports the capacity decision?|2',
'Project spend cannot be attributed because resource ownership metadata is inconsistent. Which governance step enables project-level allocation?|3',
'A department wants to compare service spend over several months and investigate the source of increases. Which cost analysis capability fits?|0',
'A research team wants configured cost threshold notifications sent to its existing contacts. It will respond operationally to alerts. Which cost tool fits?|1',
'A capacity review must establish whether an EC2 fleet is underused rather than merely expensive in aggregate. Which operational evidence should guide it?|2',
'Several teams share accounts and need consistent cost ownership labeling on eligible resources. Which tagging practice supports the requirement?|3',
'A manager needs filters and grouped historical usage costs to identify expensive services. Which AWS analysis tool fits?|0',
'An application owner wants budget threshold alerts, while acknowledging that delayed billing data cannot guarantee a hard cap. Which tool meets the stated requirement?|1'
]),
F('Serverless cost suitability','4.2','lambda,fargate,spot,asg',[
'Use Lambda for suitable short event-driven work after modeling requests and duration.~Event-driven function billing can fit intermittent bounded work without idle servers.',
'Use Fargate for supported containers when avoiding host operations justifies its resource pricing.~Managed container compute trades host management work for its own resource charges.',
'Use EC2 Spot with checkpointing for interruption-tolerant batch work.~Interruptible capacity suits tasks with safe retry and flexible completion.',
'Use appropriately sized and scaled EC2 capacity for required host-level control.~Host-dependent workloads may require EC2 despite serverless alternatives.'
],[
'A few short supported event handlers run each day. They fit function limits and the measured model favors avoiding idle instances. Which compute design fits?|0',
'A standard container must run continuously, and reducing host administration is worth its evaluated resource cost. No privileged host access is needed. Which design fits?|1',
'A batch job safely checkpoints and retries, can tolerate interruptions, and prioritizes low compute expense. Which capacity model fits?|2',
'A workload must install a kernel driver and use host-level controls. Cost optimization must preserve these requirements. Which compute class fits?|3',
'An intermittent supported transformation executes for seconds and does not require continuously running processes. Its cost comparison favors per-invocation compute. Which model fits?|0',
'A small team runs compatible containers and values eliminating patching of underlying instances. The total cost including operations favors managed containers. Which design fits?|1',
'An offline simulation has no strict immediate deadline and can resume from checkpoints. Which purchasing model can exploit interruption tolerance?|2',
'An application requires custom OS access and cannot execute in the supported managed function or container environments. Which economical design class preserves compatibility?|3',
'A bounded scheduled function runs infrequently and has no host dependencies. The model rejects maintaining an idle fleet. Which compute choice fits?|0',
'A service uses supported long-running containers and the team accepts Fargate resource costs to avoid maintaining worker hosts. Which option fits?|1'
]),
F('Retention cost boundaries','4.1','lifecycle,ttl,backup',[
'Use S3 lifecycle expiration after the approved object retention period.~Expiration avoids storing objects beyond their required lifetime.',
'Manage noncurrent S3 versions according to the approved recovery window.~Historical versions are separate retained data and can remain after current-object deletion.',
'Use DynamoDB TTL for eligible expired items when asynchronous cleanup is acceptable.~TTL is a managed background deletion mechanism rather than exact-time enforcement.',
'Configure backup retention according to recovery and compliance requirements, preserving tested usable points.~Backup lifecycle should meet required recovery coverage rather than retain everything forever.'
],[
'Temporary S3 exports must be discarded after thirty approved days, with no later recovery requirement. Which cleanup policy fits?|0',
'A bucket remains costly after current objects are deleted because earlier versions still exist. Only a limited recovery window is required. Which retention control fits?|1',
'A DynamoDB table holds expired sessions. The app separately enforces expiration, so background deletion delay is acceptable. Which low-overhead cleanup fits?|2',
'Database recovery points accumulate beyond the required recovery period. A retention policy must preserve approved coverage while avoiding indefinite storage. Which control fits?|3',
'A generated artifact bucket has a documented end-of-life age. Objects have no requirement after that age. Which automated deletion mechanism fits?|0',
'A versioned report store needs current data indefinitely but only recent older copies for recovery. Which lifecycle target reduces obsolete history?|1',
'A table stores temporary tokens whose validity is checked in application code. Expired rows can be removed asynchronously. Which mechanism fits?|2',
'A backup review finds years of retained points while policy requires a tested shorter recovery window. Which cost design should align retention with policy?|3',
'A staging bucket contains disposable files whose approved retention has ended. Which automated policy directly removes unnecessary objects?|0',
'Frequent updates create many historical object versions. Current objects must survive while older copies age out after the approved window. Which retention strategy fits?|1'
]),
F('Query cost efficiency','4.3','athena,scan,glue,partition,cache',[
'Organize suitable S3 query data with partition pruning and efficient columnar formats.~Reducing bytes scanned can improve analytical query efficiency when queries use the partition and column design.',
'Use key-based DynamoDB queries or a suitable index instead of repeated broad scans.~Access-path design reduces unrelated item evaluation.',
'Cache approved repeated database reads with controlled staleness.~Caching avoids repeated backend work when the business permits its freshness policy.',
'Retain an authoritative current-state read path for strict decisions.~Cost optimization must not substitute stale results when the requirement prohibits them.'
],[
'Athena scans large raw CSV datasets even when users need one date and a few columns. The pipeline can partition and convert files. Which data layout fits?|0',
'A DynamoDB API knows its entity key but scans the table and filters afterward. Which access design reduces unnecessary evaluated data?|1',
'A database handles many identical approved-stale catalog lookups. A small cache has favorable total economics. Which design fits?|2',
'A balance approval requires the latest committed value and the existing cache has a stale interval. Which read path must remain despite cheaper stale reads?|3',
'Analysts usually query one month of an S3 dataset and limited columns. Partition-aware columnar preparation is available. Which design reduces scan work?|0',
'An application needs efficient alternate-key lookup and can add a suitable index. Table scans dominate cost. Which access-path design fits?|1',
'Repeated product metadata requests can tolerate a defined refresh interval and invalidation behavior. Which cost strategy reduces database load?|2',
'Authorization must reflect a just-completed revocation. A stale cache or asynchronous copy cannot meet this requirement. Which read strategy is appropriate?|3',
'A data lake stores wide row-based files while queries use few columns and known date partitions. Which preparation improves scan efficiency?|0',
'A support API repeatedly scans for records despite a known query access pattern. Which DynamoDB modeling strategy is cost-aligned?|1'
]),
F('Cost review safeguards','4.2','cloudwatch,savings,scaling',[
'Measure representative demand and confirm performance before rightsizing.~Evidence-based sizing preserves requirements while reducing waste.',
'Commit only an approved stable eligible usage baseline to a discount plan.~Commitments are economical only when suitable use and term assumptions hold.',
'Preserve required minimum redundancy and recovery capacity during scaling changes.~Reducing spend must not break approved availability or recovery objectives.',
'Commit the full recent peak usage rather than the measured stable baseline.~A peak-based commitment can leave paid committed usage unused during lower demand.',
'Reduce the serving minimum to one instance and remove idle standby capacity to maximize utilization.~This can remove required redundancy or recovery capacity even if average utilization improves.',
'Choose the cheapest compatible instance class without testing representative peak load.~Compatibility and hourly price alone do not prove performance requirements are met.'
],[
'Availability minimums are already enforced. A cost review needs sound sizing and commitment decisions for a stable eligible baseline. Which TWO safeguards fit?|0,1',
'Representative sizing is complete. The team must choose only a sustainable commitment and retain required standby capacity. Which TWO safeguards fit?|1,2',
'No discount commitment is being purchased. The project needs verified rightsizing while preserving required redundant capacity. Which TWO safeguards fit?|0,2',
'Recovery capacity is already protected. The remaining decisions are whether smaller instances perform adequately and what baseline can safely be committed. Which TWO practices fit?|0,1',
'Tested rightsizing has succeeded. The architecture must avoid overcommitting variable peaks and preserve its HA minimum. Which TWO safeguards fit?|1,2',
'A noncommitted fleet is being optimized. The team must validate representative sizing and keep the approved multi-AZ floor. Which TWO controls fit?|0,2',
'The availability floor is fixed by policy. A savings proposal needs evidence for sizing and a valid stable usage commitment. Which TWO safeguards fit?|0,1',
'Measurements already establish resource needs. Purchasing and scaling changes must retain both realistic commitment use and recovery capacity. Which TWO safeguards fit?|1,2',
'A project has no term commitment. Its cost change should rightsize from evidence while keeping contracted failover capacity. Which TWO controls fit?|0,2',
'A reviewed minimum recovery footprint is already protected. The next cost decisions concern tested smaller sizes and a measured commitment baseline. Which TWO safeguards fit?|0,1'
],true)
];
